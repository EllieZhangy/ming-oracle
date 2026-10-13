import {generateReading} from './service.mjs';
import {ReadingError} from './facts.mjs';

const MAX_BYTES=8192;
function json(value,status=200,origin) {
 const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Vary':'Origin'};
 if(origin)headers['Access-Control-Allow-Origin']=origin;
 return new Response(JSON.stringify(value),{status,headers});
}
async function boundedJson(request) {
 if(!request.headers.get('content-type')?.toLowerCase().startsWith('application/json'))throw new ReadingError('INVALID_INPUT',415);
 if(Number(request.headers.get('content-length'))>MAX_BYTES)throw new ReadingError('INPUT_TOO_LARGE',413);
 const reader=request.body?.getReader();if(!reader)throw new ReadingError('INVALID_INPUT');
 const chunks=[];let length=0;
 while(true){const {value,done}=await reader.read();if(done)break;length+=value.length;if(length>MAX_BYTES){await reader.cancel();throw new ReadingError('INPUT_TOO_LARGE',413);}chunks.push(value);}
 const bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
 try { return JSON.parse(new TextDecoder().decode(bytes)); }catch { throw new ReadingError('INVALID_INPUT'); }
}
export function createHandler({generate=generateReading,clock=()=>Date.now()}={}) {
 const visitors=new Map();let active=0;
 return async function handle(request,env={}) {
  const origin=request.headers.get('origin'),ownOrigin=new URL(request.url).origin;
  const allowed=new Set(['https://elliezhangy.github.io',ownOrigin,...(env.ALLOWED_ORIGINS||'').split(',').map(s=>s.trim()).filter(Boolean)]);
  if(origin&&!allowed.has(origin))return json({error:{code:'ORIGIN_NOT_ALLOWED'}},403);
  if(request.method==='OPTIONS') {
   const response=json({},200,origin);
   return new Response(null,{status:204,headers:{...Object.fromEntries(response.headers),'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Access-Control-Max-Age':'600'}});
  }
  if(request.method!=='POST')return json({error:{code:'METHOD_NOT_ALLOWED'}},405,origin);
  try {
   const raw=await boundedJson(request);
   const ip=env.VERCEL?(request.headers.get('x-vercel-forwarded-for')||request.headers.get('x-forwarded-for')||'unknown').split(',')[0].trim():'local';
   const now=clock();
   // In-process fallback is only a best-effort throttle. Use platform rate limiting for public scale.
   for(const [key,entry] of visitors)if(now-entry.since>=60000)visitors.delete(key);
   const entry=visitors.get(ip)||{since:now,count:0};
   if(entry.count>=8||active>=4)throw new ReadingError('RATE_LIMITED',429);
   if(env.READING_LIMITER){const result=await env.READING_LIMITER.limit({key:ip});if(!result.success)throw new ReadingError('RATE_LIMITED',429);}
   entry.count++;visitors.set(ip,entry);active++;
   try { return json(await generate(raw,{env,now:new Date(now),signal:request.signal}),200,origin); }finally { active--; }
  }catch(error) {
   const code=error instanceof ReadingError?error.code:'SERVER_ERROR',status=error instanceof ReadingError?error.status:500;
   const response=json({error:{code}},status,origin);
   if(status===429)response.headers.set('Retry-After','60');
   return response;
  }
 };
}
export const handleReading=createHandler();

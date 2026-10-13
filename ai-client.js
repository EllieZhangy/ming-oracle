(function(root,factory){
 const api=factory();
 if(typeof module==='object'&&module.exports)module.exports=api;
 else root.MingAI=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const TOPICS=['health','love','family','career','study','wealth'];
 class ReadingError extends Error{
  constructor(code){super(code);this.name='ReadingError';this.code=code;}
 }
 function nonempty(value,max=8000){return typeof value==='string'&&value.trim().length>0&&value.length<=max;}
 function validatePayload(input){
  if(!input||!['nature','season'].includes(input.stage)||!['en','zh'].includes(input.language)||!input.birth)throw new ReadingError('invalid_input');
  const {date,time,place}=input.birth;
  if(typeof date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(date)||typeof time!=='string'||(time!==''&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(time))||typeof place!=='string'||place.length>100||!nonempty(input.question,500))throw new ReadingError('invalid_input');
  const dateObj=new Date(date+'T12:00:00Z');
  if(Number.isNaN(dateObj.getTime())||dateObj.toISOString().slice(0,10)!==date||date<'1900-01-01'||date>'2100-12-31')throw new ReadingError('invalid_input');
  if(input.stage==='nature'?input.topic!==null:!TOPICS.includes(input.topic))throw new ReadingError('invalid_input');
  return {stage:input.stage,birth:{date,time,place},question:input.question.trim(),topic:input.topic,language:input.language};
 }
 function isMonth(value){return value&&Number.isInteger(value.year)&&value.year>=1900&&value.year<=2200&&Number.isInteger(value.month)&&value.month>=1&&value.month<=12;}
 function validateResponse(result,stage){
  if(!result||!nonempty(result.nature)||!result.meta||result.meta.engine!=='ai'||!nonempty(result.meta.model,200)||!nonempty(result.meta.generatedAt,80)||Number.isNaN(Date.parse(result.meta.generatedAt))||!Array.isArray(result.meta.sources))throw new ReadingError('invalid_response');
  if(result.meta.monthAnchors!==undefined){
   if(!Array.isArray(result.meta.monthAnchors)||result.meta.monthAnchors.some(row=>!isMonth(row)||!nonempty(row.stem,4)||!Number.isInteger(row.element)||row.element<0||row.element>4))throw new ReadingError('invalid_response');
  }
  if(stage==='season'){
   if(!result.season||!nonempty(result.season.title,300)||!nonempty(result.season.description)||!isMonth(result.opening)||!nonempty(result.opening.description)||!Array.isArray(result.months)||result.months.length!==3||!result.alignment||!nonempty(result.alignment.action)||!nonempty(result.alignment.watch))throw new ReadingError('invalid_response');
   for(const row of result.months)if(!isMonth(row)||!nonempty(row.title,300)||!nonempty(row.description)||!nonempty(row.action))throw new ReadingError('invalid_response');
   if(new Set(result.months.map(row=>row.year+'-'+row.month)).size!==3||new Set(result.months.map(row=>row.title.trim().toLowerCase())).size!==3)throw new ReadingError('invalid_response');
  }
  return result;
 }
 function resolveEndpoint(origin,config){
  const current=new URL(origin);
  const base=config&&typeof config.apiBase==='string'?config.apiBase.trim():'';
  if(!base){
   if(current.hostname==='github.io'||current.hostname.endsWith('.github.io')||current.protocol==='file:')throw new ReadingError('not_connected');
   return new URL('/api/reading',current.origin).href;
  }
  let endpoint;
  try{endpoint=new URL(base.replace(/\/$/,'')+'/api/reading',current.origin);}catch(error){throw new ReadingError('not_connected');}
  if(endpoint.protocol!=='https:'&&!(endpoint.protocol==='http:'&&['localhost','127.0.0.1','[::1]'].includes(endpoint.hostname)))throw new ReadingError('not_connected');
  if(endpoint.username||endpoint.password)throw new ReadingError('not_connected');
  return endpoint.href;
 }
 function create(options){
  const fetcher=options.fetch;
  const cache=new Map();
  let current=null,sequence=0;
  const key=payload=>{
   const valid=validatePayload(payload);
   const month=valid.stage==='season'?new Date((options.now||Date.now)()).toISOString().slice(0,7):null;
   return JSON.stringify({payload:valid,month});
  };
  function cancel(){sequence++;if(current)current.abort();current=null;}
  function cached(payload){return cache.get(key(payload))||null;}
  async function request(input){
   const payload=validatePayload(input),cacheKey=key(payload);
   cancel();
   if(cache.has(cacheKey))return cache.get(cacheKey);
   const endpoint=resolveEndpoint(options.origin,options.config);
   const token=sequence,controller=new AbortController();current=controller;
   const timeout=setTimeout(()=>controller.abort('timeout'),options.timeoutMs||95000);
   try{
    const response=await fetcher(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal,credentials:'omit',cache:'no-store'});
    if(token!==sequence)throw new ReadingError('cancelled');
    if(!response.ok){
     let body;try{body=await response.json();}catch(error){body=null;}
     if(token!==sequence)throw new ReadingError('cancelled');
     const rawCode=body&&body.error&&typeof body.error.code==='string'?body.error.code:body&&typeof body.code==='string'?body.code:'';
     const code=rawCode.toLowerCase();
     if(response.status===504||code==='ai_timeout')throw new ReadingError('timeout');
     if(response.status===429||code==='ai_rate_limit')throw new ReadingError('rate_limit');
     if(response.status===503||code==='ai_not_configured'||code==='not_configured')throw new ReadingError('not_connected');
     if(code==='ai_refused')throw new ReadingError('generation_failed');
     if(response.status===400)throw new ReadingError('invalid_input');
     throw new ReadingError('generation_failed');
    }
    const result=validateResponse(await response.json(),payload.stage);
    if(token!==sequence||controller.signal.aborted)throw new ReadingError(token!==sequence?'cancelled':'timeout');
    cache.set(cacheKey,result);return result;
   }catch(error){
    if(token!==sequence)throw new ReadingError('cancelled');
    if(controller.signal.aborted)throw new ReadingError('timeout');
    if(error instanceof ReadingError)throw error;
    throw new ReadingError('connection_failed');
   }finally{clearTimeout(timeout);if(token===sequence)current=null;}
  }
  return {request,cached,cancel};
 }
 return {create,validatePayload,validateResponse,resolveEndpoint,ReadingError};
});

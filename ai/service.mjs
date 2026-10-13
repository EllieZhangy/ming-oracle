import {parseInput,calculateFacts,ReadingError} from './facts.mjs';
import {NATURE_SCHEMA,REPORT_SCHEMA,validateOutput} from './schema.mjs';
import {SYSTEM_PROMPT,userPrompt} from './prompt.mjs';
import {SOURCES} from './knowledge.mjs';

export async function generateReading(raw,{env={},fetchImpl=fetch,now=new Date(),signal}={}) {
 const input=parseInput(raw,now);
 if(!env.OPENAI_API_KEY)throw new ReadingError('AI_NOT_CONFIGURED',503);
 const facts=calculateFacts(input,now);
 const model=env.OPENAI_MODEL||'gpt-4.1-mini';
 const abort=new AbortController();
 const onAbort=()=>abort.abort();
 if(signal?.aborted)throw new ReadingError('REQUEST_CANCELLED',499);
 signal?.addEventListener('abort',onAbort,{once:true});
 const timer=setTimeout(()=>abort.abort(),45000);
 try {
  const response=await fetchImpl('https://api.openai.com/v1/responses',{
   method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${env.OPENAI_API_KEY}`},signal:abort.signal,
   body:JSON.stringify({model,store:false,instructions:SYSTEM_PROMPT,input:[{role:'user',content:userPrompt(input,facts)}],max_output_tokens:input.stage==='nature'?700:3000,text:{format:{type:'json_schema',name:input.stage==='nature'?'ming_nature':'ming_season',strict:true,schema:input.stage==='nature'?NATURE_SCHEMA:REPORT_SCHEMA}}})
  });
  if(!response.ok)throw new ReadingError(response.status===429?'AI_BUSY':'AI_PROVIDER_ERROR',response.status===429?429:502);
  const body=await response.json();
  if(body.status&&body.status!=='completed')throw new ReadingError('AI_INCOMPLETE',502);
  const content=(body.output||[]).flatMap(item=>item.content||[]);
  if(content.some(item=>item.type==='refusal'))throw new ReadingError('AI_REFUSED',422);
  const result=content.filter(item=>item.type==='output_text').map(item=>item.text).join('');
  if(!result||result.length>24000)throw new ReadingError('INVALID_AI_OUTPUT',502);
  let parsed;try { parsed=JSON.parse(result); }catch { throw new ReadingError('INVALID_AI_OUTPUT',502); }
  const validated=validateOutput(parsed,input.stage,facts);
  return {...validated,meta:{engine:'ai',provider:'openai',model,generatedAt:now.toISOString(),sources:SOURCES.filter(source=>source.usage==='adapted'),monthAnchors:facts.horizon.months.map(row=>({year:row.year,month:row.month,stem:row.stem,element:['Wood','Fire','Earth','Metal','Water'].indexOf(row.stemElement)})),calendarScope:'Preliminary civil-clock BaZi; monthly midpoints; no luck-cycle calculation.'}};
 }catch(error) {
  if(error instanceof ReadingError)throw error;
  if(abort.signal.aborted)throw new ReadingError(signal?.aborted?'REQUEST_CANCELLED':'AI_TIMEOUT',signal?.aborted?499:504);
  throw new ReadingError('AI_PROVIDER_ERROR',502);
 }finally { clearTimeout(timer);signal?.removeEventListener('abort',onAbort); }
}

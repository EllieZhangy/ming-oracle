import {ReadingError} from './facts.mjs';
import {assertGrounded} from './grounding.mjs';
const text={type:'string'};
const object=properties=>({type:'object',properties,required:Object.keys(properties),additionalProperties:false});
export const NATURE_SCHEMA=object({nature:text});
export const REPORT_SCHEMA=object({
 nature:text,
 season:object({title:text,description:text}),
 opening:object({year:{type:'integer'},month:{type:'integer'},description:text}),
 months:{type:'array',items:object({year:{type:'integer'},month:{type:'integer'},title:text,description:text,action:text})},
 alignment:object({action:text,watch:text})
});
function passage(value,max=1800,min=8) {
 if(typeof value!=='string'||value.trim().length<min||value.length>max||/<\/?(?:script|iframe|style)\b/i.test(value))throw new ReadingError('INVALID_AI_OUTPUT',502);
 let cleaned=value.trim();
 // Repair a lone closing quote observed in a real response, preserving paired quotes.
 if(cleaned.endsWith('"')&&(cleaned.match(/"/g)||[]).length%2===1)cleaned=cleaned.slice(0,-1).trimEnd();
 return cleaned;
}
export function validateOutput(value,stage,facts) {
 if(!value||typeof value!=='object'||Array.isArray(value))throw new ReadingError('INVALID_AI_OUTPUT',502);
 const nature=passage(value.nature);
 if(stage==='nature'){const result={nature};assertGrounded(result,facts);return result;}
 if(!value.season||!value.opening||!value.alignment||!Array.isArray(value.months)||value.months.length!==3)throw new ReadingError('INVALID_AI_OUTPUT',502);
 const months=value.months.map((row,i)=>{
  const expected=facts.horizon.months[i];
  if(row.year!==expected.year||row.month!==expected.month)throw new ReadingError('INVALID_AI_OUTPUT',502);
  return {year:row.year,month:row.month,title:passage(row.title,160,2),description:passage(row.description),action:passage(row.action,1000)};
 });
 for(const field of ['title','description','action']) {
  const normalize=s=>s.toLowerCase().replace(/[\s\p{P}]+/gu,'');
  if(new Set(months.map(row=>normalize(row[field]))).size!==3)throw new ReadingError('INVALID_AI_OUTPUT',502);
 }
 if(!facts.horizon.futureMonths.some(row=>row.year===value.opening.year&&row.month===value.opening.month))throw new ReadingError('INVALID_AI_OUTPUT',502);
 const result={nature,season:{title:passage(value.season.title,160,2),description:passage(value.season.description)},opening:{year:value.opening.year,month:value.opening.month,description:passage(value.opening.description)},months,alignment:{action:passage(value.alignment.action,1000),watch:passage(value.alignment.watch,1000)}};
 assertGrounded(result,facts);return result;
}

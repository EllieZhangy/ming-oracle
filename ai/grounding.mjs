import {ReadingError} from './facts.mjs';

const elements=['wood','fire','earth','metal','water'];
const names='(Wood|Fire|Earth|Metal|Water)';
const subject='(?:\\s+(?:Day\\s+Master|day-master|energy|nature))?';
const modifiers='(?:(?:your|the|gentle|nurturing|steady|quiet|soft|clear|strong|supportive)\\s+){0,3}';
const generates=(from,to)=>(elements.indexOf(from.toLowerCase())+1)%5===elements.indexOf(to.toLowerCase());
const controls=(from,to)=>(elements.indexOf(from.toLowerCase())+2)%5===elements.indexOf(to.toLowerCase());
function unsupported(){throw new ReadingError('UNSUPPORTED_CHART_CLAIM',502);}

// A narrow factual guard, not a claim that all creative prose can be verified.
// Technical hidden-stem locations are kept in server facts, not asserted in free prose.
export function assertGrounded(report,facts){
 const nature=report.nature, all=[nature,report.season?.title,report.season?.description,report.opening?.description,...(report.months||[]).flatMap(row=>[row.title,row.description,row.action]),report.alignment?.action,report.alignment?.watch].filter(value=>typeof value==='string');
 const technicalBranch='\\b(?:year|month|day|hour)(?:\\s+and\\s+(?:year|month|day|hour))?\\s+(?:branches?|pillars?)\\b';
 const hidden=new RegExp('\\bhidden\\s+(?:stems?|companions?)\\b|\\bhidden\\b[^.!?\\n]{0,140}'+technicalBranch+'|'+technicalBranch+'[^.!?\\n]{0,80}\\bhidden\\b|藏干|[年月日时][柱支].{0,12}[藏含].{0,12}[金木水火土]','iu');
 for(const value of all){
  if(hidden.test(value))unsupported();
  // Only direct clauses: don't absorb negations or cross into another subject.
  const active=new RegExp(names+subject+"\\s+(?:(?:does|can|may|will)\\s+)?(?:(?:gently|quietly|directly|naturally)\\s+)?(nourish(?:es|ing)?|generat(?:e|es|ing)|feed(?:s|ing)?|support(?:s|ing)?|control(?:s|ling)?|restrain(?:s|ing)?)\\s+"+modifiers+names,'gi');
  for(const match of value.matchAll(active)){
   const controlled=/^(control|restrain)/i.test(match[2]);
   if(!(controlled?controls(match[1],match[3]):generates(match[1],match[3])))unsupported();
  }
  const passivePredicate='(?:(?:(?:is|feels|seems|remains)\\s+)?(?:(?:gently|quietly|deeply)\\s+)?(?:nourished|supported|generated|fed)\\s+(?:by|from)|(?:receives|draws)\\s+nourishment\\s+from|flows(?:\\s+(?:gently|quietly))?\\s+beneath\\s+(?:the\\s+)?nourishment\\s+of)';
  const passive=new RegExp(names+subject+'\\s+'+passivePredicate+'\\s+'+modifiers+names,'gi');
  for(const match of value.matchAll(passive))if(!generates(match[2],match[1]))unsupported();
 }
 if(typeof nature==='string'){
  const master=new RegExp('(?:\\b(yin|yang)\\s+)?\\b'+names+'\\s+(?:Day\\s+Master|day-master)\\b','gi');
  const identity=new RegExp('\\byour\\s+(?:(yin|yang)\\s+)?'+names+'\\s+(?:nature|chart)\\b','gi');
  for(const match of [...nature.matchAll(master),...nature.matchAll(identity)]){
   if(match[2].toLowerCase()!==facts.chart.dayMaster.element.toLowerCase())unsupported();
   if(match[1]&&match[1].toLowerCase()!==facts.chart.dayMaster.polarity)unsupported();
  }
  const birthMonth=new RegExp(names+'\\s+(?:(?:tone|element|energy|stem)\\s+)?of\\s+your\\s+birth\\s+month\\b','gi');
  const month=facts.chart.pillars.find(pillar=>pillar.position==='Month');
  for(const match of nature.matchAll(birthMonth))if(match[1].toLowerCase()!==month.stemElement.toLowerCase())unsupported();
 }
 if(!facts.chart.hasTime&&all.some(value=>/\bhour\s+(?:pillar|stem|branch)\b|时柱|时干|时支/iu.test(value)))unsupported();
}

import lunar from '../vendor/lunar.js';
import oracle from '../oracle.js';

globalThis.Solar = lunar.Solar;
const names = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
const stemIndex = {甲:0,乙:0,丙:1,丁:1,戊:2,己:2,庚:3,辛:3,壬:4,癸:4};
const branchIndex = {寅:0,卯:0,巳:1,午:1,辰:2,戌:2,丑:2,未:2,申:3,酉:3,亥:4,子:4};
const yin = new Set(['乙','丁','己','辛','癸']);
const gods = {比肩:'Peer',劫财:'Companion / shared resources',食神:'Nourishing expression',伤官:'Independent expression',正财:'Steady stewardship',偏财:'Opportunistic stewardship',正官:'Order / responsibility',七杀:'Pressure / decisive responsibility',偏官:'Pressure / decisive responsibility',正印:'Support / learning',偏印:'Intuitive support / learning',日主:'Day Master'};

export class ReadingError extends Error {
 constructor(code, status=400) { super(code); this.code=code; this.status=status; }
}
export function parseInput(value, now=new Date()) {
 if(!value || typeof value!=='object' || Array.isArray(value))throw new ReadingError('INVALID_INPUT');
 const {stage, birth, question, topic, language}=value;
 if(!['nature','season'].includes(stage)||!['en','zh'].includes(language))throw new ReadingError('INVALID_INPUT');
 if(!birth||typeof birth!=='object'||Array.isArray(birth))throw new ReadingError('INVALID_INPUT');
 if(typeof birth.date!=='string'||typeof question!=='string'||!question.trim()||question.length>500)throw new ReadingError('INVALID_INPUT');
 if(birth.time!==undefined&&typeof birth.time!=='string')throw new ReadingError('INVALID_INPUT');
 if(birth.place!==undefined&&(typeof birth.place!=='string'||birth.place.length>100))throw new ReadingError('INVALID_INPUT');
 if(stage==='season'&&!['health','love','family','career','study','wealth'].includes(topic))throw new ReadingError('INVALID_INPUT');
 try { oracle.calculate(birth.date,birth.time||''); }catch { throw new ReadingError('INVALID_BIRTH'); }
 if(birth.date>now.toISOString().slice(0,10))throw new ReadingError('INVALID_BIRTH');
 return {stage,birth:{date:birth.date,time:birth.time||'',place:(birth.place||'').trim()},question:question.trim(),topic:stage==='season'?topic:null,language};
}
function chartAt(date, time='12:00') {
 const [y,m,d]=date.split('-').map(Number), [hh,mm]=time.split(':').map(Number);
 const chart=lunar.Solar.fromYmdHms(y,m,d,hh,mm,0).getLunar().getEightChar();
 chart.setSect(2);return chart;
}
function god(value) { return {traditional:value,meaning:gods[value]||value}; }
export function calculateFacts(input, now=new Date()) {
 const chart=chartAt(input.birth.date,input.birth.time||'12:00');
 const positions=input.birth.time?['Year','Month','Day','Time']:['Year','Month','Day'];
 const pillars=positions.map(key=>({
  position:key==='Time'?'Hour':key,
  ganZhi:chart[`get${key}`](),stem:chart[`get${key}Gan`](),branch:chart[`get${key}Zhi`](),
  stemElement:names[stemIndex[chart[`get${key}Gan`]()]],branchElement:names[branchIndex[chart[`get${key}Zhi`]()]],
  stemTenGod:god(chart[`get${key}ShiShenGan`]()),
  hiddenStems:chart[`get${key}HideGan`]().map((stem,i)=>({stem,element:names[stemIndex[stem]],tenGod:god(chart[`get${key}ShiShenZhi`]()[i])}))
 }));
 const visibleElementCounts=Object.fromEntries(names.map(n=>[n,pillars.reduce((sum,p)=>sum+(p.stemElement===n)+(p.branchElement===n),0)]));
 const day=stemIndex[chart.getDayGan()];
 const elementalRelationships={
  nourishedBy:names[(day+4)%5],generates:names[(day+1)%5],
  controlledBy:names[(day+3)%5],controls:names[(day+2)%5],peer:names[day]
 };
 const dayPolarity=yin.has(chart.getDayGan())?'yin':'yang';
 const chartSummary=[
  `Day Master: ${chart.getDayGan()}, ${dayPolarity} ${names[day]}.`,
  ...pillars.map(p=>`${p.position} pillar ${p.ganZhi}: stem ${p.stem} (${yin.has(p.stem)?'yin':'yang'} ${p.stemElement}); branch ${p.branch} (${p.branchElement}); hidden stems ${p.hiddenStems.map(s=>`${s.stem} (${s.element})`).join(', ')}.`)
 ].join(' ');
 const monthRow=(year,month)=>{
  const cal=chartAt(`${year}-${String(month).padStart(2,'0')}-15`);
  const stem=cal.getMonthGan(), element=stemIndex[stem];
  return {year,month,label:new Intl.DateTimeFormat(input.language==='zh'?'zh-CN':'en-US',{year:'numeric',month:'long',timeZone:'UTC'}).format(new Date(Date.UTC(year,month-1,15))),stem,branch:cal.getMonthZhi(),stemElement:names[element],branchElement:names[branchIndex[cal.getMonthZhi()]],polarity:yin.has(stem)?'yin':'yang',relation:oracle.relation(day,element),stemTenGod:god(lunar.LunarUtil.SHI_SHEN[chart.getDayGan()+stem])};
 };
 const months=Array.from({length:19},(_,i)=>{const d=new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth()+i,15));return monthRow(d.getUTCFullYear(),d.getUTCMonth()+1);});
 const current=chartAt(now.toISOString().slice(0,10));
 return {
  chart:{dayMaster:{stem:chart.getDayGan(),element:names[day],polarity:dayPolarity},elementalRelationships,chartSummary,pillars,visibleElementCounts,hasTime:!!input.birth.time,
   conventions:'lunar-javascript 1.7.7; sect 2 midnight day boundary; entered civil clock; unknown time uses noon for available pillars and omits all Hour data.',
   limitations:['Birth city is context only; timezone, DST, local solar-term conversion and apparent solar time are not corrected.','Visible element counts are unweighted labels; hidden stems are not included in these counts. Counts do not establish strength, deficiency or favorable elements.','No gendered fate rules, luck-cycle calculation, partner chart, Western natal chart, or full strength/favorability assessment.']},
  horizon:{asOf:now.toISOString().slice(0,10),currentYearStem:current.getYearGan(),currentYearBranch:current.getYearZhi(),months:months.slice(0,3),futureMonths:months.slice(1),conventions:'Civil month labels anchored on the 15th at noon, not solar-term month boundaries. Report month is based on server UTC date.'}
 };
}

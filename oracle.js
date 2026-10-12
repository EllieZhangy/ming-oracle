/* Original symbolic interpretation templates; see README for calculation scope. */
(function(root){
 const stemElements={'甲':0,'乙':0,'丙':1,'丁':1,'戊':2,'己':2,'庚':3,'辛':3,'壬':4,'癸':4};
 function calculate(date,time){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(date))throw new Error('Invalid date');
  const [y,m,d]=date.split('-').map(Number);
  if(y<1900||y>2100||m<1||m>12||d<1||d>new Date(y,m,0).getDate())throw new Error('Unsupported date');
  if(time&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(time))throw new Error('Invalid time');
  const [hh,mm]=time?time.split(':').map(Number):[12,0];
  const chart=root.Solar.fromYmdHms(y,m,d,hh,mm,0).getLunar().getEightChar();chart.setSect(2);
  return {index:stemElements[chart.getDayGan()],dayStem:chart.getDayGan(),hasTime:!!time,pillars:[chart.getYear(),chart.getMonth(),chart.getDay(),time?chart.getTime():'—']};
 }
 const personalities=[
 {en:'Your Day Master carries the Wood archetype: the quiet insistence of a seed finding light. Growth, imagination and a sense of direction may resonate with you. When your roots reach in too many directions, choosing one branch to nourish can be its own kind of abundance.',zh:'你的日主带着木的意象，像一粒向光而生的种子。生长、想象与方向感，或许能与你产生共鸣。若枝叶伸向太多方向，先滋养其中一枝，也是一种丰盛。'},
 {en:'Your Day Master carries the Fire archetype: warmth that invites the world closer. Expression, enthusiasm and connection may feel familiar. Your light need not fill every room; a flame kept gently can last longer than one asked to prove itself.',zh:'你的日主带着火的意象，像邀请世界靠近的一束暖光。表达、热情与联结，或许是你熟悉的语言。你的光不必照亮每个房间，被温柔守护的火，更能长久。'},
 {en:'Your Day Master carries the Earth archetype: a place where things can take root. Care, steadiness and the ability to hold complexity may resonate. Remember that being a safe place for others does not require carrying every weight they bring.',zh:'你的日主带着土的意象，像万物可以扎根的一方土地。照料、稳定与容纳复杂的能力，或许与你相契。成为他人的安稳之处，并不意味着承接所有重量。'},
 {en:'Your Day Master carries the Metal archetype: a clear edge beneath a soft surface. Discernment, integrity and thoughtful boundaries may resonate. There is room for your standards to protect what matters without closing the door to surprise.',zh:'你的日主带着金的意象，柔和的表面下藏着清晰的锋芒。辨别、原则与边界，或许与你相契。让标准守护重要之物，也为意外的可能留一道门。'},
 {en:'Your Day Master carries the Water archetype: depth that does not announce itself. Sensitivity, listening and adaptability may resonate. You can honor your ability to sense many currents while still choosing the shore you want to move toward.',zh:'你的日主带着水的意象，深处不必声张。敏感、倾听与适应，或许与你产生共鸣。你可以感受不同的水流，也可以选择自己想靠近的岸。'}
 ];

 const elements=[{symbol:'木',en:'Wood',zh:'木'},{symbol:'火',en:'Fire',zh:'火'},{symbol:'土',en:'Earth',zh:'土'},{symbol:'金',en:'Metal',zh:'金'},{symbol:'水',en:'Water',zh:'水'}];
 const relations={
  support:{en:'A nourishing current',zh:'滋养渐来'},
  peer:{en:'A steady shared current',zh:'同频渐稳'},
  expression:{en:'A door through expression',zh:'表达开门'},
  structure:{en:'A season of careful tending',zh:'宜守宜整'},
  stewardship:{en:'An opening that asks for care',zh:'机会需承接'}
 };
 function relation(day,other){
  if(!Number.isInteger(day)||!Number.isInteger(other)||day<0||day>4||other<0||other>4)throw new Error('Invalid element');
  if(day===other)return 'peer';
  if((other+1)%5===day)return 'support';
  if((day+1)%5===other)return 'expression';
  if((other+2)%5===day)return 'structure';
  return 'stewardship';
 }
 // The middle of each civil month is a calendar anchor, not a full flow-month prediction.
 function rhythm(start,day){
  if(!(start instanceof Date)||Number.isNaN(start.getTime()))throw new Error('Invalid start date');
  return Array.from({length:3},(_,i)=>{
   const date=new Date(start.getFullYear(),start.getMonth()+i,15,12);
   const chart=root.Solar.fromYmdHms(date.getFullYear(),date.getMonth()+1,15,12,0,0).getLunar().getEightChar();
   const stem=chart.getMonthGan(); const element=stemElements[stem];
   return {year:date.getFullYear(),month:date.getMonth()+1,stem,element,relation:relation(day,element)};
  });
 }
 function monthLabel(item,language){return new Intl.DateTimeFormat(language==='zh'?'zh-CN':'en-US',{year:'numeric',month:'long'}).format(new Date(item.year,item.month-1,1));}
 function opening(items){return items.findIndex((x,i)=>i>0&&['support','peer','expression'].includes(x.relation));}
 root.MingOracle={calculate,personalities,elements,relations,relation,rhythm,monthLabel,opening};
 if(typeof module!=='undefined')module.exports=root.MingOracle;
})(typeof window!=='undefined'?window:globalThis);

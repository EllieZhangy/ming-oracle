const assert=require('node:assert/strict');
globalThis.Solar=require('../vendor/lunar.js').Solar;
const oracle=require('../oracle.js');
const topics=require('../topics.js');
const start=new Date(2026,9,12,22,45);
const keys=['health','love','family','career','study','wealth'];

// The screenshot's two Earth months must no longer repeat a title or mood.
for(let day=0;day<5;day++){
 const months=oracle.rhythm(start,day);
 assert.deepEqual(months.slice(0,2).map(x=>x.stem),['戊','己']);
 assert.equal(months[0].relation,months[1].relation);
 assert.deepEqual(months.slice(0,2).map(x=>x.polarity),['yang','yin']);
 for(const topic of keys)for(const lang of ['en','zh']){
  const first=oracle.monthReading(topic,months[0],lang);
  const second=oracle.monthReading(topic,months[1],lang);
  assert.notEqual(first.title,second.title,`${topic}/${day}/${lang} title repeats`);
  assert.notEqual(first.mood,second.mood,`${topic}/${day}/${lang} mood repeats`);
  assert.notEqual(first.action,second.action,`${topic}/${day}/${lang} action repeats`);
 }
}

// Every topic/relation has two complete bilingual voices.
for(const key of keys)for(const relation of Object.keys(oracle.relations))for(const field of ['title','quietTitle','mood','quietMood','action','quietAction','watch'])for(const lang of ['en','zh']){
 assert.equal(typeof topics[key].relations[relation][field][lang],'string');
 assert.ok(topics[key].relations[relation][field][lang].trim().length>0);
}
for(const relation of Object.keys(oracle.relations))for(const lang of ['en','zh']){
 assert.equal(new Set(keys.map(key=>topics[key].relations[relation].title[lang])).size,6);
 assert.equal(new Set(keys.map(key=>topics[key].relations[relation].quietTitle[lang])).size,6);
}

// A dated later window is found for every Day Master, including across year-end.
for(let day=0;day<5;day++){
 const months=oracle.rhythm(start,day,18);
 const next=oracle.nextOpening(start,day);
 assert.equal(months.length,18);
 assert.ok(next&&next.offset>=1&&next.offset<18);
 assert.ok(['support','peer','expression'].includes(next.relation));
 assert.equal(next.offset,oracle.opening(months));
 assert.equal(next.horizon,next.offset<=2?'near':next.offset<=5?'quarter':'long');
 assert.equal(oracle.monthLabel(next,'en'),oracle.monthLabel(months[next.offset],'en'));
}
// Wood must look beyond the visible Oct–Dec cards to February 2027.
const woodWindow=oracle.nextOpening(start,0);
assert.deepEqual([woodWindow.year,woodWindow.month,woodWindow.offset,woodWindow.horizon],[2027,2,4,'quarter']);
const rollover=oracle.rhythm(new Date(2026,11,31,23,59),0,18);
assert.deepEqual(rollover.slice(0,3).map(x=>[x.year,x.month]),[[2026,12],[2027,1],[2027,2]]);
assert.deepEqual(rollover.at(-1).year,2028);
assert.deepEqual(rollover.at(-1).month,5);
assert.throws(()=>oracle.rhythm(start,0,0));
assert.throws(()=>oracle.rhythm(start,0,19));
assert.throws(()=>oracle.rhythm(start,0,2.5));
assert.throws(()=>oracle.rhythm(new Date('invalid'),0));
assert.throws(()=>oracle.rhythm(start,-1));
assert.throws(()=>oracle.monthReading('unknown',rollover[0]));
assert.throws(()=>oracle.monthReading('love',{stem:'?',relation:'support'}));
assert.throws(()=>oracle.monthReading('love',{stem:'甲',relation:'invalid'}));
assert.throws(()=>oracle.monthReading('love',rollover[0],'fr'));
// CommonJS can load its local topics when the page global is absent.
delete globalThis.MingTopics;
assert.ok(oracle.monthReading('love',rollover[0],'en').title);
assert.equal(oracle.opening([{relation:'support'},{relation:'structure'},{relation:'stewardship'}]),-1);
assert.equal(oracle.opening([{relation:'structure'},{relation:'expression'}]),1);
assert.deepEqual(oracle.calculate('1986-05-29','12:00').pillars.slice(0,3),['丙寅','癸巳','癸酉']);
console.log('Passed: six topics × five relations × two bilingual monthly voices, screenshot repetition, dated opening search, February 2027 horizon, 18-month rollover, input validation and CommonJS loading.');

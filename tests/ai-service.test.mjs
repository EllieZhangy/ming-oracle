import test from 'node:test';
import assert from 'node:assert/strict';
import {parseInput,calculateFacts} from '../ai/facts.mjs';
import {generateReading} from '../ai/service.mjs';
import {validateOutput} from '../ai/schema.mjs';
import {createHandler} from '../ai/http.mjs';
import lunar from '../vendor/lunar.js';
import oracle from '../oracle.js';

const now=new Date('2026-10-13T12:00:00Z');
const base={stage:'season',birth:{date:'1995-05-12',time:'09:00',place:'London'},question:'I miss someone but am afraid to reach out.',topic:'love',language:'en'};
const facts=calculateFacts(parseInput(base,now),now);
const report=()=>({nature:'Your yin Water Day Master meets the Fire of your birth month. The wish to reach out may feel like bringing a private current into the light.',season:{title:'A message held at the threshold',description:'The Earth month asks for a measured boundary around the wish to reconnect; a gentle approach leaves space for the other person to choose.'},opening:{year:2026,month:12,description:'The Metal support lens in December can be a place to prepare a clear, quiet message without treating a reply as something you can command.'},months:[{year:2026,month:10,title:'A quiet place for longing',description:'Let your wish to reach out become one clear sentence before you send it.',action:'Write a short greeting and keep it overnight before deciding whether to send it.'},{year:2026,month:11,title:'A boundary before the bridge',description:'Name what a respectful exchange would mean, including room for silence.',action:'Choose one contact boundary: a single message without follow-up pressure.'},{year:2026,month:12,title:'A gentler current of contact',description:'Metal brings a support image; allow your words to be modest and your expectations spacious.',action:'If contact remains welcome, offer a simple hello that leaves them free to respond.'}],alignment:{action:'Keep your message brief enough to hold your intention without asking another person to resolve all of your uncertainty.',watch:'A reading cannot reveal what they feel; let their actual response and your own boundaries guide the next step.'}});
const provider=output=>new Response(JSON.stringify({status:'completed',output:[{type:'message',content:[{type:'output_text',text:JSON.stringify(output)}]}]}),{status:200});
const env={OPENAI_API_KEY:'unit-test-only-not-a-real-key',OPENAI_MODEL:'test-model'};
const req=(body=base,extra={})=>new Request('https://oracle.vercel.app/api/reading',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://elliezhangy.github.io',...extra},body:JSON.stringify(body)});

test('rejects impossible/future dates, wrong stages, empty thoughts and invalid topics',()=>{
 for(const value of [{...base,birth:{date:'2026-02-30'}},{...base,birth:{date:'2027-01-01'}},{...base,stage:'tarot'},{...base,topic:'investment'},{...base,question:' '},{...base,question:'x'.repeat(501)}])assert.throws(()=>parseInput(value,now));
});
test('trusted server facts match frontend chart and omit every hour fact when unknown',()=>{
 globalThis.Solar=lunar.Solar;
 assert.deepEqual(facts.chart.pillars.map(p=>p.ganZhi),oracle.calculate(base.birth.date,base.birth.time).pillars);
 assert.deepEqual(facts.chart.dayMaster,{stem:'癸',element:'Water',polarity:'yin'});
 assert.deepEqual(facts.chart.pillars[1].hiddenStems.map(s=>s.stem),['丙','庚','戊']);
 assert.equal(facts.chart.visibleElementCounts.Earth,0); // Earth still appears in hidden stems.
 const unknown=calculateFacts(parseInput({...base,birth:{...base.birth,time:''}},now),now);
 assert.equal(unknown.chart.hasTime,false);assert.equal(unknown.chart.pillars.length,3);
 assert.ok(unknown.chart.pillars.every(p=>p.position!=='Hour'));
});
test('calendar horizon uses UTC month, rolls years, and supplies next18 months',()=>{
 const rollover=calculateFacts(parseInput(base,now),new Date('2026-12-31T23:55:00Z'));
 assert.deepEqual(rollover.horizon.months.map(x=>[x.year,x.month]),[[2026,12],[2027,1],[2027,2]]);
 assert.equal(rollover.horizon.futureMonths.length,18);assert.equal(rollover.horizon.futureMonths[0].month,1);
 assert.ok(rollover.horizon.months.every(x=>x.stemTenGod.traditional&&x.stemTenGod.meaning));
});
test('provider call contains actual thought, computed facts, curated skill rules, strict schema; key stays only in header',async()=>{
 let captured;
 const result=await generateReading(base,{env,now,fetchImpl:async(url,options)=>{captured={url,options,body:JSON.parse(options.body)};return provider(report());}});
 assert.equal(captured.url,'https://api.openai.com/v1/responses');
 assert.equal(captured.body.store,false);assert.equal(captured.body.text.format.strict,true);
 const input=JSON.parse(captured.body.input[0].content);
 assert.equal(input.visitorContext.phrase,base.question);assert.equal(input.chosenArea,'love');
 assert.equal(input.computedFacts.chart.dayMaster.stem,'癸');
 assert.ok(captured.body.instructions.includes('ten-god'));assert.ok(captured.body.instructions.includes('jinchenma94/bazi-skill'));
 assert.ok(!captured.options.body.includes(env.OPENAI_API_KEY));assert.ok(!JSON.stringify(result).includes(env.OPENAI_API_KEY));
 assert.equal(result.meta.engine,'ai');assert.equal(result.meta.sources.length,1);assert.equal(result.meta.sources[0].usage,'adapted');
 assert.equal(result.meta.monthAnchors[0].stem,'戊');assert.equal(result.opening.month,12);
});
test('different dilemmas reach the model independently, nature request excludes horizon',async()=>{
 const contexts=[];
 for(const question of [base.question,'I want to leave my job but worry about rent.'])await generateReading({...base,question,stage:'nature',topic:null},{env,now,fetchImpl:async(_,options)=>{contexts.push(JSON.parse(JSON.parse(options.body).input[0].content));return provider({nature:'Your yin Water chart invites you to listen to the tension you brought today.'});}});
 assert.notEqual(contexts[0].visitorContext.phrase,contexts[1].visitorContext.phrase);
 assert.equal(contexts[0].computedFacts.horizon,undefined);
});
test('missing key does not call provider and does not fall back to templates',async()=>{
 let calls=0;await assert.rejects(generateReading(base,{env:{},now,fetchImpl:()=>{calls++;}}),{code:'AI_NOT_CONFIGURED'});assert.equal(calls,0);
});
test('rejects incomplete, refused, malformed and duplicated reports',async()=>{
 for(const output of [{status:'incomplete',output:[]},{status:'completed',output:[{content:[{type:'refusal',refusal:'Declined'}]}]},{status:'completed',output:[{content:[{type:'output_text',text:'not json'}]}]}])await assert.rejects(generateReading(base,{env,now,fetchImpl:async()=>new Response(JSON.stringify(output))}));
 const bad=report();bad.months[1].title=bad.months[0].title.toUpperCase()+'.';
 await assert.rejects(generateReading(base,{env,now,fetchImpl:async()=>provider(bad)}),{code:'INVALID_AI_OUTPUT'});
 const wrong=report();wrong.months[0].month=9;assert.throws(()=>validateOutput(wrong,'season',facts));
 const outside=report();outside.opening.year=2030;assert.throws(()=>validateOutput(outside,'season',facts));
});
test('Chinese short titles remain valid',()=>{
 const chinese=report();chinese.season.title='潮声渐近';chinese.months.forEach((r,i)=>{r.title=['静候回声','守住边界','轻启心门'][i];});
 assert.equal(validateOutput(chinese,'season',facts).season.title,'潮声渐近');
});
test('provider errors are bounded, redacted, and cancellation is handled',async()=>{
 await assert.rejects(generateReading(base,{env,now,fetchImpl:async()=>new Response('provider-secret-details',{status:429})}),{code:'AI_BUSY'});
 const controller=new AbortController();controller.abort();await assert.rejects(generateReading(base,{env,now,signal:controller.signal}),{code:'REQUEST_CANCELLED'});
});
test('CORS preflight is empty204, rejects unrelated origin, and disallows GET',async()=>{
 const handler=createHandler({generate:async()=>report(),clock:()=>now.getTime()});
 const preflight=await handler(new Request('https://oracle.vercel.app/api/reading',{method:'OPTIONS',headers:{Origin:'https://elliezhangy.github.io'}}));
 assert.equal(preflight.status,204);assert.equal(await preflight.text(),'');assert.equal(preflight.headers.get('Access-Control-Allow-Origin'),'https://elliezhangy.github.io');
 assert.equal((await handler(req(base,{Origin:'https://unrelated.example'}))).status,403);
 assert.equal((await handler(new Request('https://oracle.vercel.app/api/reading'))).status,405);
});
test('rejects streamed oversized bodies before invoking provider',async()=>{
 let calls=0;const handler=createHandler({generate:async()=>{calls++;return report();}});
 const response=await handler(req({...base,question:'x'.repeat(9000)}));assert.equal(response.status,413);assert.equal(calls,0);
});
test('rate limiter uses Vercel trusted IP; spoofed CF header cannot bypass',async()=>{
 const handler=createHandler({generate:async()=>report(),clock:()=>now.getTime()});
 for(let i=0;i<8;i++)assert.equal((await handler(req(base,{'x-vercel-forwarded-for':'203.0.113.1','cf-connecting-ip':String(i)}),{VERCEL:'1'})).status,200);
 const blocked=await handler(req(base,{'x-vercel-forwarded-for':'203.0.113.1','cf-connecting-ip':'changed'}),{VERCEL:'1'});assert.equal(blocked.status,429);assert.equal(blocked.headers.get('Retry-After'),'60');
 assert.equal((await handler(req(base,{'x-vercel-forwarded-for':'203.0.113.2'}),{VERCEL:'1'})).status,200);
});

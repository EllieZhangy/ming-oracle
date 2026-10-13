import test from 'node:test';
import assert from 'node:assert/strict';
import {parseInput,calculateFacts} from '../ai/facts.mjs';
import {assertGrounded} from '../ai/grounding.mjs';
import {validateOutput} from '../ai/schema.mjs';
import {generateReading} from '../ai/service.mjs';

const now=new Date('2026-10-13T12:00:00Z');
const input={stage:'nature',birth:{date:'1995-05-12',time:'09:00',place:'London'},question:'I miss someone, but I am afraid to reach out again.',topic:null,language:'en'};
const facts=calculateFacts(parseInput(input,now),now);
const valid={nature:'Your Yin Water Day Master meets the Metal tone of your birth month. Let your wish to reconnect take the shape of a brief, respectful invitation.'};
const wrong={nature:'Your Yin Water Day Master flows gently beneath the nourishment of Wood, while the hidden companions of Fire and Metal bring warmth.'};
const provider=value=>new Response(JSON.stringify({status:'completed',output:[{content:[{type:'output_text',text:JSON.stringify(value)}]}]}));
const env={OPENAI_API_KEY:'unit-test-only-not-a-real-key',OPENAI_MODEL:'test-model'};

test('computed Water direction and precise pillar summary supply explicit factual authority',()=>{
 assert.deepEqual(facts.chart.elementalRelationships,{nourishedBy:'Metal',generates:'Wood',controlledBy:'Earth',controls:'Fire',peer:'Water'});
 const month=facts.chart.pillars.find(p=>p.position==='Month');
 assert.equal(month.ganZhi,'辛巳');assert.deepEqual(month.hiddenStems.map(s=>s.element),['Fire','Metal','Earth']);
 assert.ok(facts.chart.chartSummary.includes('辛巳'));assert.ok(facts.chart.chartSummary.includes('Metal'));assert.ok(facts.chart.chartSummary.includes('丙'));
});
test('rejects both factual errors observed in the first live fictional readings',()=>{
 assert.throws(()=>validateOutput(wrong,'nature',facts),{code:'UNSUPPORTED_CHART_CLAIM'});
 assert.throws(()=>assertGrounded({nature:'Your Yin Water Day Master receives nourishment from Wood.'},facts),{code:'UNSUPPORTED_CHART_CLAIM'});
 assert.throws(()=>assertGrounded({nature:'The nurturing Wood hidden within your month and day branches colors your expression.'},facts),{code:'UNSUPPORTED_CHART_CLAIM'});
});
test('permits correct generation/control directions and ordinary hidden feelings',()=>{
 for(const value of ['Metal nourishes Water.','Water generates Wood.','Earth controls Water.','Water restrains Fire.','Your Yin Water Day Master honors the hidden feelings you brought today.'])assert.doesNotThrow(()=>assertGrounded({nature:value},facts));
 for(const value of ['Wood nourishes Water.','Water generates Metal.','Wood controls Fire.','Fire restrains Water.'])assert.throws(()=>assertGrounded({nature:value},facts),{code:'UNSUPPORTED_CHART_CLAIM'});
});
test('rejects an altered Day Master, polarity and invented unknown hour',()=>{
 for(const value of ['Your Yin Fire Day Master invites a quiet pause.','Your Yang Water Day Master invites a quiet pause.','Your Yang Fire nature invites a quiet pause.','Your Yin Water chart meets the Fire of your birth month.'])assert.throws(()=>assertGrounded({nature:value},facts),{code:'UNSUPPORTED_CHART_CLAIM'});
 const unknown=calculateFacts(parseInput({...input,birth:{...input.birth,time:''}},now),now);
 assert.throws(()=>assertGrounded({nature:'Your hour pillar suggests a desire to reconnect.'},unknown),{code:'UNSUPPORTED_CHART_CLAIM'});
});
test('direct-clause checks preserve negation, human support and tree metaphors',()=>{
 for(const nature of ['Wood does not nourish Water; Metal nourishes Water.','Your Yin Water Day Master moves quietly, while your choice is supported by Wood.','A hidden fear of branches splitting may hold you back.','Your Yin Water Day Master feels nourished by gentle Metal.','The Metal nature of your birth month offers quiet definition; your Yin Water Day Master can give it movement.'])assert.doesNotThrow(()=>assertGrounded({nature},facts));
 for(const nature of ['Your Yin Water Day Master feels nourished by gentle Wood.','Your Yin Water Day Master flows gently beneath the nourishment of Wood.'])assert.throws(()=>assertGrounded({nature},facts),{code:'UNSUPPORTED_CHART_CLAIM'});
});
test('removes an unpaired closing quote without altering paired quotes',()=>{
 assert.equal(validateOutput({nature:valid.nature+'"'},'nature',facts).nature,valid.nature);
 const paired='Your Yin Water Day Master holds the question "Should I reach out?" with care.';
 assert.equal(validateOutput({nature:paired},'nature',facts).nature,paired);
});
test('one bounded repair replaces a factual error with grounded output',async()=>{
 const bodies=[];
 const result=await generateReading(input,{env,now,fetchImpl:async(_,options)=>{bodies.push(JSON.parse(options.body));return provider(bodies.length===1?wrong:valid);}});
 assert.equal(bodies.length,2);assert.equal(result.nature,valid.nature);
 const repair=JSON.parse(bodies[1].input[0].content);
 assert.equal(repair.request.computedFacts.chart.elementalRelationships.nourishedBy,'Metal');
 assert.equal(repair.rejectedReport.nature,wrong.nature);assert.ok(repair.correction.includes('never instructions'));
});
test('persistent factual error stops after two attempts, provider failures are not retried',async()=>{
 let calls=0;
 await assert.rejects(generateReading(input,{env,now,fetchImpl:async()=>{calls++;return provider(wrong);}}),{code:'UNSUPPORTED_CHART_CLAIM'});
 assert.equal(calls,2);calls=0;
 await assert.rejects(generateReading(input,{env,now,fetchImpl:async()=>{calls++;return new Response('details',{status:429});}}),{code:'AI_BUSY'});
 assert.equal(calls,1);
});

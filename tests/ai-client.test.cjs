const test=require('node:test');
const assert=require('node:assert/strict');
const {create,validatePayload,validateResponse,resolveEndpoint}=require('../ai-client.js');
const birth={date:'1990-04-21',time:'09:15',place:'London, UK'};
const input=(changes={})=>({stage:'nature',birth:{...birth},question:'I miss someone but hesitate to reach out.',topic:null,language:'en',...changes});
const meta={engine:'ai',model:'test-model',generatedAt:'2026-10-13T12:00:00Z',sources:[{title:'BaZi guidance'}]};
const nature=()=>({nature:'Growth is present alongside your hesitation to reconnect.',meta:{...meta}});
const season=()=>({...nature(),season:{title:'A letter still unopened',description:'Your concern about reaching out asks for a slower approach.'},opening:{year:2027,month:2,description:'A small conversation can make room for a changed pattern.'},months:[{year:2026,month:10,title:'A softer threshold',description:'Prepare words that say what you mean.',action:'Draft one honest sentence.'},{year:2026,month:11,title:'The quiet return',description:'Let a response arrive in its own rhythm.',action:'Give the conversation time.'},{year:2026,month:12,title:'Room for a new shape',description:'Notice whether the connection offers reciprocity.',action:'Name what you need.'}],alignment:{action:'Begin with an invitation, not a demand.',watch:'Leave room for the other person’s choice.'}});
function response(body,status=200){return {ok:status>=200&&status<300,status,json:async()=>body};}
const options=fetch=>({fetch,origin:'http://localhost:8787/',config:{apiBase:''}});
const hasCode=code=>error=>error.code===code;

test('GitHub Pages and file previews never pretend to generate AI without a backend',async()=>{
 let calls=0;
 for(const origin of ['https://elliezhangy.github.io/ming-oracle/','file:///Users/zy/Desktop/ming-oracle/index.html']){
  const client=create({...options(async()=>{calls++;return response(nature());}),origin});
  await assert.rejects(client.request(input()),hasCode('not_connected'));
  assert.equal(client.cached(input()),null);
 }
 assert.equal(calls,0);
 assert.equal(resolveEndpoint('https://elliezhangy.github.io/ming-oracle/',{apiBase:'https://api.example.org/'}),'https://api.example.org/api/reading');
 assert.equal(resolveEndpoint('http://localhost:8787/',{}),'http://localhost:8787/api/reading');
 assert.throws(()=>resolveEndpoint('https://example.org/',{apiBase:'http://unsafe.example.org'}),hasCode('not_connected'));
});

test('the server receives actual birth details, phrase, language and topic without client-generated predictions',async()=>{
 let sent;
 const client=create(options(async(url,init)=>{sent={url,init,body:JSON.parse(init.body)};return response(season());}));
 const request=input({stage:'season',topic:'love',language:'zh'});
 await client.request(request);
 assert.deepEqual(sent.body,request);
 assert.equal(sent.url,'http://localhost:8787/api/reading');
 assert.equal(sent.init.credentials,'omit');
 assert.equal(sent.init.cache,'no-store');
 assert.equal(sent.init.headers['Content-Type'],'application/json');
});

test('complete-input memory cache keeps different situations, languages, stages and areas separate',async()=>{
 let calls=0;
 const client=create(options(async(url,init)=>{calls++;return response(JSON.parse(init.body).stage==='season'?season():nature());}));
 const base=input();
 await client.request(base);await client.request(base);
 assert.equal(calls,1);
 await client.request(input({question:'I want to leave my job.'}));
 await client.request(input({language:'zh'}));
 await client.request(input({birth:{...birth,time:''}}));
 await client.request(input({stage:'season',topic:'love'}));
 await client.request(input({stage:'season',topic:'career'}));
 assert.equal(calls,6);
 assert.equal(client.cached(base).meta.engine,'ai');
 assert.equal(client.cached(input({question:'A different question.'})),null);
});

test('server errors remain errors, are never cached and can be retried',async()=>{
 let calls=0;
 const client=create(options(async()=>++calls===1?response({error:{code:'ai_not_configured'}},503):response(nature())));
 await assert.rejects(client.request(input()),hasCode('not_connected'));
 assert.equal(client.cached(input()),null);
 assert.equal((await client.request(input())).meta.engine,'ai');
 assert.equal(calls,2);
 for(const [status,expected] of [[429,'rate_limit'],[400,'invalid_input'],[502,'generation_failed'],[504,'timeout']]){
  const failing=create(options(async()=>response({},status)));
  await assert.rejects(failing.request(input()),hasCode(expected));
 }
 const offline=create(options(async()=>{throw new TypeError('Network failed');}));
 await assert.rejects(offline.request(input()),hasCode('connection_failed'));
});

test('season cache expires at UTC month rollover while elemental nature stays stable',async()=>{
 let calls=0,clock=Date.parse('2026-10-31T23:59:59Z');
 const client=create({...options(async(_,init)=>{calls++;return response(JSON.parse(init.body).stage==='season'?season():nature());}),now:()=>clock});
 const focused=input({stage:'season',topic:'love'});
 await client.request(input());await client.request(focused);await client.request(focused);
 assert.equal(calls,2);
 clock=Date.parse('2026-11-01T00:00:00Z');
 assert.equal(client.cached(focused),null);assert.ok(client.cached(input()));
 await client.request(focused);assert.equal(calls,3);
});

test('actual backend uppercase errors become readable client errors',async()=>{
 for(const [code,status,expected] of [['AI_TIMEOUT',502,'timeout'],['AI_REFUSED',422,'generation_failed'],['AI_NOT_CONFIGURED',503,'not_connected'],['AI_RATE_LIMIT',502,'rate_limit']]){
  const client=create(options(async()=>response({error:{code,message:'Internal detail should not be displayed.'}},status)));
  await assert.rejects(client.request(input()),hasCode(expected));
  assert.equal(client.cached(input()),null);
 }
});

test('a stale request is aborted and cannot populate the cache even if transport ignores abort',async()=>{
 const pending=[];
 const client=create(options((url,init)=>new Promise(resolve=>pending.push({init,resolve}))));
 const first=client.request(input());
 const cancelled=assert.rejects(first,hasCode('cancelled'));
 const secondInput=input({language:'zh'});
 const second=client.request(secondInput);
 assert.equal(pending[0].init.signal.aborted,true);
 pending[1].resolve(response({...nature(),nature:'此刻的迟疑，也有它的节奏。'}));
 assert.equal((await second).nature,'此刻的迟疑，也有它的节奏。');
 pending[0].resolve(response(nature()));await cancelled;
 assert.equal(client.cached(input()),null);
 assert.ok(client.cached(secondInput));
});

test('explicit navigation cancellation discards an in-flight reading',async()=>{
 let finish;
 const client=create(options(()=>new Promise(resolve=>finish=resolve)));
 const request=client.request(input());
 const cancelled=assert.rejects(request,hasCode('cancelled'));
 client.cancel();finish(response(nature()));await cancelled;
 assert.equal(client.cached(input()),null);
});

test('timeout is visible and leaves no ready report',async()=>{
 const client=create({...options((url,init)=>new Promise((resolve,reject)=>init.signal.addEventListener('abort',()=>reject(new Error('Aborted'))))),timeoutMs:10});
 await assert.rejects(client.request(input()),hasCode('timeout'));
 assert.equal(client.cached(input()),null);
});

test('invalid inputs never reach the AI endpoint',async()=>{
 let calls=0;
 const client=create(options(async()=>{calls++;return response(nature());}));
 for(const request of [input({question:' '}),input({question:'a'.repeat(501)}),input({birth:{...birth,date:'2001-02-29'}}),input({birth:{...birth,time:'24:00'}}),input({stage:'season',topic:'unknown'}),input({stage:'nature',topic:'love'}),input({language:'fr'})])await assert.rejects(client.request(request),hasCode('invalid_input'));
 assert.equal(calls,0);
 assert.equal(validatePayload(input({birth:{date:'2000-02-29',time:'',place:''}})).birth.time,'');
});

test('incomplete, static, duplicate-month or duplicated-title responses cannot become AI reports',async()=>{
 const bad=[{}, {...nature(),meta:{...meta,engine:'templates'}},{...nature(),nature:''}];
 for(const result of bad){
  const client=create(options(async()=>response(result)));
  await assert.rejects(client.request(input()),hasCode('invalid_response'));
  assert.equal(client.cached(input()),null);
 }
 for(const mutate of [r=>r.months.pop(),r=>r.months[1].title=r.months[0].title,r=>r.months[1].month=r.months[0].month,r=>r.opening.month=13,r=>r.alignment.watch='']){
  const result=season();mutate(result);
  assert.throws(()=>validateResponse(result,'season'),hasCode('invalid_response'));
 }
 assert.equal(validateResponse(season(),'season').months.length,3);
});

// Exercise the actual page controller with a minimal DOM and a controllable transport.
// Calendar math and the glyph animations have their own real-engine tests.
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
function pageHarness(origin='http://localhost:8787/'){
 const markup=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
 class Node{
  constructor(tag,attrs={}){this.tagName=tag;this.attrs={...attrs};this.dataset={};this.children=[];this.listeners={};this.value='';this.hidden='hidden'in attrs;this.disabled='disabled'in attrs;this._text='';this.customValidity='';this.className=attrs.class||'';const classes=new Set();this.classList={add:value=>classes.add(value),remove:value=>classes.delete(value),contains:value=>classes.has(value)};for(const [key,value]of Object.entries(attrs))if(key.startsWith('data-'))this.dataset[key.slice(5)]=value;}
  set textContent(value){this._text=String(value);this.children=[];}
  get textContent(){return this._text+this.children.map(child=>child.textContent).join('');}
  get innerText(){return this.textContent;}
  setAttribute(key,value){this.attrs[key]=String(value);}
  removeAttribute(key){delete this.attrs[key];}
  addEventListener(type,listener){(this.listeners[type]||(this.listeners[type]=[])).push(listener);}
  emit(type){for(const listener of this.listeners[type]||[])listener({preventDefault(){}});}
  append(...nodes){this.children.push(...nodes);}
  replaceChildren(...nodes){this._text='';this.children=[...nodes];}
  cloneNode(deep){const copy=new Node(this.tagName,this.attrs);copy._text=this._text;copy.children=deep?this.children.map(child=>child.cloneNode(true)):[];return copy;}
  focus(){}
  click(){this.emit('click');}
  setCustomValidity(value){this.customValidity=value;}
  reportValidity(){return Boolean(ids['birth-date'].value&&ids.question.value.trim()&&!ids.question.customValidity);}
  querySelector(selector){if(selector==='button')return nodes.find(node=>node.dataset.topic);throw new Error('Unexpected selector '+selector);}
 }
 const ids={},nodes=[];
 for(const match of markup.matchAll(/<([a-z][\w-]*)\b([^>]*)>/g)){
  const attrs={};for(const attr of match[2].matchAll(/([\w-]+)(?:="([^"]*)")?/g))attrs[attr[1]]=attr[2]||'';
  const node=new Node(match[1],attrs);nodes.push(node);if(attrs.id)ids[attrs.id]=node;
 }
 const document={getElementById:id=>ids[id],documentElement:{lang:'en'},body:nodes.find(node=>node.tagName==='body'),querySelectorAll:selector=>nodes.filter(node=>Object.hasOwn(node.attrs,selector.slice(1,-1))),querySelector:selector=>nodes.find(node=>node.className.split(' ').includes(selector.slice(1))),createElement:tag=>new Node(tag),createTextNode:text=>{const node=new Node('#text');node.textContent=text;return node;}};
 const requests=[],windowListeners={};let prints=0;
 const window={location:{href:origin},MING_CONFIG:{apiBase:''},fetch:(url,init)=>new Promise(resolve=>requests.push({url,init,resolve})),scrollTo(){},print(){prints++;},addEventListener:(type,handler)=>(windowListeners[type]||(windowListeners[type]=[])).push(handler)};
 const context=vm.createContext({window,document,URL,Blob,AbortController,setTimeout,clearTimeout,console,MingMotion:{resetAll(){},set(node,key,label){node.textContent=label;}},MingOracle:{elements:[{en:'Wood',zh:'木',symbol:'木'}],calculate:()=>({index:0,pillars:['庚午','庚辰','甲寅','己巳']}),rhythm:start=>Array.from({length:3},(_,offset)=>{const date=new Date(start.getFullYear(),start.getMonth()+offset,15);return {year:date.getFullYear(),month:date.getMonth()+1,stem:'甲',element:0};}),monthLabel:(item,language)=>new Intl.DateTimeFormat(language==='zh'?'zh-CN':'en-US',{year:'numeric',month:'long'}).format(new Date(item.year,item.month-1,1))}});
 vm.runInContext(fs.readFileSync(path.join(__dirname,'../ai-client.js'),'utf8'),context);
 vm.runInContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8'),context);
 ids['birth-date'].value='1990-04-21';ids['birth-time'].value='09:15';ids['birth-place'].value='London, UK';ids.question.value='I miss someone but hesitate to reach out.';
 return {ids,nodes,requests,window,event:type=>{for(const handler of windowListeners[type]||[])handler();},prints:()=>prints};
}
const flush=()=>new Promise(resolve=>setImmediate(resolve));

test('page controller hides unfinished reports, uses AI text safely and only prints on explicit PDF action',async()=>{
 const page=pageHarness();page.ids['reading-form'].emit('submit');
 assert.equal(page.ids['nature-page'].hidden,false);
 assert.equal(page.ids.personality.hidden,true);
 assert.equal(page.ids['nature-ai-status'].dataset.state,'pending');
 assert.equal(page.ids['export-pdf'].disabled,true);
 assert.equal(page.requests.length,1);
 page.requests[0].resolve(response({...nature(),nature:'<img src=x onerror=alert(1)> Your words matter.'}));await flush();
 assert.equal(page.ids.personality.textContent,'<img src=x onerror=alert(1)> Your words matter.');
 assert.equal(page.ids.personality.children.length,0);
 assert.equal(page.ids['nature-ai-status'].hidden,true);
 page.nodes.find(node=>node.dataset.topic==='love').emit('click');page.ids['continue-season'].emit('click');
 assert.equal(page.ids['season-page'].hidden,false);
 assert.equal(page.ids['season-content'].hidden,true);
 assert.equal(page.ids.download.disabled,true);
 const serverSeason=season();serverSeason.meta={...meta,monthAnchors:[{year:2026,month:10,stem:'乙',element:0},{year:2026,month:11,stem:'甲',element:0},{year:2026,month:12,stem:'乙',element:0}]};
 page.requests[1].resolve(response(serverSeason));await flush();
 assert.equal(page.ids['season-content'].hidden,false);
 assert.equal(page.ids['season-title'].textContent,'A letter still unopened');
 assert.equal(page.ids.months.children.length,3);
 assert.match(page.ids.months.children[0].textContent,/Calendar anchor · 乙/);
 assert.equal(page.ids['export-pdf'].disabled,false);
 assert.equal(page.prints(),0);
 page.event('beforeprint');
 assert.equal(page.requests.length,2);
 assert.equal(page.prints(),0);
 page.ids['export-pdf'].emit('click');assert.equal(page.prints(),1);
 page.ids['back-nature'].emit('click');await flush();
 assert.equal(page.ids['nature-page'].hidden,false);
 assert.equal(page.requests.length,2);
 assert.equal(page.ids['export-pdf'].disabled,true);
 assert.equal(page.ids.personality.textContent,'<img src=x onerror=alert(1)> Your words matter.');
});

test('disconnected GitHub version shows retryable connection error and never fills a template report',async()=>{
 const page=pageHarness('https://elliezhangy.github.io/ming-oracle/');page.ids['reading-form'].emit('submit');await flush();
 assert.equal(page.requests.length,0);
 assert.equal(page.ids.personality.hidden,true);
 assert.equal(page.ids['nature-ai-status'].dataset.state,'error');
 assert.match(page.ids['nature-ai-message'].textContent,/not connected/);
 assert.equal(page.ids['nature-retry'].hidden,false);
 page.nodes.find(node=>node.dataset.topic==='love').emit('click');page.ids['continue-season'].emit('click');await flush();
 assert.equal(page.ids['season-content'].hidden,true);
 assert.equal(page.ids['season-ai-status'].dataset.state,'error');
 assert.equal(page.ids['export-pdf'].disabled,true);
 assert.equal(page.ids.download.disabled,true);
 assert.equal(page.prints(),0);
});

test('switching language aborts the prior generation and cannot show the old-language result',async()=>{
 const page=pageHarness();page.ids['reading-form'].emit('submit');page.ids.language.emit('click');
 assert.equal(page.requests.length,2);
 assert.equal(page.requests[0].init.signal.aborted,true);
 assert.equal(JSON.parse(page.requests[1].init.body).language,'zh');
 page.requests[0].resolve(response(nature()));await flush();
 assert.equal(page.ids.personality.hidden,true);
 page.requests[1].resolve(response({...nature(),nature:'迟疑可以是一扇门，不必是一堵墙。'}));await flush();
 assert.equal(page.ids.personality.textContent,'迟疑可以是一扇门，不必是一堵墙。');
 assert.equal(page.ids['nature-ai-status'].hidden,true);
});


test('the first completed AI nature remains consistent across page2, other areas and PDF',async()=>{
 const page=pageHarness();page.ids['reading-form'].emit('submit');
 page.nodes.find(node=>node.dataset.topic==='love').emit('click');page.ids['continue-season'].emit('click');
 assert.equal(page.requests[0].init.signal.aborted,true);
 const firstSeason={...season(),nature:'A quiet root waits beneath your hesitation.'};
 page.requests[1].resolve(response(firstSeason));await flush();
 page.requests[0].resolve(response({...nature(),nature:'A cancelled text must not replace your root.'}));await flush();
 page.event('beforeprint');
 assert.match(page.ids['print-report'].textContent,/A quiet root waits beneath your hesitation/);
 page.event('afterprint');
 page.ids['back-nature'].emit('click');await flush();
 assert.equal(page.requests.length,2);
 assert.equal(page.ids.personality.textContent,firstSeason.nature);
 page.nodes.find(node=>node.dataset.topic==='career').emit('click');page.ids['continue-season'].emit('click');
 const nextSeason={...season(),nature:'A different topic must not replace your base nature.'};
 page.requests[2].resolve(response(nextSeason));await flush();
 assert.equal(page.ids.personality.textContent,firstSeason.nature);
 page.event('beforeprint');
 assert.match(page.ids['print-report'].textContent,/A quiet root waits beneath your hesitation/);
 assert.doesNotMatch(page.ids['print-report'].textContent,/A different topic must not replace/);
 assert.equal(page.prints(),0);
});

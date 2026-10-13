let language='en';
let reading=null;
let currentPage='birth';
let selectedTopic=null;
const $=id=>document.getElementById(id);
const copy={
 en:{progressBirth:'Birth & intention',progressNature:'Your nature',progressSeason:'Your season',introEyebrow:'THE EASTERN CHART',headline:'Discover the\nelement within you.',subtitle:'An Eastern astrology experience, weaving your birth element with what is on your mind.',birthStep:'01 / BIRTH & INTENTION',fiveElements:'FIVE ELEMENTS · 五行',dateLabel:'Birth date',timeLabel:'Birth time · optional',placeLabel:'Birth city · optional',questionLabel:'What is on your mind?',privacy:'To create your interpretation, your birth details and words are sent through our server to OpenAI. Your report stays only in this page’s memory.',begin:'Discover my element ↗',disclaimer:'For cultural exploration and self-reflection.',backBirth:'← Your birth details',natureStep:'02 / YOUR ELEMENTAL NATURE',natureHeading:'YOUR ELEMENTAL NATURE',dayMaster:'YOUR DAY MASTER',elementHint:'Hover or tap your element to see its symbol unfold.',chartDetails:'About your preliminary chart',elementsDetails:"About the Five Elements",elementsIntro:"The five elements—Wood, Fire, Earth, Metal and Water—describe patterns of change in traditional Eastern thought.",woodLabel:"Wood · 木",woodIntro:"Wood evokes growth, renewal, and the courage to begin.",fireLabel:"Fire · 火",fireIntro:"Fire evokes warmth, expression, and inspiration.",earthLabel:"Earth · 土",earthIntro:"Earth evokes stability, nourishment, and care.",metalLabel:"Metal · 金",metalIntro:"Metal evokes clarity, discernment, and refinement.",waterLabel:"Water · 水",waterIntro:"Water evokes adaptability, reflection, and depth.",topicEyebrow:'CHOOSE YOUR NEXT DOORWAY',topicHeading:'Where would you like clarity?',topicIntro:'Choose one area. Your next page unfolds around it.',health:'Health',love:'Love',family:'Family',career:'Career',study:'Study',wealth:'Wealth',continueSeason:'Unfold my season ↗',backNature:'← Your nature & areas',seasonStep:'03 / YOUR PRESENT SEASON',seasonHeading:'YOUR PRESENT SEASON\n& THREE-MONTH RHYTHM',symbolicNote:'A symbolic reading of your elemental rhythm; windows are invitations, not guaranteed events.',currentHeading:'THE CURRENT AROUND YOU',openingHeading:'A WINDOW TO LEAN TOWARD',rhythmHeading:'Your three-month rhythm',rhythmSubtitle:'A direction for each month. A practice to meet it.',alignmentHeading:'YOUR ALIGNMENT PRACTICE',practiceHeading:'Invite the opening',watchHeading:'Keep this boundary',methodHeading:'How this reading is made',exportPdf:'Save as PDF ↓',pdfHelp:'Optional: click Save as PDF, then choose Save as PDF in your browser’s print dialog.',pdfStatus:'Your report is ready. Choose Save as PDF in the print dialog.',download:'Download text ↓',another:'Explore another area ↗',footer:'Rooted in symbolism. Open to possibility.',selectHint:'Choose an area to continue.',selectedHint:'Your doorway: ',monthAction:'MEET THE CURRENT',invalidQuestion:'Please enter a word or question.',calculationError:'This date could not be calculated. Check your birth details and try again.',chartNote:'Preliminary chart: entered civil clock time, midnight day boundary. Birth city is not used yet; overseas timezone, DST, local solar-term boundaries and apparent solar time are not corrected. Unknown birth time omits the hour pillar and provisionally uses noon for the other pillars. The Day Master is a traditional archetype, not a complete personality assessment.',retry:'Try again ↗',waitEstimate:'Please allow about 30 seconds.',waitLonger:'Taking a little longer — your interpretation is still unfolding.',waitLabel:'Preparing your interpretation',pendingNature:'Unfolding your elemental nature…',pendingSeason:'Weaving your present season and the months ahead…',aiConnection:'Personalized interpretations are not connected on this version yet. Your birth element is ready; please use the full website to continue.',aiFailed:'Your reading could not unfold this time. Please try again in a moment.',aiNetwork:'The connection could not be reached. Please try again when your connection is steady.',aiTimeout:'Your reading is taking longer than expected. Please try again.',aiRateLimit:'The oracle is receiving many readings. Please return in a moment.',aiInvalid:'Please check your birth details and thought, then return to your reading.',sourceLabel:'Reading sources: ',method:'Your preliminary chart is calculated with lunar-javascript 1.7.7. AI interprets the calculated chart, your own words, and your chosen area using source-informed BaZi guidance. The calendar provides the three monthly anchors and an 18-month horizon; AI writes the interpretation rather than calculating your pillars. This is a symbolic reading, with the chart limitations described above.'},
 zh:{progressBirth:'出生与心念',progressNature:'五行底色',progressSeason:'当下与流月',introEyebrow:'东方命盘 · THE EASTERN CHART',headline:'发现你的\n五行底色。',subtitle:'以东方命理为灵感，让你的生辰与当下心念交织，发现属于你的五行底色。',birthStep:'01 / 出生与心念',fiveElements:'五行 · FIVE ELEMENTS',dateLabel:'出生日期',timeLabel:'出生时间 · 可选',placeLabel:'出生城市 · 可选',questionLabel:'此刻，你心中想到什么？',privacy:'生成解读时，出生信息与心中词句会经由我们的服务器发送给 OpenAI。报告仅暂存在当前页面内存中。',begin:'发现我的五行底色 ↗',disclaimer:'用于文化探索与自我理解。',backBirth:'← 返回出生信息',natureStep:'02 / 你的五行底色',natureHeading:'你的五行底色',dayMaster:'你的日主',elementHint:'悬停或轻触五行，让它的意象慢慢显现。',chartDetails:'关于这份初步命盘',elementsDetails:"关于五行",elementsIntro:"五行包括木、火、土、金、水，以五种意象描述自然与人生的变化。",woodLabel:"木 · Wood",woodIntro:"木象征生长、更新与开始的勇气。",fireLabel:"火 · Fire",fireIntro:"火象征温暖、表达与灵感。",earthLabel:"土 · Earth",earthIntro:"土象征安稳、滋养与关怀。",metalLabel:"金 · Metal",metalIntro:"金象征清晰、辨别与精炼。",waterLabel:"水 · Water",waterIntro:"水象征应变、内省与深度。",topicEyebrow:'选择下一道门',topicHeading:'你想看清哪一方面？',topicIntro:'选择一个领域，下一页将围绕它展开。',health:'健康',love:'爱情',family:'家庭',career:'事业',study:'学业',wealth:'财富',continueSeason:'展开我的当下节奏 ↗',backNature:'← 返回五行与领域',seasonStep:'03 / 此刻的气候',seasonHeading:'当下的气候\n与三个月节奏',symbolicNote:'以五行节奏展开的象征解读；窗口是行动提示，不代表事件必然发生。',currentHeading:'环绕你的气候',openingHeading:'值得靠近的窗口',rhythmHeading:'你的三个月节奏',rhythmSubtitle:'每个月一个方向，配上一件具体的事。',alignmentHeading:'顺势而行',practiceHeading:'为转机留一扇门',watchHeading:'守住这道边界',methodHeading:'这份解读如何生成',exportPdf:'保存为 PDF ↓',pdfHelp:'需要保存时点击上方按钮，再在浏览器打印窗口选择“另存为 PDF”。',pdfStatus:'报告已准备好，请在打印窗口选择“另存为 PDF”。',download:'下载文本 ↓',another:'探索另一个领域 ↗',footer:'以传统意象为起点，为可能性留白。',selectHint:'选择一个领域后继续。',selectedHint:'你选择的方向：',monthAction:'顺着这股气候',invalidQuestion:'请输入一个词或问题。',calculationError:'无法计算此日期，请检查出生信息后重试。',chartNote:'初步排盘：使用输入的民用钟表时间，午夜换日。出生城市尚未参与计算；未校正海外时区、夏令时、当地节气边界或真太阳时。未知时辰不显示时柱，其他柱暂用正午计算。日主是一种传统意象，不是完整性格测评。',retry:'再试一次 ↗',waitEstimate:'预计需要约 30 秒。',waitLonger:'稍比预期久一些，你的解读仍在展开……',waitLabel:'正在准备你的解读',pendingNature:'正在展开你的五行底色……',pendingSeason:'正在将当下处境与未来的流月交织……',aiConnection:'此版本暂未连通个性化解读服务。你的五行已算出，请在完整网站继续探索。',aiFailed:'这次解读未能展开，请稍后再试一次。',aiNetwork:'暂时无法连接，请在网络稳定后重试。',aiTimeout:'解读比预期更久，请再试一次。',aiRateLimit:'此刻有较多解读请求，请稍后再来。',aiInvalid:'请检查出生信息与心中词句，再返回解读。',sourceLabel:'解读参考：',method:'初步命盘由 lunar-javascript 1.7.7 计算。AI 结合已算出的八字、你输入的处境和所选领域，依据有来源的八字解读指引生成报告。历法提供三个月的锚点与18个月的观察范围；AI 负责解读，不负责猜测四柱。这是一份象征解读，排盘限制见上方说明。'}
};
const ai=MingAI.create({fetch:window.fetch.bind(window),origin:window.location.href,config:window.MING_CONFIG||{}});
let generation=0;
let waitTimer=null;
let natureResult=null;
let seasonResult=null;
let seasonKey=null;
// One first-completed AI nature per input/language keeps the report coherent across areas.
const baseNatures=new Map();
function natureKey(){return reading?JSON.stringify({birth:reading.birth,question:reading.question,language}):null;}
function stableNature(result){
 const key=natureKey();
 if(!baseNatures.has(key))baseNatures.set(key,{nature:result.nature,meta:result.meta});
 return baseNatures.get(key).nature;
}
function textNode(tag,text,className){const node=document.createElement(tag);node.textContent=text;if(className)node.className=className;return node;}
function stopWaiting(){
 clearTimeout(waitTimer);waitTimer=null;
 for(const stage of ['nature','season']){
  $(`${stage}-wait`).hidden=true;
  $(stage==='nature'?'personality':'season-content').setAttribute('aria-busy','false');
 }
}
function stopGeneration(){generation++;ai.cancel();stopWaiting();}
function clearPrint(){document.body.classList.remove('print-ready');$('print-report').replaceChildren();$('export-status').hidden=true;}
function setExports(ready){$('download').disabled=!ready;$('export-pdf').disabled=!ready;$('pdf-help').hidden=!ready;if(!ready)clearPrint();}
function showPage(page){
 MingMotion.resetAll();
 if(currentPage!==page)stopGeneration();
 currentPage=page;
 document.body.dataset.view=page;
 for(const key of ['birth','nature','season']){
  $(`${key}-page`).hidden=key!==page;
  $(`progress-${key}`).removeAttribute('aria-current');
 }
 $(`progress-${page}`).setAttribute('aria-current','step');
 const heading=$(page==='birth'?'headline':`${page}-heading`);heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});
 window.scrollTo({top:0,behavior:'instant'});
 setExports(page==='season'&&Boolean(seasonResult)&&seasonKey===payloadKey('season'));
}
function updateSelection(){
 for(const button of document.querySelectorAll('[data-topic]'))button.setAttribute('aria-pressed',String(button.dataset.topic===selectedTopic));
 $('continue-season').disabled=!selectedTopic;
 $('selection-hint').textContent=selectedTopic?copy[language].selectedHint+copy[language][selectedTopic]:copy[language].selectHint;
}
function renderNature(nature=''){
 if(!reading)return;
 const element=MingOracle.elements[reading.chart.index];
 document.body.dataset.element=['wood','fire','earth','metal','water'][reading.chart.index];
 const key=document.body.dataset.element;
 MingMotion.set($('element-symbol'),key,element.symbol,language==='en'?element.en+' element':element.zh+'行意象');
 MingMotion.set($('element-name'),key,element[language],element[language]);
 $('personality').textContent=nature;
 $('personality').hidden=!nature;
 $('pillars').replaceChildren(...reading.chart.pillars.map((value,i)=>{
  const card=document.createElement('div');card.append(textNode('small',(language==='zh'?['年柱','月柱','日柱','时柱']:['Year','Month','Day','Hour'])[i]),textNode('strong',value));return card;
 }));
 $('chart-note').textContent=copy[language].chartNote;
}
function methodText(result){
 const names=result.meta.sources.map(source=>typeof source==='string'?source:source&&typeof source.title==='string'?source.title:'').filter(Boolean);
 return copy[language].method+(names.length?' '+copy[language].sourceLabel+names.join(' · '):'');
}
function renderSeason(result){
 if(!reading||!selectedTopic)return;
 const element=MingOracle.elements[reading.chart.index];
 $('report-topic').textContent=copy[language][selectedTopic];
 $('report-element').textContent=(language==='zh'?'日主 · ':element.en+' · ')+element.symbol;
 $('question-echo').textContent=reading.question;
 $('season-title').textContent=result.season.title;
 $('season-description').textContent=result.season.description;
 $('opening-description').textContent=MingOracle.monthLabel(result.opening,language)+' · '+result.opening.description;
 // Server calendar anchors keep civil-month labels consistent across timezones.
 const anchors=result.meta.monthAnchors===undefined?MingOracle.rhythm(reading.startedAt,reading.chart.index):result.meta.monthAnchors;
 $('months').replaceChildren(...result.months.map(item=>{
  const card=document.createElement('article');card.className='month-card';
  card.append(textNode('small',MingOracle.monthLabel(item,language)),textNode('h3',item.title));
  const anchor=anchors.find(value=>value.year===item.year&&value.month===item.month);
  if(anchor)card.append(textNode('p',language==='zh'?`月份锚点 · ${anchor.stem} / ${MingOracle.elements[anchor.element].zh}`:`Calendar anchor · ${anchor.stem} / ${MingOracle.elements[anchor.element].en}`,'calendar-anchor'));
  card.append(textNode('p',item.description));
  const action=textNode('p','','month-action');action.append(textNode('span',copy[language].monthAction),document.createTextNode(item.action));card.append(action);return card;
 }));
 $('alignment-action').textContent=result.alignment.action;
 $('alignment-watch').textContent=result.alignment.watch;
 $('method').textContent=methodText(result);
 $('season-content').hidden=false;
 setExports(true);
}
function payload(stage){
 return {stage,birth:reading.birth,question:reading.question,topic:stage==='season'?selectedTopic:null,language};
}
function payloadKey(stage){return reading&&(stage!=='season'||selectedTopic)?JSON.stringify(payload(stage)):null;}
function setStatus(stage,state,message=''){
 stopWaiting();
 const panel=$(`${stage}-ai-status`);
 panel.hidden=state==='ready';panel.dataset.state=state;
 $(`${stage}-ai-message`).textContent=message;
 $(`${stage}-retry`).hidden=state!=='error';
 $(stage==='nature'?'personality':'season-content').setAttribute('aria-busy',String(state==='pending'));
 if(state==='pending'){
  $(`${stage}-wait`).hidden=false;
  $(`${stage}-progress`).setAttribute('aria-label',copy[language].waitLabel);
  $(`${stage}-estimate`).textContent=copy[language].waitEstimate;
  waitTimer=setTimeout(()=>{
   if(panel.dataset.state==='pending'&&currentPage===stage)$(`${stage}-estimate`).textContent=copy[language].waitLonger;
  },30000);
 }
}
function errorText(error){
 const codes={not_connected:'aiConnection',generation_failed:'aiFailed',invalid_response:'aiFailed',connection_failed:'aiNetwork',timeout:'aiTimeout',rate_limit:'aiRateLimit',invalid_input:'aiInvalid'};
 return copy[language][codes[error.code]||'aiFailed'];
}
async function loadStage(stage){
 if(!reading||(stage==='season'&&!selectedTopic))return;
 stopGeneration();
 const token=generation,request=payload(stage),key=payloadKey(stage);
 setExports(false);
 if(stage==='nature'){
  const baseline=baseNatures.get(natureKey());
  if(baseline){natureResult=baseline;renderNature(baseline.nature);setStatus(stage,'ready');return;}
  natureResult=null;renderNature();
 }else{
  seasonResult=null;seasonKey=null;$('season-content').hidden=true;
  const element=MingOracle.elements[reading.chart.index];
  $('report-topic').textContent=copy[language][selectedTopic];
  $('report-element').textContent=(language==='zh'?'日主 · ':element.en+' · ')+element.symbol;
  $('question-echo').textContent=reading.question;
 }
 setStatus(stage,'pending',copy[language][stage==='nature'?'pendingNature':'pendingSeason']);
 try{
  const result=await ai.request(request);
  if(token!==generation||currentPage!==stage||key!==payloadKey(stage))return;
  if(stage==='nature'){natureResult=result;renderNature(stableNature(result));}
  else{seasonResult=result;seasonKey=key;renderNature(stableNature(result));renderSeason(result);}
  setStatus(stage,'ready');
 }catch(error){
  if(token!==generation||error.code==='cancelled')return;
  setStatus(stage,'error',errorText(error));
 }
}
function setLanguage(){
 document.documentElement.lang=language==='en'?'en':'zh-CN';
 for(const node of document.querySelectorAll('[data-copy]'))node.textContent=copy[language][node.dataset.copy];
 $('language').textContent=language==='en'?'中文':'English';
 $('birth-place').placeholder=language==='en'?'London, UK':'出生城市，例如伦敦';
 document.querySelector('.progress').setAttribute('aria-label',language==='en'?'Your journey':'探索步骤');
 document.querySelector('.caption').textContent=language==='en'?'WOOD · FIRE · EARTH · METAL · WATER':'木 · 火 · 土 · 金 · 水';
 $('question').placeholder=language==='en'?'A word, a feeling, or a question…':'一个词、一种感受，或一个问题……';
 if(!$('form-error').hidden)$('form-error').textContent=copy[language].calculationError;
 updateSelection();
 if(reading){renderNature();if(currentPage==='nature'||currentPage==='season')loadStage(currentPage);}
}
$('language').addEventListener('click',()=>{stopGeneration();language=language==='en'?'zh':'en';setLanguage();});
const today=new Date();$('birth-date').max=`${Math.min(today.getFullYear(),2100)}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
function ensureReading(){
 const question=$('question').value.trim();
 $('question').setCustomValidity(question?'':copy[language].invalidQuestion);
 if(!$('reading-form').reportValidity())return false;
 try{
  const birth={date:$('birth-date').value,time:$('birth-time').value,place:$('birth-place').value.trim()};
  const signature=JSON.stringify({birth,question});
  if(!reading||reading.signature!==signature){
   stopGeneration();natureResult=null;seasonResult=null;seasonKey=null;setExports(false);
   const chart=MingOracle.calculate(birth.date,birth.time);
   reading={chart,birth,question,signature,startedAt:new Date()};
  }
 }catch(error){$('form-error').hidden=false;$('form-error').textContent=copy[language].calculationError;return false;}
 $('form-error').hidden=true;renderNature();updateSelection();return true;
}
function navigate(page){
 if(page==='birth'){showPage('birth');return;}
 if(!reading||currentPage==='birth'){
  if(currentPage!=='birth')showPage('birth');
  if(!ensureReading())return;
 }
 if(page==='season'&&!selectedTopic){showPage('nature');loadStage('nature');$('topics').querySelector('button').focus({preventScroll:true});return;}
 showPage(page);loadStage(page);
}
$('reading-form').addEventListener('submit',event=>{event.preventDefault();if(ensureReading()){showPage('nature');loadStage('nature');}});
for(const button of document.querySelectorAll('[data-page]'))button.addEventListener('click',()=>navigate(button.dataset.page));
for(const id of ['birth-date','birth-time','birth-place','question'])$(id).addEventListener('input',()=>{
 stopGeneration();reading=null;natureResult=null;seasonResult=null;seasonKey=null;setExports(false);
 $('question').setCustomValidity('');
});
for(const button of document.querySelectorAll('[data-topic]'))button.addEventListener('click',()=>{
 if(selectedTopic!==button.dataset.topic){seasonResult=null;seasonKey=null;setExports(false);}
 selectedTopic=button.dataset.topic;updateSelection();
});
for(const stage of ['nature','season'])$(`${stage}-retry`).addEventListener('click',()=>loadStage(stage));
$('continue-season').addEventListener('click',()=>navigate('season'));
$('back-birth').addEventListener('click',()=>navigate('birth'));
for(const id of ['back-nature','choose-another'])$(id).addEventListener('click',()=>navigate('nature'));
$('download').addEventListener('click',()=>{
 if(!reading||!selectedTopic||!seasonResult||seasonKey!==payloadKey('season'))return;
 const parts=['MING ORACLE',copy[language].natureHeading,$('element-title').textContent,stableNature(seasonResult),reading.chart.pillars.join(' · '),copy[language].chartNote,copy[language].seasonHeading,$('report-topic').textContent,$('question-echo').textContent,copy[language].symbolicNote,$('season-title').textContent,$('season-description').textContent,copy[language].openingHeading,$('opening-description').textContent,...Array.from($('months').children).map(card=>card.innerText),copy[language].practiceHeading,$('alignment-action').textContent,copy[language].watchHeading,$('alignment-watch').textContent,methodText(seasonResult)];
 const url=URL.createObjectURL(new Blob([parts.join('\n\n')],{type:'text/plain;charset=utf-8'}));
 const a=document.createElement('a');a.href=url;a.download=`ming-oracle-${selectedTopic}.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
function printSection(title,children,className='print-section'){
 const section=document.createElement('section');section.className=className;
 section.append(textNode('h2',title),...children);return section;
}
function preparePdf(){
 if(!reading||!selectedTopic||!seasonResult||seasonKey!==payloadKey('season')||currentPage!=='season')return false;
 const report=$('print-report');report.replaceChildren();
 const header=document.createElement('header');header.className='print-header';
 header.append(textNode('p','MING ORACLE · 命','eyebrow'),textNode('h1','The Eastern Chart'),textNode('p',language==='zh'?'你的五行底色与当下节奏':'Your birth element & present season'));
 const generated=new Intl.DateTimeFormat(language==='zh'?'zh-CN':'en-US',{year:'numeric',month:'long',day:'numeric'}).format(new Date(seasonResult.meta.generatedAt));
 header.append(textNode('p',`${copy[language].dateLabel}: ${reading.birth.date} · ${generated}`,'print-date'));
 report.append(header);
 const pillars=$('pillars').cloneNode(true);pillars.removeAttribute('id');pillars.classList.add('print-pillars');
 report.append(printSection(copy[language].natureHeading,[textNode('h3',$('element-title').textContent),textNode('p',stableNature(seasonResult)),pillars],'print-nature'));
 const summary=[textNode('p',$('report-topic').textContent,'eyebrow'),textNode('blockquote',reading.question),textNode('h3',$('season-title').textContent),textNode('p',$('season-description').textContent),textNode('h3',copy[language].openingHeading),textNode('p',$('opening-description').textContent)];
 report.append(printSection(copy[language].seasonHeading,summary));
 const months=$('months').cloneNode(true);months.removeAttribute('id');months.className='print-months';
 report.append(printSection(copy[language].rhythmHeading,[months],'print-rhythm'));
 report.append(printSection(copy[language].alignmentHeading,[textNode('h3',copy[language].practiceHeading),textNode('p',$('alignment-action').textContent),textNode('h3',copy[language].watchHeading),textNode('p',$('alignment-watch').textContent)]));
 const footer=document.createElement('footer');footer.className='print-footer';
 footer.append(textNode('p',copy[language].symbolicNote),textNode('p',copy[language].chartNote),textNode('p',methodText(seasonResult)));report.append(footer);
 document.body.classList.add('print-ready');return true;
}
$('export-pdf').addEventListener('click',()=>{
 if(!preparePdf())return;
 $('export-status').hidden=false;$('export-status').textContent=copy[language].pdfStatus;
 window.print();
});
// Native printing may copy an already completed report; it never starts an AI request.
window.addEventListener('beforeprint',preparePdf);
window.addEventListener('afterprint',()=>document.body.classList.remove('print-ready'));
window.addEventListener('pagehide',stopGeneration);
setExports(false);setLanguage();

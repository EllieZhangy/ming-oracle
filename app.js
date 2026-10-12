let language='en';
let reading=null;
let currentPage='birth';
let selectedTopic=null;
const $=id=>document.getElementById(id);
const copy={
 en:{progressBirth:'Birth & intention',progressNature:'Your nature',progressSeason:'Your season',introEyebrow:'THE EASTERN CHART',headline:'The Element\nWithin You.',subtitle:'Explore your nature through the five elements—an ancient lens on a modern life.',birthStep:'01 / BIRTH & INTENTION',fiveElements:'FIVE ELEMENTS · 五行',dateLabel:'Birth date',timeLabel:'Birth time · optional',placeLabel:'Birth city · optional',questionLabel:'What is on your mind?',privacy:'Your inputs stay on this page. Nothing is uploaded or saved.',begin:'Discover your element ↗',disclaimer:'A preliminary birth chart and symbolic reading for cultural exploration.',backBirth:'← Your birth details',natureStep:'02 / YOUR ELEMENTAL NATURE',natureHeading:'YOUR ELEMENTAL NATURE',dayMaster:'YOUR DAY MASTER',elementHint:'Hover or tap your element to see its symbol unfold.',chartDetails:'About your preliminary chart',elementsDetails:"About the Five Elements",elementsIntro:"The five elements—Wood, Fire, Earth, Metal and Water—describe patterns of change in traditional Eastern thought.",woodLabel:"Wood · 木",woodIntro:"Wood evokes growth, renewal, and the courage to begin.",fireLabel:"Fire · 火",fireIntro:"Fire evokes warmth, expression, and inspiration.",earthLabel:"Earth · 土",earthIntro:"Earth evokes stability, nourishment, and care.",metalLabel:"Metal · 金",metalIntro:"Metal evokes clarity, discernment, and refinement.",waterLabel:"Water · 水",waterIntro:"Water evokes adaptability, reflection, and depth.",topicEyebrow:'CHOOSE YOUR NEXT DOORWAY',topicHeading:'Where would you like clarity?',topicIntro:'Choose one area. Your next page unfolds around it.',health:'Health',love:'Love',family:'Family',career:'Career',study:'Study',wealth:'Wealth',continueSeason:'Unfold my season ↗',backNature:'← Your nature & areas',seasonStep:'03 / YOUR PRESENT SEASON',seasonHeading:'YOUR PRESENT SEASON\n& THREE-MONTH RHYTHM',symbolicNote:'A symbolic reading of your elemental rhythm; windows are invitations, not guaranteed events.',currentHeading:'THE CURRENT AROUND YOU',openingHeading:'A WINDOW TO LEAN TOWARD',rhythmHeading:'Your three-month rhythm',rhythmSubtitle:'A direction for each month. A practice to meet it.',alignmentHeading:'YOUR ALIGNMENT PRACTICE',practiceHeading:'Invite the opening',watchHeading:'Keep this boundary',methodHeading:'How this reading is made',exportPdf:'Save as PDF ↓',pdfHelp:'Optional: click Save as PDF, then choose Save as PDF in your browser’s print dialog.',pdfStatus:'Your report is ready. Choose Save as PDF in the print dialog.',download:'Download text ↓',another:'Explore another area ↗',footer:'Rooted in symbolism. Open to possibility.',selectHint:'Choose an area to continue.',selectedHint:'Your doorway: ',monthAction:'MEET THE CURRENT',invalidQuestion:'Please enter a word or question.',calculationError:'This date could not be calculated. Check your birth details and try again.',chartNote:'Preliminary chart: entered civil clock time, midnight day boundary. Birth city is not used yet; overseas timezone, DST, local solar-term boundaries and apparent solar time are not corrected. Unknown birth time omits the hour pillar and provisionally uses noon for the other pillars. The Day Master is a traditional archetype, not a complete personality assessment.',method:'Calendar engine: lunar-javascript 1.7.7. The next opening is sought across an 18-month horizon; it is not an event prediction. Each civil month is sampled at noon on its 15th day. Its month-stem element is compared with your Day Master using the five-element generation and control cycles, then paired with original text for your selected area. Yin and yang stems select quieter or outward action variants. This is a simplified symbolic reading, not a full BaZi or luck-cycle assessment. Your free-text thought is shown as your intention; its meaning is not analyzed. No AI, classical-text retrieval or medical/financial assessment is connected.'},
 zh:{progressBirth:'出生与心念',progressNature:'五行底色',progressSeason:'当下与流月',introEyebrow:'东方命盘 · THE EASTERN CHART',headline:'发现你的\n五行底色。',subtitle:'以五行的古老语言，探索此刻的自己与人生节奏。',birthStep:'01 / 出生与心念',fiveElements:'五行 · FIVE ELEMENTS',dateLabel:'出生日期',timeLabel:'出生时间 · 可选',placeLabel:'出生城市 · 可选',questionLabel:'此刻，你心中想到什么？',privacy:'输入仅在当前页面使用，不上传，也不保存。',begin:'看见我的五行 ↗',disclaimer:'初步命盘与象征解读，用于文化探索。',backBirth:'← 返回出生信息',natureStep:'02 / 你的五行底色',natureHeading:'你的五行底色',dayMaster:'你的日主',elementHint:'悬停或轻触五行，让它的意象慢慢显现。',chartDetails:'关于这份初步命盘',elementsDetails:"关于五行",elementsIntro:"五行包括木、火、土、金、水，以五种意象描述自然与人生的变化。",woodLabel:"木 · Wood",woodIntro:"木象征生长、更新与开始的勇气。",fireLabel:"火 · Fire",fireIntro:"火象征温暖、表达与灵感。",earthLabel:"土 · Earth",earthIntro:"土象征安稳、滋养与关怀。",metalLabel:"金 · Metal",metalIntro:"金象征清晰、辨别与精炼。",waterLabel:"水 · Water",waterIntro:"水象征应变、内省与深度。",topicEyebrow:'选择下一道门',topicHeading:'你想看清哪一方面？',topicIntro:'选择一个领域，下一页将围绕它展开。',health:'健康',love:'爱情',family:'家庭',career:'事业',study:'学业',wealth:'财富',continueSeason:'展开我的当下节奏 ↗',backNature:'← 返回五行与领域',seasonStep:'03 / 此刻的气候',seasonHeading:'当下的气候\n与三个月节奏',symbolicNote:'以五行节奏展开的象征解读；窗口是行动提示，不代表事件必然发生。',currentHeading:'环绕你的气候',openingHeading:'值得靠近的窗口',rhythmHeading:'你的三个月节奏',rhythmSubtitle:'每个月一个方向，配上一件具体的事。',alignmentHeading:'顺势而行',practiceHeading:'为转机留一扇门',watchHeading:'守住这道边界',methodHeading:'这份解读如何生成',exportPdf:'保存为 PDF ↓',pdfHelp:'需要保存时点击上方按钮，再在浏览器打印窗口选择“另存为 PDF”。',pdfStatus:'报告已准备好，请在打印窗口选择“另存为 PDF”。',download:'下载文本 ↓',another:'探索另一个领域 ↗',footer:'以传统意象为起点，为可能性留白。',selectHint:'选择一个领域后继续。',selectedHint:'你选择的方向：',monthAction:'顺着这股气候',invalidQuestion:'请输入一个词或问题。',calculationError:'无法计算此日期，请检查出生信息后重试。',chartNote:'初步排盘：使用输入的民用钟表时间，午夜换日。出生城市尚未参与计算；未校正海外时区、夏令时、当地节气边界或真太阳时。未知时辰不显示时柱，其他柱暂用正午计算。日主是一种传统意象，不是完整性格测评。',method:'历法计算：lunar-javascript 1.7.7。未来窗口向后查看18个月，不是事件预测。每个公历月取15日正午作为月份锚点，将该月天干五行与日主按五行生克关系比较，再匹配所选领域的原创文案；阴阳天干分别选择安静准备或向外行动的版本。这是简化的象征解读，不是完整八字、大运或流月吉凶判断。输入的词句作为你的心念展示，尚未分析其语义。未接入 AI、古籍检索或医疗与财务评估。'}
};
function textNode(tag,text,className){const node=document.createElement(tag);node.textContent=text;if(className)node.className=className;return node;}
function showPage(page){
 MingMotion.resetAll();
 currentPage=page;
 document.body.dataset.view=page;
 for(const key of ['birth','nature','season']){
  $(`${key}-page`).hidden=key!==page;
  $(`progress-${key}`).removeAttribute('aria-current');
 }
 $(`progress-${page}`).setAttribute('aria-current','step');
 const heading=$(page==='birth'?'headline':`${page}-heading`);heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});
 window.scrollTo({top:0,behavior:'instant'});
}
function updateSelection(){
 for(const button of document.querySelectorAll('[data-topic]'))button.setAttribute('aria-pressed',String(button.dataset.topic===selectedTopic));
 $('continue-season').disabled=!selectedTopic;
 $('selection-hint').textContent=selectedTopic?copy[language].selectedHint+copy[language][selectedTopic]:copy[language].selectHint;
}
function renderNature(){
 if(!reading)return;
 const element=MingOracle.elements[reading.chart.index];
 document.body.dataset.element=['wood','fire','earth','metal','water'][reading.chart.index];
 const key=document.body.dataset.element;
 MingMotion.set($('element-symbol'),key,element.symbol,language==='en'?element.en+' element':element.zh+'行意象');
 MingMotion.set($('element-name'),key,element[language],element[language]);
 $('personality').textContent=MingOracle.personalities[reading.chart.index][language];
 $('pillars').replaceChildren(...reading.chart.pillars.map((value,i)=>{
  const card=document.createElement('div');card.append(textNode('small',(language==='zh'?['年柱','月柱','日柱','时柱']:['Year','Month','Day','Hour'])[i]),textNode('strong',value));return card;
 }));
 $('chart-note').textContent=copy[language].chartNote;
}
function monthText(item){return MingOracle.monthReading(selectedTopic,item,language);}
function renderSeason(){
 if(!reading||!selectedTopic)return;
 const topic=MingTopics[selectedTopic];
 const rows=MingOracle.rhythm(reading.startedAt,reading.chart.index);
 const current=rows[0], currentCopy=topic.relations[current.relation];
 const element=MingOracle.elements[reading.chart.index];
 $('report-topic').textContent=topic.title[language];
 $('report-element').textContent=(language==='zh'?'日主 · ':element.en+' · ')+element.symbol;
 $('question-echo').textContent=reading.question;
 $('season-title').textContent=monthText(current).title;
 $('season-description').textContent=monthText(current).mood;
 const next=MingOracle.nextOpening(reading.startedAt,reading.chart.index);
 const title=MingOracle.monthLabel(next,language);
 const windowText=monthText(next);
 const horizon=next.horizon==='near'?(language==='zh'?'近期的窗口':'A near-term opening'):next.horizon==='quarter'?(language==='zh'?'未来一季的窗口':'A window further into the season'):(language==='zh'?'较长周期的窗口':'An opening on the longer horizon');
 $('opening-description').textContent=language==='zh'?`${horizon}落在 ${title}。${windowText.mood} ${windowText.action}`:`${horizon} gathers around ${title}. ${windowText.mood} ${windowText.action}`;
 $('months').replaceChildren(...rows.map(item=>{
  const card=document.createElement('article');card.className='month-card';
  const passage=monthText(item);
  card.append(textNode('small',MingOracle.monthLabel(item,language)),textNode('h3',passage.title));
  card.append(textNode('p',language==='zh'?`月份锚点 · ${item.stem} / ${MingOracle.elements[item.element].zh}`:`Calendar anchor · ${item.stem} / ${MingOracle.elements[item.element].en}`,'calendar-anchor'));
  card.append(textNode('p',passage.mood));
  const action=textNode('p','','month-action');action.append(textNode('span',copy[language].monthAction),document.createTextNode(passage.action));card.append(action);return card;
 }));
 $('alignment-action').textContent=monthText(current).action;
 $('alignment-watch').textContent=currentCopy.watch[language];
 $('method').textContent=copy[language].method;
}
function setLanguage(){
 document.documentElement.lang=language==='en'?'en':'zh-CN';
 for(const node of document.querySelectorAll('[data-copy]'))node.textContent=copy[language][node.dataset.copy];
 $('language').textContent=language==='en'?'中文':'English';
 $('birth-place').placeholder=language==='en'?'London, UK':'出生城市，例如伦敦';
 document.querySelector('.progress').setAttribute('aria-label',language==='en'?'Reading progress':'解读进度');
 document.querySelector('.caption').textContent=language==='en'?'WOOD · FIRE · EARTH · METAL · WATER':'木 · 火 · 土 · 金 · 水';
 $('question').placeholder=language==='en'?'A word, a feeling, or a question…':'一个词、一种感受，或一个问题……';
 if(!$('form-error').hidden)$('form-error').textContent=copy[language].calculationError;
 renderNature();renderSeason();updateSelection();
}
$('language').addEventListener('click',()=>{language=language==='en'?'zh':'en';setLanguage();});
const today=new Date();$('birth-date').max=`${Math.min(today.getFullYear(),2100)}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
function ensureReading(){
 const question=$('question').value.trim();
 $('question').setCustomValidity(question?'':copy[language].invalidQuestion);
 if(!$('reading-form').reportValidity())return false;
 try{
  const chart=MingOracle.calculate($('birth-date').value,$('birth-time').value);
  reading={chart,question,startedAt:reading?reading.startedAt:new Date()};
 }catch(error){$('form-error').hidden=false;$('form-error').textContent=copy[language].calculationError;return false;}
 $('form-error').hidden=true;renderNature();updateSelection();return true;
}
function navigate(page){
 if(page==='birth'){showPage('birth');return;}
 // Bring the form into view before requesting missing/invalid input.
 if(!reading||currentPage==='birth'){
  if(currentPage!=='birth')showPage('birth');
  if(!ensureReading())return;
 }
 if(page==='season'&&!selectedTopic){showPage('nature');$('topics').querySelector('button').focus({preventScroll:true});return;}
 if(page==='season')renderSeason();
 showPage(page);
}
$('reading-form').addEventListener('submit',event=>{event.preventDefault();if(ensureReading())showPage('nature');});
for(const button of document.querySelectorAll('[data-page]'))button.addEventListener('click',()=>navigate(button.dataset.page));
$('question').addEventListener('input',()=>$('question').setCustomValidity(''));
for(const button of document.querySelectorAll('[data-topic]'))button.addEventListener('click',()=>{selectedTopic=button.dataset.topic;updateSelection();});
$('continue-season').addEventListener('click',()=>navigate('season'));
$('back-birth').addEventListener('click',()=>navigate('birth'));
for(const id of ['back-nature','choose-another'])$(id).addEventListener('click',()=>navigate('nature'));
$('download').addEventListener('click',()=>{
 if(!reading||!selectedTopic)return;
 const parts=['MING ORACLE',copy[language].natureHeading,$('element-title').textContent,$('personality').textContent,reading.chart.pillars.join(' · '),copy[language].chartNote,copy[language].seasonHeading,$('report-topic').textContent,$('question-echo').textContent,copy[language].symbolicNote,$('season-title').textContent,$('season-description').textContent,copy[language].openingHeading,$('opening-description').textContent,...Array.from($('months').children).map(card=>card.innerText),copy[language].practiceHeading,$('alignment-action').textContent,copy[language].watchHeading,$('alignment-watch').textContent,copy[language].method];
 const url=URL.createObjectURL(new Blob([parts.join('\n\n')],{type:'text/plain;charset=utf-8'}));
 const a=document.createElement('a');a.href=url;a.download=`ming-oracle-${selectedTopic}.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
function printSection(title,children,className='print-section'){
 const section=document.createElement('section');section.className=className;
 section.append(textNode('h2',title),...children);return section;
}
function preparePdf(){
 if(!reading||!selectedTopic)return false;
 renderNature();renderSeason();
 const report=$('print-report');report.replaceChildren();
 const header=document.createElement('header');header.className='print-header';
 header.append(textNode('p','MING ORACLE · 命','eyebrow'),textNode('h1','The Eastern Chart'),textNode('p',language==='zh'?'你的五行底色与当下节奏':'Your birth element & present season'));
 const generated=new Intl.DateTimeFormat(language==='zh'?'zh-CN':'en-US',{year:'numeric',month:'long',day:'numeric'}).format(new Date());
 header.append(textNode('p',`${copy[language].dateLabel}: ${$('birth-date').value} · ${generated}`,'print-date'));
 report.append(header);
 const pillars=$('pillars').cloneNode(true);pillars.removeAttribute('id');pillars.classList.add('print-pillars');
 report.append(printSection(copy[language].natureHeading,[textNode('h3',$('element-title').textContent),textNode('p',$('personality').textContent),pillars],'print-nature'));
 const summary=[textNode('p',$('report-topic').textContent,'eyebrow'),textNode('blockquote',reading.question),textNode('h3',$('season-title').textContent),textNode('p',$('season-description').textContent),textNode('h3',copy[language].openingHeading),textNode('p',$('opening-description').textContent)];
 report.append(printSection(copy[language].seasonHeading,summary));
 const months=$('months').cloneNode(true);months.removeAttribute('id');months.className='print-months';
 report.append(printSection(copy[language].rhythmHeading,[months],'print-rhythm'));
 report.append(printSection(copy[language].alignmentHeading,[textNode('h3',copy[language].practiceHeading),textNode('p',$('alignment-action').textContent),textNode('h3',copy[language].watchHeading),textNode('p',$('alignment-watch').textContent)]));
 const footer=document.createElement('footer');footer.className='print-footer';
 footer.append(textNode('p',copy[language].symbolicNote),textNode('p',copy[language].chartNote),textNode('p',copy[language].method));report.append(footer);
 document.body.classList.add('print-ready');return true;
}
$('export-pdf').addEventListener('click',()=>{
 if(!preparePdf())return;
 $('export-status').hidden=false;$('export-status').textContent=copy[language].pdfStatus;
 window.print();
});
window.addEventListener('beforeprint',preparePdf);
window.addEventListener('afterprint',()=>document.body.classList.remove('print-ready'));
setLanguage();


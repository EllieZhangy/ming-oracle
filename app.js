let language='en';
let reading=null;
let currentPage='birth';
let selectedTopic=null;
const $=id=>document.getElementById(id);
const copy={
 en:{progressBirth:'Birth & intention',progressNature:'Your nature',progressSeason:'Your season',introEyebrow:'AN ANCIENT LENS. A PRESENT QUESTION.',headline:'Find a little clarity\nin the unknown.',subtitle:'Begin with your birth date and the thought you are carrying. Your element is the first doorway.',birthStep:'01 / BIRTH & INTENTION',fiveElements:'FIVE ELEMENTS · 五行',dateLabel:'Birth date',timeLabel:'Birth time · optional',placeLabel:'Birth city · optional',questionLabel:'What is on your mind?',privacy:'Your inputs stay on this page. Nothing is uploaded or saved.',begin:'Discover your element ↗',disclaimer:'A preliminary birth chart and symbolic reading for cultural exploration.',backBirth:'← Your birth details',natureStep:'02 / YOUR ELEMENTAL NATURE',natureHeading:'YOUR ELEMENTAL NATURE',dayMaster:'YOUR DAY MASTER',chartDetails:'About your preliminary chart',topicEyebrow:'CHOOSE YOUR NEXT DOORWAY',topicHeading:'Where would you like clarity?',topicIntro:'Choose one area. Your next page unfolds around it.',health:'Health',love:'Love',family:'Family',career:'Career',study:'Study',wealth:'Wealth',continueSeason:'Unfold my season ↗',backNature:'← Your nature & areas',seasonStep:'03 / YOUR PRESENT SEASON',seasonHeading:'YOUR PRESENT SEASON\n& THREE-MONTH RHYTHM',symbolicNote:'A symbolic lens for your chosen area, rather than a forecast of events.',currentHeading:'THE CURRENT AROUND YOU',openingHeading:'A WINDOW TO LEAN TOWARD',rhythmHeading:'Your three-month rhythm',rhythmSubtitle:'A direction for each month. A practice to meet it.',alignmentHeading:'YOUR ALIGNMENT PRACTICE',practiceHeading:'Invite the opening',watchHeading:'Keep this boundary',methodHeading:'How this reading is made',download:'Download reading ↓',another:'Explore another area ↗',footer:'Rooted in symbolism. Open to possibility.',selectHint:'Choose an area to continue.',selectedHint:'Your doorway: ',monthAction:'MEET THE CURRENT',invalidQuestion:'Please enter a word or question.',calculationError:'This date could not be calculated. Check your birth details and try again.',chartNote:'Preliminary chart: entered civil clock time, midnight day boundary. Birth city is not used yet; overseas timezone, DST, local solar-term boundaries and apparent solar time are not corrected. Unknown birth time omits the hour pillar and provisionally uses noon for the other pillars. The Day Master is a traditional archetype, not a complete personality assessment.',method:'Calendar engine: lunar-javascript 1.7.7. Each civil month is sampled at noon on its 15th day. Its month-stem element is compared with your Day Master using the five-element generation and control cycles, then paired with original text for your selected area. Yin and yang stems select quieter or outward action variants. This is a simplified symbolic reading, not a full BaZi or luck-cycle assessment. Your free-text thought is shown as your intention; its meaning is not analyzed. No AI, classical-text retrieval or medical/financial assessment is connected.'},
 zh:{progressBirth:'出生与心念',progressNature:'五行底色',progressSeason:'当下与流月',introEyebrow:'古老的意象，此刻的心念。',headline:'在未知中，\n寻找一点清晰。',subtitle:'从出生日期和心中所想开始。你的五行，是第一道门。',birthStep:'01 / 出生与心念',fiveElements:'五行 · FIVE ELEMENTS',dateLabel:'出生日期',timeLabel:'出生时间 · 可选',placeLabel:'出生城市 · 可选',questionLabel:'此刻，你心中想到什么？',privacy:'输入仅在当前页面使用，不上传，也不保存。',begin:'看见我的五行 ↗',disclaimer:'初步命盘与象征解读，用于文化探索。',backBirth:'← 返回出生信息',natureStep:'02 / 你的五行底色',natureHeading:'你的五行底色',dayMaster:'你的日主',chartDetails:'关于这份初步命盘',topicEyebrow:'选择下一道门',topicHeading:'你想看清哪一方面？',topicIntro:'选择一个领域，下一页将围绕它展开。',health:'健康',love:'爱情',family:'家庭',career:'事业',study:'学业',wealth:'财富',continueSeason:'展开我的当下节奏 ↗',backNature:'← 返回五行与领域',seasonStep:'03 / 此刻的气候',seasonHeading:'当下的气候\n与三个月节奏',symbolicNote:'这是一份所选领域的象征性解读，不是对现实事件的预言。',currentHeading:'环绕你的气候',openingHeading:'值得靠近的窗口',rhythmHeading:'你的三个月节奏',rhythmSubtitle:'每个月一个方向，配上一件具体的事。',alignmentHeading:'顺势而行',practiceHeading:'为转机留一扇门',watchHeading:'守住这道边界',methodHeading:'这份解读如何生成',download:'下载本次解读 ↓',another:'探索另一个领域 ↗',footer:'以传统意象为起点，为可能性留白。',selectHint:'选择一个领域后继续。',selectedHint:'你选择的方向：',monthAction:'顺着这股气候',invalidQuestion:'请输入一个词或问题。',calculationError:'无法计算此日期，请检查出生信息后重试。',chartNote:'初步排盘：使用输入的民用钟表时间，午夜换日。出生城市尚未参与计算；未校正海外时区、夏令时、当地节气边界或真太阳时。未知时辰不显示时柱，其他柱暂用正午计算。日主是一种传统意象，不是完整性格测评。',method:'历法计算：lunar-javascript 1.7.7。每个公历月取15日正午作为月份锚点，将该月天干五行与日主按五行生克关系比较，再匹配所选领域的原创文案；阴阳天干分别选择安静准备或向外行动的版本。这是简化的象征解读，不是完整八字、大运或流月吉凶判断。输入的词句作为你的心念展示，尚未分析其语义。未接入 AI、古籍检索或医疗与财务评估。'}
};
function textNode(tag,text,className){const node=document.createElement(tag);node.textContent=text;if(className)node.className=className;return node;}
function showPage(page){
 currentPage=page;
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
 $('element-symbol').textContent=element.symbol;
 $('element-title').textContent=element[language];
 $('personality').textContent=MingOracle.personalities[reading.chart.index][language];
 $('pillars').replaceChildren(...reading.chart.pillars.map((value,i)=>{
  const card=document.createElement('div');card.append(textNode('small',(language==='zh'?['年柱','月柱','日柱','时柱']:['Year','Month','Day','Hour'])[i]),textNode('strong',value));return card;
 }));
 $('chart-note').textContent=copy[language].chartNote;
}
function actionText(topic,item){const passage=topic.relations[item.relation];return ('乙丁己辛癸'.includes(item.stem)?passage.quietAction:passage.action)[language];}
function renderSeason(){
 if(!reading||!selectedTopic)return;
 const topic=MingTopics[selectedTopic];
 const rows=MingOracle.rhythm(reading.startedAt,reading.chart.index);
 const current=rows[0], currentCopy=topic.relations[current.relation];
 const element=MingOracle.elements[reading.chart.index];
 $('report-topic').textContent=topic.title[language];
 $('report-element').textContent=element[language]+' · '+element.symbol;
 $('question-echo').textContent=reading.question;
 $('season-title').textContent=MingOracle.relations[current.relation][language];
 $('season-description').textContent=currentCopy.mood[language];
 const index=MingOracle.opening(rows);
 if(index!==-1){
  const item=rows[index],title=MingOracle.monthLabel(item,language);
  $('opening-description').textContent=language==='zh'?`${title}，可以作为这份象征解读中值得靠近的窗口。${actionText(topic,item)} 这是一项主动尝试的建议，不代表转机会自动发生。`:`${title} is a month to lean toward in this symbolic reading. ${actionText(topic,item)} Treat it as an invitation to act, not a promise that events will turn.`;
 }else{
  $('opening-description').textContent=language==='zh'?'接下来的两个月，意象更偏向整理与承接，尚不足以指定某个月为转机。先把眼前这一步落稳，让变化有地方停留。':'The next two months lean toward tending and stewardship in this symbolic lens. There is no clear month to name as a turning point; give a change somewhere steady to land.';
 }
 $('months').replaceChildren(...rows.map(item=>{
  const card=document.createElement('article');card.className='month-card';
  const passage=topic.relations[item.relation];
  card.append(textNode('small',MingOracle.monthLabel(item,language)),textNode('h3',MingOracle.relations[item.relation][language]));
  card.append(textNode('p',language==='zh'?`月份锚点 · ${item.stem} / ${MingOracle.elements[item.element].zh}`:`Calendar anchor · ${item.stem} / ${MingOracle.elements[item.element].en}`,'calendar-anchor'));
  card.append(textNode('p',passage.mood[language]));
  const action=textNode('p','','month-action');action.append(textNode('span',copy[language].monthAction),document.createTextNode(actionText(topic,item)));card.append(action);return card;
 }));
 $('alignment-action').textContent=actionText(topic,current);
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
$('reading-form').addEventListener('submit',event=>{
 event.preventDefault();
 const question=$('question').value.trim();
 $('question').setCustomValidity(question?'':copy[language].invalidQuestion);
 if(!$('reading-form').reportValidity())return;
 try{
  const chart=MingOracle.calculate($('birth-date').value,$('birth-time').value);
  reading={chart,question,startedAt:new Date()};selectedTopic=null;
 }catch(error){$('form-error').hidden=false;$('form-error').textContent=copy[language].calculationError;return;}
 $('form-error').hidden=true;renderNature();updateSelection();showPage('nature');
});
$('question').addEventListener('input',()=>$('question').setCustomValidity(''));
for(const button of document.querySelectorAll('[data-topic]'))button.addEventListener('click',()=>{selectedTopic=button.dataset.topic;updateSelection();});
$('continue-season').addEventListener('click',()=>{if(!reading||!selectedTopic)return;renderSeason();showPage('season');});
$('back-birth').addEventListener('click',()=>showPage('birth'));
for(const id of ['back-nature','choose-another'])$(id).addEventListener('click',()=>showPage('nature'));
$('download').addEventListener('click',()=>{
 if(!reading||!selectedTopic)return;
 const parts=['MING ORACLE',copy[language].natureHeading,$('element-title').textContent,$('personality').textContent,reading.chart.pillars.join(' · '),copy[language].chartNote,copy[language].seasonHeading,$('report-topic').textContent,$('question-echo').textContent,copy[language].symbolicNote,$('season-title').textContent,$('season-description').textContent,copy[language].openingHeading,$('opening-description').textContent,...Array.from($('months').children).map(card=>card.innerText),copy[language].practiceHeading,$('alignment-action').textContent,copy[language].watchHeading,$('alignment-watch').textContent,copy[language].method];
 const url=URL.createObjectURL(new Blob([parts.join('\n\n')],{type:'text/plain;charset=utf-8'}));
 const a=document.createElement('a');a.href=url;a.download=`ming-oracle-${selectedTopic}.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
setLanguage();

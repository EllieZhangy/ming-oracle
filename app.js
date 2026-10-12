let language = 'en';
let lastReading = null;
const $ = id => document.getElementById(id);
const elements = [
 {symbol:'木',en:'Wood · Make room to grow',zh:'木 · 留出成长的空间',textEn:'Wood offers an image of gradual growth. Consider where a small, steady beginning might serve you better than a dramatic leap.',textZh:'木象征逐步生长。试着想一想：在哪件事上，小而持续的开始，比一次巨大的跨越更适合你？'},
 {symbol:'火',en:'Fire · Notice what lights you up',zh:'火 · 看见你的热情',textEn:'Fire offers an image of warmth and expression. Notice what gives you energy, and where that energy needs a boundary.',textZh:'火象征温暖与表达。留意什么让你充满能量，也看看这份热情在哪些地方需要边界。'},
 {symbol:'土',en:'Earth · Return to your footing',zh:'土 · 找回你的支点',textEn:'Earth offers an image of steadiness and care. Look for the practical support that could make your next step feel more grounded.',textZh:'土象征稳定与照料。寻找那些实际的支持，让你的下一步更踏实。'},
 {symbol:'金',en:'Metal · Choose what matters',zh:'金 · 理清真正重要的事',textEn:'Metal offers an image of clarity and discernment. Consider what deserves your attention, and what you can gently release.',textZh:'金象征清晰与取舍。想想什么值得投入注意力，以及什么可以温和地放下。'},
 {symbol:'水',en:'Water · Allow another route',zh:'水 · 允许另一条路',textEn:'Water offers an image of adaptability and listening. Pause to notice whether a different route could meet the same underlying need.',textZh:'水象征适应与倾听。停下来看看：是否有另一条路，也能回应你真正的需要？'}
];
const prompts = {
 general:{en:['What do you know for certain, and what are you assuming?','Which part of this situation can you influence?','What is one small, reversible step you could take this week?'],zh:['哪些是已知事实，哪些是你的推测？','这件事里，什么是你可以影响的？','这周可以尝试哪个小而可撤回的行动？']},
 career:{en:['What matters most here: stability, learning, autonomy, or something else?','What information could you gather before making a change?','What small experiment could help you test your next direction?'],zh:['你最在意的是稳定、成长、自主，还是别的？','在做出改变前，你还可以收集什么信息？','哪个小实验能帮你验证下一个方向？']},
 relationship:{en:['What do you need, and have you expressed it clearly?','What have you observed directly, rather than guessed about the other person?','What respectful conversation or boundary could help you find clarity?'],zh:['你需要什么，是否已经清楚地表达？','关于对方，哪些是直接观察，哪些是猜测？','怎样的沟通或边界能帮助你看清这段关系？']}
};
const copy = {
 en:{headline:'Find a little clarity\nin the unknown.',subtitle:'Explore your question through the imagery of the five elements. A quiet ritual for reflection.',step:'01 / BIRTH & INTENTION','date-label':'Birth date','time-label':'Birth time · optional','place-label':'Birth city · optional','question-label':'What is on your mind?','theme-label':'A space to explore',privacy:'Your inputs stay in this page. Nothing is uploaded or saved.',submit:'Begin your reflection ↗',disclaimer:'Preliminary birth chart + symbolic reflection. For cultural exploration, not a prediction.','result-label':'YOUR REFLECTION','prompts-title':'Three questions to sit with',download:'Download reflection ↓',footer:'Rooted in symbolism. Open to possibility.'},
 zh:{headline:'在未知中，\n寻找一点清晰。',subtitle:'借五行的意象，重新看待你此刻的问题。给自己一段安静的思考时间。',step:'01 / 出生与心念','date-label':'出生日期','time-label':'出生时间 · 可选','place-label':'出生城市 · 可选','question-label':'此刻，你心中想到什么？','theme-label':'想探索的主题',privacy:'输入仅在当前页面使用，不上传，也不保存。',submit:'开启你的探索 ↗',disclaimer:'初步命盘与象征解读，用于文化探索，不预测未来。','result-label':'你的反思','prompts-title':'三个值得停下来想的问题',download:'下载本次解读 ↓',footer:'以传统意象为起点，为可能性留白。'}
};
function renderReading(){
 if(!lastReading) return;
 const e=elements[lastReading.index], zh=language==='zh';
 $('element-title').textContent=e[language];$('element-symbol').textContent=e.symbol;
 $('report-intro').textContent=zh?'一份以出生日期为起点的传统意象解读，陪你看见此刻的内在方向。':'A traditional symbolic reading, beginning with your birth date and opening toward the question you carry.';
 $('nature-label').textContent=zh?'01 / 你的五行底色':'01 / YOUR ELEMENTAL NATURE';
 $('result-description').textContent=MingOracle.personalities[lastReading.index][language];
 $('pillars').replaceChildren(...lastReading.chart.pillars.map((value,i)=>{
  const card=document.createElement('div');const label=document.createElement('small');label.textContent=(zh?['年柱','月柱','日柱','时柱']:['Year','Month','Day','Hour'])[i];const strong=document.createElement('strong');strong.textContent=value;card.append(label,strong);return card;
 }));
 $('chart-note').textContent=zh?'初步排盘：采用输入的民用钟表时间，午夜换日；未校正海外时区、夏令时、节气当地边界或真太阳时。未知时辰不显示时柱。日主五行是一种传统意象，不是完整性格测评。':'Preliminary chart: entered civil clock time, midnight day boundary. Overseas timezone, DST, local solar-term boundaries and apparent solar time are not corrected. Unknown birth time omits the hour pillar. The Day Master element is a traditional archetype, not a personality assessment.';
 $('question-echo').textContent=lastReading.question;
 $('season-label').textContent=zh?'02 / 此刻的气候与三个月节奏':'02 / YOUR PRESENT SEASON & THREE-MONTH RHYTHM';
 $('season-title').textContent=MingOracle.themes[lastReading.theme].title[language];
 $('season-description').textContent=MingOracle.themes[lastReading.theme].description[language];
 $('monthly-note').textContent=zh?'以下月份是创作性的反思节奏，不是根据命盘计算的流月吉凶或转机预言。':'The months below form a creative reflection sequence, not calculated monthly luck or predicted turning points.';
 $('months').replaceChildren(...MingOracle.months(lastReading.startedAt,language).map(item=>{
  const card=document.createElement('div');const label=document.createElement('small');label.textContent=item.month;const title=document.createElement('h4');title.textContent=item.title;const text=document.createElement('p');text.textContent=item.text;card.append(label,title,text);return card;
 }));
 $('alignment-label').textContent=zh?'03 / 顺势而行':'03 / YOUR ALIGNMENT PRACTICE';
 $('alignment-description').textContent=MingOracle.practices[lastReading.index][language];
 $('prompts').replaceChildren(...prompts[lastReading.theme][language].map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
 $('method').textContent=zh?'历法计算：lunar-javascript 1.7.7。性格、主题与月份文字是原创的传统意象模板，尚未接入古籍检索或 AI。出生信息与问题仅在页面内处理。':'Calendar engine: lunar-javascript 1.7.7. Archetypes, topic readings and monthly guidance are original symbolic templates; no classical-text retrieval or AI is connected. Your information stays on this page.';
}
function setLanguage(){
 document.documentElement.lang=language==='en'?'en':'zh-CN';
 for(const [id,text] of Object.entries(copy[language])) $(id).textContent=text;
 $('elements-label').textContent=language==='en'?'FIVE ELEMENTS · 五行':'五行 · FIVE ELEMENTS';
 $('headline').style.whiteSpace='pre-line';
 $('language').textContent=language==='en'?'中文':'English';
 $('question').placeholder=language==='en'?'A word, a feeling, or a question…':'一个词、一种感受，或一个问题……';
 ['general','career','relationship'].forEach((key,i)=>$('theme').options[i].textContent=(language==='en'?['Life & direction','Work & change','Love & connection']:['生活与方向','工作与变化','感情与联结'])[i]);
 renderReading();
}
$('language').addEventListener('click',()=>{language=language==='en'?'zh':'en';setLanguage();});
const today=new Date();$('birth-date').max=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
$('reading-form').addEventListener('submit',event=>{
 event.preventDefault();
 const question=$('question').value.trim();
 $('question').setCustomValidity(question?'':language==='en'?'Please enter a word or question.':'请输入一个词或问题。');
 if(!$('reading-form').reportValidity())return;
 let chart;
 try { chart=MingOracle.calculate($('birth-date').value,$('birth-time').value); }
 catch(error){$('error').hidden=false;$('error').textContent=language==='en'?'We could not calculate this date. Please check your inputs and reload the page.':'无法计算此日期，请检查输入并重新加载页面。';$('result').hidden=false;return;}
 $('error').hidden=true;
 lastReading={index:chart.index,chart,question,theme:$('theme').value,startedAt:new Date()};
 renderReading();$('result').hidden=false;$('result').focus();$('result').scrollIntoView({behavior:'smooth',block:'start'});
});
$('question').addEventListener('input',()=>$('question').setCustomValidity(''));
$('download').addEventListener('click',()=>{
 if(!lastReading)return;
 const text=['MING ORACLE',...Array.from($('result').children).filter(el=>el.id!=='download'&&el.id!=='error').map(el=>el.innerText)].join('\n\n');
 const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='ming-oracle-reflection.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
setLanguage();

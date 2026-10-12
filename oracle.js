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
 const themes={
 general:{title:{en:'A threshold, rather than a verdict',zh:'像一道门槛，而非一个定论'},description:{en:'Let your question mark a threshold. There may be room to loosen an old story before naming the next one. Treat any sense of resistance as an invitation to look closer: what is asking for patience, and what is asking for a small beginning?',zh:'让你的问题成为一道门槛。在为下一章命名之前，或许可以先松开一个旧的叙事。若感到阻力，不妨靠近看看：什么需要耐心，什么需要一个微小的开始？'}},
 career:{title:{en:'An opening you can help create',zh:'一处可以亲手打开的缝隙'},description:{en:'In work and direction, imagine a door that opens through attention rather than force. Your next chapter may begin with a conversation, an experiment, or a clearer boundary. Listen for possibilities, then let evidence help you decide which ones deserve your energy.',zh:'在工作与方向上，想象一扇因留心而非用力打开的门。下一章可以从一次交谈、一个尝试，或一道更清晰的边界开始。听见可能，再让事实帮助你辨认值得投入的方向。'}},
 relationship:{title:{en:'Space for a clearer kind of closeness',zh:'为更清晰的靠近留白'},description:{en:'In connection, let openness travel alongside discernment. A softer conversation may reveal more than searching for signs in silence. You can make room for closeness without abandoning the boundary that lets you remain yourself.',zh:'在联结中，让敞开与辨别同行。一次柔和的交谈，或许比在沉默里寻找征兆更能带来清晰。你可以为靠近留出空间，也守住让你成为自己的边界。'}}
 };
 const practices=[
 {en:'Make room before calling something new into your life. Place one small plant near your writing space, if it pleases you, and name one intention you can nourish through action. Let growth have a rhythm; notice when ambition begins to crowd out rest.',zh:'在邀请新事物进入生活之前，先留出空间。若你喜欢，可在书写处放一株小植物，写下一件能以行动滋养的心愿。让成长有节奏，也留意渴望是否挤走了休息。'},
 {en:'Give your intention a gentle voice. Write what you hope to welcome, then pair it with one honest conversation or creative act. Keep a pocket of quiet around your enthusiasm; being seen does not require saying yes to everything.',zh:'给心愿一个温柔的声音。写下想迎接的事物，再配上一次坦诚交谈或创作。给热情留一点安静；被看见，并不需要对所有事情说好。'},
 {en:'Build a small sanctuary of steadiness: a clear surface, a warm drink, a repeatable moment of rest. Write an intention that includes your own needs. Let care flow both ways, and notice where reliability turns into taking on too much.',zh:'用一处清爽桌面、一杯温饮、一段固定休息，建立小小的安稳之地。写下一个也包含自身需要的心愿。让照料双向流动，留意可靠是否变成了过度承担。'},
 {en:'Clear one corner and let that space stand for a deliberate choice. Name what you are available for, and what you can release. A boundary can be gentle and still hold; leave room to revise your intention when new information arrives.',zh:'整理一个角落，让这份留白象征一次主动选择。写下愿意迎接什么，以及可以放下什么。温和的边界也能坚定；当新信息到来，允许自己调整心愿。'},
 {en:'Begin with a pause: three slow breaths, then a few unedited lines in a journal. Ask what you want beneath the outcome you are chasing. Let intuition open a question, and use observable facts to choose your next step.',zh:'从停顿开始：三次缓慢呼吸，几行不加修饰的书写。问问自己，追逐的结果之下，真正想要什么。让直觉打开问题，再用可观察的事实选择下一步。'}
 ];
 const stages=[
 {en:['Make space','Let this month be a quiet clearing. Name what you hope to welcome, and set down one expectation that no longer fits.'],zh:['留白','让这个月成为一次安静的整理。说出想迎接什么，放下一份已不合身的期待。']},
 {en:['Meet the opening','Use the next month as a window for a small experiment or a thoughtful conversation. An opening is something to explore, not a promise to wait for.'],zh:['试着靠近','把下个月当作小小尝试或认真交谈的窗口。缝隙值得探索，却不必当成等待兑现的承诺。']},
 {en:['Let it take root','In the following month, return to what actually changed. Keep the practice that supported you, and gently release the story that did not.'],zh:['让它扎根','再下个月，回看实际发生了什么。留下支持你的行动，温和放下未得到事实回应的故事。']}
 ];
 function months(start,language){return stages.map((stage,i)=>({month:new Intl.DateTimeFormat(language==='zh'?'zh-CN':'en-US',{year:'numeric',month:'long'}).format(new Date(start.getFullYear(),start.getMonth()+i,1)),title:stage[language][0],text:stage[language][1]}));}
 root.MingOracle={calculate,personalities,themes,practices,months};
 if(typeof module!=='undefined')module.exports=root.MingOracle;
})(typeof window!=='undefined'?window:globalThis);

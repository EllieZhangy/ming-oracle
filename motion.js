/* One-shot, input-triggered glyph effects. No automatic playback. */
(function(root){
 function createMotion(env){
  const states=new WeakMap(), buttons=new Set();
  const preference=env.matchMedia?env.matchMedia('(prefers-reduced-motion: reduce)'):null;
  const now=()=>env.performance&&env.performance.now?env.performance.now():Date.now();
  function reset(button){
   const state=states.get(button);if(!state)return;
   if(state.timer!==null)env.clearTimeout(state.timer);
   state.timer=null;state.busy=false;state.cooldown=0;
   button.classList.remove('is-playing','motion-reduced');
  }
  function resetAll(){buttons.forEach(reset);}
  function play(button){
   const state=states.get(button);
   if(!state||state.busy||now()<state.cooldown)return false;
   const reduced=!!(preference&&preference.matches);
   state.busy=true;button.classList.toggle('motion-reduced',reduced);
   button.classList.add('is-playing');
   state.timer=env.setTimeout(()=>{
    button.classList.remove('is-playing','motion-reduced');
    state.busy=false;state.timer=null;state.cooldown=now()+450;
   },reduced?320:3000);
   return true;
  }
  function set(button,key,text,label){
   if(!env.MingGlyphs||!Object.prototype.hasOwnProperty.call(env.MingGlyphs,key))throw new Error('Unknown element motif');
   if(!states.has(button)){
    states.set(button,{timer:null,busy:false,cooldown:0});buttons.add(button);
    button.addEventListener('pointerenter',event=>{
     if(event.pointerType==='mouse'||event.pointerType==='pen')play(button);
    });
    button.addEventListener('click',()=>play(button));
   }
   reset(button);
   button.querySelector('.glyph-character').textContent=text;
   // All SVG markup is trusted project-authored content; user input never enters this layer.
   button.querySelector('.glyph-art').innerHTML=env.MingGlyphs[key];
   button.dataset.glyph=key;button.setAttribute('aria-label',label||text);
  }
  if(preference&&preference.addEventListener)preference.addEventListener('change',resetAll);
  if(env.document&&env.document.addEventListener)env.document.addEventListener('visibilitychange',()=>{if(env.document.hidden)resetAll();});
  if(env.addEventListener)env.addEventListener('pagehide',resetAll);
  return {set,play,resetAll};
 }
 root.MingMotion=createMotion(root);
 if(typeof module!=='undefined')module.exports={createMotion};
})(typeof window!=='undefined'?window:globalThis);

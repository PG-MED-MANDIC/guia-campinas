// Efeito parallax: elementos com data-parallax="velocidade" se movem em ritmo diferente do scroll.
// Usa a propriedade CSS `translate`, que não conflita com os `transform` de hover/rotação.
import {$$} from '../utils/dom.js';

export function initParallax(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const items=$$('[data-parallax]').map(el=>({
    el,
    speed:parseFloat(el.dataset.parallax),
    parent:el.parentElement,
    fromTop:!!el.closest('.cover')
  }));
  let ticking=false;

  function update(){
    const vh=innerHeight;
    items.forEach(({el,speed,parent,fromTop})=>{
      const r=parent.getBoundingClientRect();
      if(r.bottom<-200||r.top>vh+200)return;
      const offset=fromTop?scrollY:(r.top+r.height/2-vh/2);
      el.style.translate=`0 ${(-offset*speed).toFixed(1)}px`;
    });
    ticking=false;
  }

  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});
  addEventListener('resize',update);
  update();
}

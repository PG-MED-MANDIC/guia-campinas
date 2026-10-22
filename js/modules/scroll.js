// Barra de progresso, item ativo do menu, animação de entrada e âncora inicial.
import {CHAPTERS} from '../data/chapters.js';
import {$,$$} from '../utils/dom.js';

export function initScroll(){
  const secs=[...CHAPTERS.map(c=>c.id),'mapa'].map(id=>document.getElementById(id));
  addEventListener('scroll',()=>{
    const h=document.documentElement;
    $('.topbar').classList.toggle('scrolled',h.scrollTop>10);
    $('#progress').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
    let cur='';
    secs.forEach(s=>{if(s.getBoundingClientRect().top<160)cur=s.id});
    $$('.toc a').forEach(a=>a.classList.toggle('on',a.dataset.id===cur));
  },{passive:true});

  const io=new IntersectionObserver(es=>es.forEach(en=>{
    if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}
  }),{rootMargin:'0px 0px -8% 0px'});
  // Escalonamento: cards da mesma linha entram com pequeno atraso.
  $$('.cards').forEach(g=>[...g.children].forEach((c,i)=>c.style.setProperty('--d',(i%3)*0.08+'s')));
  $$('.reveal').forEach(el=>io.observe(el));

  if(location.hash){
    const t=document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if(t)setTimeout(()=>t.scrollIntoView(),50);
  }
}

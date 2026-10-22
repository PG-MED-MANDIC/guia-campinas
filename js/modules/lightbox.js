// Galeria de fotos em tela cheia.
import {PLACES} from '../data/places.js';
import {$} from '../utils/dom.js';
import {img} from '../utils/urls.js';

const LB={p:null,i:0};

function show(){
  const p=LB.p;
  $('#lb img').src=img(p.imgs[LB.i]);
  $('#lb .cap').textContent=p.name+(p.imgs.length>1?`  ·  ${LB.i+1}/${p.imgs.length}`:'');
  $('#lb .pv').style.display=$('#lb .nx').style.display=p.imgs.length>1?'':'none';
}

export function openLightbox(id,i=0){
  LB.p=PLACES.find(x=>x.id===id);
  LB.i=i;
  show();
  $('#lb').classList.add('on');
}

const close=()=>$('#lb').classList.remove('on');
const prev=()=>{LB.i=(LB.i-1+LB.p.imgs.length)%LB.p.imgs.length;show()};
const next=()=>{LB.i=(LB.i+1)%LB.p.imgs.length;show()};

export function initLightbox(){
  $('#lb .x').onclick=close;
  $('#lb').addEventListener('click',e=>{if(e.target.id==='lb')close()});
  $('#lb .pv').onclick=prev;
  $('#lb .nx').onclick=next;
  document.addEventListener('keydown',e=>{
    if(!$('#lb').classList.contains('on'))return;
    if(e.key==='Escape')close();
    if(e.key==='ArrowLeft')prev();
    if(e.key==='ArrowRight')next();
  });
}

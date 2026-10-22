// Barra de filtros: arrastar com o mouse, indicadores de borda e chip ativo centralizado.
import {$} from '../utils/dom.js';

export function initChipsScroll(){
  const box=$('#chips');
  const sync=()=>{
    box.classList.toggle('fade-l',box.scrollLeft>4);
    box.classList.toggle('fade-r',box.scrollLeft+box.clientWidth<box.scrollWidth-4);
  };
  box.addEventListener('scroll',sync,{passive:true});
  addEventListener('resize',sync);
  sync();

  // Arrastar com o mouse (no toque o navegador já rola sozinho).
  let down=false,moved=false,startX=0,startLeft=0;
  box.addEventListener('pointerdown',e=>{
    if(e.pointerType!=='mouse')return;
    down=true;moved=false;startX=e.clientX;startLeft=box.scrollLeft;
  });
  addEventListener('pointermove',e=>{
    if(!down)return;
    const dx=e.clientX-startX;
    if(Math.abs(dx)>4){moved=true;box.classList.add('dragging')}
    if(moved)box.scrollLeft=startLeft-dx;
  });
  addEventListener('pointerup',()=>{down=false;box.classList.remove('dragging')});
  // Evita que o fim de um arraste dispare o clique no chip.
  box.addEventListener('click',e=>{if(moved){e.stopPropagation();e.preventDefault();moved=false}},true);
}

export function centerChip(chip){
  const box=chip.parentElement;
  box.scrollTo({left:chip.offsetLeft-(box.clientWidth-chip.offsetWidth)/2,behavior:'smooth'});
}

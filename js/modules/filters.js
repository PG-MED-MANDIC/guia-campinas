// Busca por texto e filtro por capítulo / roteiro.
import {PLACES} from '../data/places.js';
import {$,$$} from '../utils/dom.js';
import {isFav} from './favorites.js';
import {centerChip} from './chips-scroll.js';

let filter='all';
export const getFilter=()=>filter;

export function applyFilters(){
  const q=$('#q').value.trim().toLowerCase();let n=0;
  $$('.card').forEach(c=>{
    const p=PLACES.find(x=>x.id===c.dataset.id);
    const ok=(filter==='all'||filter===p.ch||(filter==='fav'&&isFav(p.id)))&&(!q||c.dataset.text.includes(q));
    c.style.display=ok?'':'none';
    if(ok){n++;c.classList.add('in')}
  });
  $$('section.sec').forEach(s=>s.style.display=[...s.querySelectorAll('.card')].some(c=>c.style.display!=='none')?'':'none');
  $('#empty').style.display=n?'none':'block';
  $('#empty').textContent=(filter==='fav'&&!n)
    ?'Você ainda não salvou nenhum lugar. Toque no marcador de uma foto para montar seu roteiro.'
    :'Nenhum lugar encontrado. Tente outra busca.';
}

export function selectChip(chip){
  filter=chip.dataset.f;
  $$('.chip').forEach(x=>x.classList.toggle('on',x===chip));
  centerChip(chip);
  applyFilters();
}

export function initFilters(){
  $('#q').addEventListener('input',applyFilters);
}

// "Meu roteiro": lugares salvos, persistidos no localStorage do navegador.
import {PLACES} from '../data/places.js';
import {CHAPTERS} from '../data/chapters.js';
import {$,$$,esc} from '../utils/dom.js';
import {img,routeUrl} from '../utils/urls.js';
import {ICON} from '../ui/icons.js';

const KEY='guiaCampinasFavs';
let favs=[];
try{favs=JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){}

export const isFav=id=>favs.includes(id);

function persist(){
  try{localStorage.setItem(KEY,JSON.stringify(favs))}catch(e){}
  $('#favCount').textContent=favs.length;
  $('#favCount').dataset.n=favs.length;
}

export function renderFavs(){
  const list=favs.map(id=>PLACES.find(p=>p.id===id)).filter(Boolean);
  $('#favList').innerHTML=list.length?list.map(p=>`<a class="it" href="#lugar-${p.id}">${p.imgs.length?`<img src="${img(p.imgs[0])}" alt="">`:`<span class="noimg">${ICON.stage}</span>`}<div><b>${esc(p.name)}</b><small>${esc(CHAPTERS.find(c=>c.id===p.ch).title)}</small></div></a>`).join('')
   +`<a class="btn gold" target="_blank" rel="noopener" href="${routeUrl(list)}">${ICON.pin} Abrir roteiro no Maps</a>`
   :'<div class="none">Toque no marcador nas fotos dos lugares para salvar aqui o seu roteiro em Campinas.</div>';
}

export function toggleFav(id){
  favs=isFav(id)?favs.filter(x=>x!==id):[...favs,id];
  $$(`[data-fav="${id}"]`).forEach(b=>b.classList.toggle('on',isFav(id)));
  persist();
  renderFavs();
}

export function initFavorites(){
  persist();
  renderFavs();
}

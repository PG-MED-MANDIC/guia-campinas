// Montagem do HTML dinâmico: campus, sumário, cards e lista do mapa.
import {CHAPTERS} from '../data/chapters.js';
import {PLACES} from '../data/places.js';
import {LINKS} from '../data/links.js';
import {$,$$,esc} from '../utils/dom.js';
import {img,igUrl,mapUrl,mapsSearchUrl} from '../utils/urls.js';
import {ICON} from './icons.js';
import {isFav} from '../modules/favorites.js';

export function renderStaticImages(){
  $$('[data-img]').forEach(el=>el.src=img(el.dataset.img));
}

export function renderCampus(){
  const C=LINKS.campus||{};
  $('#campusLinks').innerHTML=
    `<a class="btn gold" target="_blank" rel="noopener" href="${mapsSearchUrl(C.maps||'Faculdade São Leopoldo Mandic Campinas')}">${ICON.pin} Como chegar</a>`+
    (C.ig?`<a class="btn ghost" target="_blank" rel="noopener" href="${igUrl(C.ig)}">${ICON.ig} @${esc(C.ig)}</a>`:'')+
    (C.addr?`<div class="campus-addr">${esc(C.addr)}</div>`:'');
}

export function renderNav(){
  $('#toc').innerHTML=CHAPTERS.map(c=>`<a href="#${c.id}" data-id="${c.id}">${c.title}</a>`).join('')+'<a href="#mapa" data-id="mapa">Mapa</a>';
  $('#chapGrid').innerHTML=CHAPTERS.map(c=>`<a class="chap" href="#${c.id}"><img src="${img(c.img)}" alt="" data-parallax="0.08"><div class="t"><div class="n">CAPÍTULO ${c.n}</div><h3>${c.title}</h3><small>${PLACES.filter(p=>p.ch===c.id).length} lugares · ${c.sub}</small></div></a>`).join('');
  $('#chips').innerHTML=`<button class="chip on" data-f="all">Todos</button>`+CHAPTERS.map(c=>`<button class="chip" data-f="${c.id}">${c.title}</button>`).join('')+`<button class="chip" data-f="fav">★ Meu roteiro</button>`;
}

function card(p){
  const L=LINKS[p.id]||{};
  const hasMore=p.facts.length||p.tip;
  return `<article class="card reveal" id="lugar-${p.id}" data-id="${p.id}" data-text="${esc((p.name+' '+(p.sub||'')+' '+p.tag+' '+p.desc+' '+(L.addr||'')+' '+p.facts.map(f=>f.join(' ')).join(' ')).toLowerCase())}">
   <div class="ph${p.imgs.length?'':' art'}" ${p.imgs.length?`data-gal="${p.id}"`:''}>${p.imgs.length?`<img loading="lazy" src="${img(p.imgs[0])}" alt="${esc(p.name)}">`:`<div class="noimg">${ICON.stage}<b>${esc(p.name)}</b></div>`}<span class="tag">${esc(p.tag)}</span>
     ${p.imgs.length>1?`<span class="count">1/${p.imgs.length} fotos</span>`:''}
     <button class="fav ${isFav(p.id)?'on':''}" data-fav="${p.id}" aria-label="Salvar no meu roteiro" title="Salvar no meu roteiro">${ICON.heart}</button></div>
   <div class="body">
     <h3>${esc(p.name)}</h3>${p.sub?`<div class="sub">${esc(p.sub)}</div>`:''}
     <p>${esc(p.desc)}</p>
     ${hasMore?`<ul class="facts extra">${p.facts.map(f=>`<li><b>${f[0]}:</b> ${esc(f[1])}</li>`).join('')}${p.tip?`<li class="tip">💡 ${esc(p.tip)}</li>`:''}</ul><button class="more">Ver detalhes +</button>`:''}
     ${L.addr?`<div class="addr">${ICON.pin}<span>${esc(L.addr)}</span></div>`:''}
   </div>
   <div class="actions">
     <a class="act map" target="_blank" rel="noopener" href="${mapUrl(p)}">${ICON.pin} Como chegar</a>
     ${L.ig?`<a class="act ig" target="_blank" rel="noopener" href="${igUrl(L.ig)}">${ICON.ig} Instagram</a>`:''}
     ${L.site?`<a class="act" target="_blank" rel="noopener" href="${esc(L.site)}">${ICON.web} Site</a>`:''}
   </div>
  </article>`;
}

export function renderSections(){
  $('#content').innerHTML=CHAPTERS.map(c=>`
 <section class="sec" id="${c.id}" data-ch="${c.id}">
  <div class="sec-head reveal"><div><div class="n">Capítulo ${c.n}</div><h2>${c.title}</h2><p>${c.intro}</p></div></div>
  <div class="cards">${PLACES.filter(p=>p.ch===c.id).map(card).join('')}</div>
 </section>`).join('');
}

export function renderMapList(){
  $('#mapList').innerHTML=PLACES.map(p=>{
    const c=CHAPTERS.find(x=>x.id===p.ch);
    return `<li><a target="_blank" rel="noopener" href="${mapUrl(p)}"><span class="dot" style="background:${c.color}"></span>${esc(p.name)}</a></li>`;
  }).join('');
}

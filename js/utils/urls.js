// Construção de URLs de imagens, Google Maps e Instagram.
import {LINKS} from '../data/links.js';

export const img=k=>k?(k==='logo'?'img/logo.png':'img/'+k+'.jpg'):'';
export const igUrl=h=>'https://www.instagram.com/'+h+'/';
export const mapsSearchUrl=q=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q);

export const mapQ=p=>{
  const L=LINKS[p.id]||{};
  return (L.maps||(L.addr?p.name+', '+L.addr:p.name+', Campinas - SP')).replace(/ · /g,', ');
};
export const mapUrl=p=>mapsSearchUrl(mapQ(p));
export const routeUrl=places=>'https://www.google.com/maps/dir/'+places.map(p=>encodeURIComponent(mapQ(p))).join('/');

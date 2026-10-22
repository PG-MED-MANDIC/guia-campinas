// Ponto de entrada: monta a página e liga os módulos.
import {renderStaticImages,renderCampus,renderNav,renderSections,renderMapList} from './ui/render.js';
import {initFavorites,toggleFav} from './modules/favorites.js';
import {initFilters,applyFilters,selectChip,getFilter} from './modules/filters.js';
import {initLightbox,openLightbox} from './modules/lightbox.js';
import {initDrawer} from './modules/drawer.js';
import {initTheme} from './modules/theme.js';
import {initScroll} from './modules/scroll.js';
import {initParallax} from './modules/parallax.js';
import {initChipsScroll} from './modules/chips-scroll.js';

renderStaticImages();
renderCampus();
renderNav();
renderSections();
renderMapList();

initFavorites();
initFilters();
initLightbox();
initDrawer();
initTheme();
initScroll();
initParallax();
initChipsScroll();

// Delegação de eventos dos elementos gerados dinamicamente.
document.addEventListener('click',e=>{
  const f=e.target.closest('[data-fav]');
  if(f){
    e.stopPropagation();
    toggleFav(f.dataset.fav);
    if(getFilter()==='fav')applyFilters();
    return;
  }
  const m=e.target.closest('.more');
  if(m){
    const c=m.closest('.card');
    c.classList.toggle('open');
    m.textContent=c.classList.contains('open')?'Ver menos −':'Ver detalhes +';
    return;
  }
  const g=e.target.closest('[data-gal]');
  if(g){openLightbox(g.dataset.gal,0);return;}
  const chip=e.target.closest('.chip');
  if(chip)selectChip(chip);
});

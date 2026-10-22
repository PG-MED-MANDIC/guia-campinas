// Alternância entre tema claro e escuro.
import {$} from '../utils/dom.js';

export function initTheme(){
  $('#themeBtn').onclick=()=>{
    const r=document.documentElement;
    const dark=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
    r.dataset.theme=dark?'light':'dark';
  };
}

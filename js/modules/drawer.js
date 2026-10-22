// Gaveta lateral "Meu roteiro".
import {$} from '../utils/dom.js';

const toggle=on=>{$('#drawer').classList.toggle('on',on);$('#scrim').classList.toggle('on',on)};

export function initDrawer(){
  $('#favBtn').onclick=()=>toggle(true);
  $('#closeDrawer').onclick=$('#scrim').onclick=()=>toggle(false);
  $('#favList').addEventListener('click',e=>{if(e.target.closest('.it'))toggle(false)});
}

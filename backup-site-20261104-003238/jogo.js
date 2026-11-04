document.addEventListener('DOMContentLoaded',()=>{
const board=document.getElementById('board'),moves=document.getElementById('moves'),progress=document.getElementById('progress'),win=document.getElementById('win'),hearts=document.getElementById('hearts');
let order=[],selected=null,count=0,won=false;
function render(){board.replaceChildren();order.forEach((piece,index)=>{const btn=document.createElement('button');btn.className='piece'+(selected===index?' selected':'');btn.type='button';btn.setAttribute('aria-label',`Peça ${piece+1}, posição ${index+1}`);btn.style.backgroundPosition=`${(piece%3)*50}% ${Math.floor(piece/3)*100/3}%`;btn.addEventListener('click',()=>choose(index));board.append(btn)});moves.textContent=`Movimentos: ${count}`;progress.textContent=`${order.filter((v,i)=>v===i).length} de 12 no lugar`}
function choose(index){if(won)return;if(selected===null){selected=index;render();return}if(selected===index){selected=null;render();return}[order[selected],order[index]]=[order[index],order[selected]];selected=null;count++;render();if(order.every((v,i)=>v===i)){won=true;win.hidden=false;board.style.pointerEvents='none';for(let i=0;i<35;i++)setTimeout(makeHeart,i*85)}}
function makeHeart(){const h=document.createElement('span');h.className='heart';h.textContent=Math.random()>.5?'♥':'♡';h.style.left=Math.random()*100+'%';hearts.append(h);setTimeout(()=>h.remove(),3600)}
function shuffle(){order=Array.from({length:12},(_,i)=>i);for(let i=11;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]]}if(order.every((v,i)=>v===i))[order[0],order[1]]=[order[1],order[0]];count=0;selected=null;won=false;win.hidden=true;board.style.pointerEvents='';render()}
document.getElementById('restart').addEventListener('click',shuffle);shuffle();
});


const eventDate = new Date("2026-01-31T17:00:00").getTime();
const music = document.getElementById('bgMusic');
let playing=false;

function toggleMusic(){
 if(!playing){ music.play(); playing=true; }
 else{ music.pause(); playing=false; }
}

setInterval(()=>{
 const now=new Date().getTime();
 const diff=eventDate-now;
 const v=[
  Math.floor(diff/(1000*60*60*24)),
  Math.floor((diff/(1000*60*60))%24),
  Math.floor((diff/(1000*60))%60),
  Math.floor((diff/1000)%60)
 ];
 ['days','hours','minutes','seconds'].forEach((id,i)=>{
  document.getElementById(id).innerText=Math.max(0,v[i]);
 });
},1000);

/* Advanced slider logic */
const slider=document.querySelector('.slider-track');
const imgs=[...slider.children];

function updateActive(){
 const center=slider.scrollLeft+slider.offsetWidth/2;
 imgs.forEach(img=>{
  const imgCenter=img.offsetLeft+img.offsetWidth/2;
  img.classList.toggle('active', Math.abs(center-imgCenter)<img.offsetWidth/2);
 });
}
slider.addEventListener('scroll',updateActive);
updateActive();

/* Scroll reveal */
const observer=new IntersectionObserver(entries=>{
 entries.forEach(e=>{
  if(e.isIntersecting) e.target.classList.add('show');
 });
},{threshold:.3});

observer.observe(document.querySelector('.advanced-gallery'));


/* Slider arrows */
function slideLeft(){
 const s=document.querySelector('.slider-track');
 s.scrollBy({left:-300,behavior:'smooth'});
}
function slideRight(){
 const s=document.querySelector('.slider-track');
 s.scrollBy({left:300,behavior:'smooth'});
}

/* Lightbox */
document.querySelectorAll('.slider-track img').forEach(img=>{
 img.addEventListener('click',()=>{
  document.getElementById('lightbox-img').src=img.src;
  document.getElementById('lightbox').style.display='flex';
 });
});

function closeLightbox(){
 document.getElementById('lightbox').style.display='none';
}


/* === FIX NAVEGACION SLIDER === */
function slideLeft(){
  const s=document.querySelector('.slider-track');
  s.scrollBy({ left: -s.clientWidth * 0.8, behavior: 'smooth' });
}
function slideRight(){
  const s=document.querySelector('.slider-track');
  s.scrollBy({ left: s.clientWidth * 0.8, behavior: 'smooth' });
}


/* === FIX DEFINITIVO FLECHA IZQUIERDA (WINDOWS) === */
function getClosestIndex(){
  const slider = document.querySelector('.slider-track');
  const imgs = [...slider.children];
  const center = slider.scrollLeft + slider.clientWidth / 2;
  let closest = 0;
  let minDist = Infinity;

  imgs.forEach((img, i) => {
    const imgCenter = img.offsetLeft + img.offsetWidth / 2;
    const dist = Math.abs(center - imgCenter);
    if (dist < minDist) {
      minDist = dist;
      closest = i;
    }
  });
  return closest;
}

function slideLeft(){
  const slider = document.querySelector('.slider-track');
  const imgs = [...slider.children];
  const i = Math.max(0, getClosestIndex() - 1);
  slider.scrollTo({ left: imgs[i].offsetLeft, behavior: 'smooth' });
}

function slideRight(){
  const slider = document.querySelector('.slider-track');
  const imgs = [...slider.children];
  const i = Math.min(imgs.length - 1, getClosestIndex() + 1);
  slider.scrollTo({ left: imgs[i].offsetLeft, behavior: 'smooth' });
}


/* === BRILLOS ANIMADOS SUAVES === */
const canvas = document.querySelector('.sparkles');
const ctx = canvas.getContext('2d');
let w, h, particles=[];

function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

for(let i=0;i<50;i++){
  particles.push({
    x:Math.random()*w,
    y:Math.random()*h,
    r:Math.random()*1.5+0.5,
    vy:Math.random()*0.2+0.05,
    a:Math.random()*0.4+0.1
  });
}

function animate(){
  ctx.clearRect(0,0,w,h);
  particles.forEach(p=>{
    p.y += p.vy;
    if(p.y > h) p.y = 0;
    ctx.fillStyle = `rgba(255,255,255,${p.a})`;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

/* === FIX FLECHA IZQUIERDA DEFINITIVO === */
function slideLeft(){
  const slider = document.querySelector('.slider-track');
  const imgs = [...slider.children];
  let index = 0;
  let min = Infinity;
  imgs.forEach((img,i)=>{
    const d = Math.abs(img.offsetLeft - slider.scrollLeft);
    if(d < min){ min = d; index = i; }
  });
  slider.scrollTo({
    left: imgs[Math.max(0,index-1)].offsetLeft,
    behavior:'smooth'
  });
}

function slideRight(){
  const slider = document.querySelector('.slider-track');
  const imgs = [...slider.children];
  let index = 0;
  let min = Infinity;
  imgs.forEach((img,i)=>{
    const d = Math.abs(img.offsetLeft - slider.scrollLeft);
    if(d < min){ min = d; index = i; }
  });
  slider.scrollTo({
    left: imgs[Math.min(imgs.length-1,index+1)].offsetLeft,
    behavior:'smooth'
  });
}


// ================= PREMIUM FX (NO NEW FILES) =================

// Hover effect for countdown items
const fxHoverTargets = document.querySelectorAll(
  '.countdown div, .contador div, .count-box, section div'
);

fxHoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.classList.add('fx-hover');
  });
  el.addEventListener('mouseleave', () => {
    el.classList.remove('fx-hover');
  });
});

// Scroll active highlight
const fxObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle('fx-active', entry.isIntersecting);
  });
}, { threshold: 0.55 });

fxHoverTargets.forEach(el => fxObserver.observe(el));

// =============================================================

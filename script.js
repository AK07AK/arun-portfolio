const progress=document.getElementById('progress');
window.addEventListener('scroll',()=>{
  const h=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(window.scrollY/h*100)+'%';
});
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.1,rootMargin:'0px 0px -5% 0px'});
document.querySelectorAll('.reveal').forEach(el=>{
  observer.observe(el);
  // Elements already on screen at load (e.g. above the fold, or tall
  // cards like the experience section) should be visible immediately
  // rather than waiting on a scroll event that may never come.
  const r=el.getBoundingClientRect();
  if(r.top<window.innerHeight&&r.bottom>0)el.classList.add('visible');
});

// Highlight the nav link for the section currently in view
const navLinks=document.querySelectorAll('.navbar nav a');
const linkFor=id=>[...navLinks].find(a=>a.getAttribute('href')===`#${id}`);
const navObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    const link=linkFor(entry.target.id);
    if(!link)return;
    if(entry.isIntersecting)navLinks.forEach(a=>a.classList.toggle('active',a===link));
  });
},{rootMargin:'-45% 0px -50% 0px',threshold:0});
document.querySelectorAll('main section[id]').forEach(sec=>navObserver.observe(sec));

const menu=document.getElementById('menu');
const nav=document.querySelector('.navbar nav');
menu?.addEventListener('click',()=>{
  const open=nav.style.display==='flex';
  nav.style.display=open?'none':'flex';
  nav.style.position='absolute';
  nav.style.top='76px';
  nav.style.left='0';
  nav.style.right='0';
  nav.style.padding='22px 6vw';
  nav.style.flexDirection='column';
  nav.style.background='white';
  nav.style.borderBottom='1px solid #dfe8f5';
});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>nav.style.display='none'));

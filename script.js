const toggler = document.querySelector('.navbar-toggler');
const navbar = document.querySelector('.navbar-collapse');
var switcher = true;
const callFrame = document.querySelector('.call-frame');
const logo = document.getElementById('logo');
const logoFrame = document.querySelector('.flex-center');
const logoText = document.querySelector('.disappear-large-text');

var map = L.map('map').setView([44.8189, 20.4559], 15); // Promenjene koordinate na Dorćol, Beograd
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
 
}).addTo(map);
// Dodavanje markera na Dorćol
L.marker([44.8189, 20.4559]) 
  .addTo(map)
  .bindPopup('We are here.') 
  .openPopup();
  toggler.addEventListener('click', () => {
  if (switcher) {
    logoFrame.classList.add('logo-frame-toggle');
    logo.classList.add('logo-toggle');
    logoText.style.width='300px';
  } else {
    
      logoFrame.classList.remove('logo-frame-toggle');
      logo.classList.remove('logo-toggle');
      logoText.style.width='200px';
  }
  switcher = !switcher;
});
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    
      logoFrame.classList.remove('logo-frame-toggle');
      logo.classList.remove('logo-toggle');
      logoText.style.width='200px';
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
    setTimeout(() => {
      if(window.innerWidth<768){
        window.scrollBy(0, -60); 
      }
    }, 1000);
    switcher = true;
  });
});
function adjustLineBreak() {
  const span = document.querySelector('.br-tag');
  
  if (window.innerWidth < 768) {
      if (!span.innerHTML.includes('<br>')) {
          span.innerHTML = '<br>' + span.innerText;
      }
  } else {
      span.innerHTML = span.innerHTML.replace('<br>', '');
  }
}
window.addEventListener('load', () => {
  window.scrollTo(0, 0); 
  adjustLineBreak()
});
window.onresize = adjustLineBreak;
window.addEventListener('scroll',()=>{
   callFrame.style.display='flex';
   window.addEventListener('scrollend',()=>{
    setTimeout(()=>{
      callFrame.style.display='none';
     }, 3000)
   })
});

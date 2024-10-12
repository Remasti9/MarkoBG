const toggler = document.querySelector('.navbar-toggler');
const navbar = document.querySelector('.navbar-collapse');
var switcher = true;
const callFrame = document.querySelector('.call-frame');
const logo = document.getElementById('logo');
const logoFrame = document.querySelector('.flex-center');
const logoText = document.querySelector('.disappear-large-text');

var map = L.map('map', {
  center: [44.8189, 20.4559],  // Dorćol, Beograd
  zoom: 15,
  dragging: !L.Browser.mobile,  // Onemogući dragging na mobilnim uređajima
  touchZoom: true,  // Dozvoljava touch zoom
  tap: false,  // Sprečava zoom na jedan prst
  zoomControl: false  // Ako želite sakriti dugmiće za zoom
});

// Dodavanje tile sloja
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

// Dodavanje markera na Dorćolu
L.marker([44.8189, 20.4559])
  .addTo(map)
  .bindPopup('We are here.')
  .openPopup();

// Dodavanje ograničenja za dva prsta na mobilnim uređajima
map.touchZoom.disable();  // Onemogući touch zoom u jednom prstu
map.touchZoom.enable({ touch: 2 });  // Omogući zoom samo sa dva prsta

map.getContainer().addEventListener('touchstart', function(event) {
  if (event.touches.length === 1) {
    var notification = document.getElementById('notification');
    notification.style.display = 'block';

    // Sakrij obaveštenje nakon 2 sekunde
    setTimeout(function() {
      notification.style.display = 'none';
    }, 2000);
  }
});





  toggler.addEventListener('click', () => {
  if (switcher) {
    logoFrame.classList.add('logo-frame-toggle');
    logo.classList.add('logo-toggle');
    logoText.style.width='250px';
    logoText.style.marginLeft='5%';
  } else {
    
      logoFrame.classList.remove('logo-frame-toggle');
      logo.classList.remove('logo-toggle');
      logoText.style.width='150px';
      logoText.style.marginLeft='0%';
  }
  switcher = !switcher;
});
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    
      logoFrame.classList.remove('logo-frame-toggle');
      logo.classList.remove('logo-toggle');
      logoText.style.width='150px';
      logoText.style.marginLeft='0%';
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
  if(window.innerWidth>=768 && window.innerWidth<992){
    logoFrame.style.display='none';
  }else{
    logoFrame.style.display='flex';
  }
  
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

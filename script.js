
const mapLeaflet= document.getElementById('map');
const imgAboutUs = document.getElementById('img-about-us');
const toggler = document.querySelector('.navbar-toggler');
const callNumber = document.querySelector('.disappear-large');
const navbar = document.querySelector('.navbar-collapse');
var switcher = true;

const text1 = document.getElementById('text1-animated');
const text2 = document.getElementById('text2-animated');
const text3 = document.getElementById('text3-animated');





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

window.addEventListener('load', () => {
  window.scrollTo(0, 0); 
  removeWow();
});
window.addEventListener('resize', removeWow);




toggler.addEventListener('click', () => {
  if (switcher) {
    callNumber.classList.add('margin-auto');
  } else {
    setTimeout(()=>{callNumber.classList.remove('margin-auto');},300);
    
  }
  switcher = !switcher;
});

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show');
      setTimeout(()=>{callNumber.classList.remove('margin-auto');},300);
    }
    switcher = true;
  });
});

function removeWow() {
  if (window.innerWidth < 768) {
    imgAboutUs.style.visibility = 'visible'; // Postavi na vidljivo
    mapLeaflet.style.visibility = 'visible'; // Postavi na vidljivo
    text1.style.visibility = 'visible';
    text2.style.visibility = 'visible';
    text3.style.visibility = 'visible';

    imgAboutUs.classList.remove('animate__animated');
    imgAboutUs.classList.remove('animate__backInRight');
    
    mapLeaflet.classList.remove('animate__animated');
    mapLeaflet.classList.remove('animate__backInRight');

    text1.classList.remove('animate__animated');
    text1.classList.remove('animate__backInUp');

    text2.classList.remove('animate__animated');
    text2.classList.remove('animate__backInUp');

    text3.classList.remove('animate__animated');
    text3.classList.remove('animate__backInUp');
  } else {
    imgAboutUs.style.visibility = 'visible'; // Postavi na vidljivo
    mapLeaflet.style.visibility = 'visible'; // Postavi na vidljivo
    text1.style.visibility = 'visible';
    text2.style.visibility = 'visible';
    text3.style.visibility = 'visible';

    imgAboutUs.classList.add('animate__animated');
    imgAboutUs.classList.add('animate__backInRight');
    
    mapLeaflet.classList.add('animate__animated');
    mapLeaflet.classList.add('animate__backInRight');

    text1.classList.add('animate__animated');
    text1.classList.add('animate__backInUp');

    text2.classList.add('animate__animated');
    text2.classList.add('animate__backInUp');

    text3.classList.add('animate__animated');
    text3.classList.add('animate__backInUp');
  }
}

const toggler = document.querySelector('.navbar-toggler');
const callNumber = document.querySelector('.disappear-large');
const navbar = document.querySelector('.navbar-collapse');
var switcher = true;
var map = L.map('map').setView([44.8189, 20.4559], 15); // Promenjene koordinate na Dorćol, Beograd
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
  scrollWheelZoom: false,
  doubleClickZoom: false ,
}).addTo(map);
// Dodavanje markera na Dorćol
L.marker([44.8189, 20.4559]) 
  .addTo(map)
  .bindPopup('We are here.') 
  .openPopup();

  map.on('zoomend', function() {
    if (map.getZoom() < 13) {
        map.setZoom(13); // Vraća nivo uvećanja na minimum ako je manji
    }
});

// Onemogućavanje premestanja mape na dodir jednim prstom
map.on('click', function(e) {
    e.preventDefault(); // Sprečava premestanje mape na klik
});

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
    setTimeout(() => {
      window.scrollBy(0, -30); // Pomeranje stranice za 30px niže
    }, 1000);
    switcher = true;
  });
});
window.addEventListener('load', () => {
  window.scrollTo(0, 0); 
});
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
setTimeout(function() {
  L.marker([44.8189, 20.4559])
    .addTo(map)
    .bindPopup('Tu smo! Koristite dva prsta za mapiranje.')
    .openPopup();
}, 1000);

// Dodavanje ograničenja za dva prsta na mobilnim uređajima
map.touchZoom.disable();  // Onemogući touch zoom u jednom prstu
map.touchZoom.enable({ touch: 2 });  // Omogući zoom samo sa dva prsta

var locateControl = L.control({ position: 'topleft' });
var routingControl; // Globalna promenljiva za Routing Control

locateControl.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    div.innerHTML = 'Directions'; 
    div.style.backgroundColor = 'white';
    div.style.color = 'black';
    div.style.width = 'fit-content'; 
    div.style.padding = '0 5px';
    div.style.fontSize = '20px';
    div.style.fontWeight = 'bold';
    div.style.fontStyle = 'italic';
    div.style.height = '30px';
    div.style.cursor = 'pointer';
    div.title = 'Prikaži moju lokaciju';
    div.style.textAlign = 'center'; 
    div.style.lineHeight = '30px'; 

    div.onclick = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var userLat = position.coords.latitude;
                var userLng = position.coords.longitude;

                // Prikazivanje trenutne lokacije korisnika
                L.marker([userLat, userLng]).addTo(map)
                    .bindPopup('Vaša trenutna lokacija').openPopup();

                // Proverite da li je routingControl već inicijalizovan
                if (!routingControl) {
                    // Dodavanje rute između trenutne lokacije i Dorćola
                    routingControl = L.Routing.control({
                        waypoints: [
                            L.latLng(userLat, userLng),  // Trenutna lokacija korisnika
                            L.latLng(44.8189, 20.4559)   // Dorćol, Beograd
                        ],
                        routeWhileDragging: true,
                        geocoder: L.Control.Geocoder.nominatim(),  // Opcija za geokodiranje
                        showAlternatives: false,  // Prikazuje samo jednu rutu
                    }).addTo(map);

                    // Prikazivanje informacija o ruti
                    routingControl.on('routesfound', function(e) {
                        var routes = e.routes;
                        var totalDistance = routes[0].summary.totalDistance; // Udaljenost u metrima
                        var totalTime = routes[0].summary.totalTime; // Vreme u sekundama

                        // Prikaz informacija
                        alert('Udaljenost: ' + (totalDistance / 1000).toFixed(2) + ' km\n' + 
                              'Autom(regularno): ' + (totalTime / 60).toFixed(0) + ' minuta');
                    });
                } else {
                    // Ako već postoji routingControl, resetujemo ga
                    routingControl.getPlan().setWaypoints([
                        L.latLng(userLat, userLng),  // Trenutna lokacija korisnika
                        L.latLng(44.8189, 20.4559)   // Dorćol, Beograd
                    ]);
                }

                // Uklanjanje Routing Control kada se zatvori
                routingControl.on('clear', function() {
                    routingControl = null; // Postavljanje na null kada se ukloni
                });
            }, function() {
                alert("Geolokacija nije dostupna ili nije omogućena.");
            });
        } else {
            alert("Vaš pretraživač ne podržava geolokaciju.");
        }
    };

    return div;
};
locateControl.addTo(map);

//site logic on load and scroll event
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
  
  link.addEventListener('click', e => {
     if(link.firstChild.textContent === 'Blog'){
      document.querySelector('.blog-on').style.display='none';
      document.getElementById('blog').style.display='block';
     } else{
      document.querySelector('.blog-on').style.display='block';
      document.getElementById('blog').style.display='none';
     }
    document.querySelectorAll('.nav-link').forEach((marked) =>marked.classList.remove('active'));
       link.classList.add('active');
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
      } else {
        window.scrollBy(0,-80)
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
  
  adjustLineBreak()
  window.scrollTo(0, 0); 
});
window.onresize = adjustLineBreak;
window.addEventListener('scroll',()=>{
  handleBodyImg()
   callFrame.style.display='flex';
   window.addEventListener('scrollend',()=>{
    setTimeout(()=>{
      callFrame.style.display='none';
     }, 3000)
   })
});

function handleBodyImg() {
  const bodyBg = document.querySelector('.body-background img'); // Odaberi sliku
 
  const scrollPosition = window.scrollY; // Trenutna pozicija skrola

 
 // console.log(scrollPosition);
   if(window.innerWidth>768){
    if (scrollPosition < 3000) {
      bodyBg.src = './images/material/body2.jpg'; 
      bodyBg.style.marginTop='0px';
    } else {
      bodyBg.src = './images/material/body.jpg'; 
      bodyBg.style.marginTop='0px';
    }
   } else{
    if(scrollPosition<3000){
      bodyBg.src = './images/material/body-small.webP';
      bodyBg.style.marginTop='150px';
    } else{
      bodyBg.src = './images/material/IMG_2433.jpeg';
      bodyBg.style.marginTop='150px';
    }
    
   }
  
}

document.querySelector('.price').addEventListener('click',()=>{
  setTimeout(()=>{window.scrollBy(0, -60); },1000)
  document.querySelector('.price').style.display = 'none';
  document.querySelector('.blog-on').style.display='block';
      document.getElementById('blog').style.display='none';
      document.querySelectorAll('.nav-link').forEach((marked) =>marked.classList.remove('active'));
      document.getElementById('set-services').classList.add('active');
 
});


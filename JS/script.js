const navbar = document.querySelector('.navbar-collapse');
const callFrame = document.querySelector('.call-frame');

const trolley= document.getElementById('trolley');
const logoBig = document.querySelector('.logo');




// Selektuj sve <li> elemente unutar ofcanvas menija


document.addEventListener('DOMContentLoaded', function() {
  var switcher = true;
  var navItems = document.querySelectorAll('#offcanvasNavbar .nav-item');
  var offcanvasElement = document.getElementById('offcanvasNavbar');
  var offcanvas = new bootstrap.Offcanvas(offcanvasElement);
  var smallForm = document.getElementById('ask-section-small');
  var offcanvasBody = offcanvasElement.querySelector('.offcanvas-body'); // Selektujte .offcanvas-body

  navItems.forEach(function(item) {
    item.addEventListener('click', function() {
      if (switcher) {
        if (offcanvasElement.classList.contains('show')) {
          smallForm.style.display = 'block';
          offcanvas.hide();
        } else {
          offcanvas.show();
          smallForm.style.display = 'block';
        }
        switcher = false;
      }
    });
  });

  // Event listener za dugme za zatvaranje
  document.querySelector('.btn-close').addEventListener('click', function() {
    // Kada je dugme za zatvaranje kliknuto, resetuj switcher
    switcher = true;
    offcanvas.hide();
  });

  // Event listener za praćenje zatvaranja offcanvas-a
  offcanvasElement.addEventListener('hidden.bs.offcanvas', function () {
    // Kada je offcanvas zatvoren, resetuj switcher na true
    switcher = true;
  });

  // Dodajte event listener za 'shown.bs.offcanvas' da biste čekali da se offcanvas prikaže
  offcanvasElement.addEventListener('shown.bs.offcanvas', function() {
   
    offcanvasBody.scrollTop = offcanvasBody.scrollHeight; 
    setTimeout(()=>{
      offcanvasBody.scrollTop = 0;

    },1000)
  });
});














var map = L.map('map', {
  center: [44.81887829183132, 20.46201289627609],  // Dorćol, Beograd
  zoom: 14.5,
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
  L.marker([44.8189, 20.4620])
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
 

//DOM manipulation pages

function backAtMain(){
  document.querySelector('.switcher').style.display='block';
  document.getElementById('blog').style.display='none';
  document.getElementById('gallery').style.display='none';
}
document.querySelectorAll('.nav-link').forEach((link) => {

  link.addEventListener('click', e => {
    if(link.firstChild.textContent === 'O nama') {
      console.log('test')
      document.querySelector('.switcher').style.display='none';
      document.querySelector('.breaking-section').style.display='none';
      document.getElementById('blog').style.display='none';
      document.getElementById('gallery').style.display='none';
      document.getElementById('contact').style.display='none';
      document.getElementById('footer').style.display='none';
    if(window.innerWidth>1014)  document.getElementById('about-us').style.display='block';
    if(window.innerWidth<=1014)  document.getElementById('about-us-small').style.display='block';
      document.querySelector('.breaking-section').style.backgroundColor='rgba(243, 244, 246,1) ';
    } else if(link.firstChild.textContent === 'Blog'){
      document.querySelector('.switcher').style.display='none';
      if(window.innerWidth>1014)  document.getElementById('about-us').style.display='none';
      if(window.innerWidth<=1014)  document.getElementById('about-us-small').style.display='none';
      document.querySelector('.breaking-section').style.display='block';
      document.querySelector('.breaking-section').style.backgroundColor='rgba(243, 244, 246,1) ';
      document.getElementById('blog').style.display='block';
      document.getElementById('gallery').style.display='none';
      document.getElementById('contact').style.display='block';
      document.getElementById('footer').style.display='block';
      
     } else if(link.firstChild.textContent === 'Galerija'){
      if(window.innerWidth>1014)  document.getElementById('about-us').style.display='none';
      if(window.innerWidth<=1014)  document.getElementById('about-us-small').style.display='none';
      document.querySelector('.switcher').style.display='none';
      
      document.getElementById('blog').style.display='none';
      document.getElementById('contact').style.display='block';
      
      document.getElementById('footer').style.display='block';
      document.querySelector('.breaking-section').style.backgroundColor='#212529';
      document.querySelector('.breaking-section').style.display='block';
      document.getElementById('gallery').style.display='block';
     }
     
     else{
             backAtMain();
             if(window.innerWidth>1014)  document.getElementById('about-us').style.display='none';
             if(window.innerWidth<=1014)  document.getElementById('about-us-small').style.display='none';
             document.querySelector('.breaking-section').style.backgroundColor='rgba(243, 244, 246,1) ';
             document.querySelector('.breaking-section').style.display='block';
             document.getElementById('contact').style.display='block';
      document.getElementById('footer').style.display='block';
     }
    document.querySelectorAll('.nav-link').forEach((marked) =>marked.classList.remove('active'));
       link.classList.add('active');
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
    setTimeout(() => {
      if(document.getElementById('blog').style.display ==='block' || document.getElementById('gallery' ).style.display=== 'block'){
        window.scrollTo(0,-100)
        return
      } 
      if(e.target.textContent==='Početna'){
        window.scrollTo(0,0)
        return
      }
      if(window.innerWidth<768){
        window.scrollBy(0, -70); 
      } else {
        window.scrollBy(0,-60)
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

function heroTextAnimate (){
  if(window.innerWidth<768){
    console.log('load')
    document.querySelectorAll('.stop-hero-animate').forEach(text=>text.classList.remove('animate__animated'));
  } else{
    document.querySelectorAll('.stop-hero-animate').forEach(text=>text.classList.add('animate__animated'));
  }
  
}
function adjustAboutUS(){
  if(document.getElementById('about-us').style.display ==='block' || document.getElementById('about-us-small').style.display ==='block'){
    if(window.innerWidth>1014){
      document.getElementById('about-us').style.display ='block';
      document.getElementById('about-us-small').style.display ='none';
    } else{
      document.getElementById('about-us').style.display ='none';
      document.getElementById('about-us-small').style.display ='block';
    }

  }
}


window.addEventListener('load', () => {
  positionOfLogoBig();
  adjustLineBreak();
  heroTextAnimate();
  mainMobilePhone();
  window.scrollTo(0, 0); 
});
window.onresize =()=>{
  positionOfLogoBig();
  adjustAboutUS();
  adjustLineBreak();
  mainMobilePhone();
} 
window.addEventListener('scroll',()=>{
  handleTrolleyAnimation();
  handleBodyImg()
   callFrame.style.display='flex';
   window.addEventListener('scrollend',()=>{
    setTimeout(()=>{
      callFrame.style.display='none';
     }, 3000)
   })
});

let hasAnimated = false; 

function handleTrolleyAnimation() {
  if(window.innerWidth>1224){
    if (!hasAnimated && window.scrollY > 6000) {
   
      trolley.style.right = '1800px';
      hasAnimated = true; 
    } 
  } else {
    if (!hasAnimated && window.scrollY > 8000) {
   
      trolley.style.right = '1800px';
      hasAnimated = true; 
    } 
  }
  
  }
function handleBodyImg() {
  const bodyBg = document.querySelector('.body-background img'); // Odaberi sliku
 
  const scrollPosition = window.scrollY; // Trenutna pozicija skrola

 
 // console.log(scrollPosition);
   if(window.innerWidth>768){
    if (scrollPosition < 6000) {
      bodyBg.src = './images/material/body2.jpg'; 
      bodyBg.style.marginTop='0px';
    } else {
      bodyBg.src = './images/material/body.jpg'; 
      bodyBg.style.marginTop='0px';
    }
   } else{
    if(scrollPosition<6000){
      bodyBg.src = './images/material/body-small.webP';
      bodyBg.style.marginTop='150px';
    } else{
      bodyBg.src = './images/material/IMG_2433.jpeg';
      bodyBg.style.marginTop='150px';
    }
    
   }
   bodyBg.style.width = '100%';        
  bodyBg.style.height = 'auto';       
  bodyBg.style.objectFit = 'contain';
}



// ---===== Footer=====---

document.querySelectorAll('#footer a').forEach(link => {
  link.addEventListener('click', () => {
      
    backAtMain();
    setTimeout(() => {
      window.scrollBy(0, -40);
    }, 1000);
  });
});



function positionOfLogoBig() {
  const windowWidth = window.innerWidth; // Trenutna širina prozora
  const computedStyle = getComputedStyle(logoBig); // Uzimamo trenutne stilove elementa
  const originalLeft = parseInt(computedStyle.left, 10); // Parsiramo `left` u broj

  if (windowWidth > 1400) {
    // Izračunaj višak širine i oduzmi ga od `left`
    const excessWidth = windowWidth - 1400;
    const newLeftValue = originalLeft - excessWidth;
    console.log(newLeftValue); // Ovo će biti broj
    logoBig.style.left = `${newLeftValue/3}px`;
  } else {
    // Resetuj `left` na originalnu vrednost iz CSS-a
    logoBig.style.left = ""; // Ovo vraća na stil iz CSS-a
  }
}

function mainMobilePhone(){
   const mobilePhone = document.getElementById('main-mobile-phone-break');
   const mobileNav = document.getElementById('main-mobile-nav');
  if(window.innerWidth>1225) {
    mobilePhone.style.display='none';
    mobileNav.style.display='block';
  } else {
    mobilePhone.style.display='block';
    mobileNav.style.display='none';
  }
}



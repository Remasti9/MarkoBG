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
  center: [44.82400303237991, 20.462886520045917],  // Dorćol, Beograd 44.82400303237991, 20.462886520045917
  zoom: 14.5,
  dragging: !L.Browser.mobile,  // Onemogući dragging na mobilnim uređajima
  touchZoom: true,  // Dozvoljava touch zoom
  tap: false,  // Sprečava zoom na jedan prst
  zoomControl: false  // Ako želite sakriti dugmiće za zoom
});

// Dodavanje tile sloja
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
attribution:false,
  maxZoom: 18,
}).addTo(map);

// Dodavanje markera na Dorćolu
setTimeout(function() {
  L.marker([44.82400303237991, 20.462886520045917])
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
window.addEventListener('load', function() {
  
  const attribution = document.querySelector('.leaflet-control-attribution');
  if (attribution) {
    attribution.remove(); // POTPUNO briše attribution sa mape
  }
});
locateControl.addTo(map);

//site logic on load and scroll event
 

//DOM manipulation pages

function backAtMain(){
  document.querySelector('.switcher').style.display='block';
  document.getElementById('blog').style.display='none';
  document.getElementById('gallery').style.display='none';
}
let previousSection = "";

document.querySelectorAll('.nav-link').forEach((link) => {
  document.getElementById('main-mobile-phone-break').style.display = 'block';

  link.addEventListener('click', e => {
    const clickedText = link.firstChild.textContent.trim();
document.getElementById('blog-show').style.display='none';
    // Zapamti prethodnu sekciju
    if (document.getElementById('blog').style.display === 'block') {
      previousSection = 'BLOG';
    } else if (document.getElementById('gallery').style.display === 'block') {
      previousSection = 'GALERIJA';
    } else {
      previousSection = '';
    }

    // Poništi sve sekcije
    document.querySelector('.switcher').style.display = 'none';
    document.getElementById('blog').style.display = 'none';
    document.getElementById('gallery').style.display = 'none';
    document.getElementById('contact').style.display = 'none';
    document.getElementById('footer').style.display = 'none';

    if (clickedText === 'O nama') {
      if (window.innerWidth > 1014) {
        document.getElementById('about-us').style.display = 'block';
      } else {
        document.getElementById('about-us-small').style.display = 'block';
      }
      document.querySelector('.breaking-section').style.display = 'none';
    } else if (clickedText === 'BLOG') {
      if (window.innerWidth > 1014) {
        document.getElementById('about-us').style.display = 'none';
      } else {
        document.getElementById('about-us-small').style.display = 'none';
      }
      document.querySelector('.breaking-section').style.display = 'block';
      document.querySelector('.breaking-section').style.backgroundColor = 'rgba(243, 244, 246,1)';
      document.getElementById('blog').style.display = 'block';
      document.getElementById('contact').style.display = 'block';
      document.getElementById('footer').style.display = 'block';
    } else if (clickedText === 'GALERIJA') {
      if (window.innerWidth > 1014) {
        document.getElementById('about-us').style.display = 'none';
      } else {
        document.getElementById('about-us-small').style.display = 'none';
      }
      document.getElementById('main-mobile-phone-break').style.display = 'block';
      document.querySelector('.breaking-section').style.backgroundColor = '#212529';
      document.querySelector('.breaking-section').style.display = 'block';
      document.getElementById('gallery').style.display = 'block';
      document.getElementById('contact').style.display = 'block';
      document.getElementById('footer').style.display = 'block';
    } else {
      backAtMain();
      if (window.innerWidth > 1014) {
        document.getElementById('about-us').style.display = 'none';
      } else {
        document.getElementById('about-us-small').style.display = 'none';
      }
      document.querySelector('.breaking-section').style.backgroundColor = 'rgba(243, 244, 246,1)';
      document.querySelector('.breaking-section').style.display = 'block';
      document.getElementById('contact').style.display = 'block';
      document.getElementById('footer').style.display = 'block';
    }

    // Aktivan link
    document.querySelectorAll('.nav-link').forEach((marked) => marked.classList.remove('active'));
    link.classList.add('active');

    // Zatvori meni na mobilnom
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }

    setTimeout(() => {
      const isMobile = window.innerWidth < 992;

      // Posebno ponašanje za USLUGE ako dolaziš iz BLOG ili GALERIJA
      if (
        isMobile &&
        clickedText === 'USLUGE' &&
        (previousSection === 'BLOG' || previousSection === 'GALERIJA')
      ) {
        window.scrollBy(0, -20); // prilagodi po potrebi
        return;
      }

      // Posebno ponašanje za CENOVNIK ako dolaziš iz BLOG ili GALERIJA
      if (
        isMobile &&
        clickedText === 'CENOVNIK' &&
        (previousSection === 'BLOG' || previousSection === 'GALERIJA') &&
        (window.innerWidth<992)
      ) {
        window.scrollBy(0, 120); // prilagodi po potrebi
        return;
      } else if(
        clickedText === 'CENOVNIK' && 
        isMobile && 
        (previousSection !== 'BLOG' || previousSection !== 'GALERIJA') && 
         (window.innerWidth<992))
         {
        window.scrollBy(0, -70); // prilagodi po potrebi
        return;
      }

      // BLOG ili GALERIJA
      if (
        document.getElementById('blog').style.display === 'block' ||
        document.getElementById('gallery').style.display === 'block'
      ) {
        document.getElementById('main-mobile-phone-break').style.display = 'none';
        window.scrollTo(0, -100);
        return;
      }

      // Početna
      if (clickedText === 'POČETNA') {
        document.getElementById('main-mobile-phone-break').style.display = 'none';
        window.scrollTo(0, 0);
        return;
      }

      // Generalno ponašanje za USLUGE
      if (clickedText === 'USLUGE') {
        window.scrollBy(0, -220);
        return;
      }
      if (clickedText === 'CENOVNIK') {
        window.scrollBy(0, -20);
        return;
      }

      // Default scroll
      if (window.innerWidth < 768) {
        window.scrollBy(0, -70);
      } else {
        window.scrollBy(0, -60);
      }
    }, 1000);

    switcher = true;
  });
});


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
 setMainImg();
  positionOfLogoBig();
  heroTextAnimate();
  mainMobilePhone();
  window.scrollTo(0, 0); 
});
window.onresize =()=>{
  setMainImg();
  positionOfLogoBig();
  adjustAboutUS();
  mainMobilePhone();
  if(document.getElementById('gallery').style.display==="block" ) {
    document.getElementById('main-mobile-phone-break').style.display="none"
  }
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
    if (scrollPosition < 5000) {
      bodyBg.src = './images/material/body2.jpg'; 
      bodyBg.style.marginTop='0px';
    } else {
      bodyBg.src = './images/material/body.jpg'; 
      bodyBg.style.marginTop='0px';
    }
   } else{
    if(scrollPosition<10000){
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
    mobilePhone.style.display='none';
    mobileNav.style.display='none';
  }
}

//Removing google widget FREE gedget
const hideElfsightLink = () => {
  document.querySelectorAll('a[href*="google-reviews-widget"]').forEach(el => {
      el.style.display = "none";
      el.style.visibility = "hidden";
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
  });
};

// Pozovi odmah pri učitavanju stranice
setTimeout(hideElfsightLink, 100); 

// Posmatraj DOM promene (za slučaj da Elfsight ponovo doda link)
const observer = new MutationObserver(hideElfsightLink);
observer.observe(document.body, { childList: true, subtree: true });

// Ponovi proveru na svake 1000ms (1 sekundu)
setInterval(hideElfsightLink, 1000);

//settings of imgMain sizes on a different screen
const mainImg = document.getElementById('main-img');

function setMainImg () {
  if(window.innerWidth>=576 && window.innerWidth <= 750){
    mainImg.src='images/750x750-template.png'
     mainImg.style.aspectRatio='1/.7'
  } else if(window.innerWidth>=751 && window.innerWidth <=1000){
    mainImg.src='images/1000px.webP'
     mainImg.style.aspectRatio='1/.6'
  } else if (window.innerWidth>=1001 && window.innerWidth<=1199) {
   mainImg.src='images/1200.jpg'
     mainImg.style.aspectRatio='1/.5'
  } 
  else if(window.innerWidth<=575) {
      mainImg.src='images/576x1024.png'
    mainImg.style.aspectRatio='1/1.3'
  }
  else {
    mainImg.src='images/test.jpg'
    mainImg.style.aspectRatio='2.7/1'
  
  }
}
   //SLIDER-GALLERY
const galleryCards = document.querySelectorAll('.card-last > div');
const popUp = document.getElementById('gallery-pop-up-slide');

let currentIndex = 0;

function showImage(index) {
  if (index < 0) index = galleryCards.length - 1;
  if (index >= galleryCards.length) index = 0;
  currentIndex = index;

  const card = galleryCards[currentIndex];
  const imgSrc = card.querySelector('img').src;

  // Očisti prethodni sadržaj
  popUp.innerHTML = '';

  // Popup stil
  popUp.style.display = 'flex';
  popUp.style.flexDirection = 'column';
  popUp.style.justifyContent = 'flex-start';
  popUp.style.alignItems = 'center';
  popUp.style.position = 'fixed';
  popUp.style.top = '10px';
  popUp.style.left = '0';
  popUp.style.width = '100%';
  popUp.style.height = '100%';
  popUp.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  popUp.style.zIndex = '1000';
  popUp.style.paddingTop = '100px';

  // Wrapper
  const imageWrapper = document.createElement('div');
  imageWrapper.style.position = 'relative';
  imageWrapper.style.width = '1000px';
  imageWrapper.style.height = '600px';
  imageWrapper.style.display = 'flex';
  imageWrapper.style.justifyContent = 'center';
  imageWrapper.style.alignItems = 'center';
  imageWrapper.style.backgroundColor = '#222';
  imageWrapper.style.borderRadius = '12px';
  imageWrapper.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';

  // Slika
  const img = document.createElement('img');
  img.src = imgSrc;
  img.style.maxWidth = '100%';
  img.style.maxHeight = '90%';
  img.style.borderRadius = '10px';

  // Leva strelica
  const leftArrow = document.createElement('button');
  leftArrow.innerHTML = '&#8592;';
  leftArrow.style.position = 'absolute';
  leftArrow.style.left = '-60px';
  leftArrow.style.top = '50%';
  leftArrow.style.transform = 'translateY(-50%)';
  leftArrow.style.fontSize = '40px';
  leftArrow.style.background = 'none';
  leftArrow.style.color = 'white';
  leftArrow.style.border = 'none';
  leftArrow.style.cursor = 'pointer';

  leftArrow.addEventListener('click', () => {
    showImage(currentIndex - 1);
  });

  // Desna strelica
  const rightArrow = document.createElement('button');
  rightArrow.innerHTML = '&#8594;';
  rightArrow.style.position = 'absolute';
  rightArrow.style.right = '-60px';
  rightArrow.style.top = '50%';
  rightArrow.style.transform = 'translateY(-50%)';
  rightArrow.style.fontSize = '40px';
  rightArrow.style.background = 'none';
  rightArrow.style.color = 'white';
  rightArrow.style.border = 'none';
  rightArrow.style.cursor = 'pointer';

  rightArrow.addEventListener('click', () => {
    showImage(currentIndex + 1);
  });

  // X dugme
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '&times;';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '-50px';
  closeButton.style.right = '0';
  closeButton.style.fontSize = '36px';
  closeButton.style.background = 'none';
  closeButton.style.color = 'white';
  closeButton.style.border = 'none';
  closeButton.style.cursor = 'pointer';
  closeButton.addEventListener('click', () => {
    popUp.style.display = 'none';
  });

  // Dodavanje elemenata
  imageWrapper.appendChild(img);
  imageWrapper.appendChild(leftArrow);
  imageWrapper.appendChild(rightArrow);
  imageWrapper.appendChild(closeButton);
  popUp.appendChild(imageWrapper);
}

// Dodaj event listener za sve kartice
galleryCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    if(window.innerWidth < 1200) return;
    showImage(index);
  });
});



// Skroll set up 
document.addEventListener("DOMContentLoaded", function () {
  const scrollBoxes = document.querySelectorAll(".service-text");

  scrollBoxes.forEach(box => {
    box.addEventListener("wheel", function (e) {
      const delta = e.deltaY;
      const directionDown = delta > 0;

      const scrollTop = box.scrollTop;
      const scrollHeight = box.scrollHeight;
      const clientHeight = box.clientHeight;

      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      const scrollBlocked = (atTop && !directionDown) || (atBottom && directionDown);

      if (scrollBlocked) {
        e.preventDefault(); // mora { passive: false }
        window.scrollBy(0, delta*5);  // instant pomeranje, bez smooth
      }
    }, { passive: false });
  });
});








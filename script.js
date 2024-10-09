const toggler = document.querySelector('.navbar-toggler');
const callNumber = document.querySelector('.disappear-large');
const navbar = document.querySelector('.navbar-collapse');
var switcher = true;
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

// Onemogućavanje pomeranja mape na dodir jednim prstom
map.on('touchstart', function(e) {
    if (e.touches.length === 1) {
        e.preventDefault(); // Sprečava premestanje mape na dodir jednim prstom
    }
});

// Onemogućavanje pomeranja mape kada je jedan prst
map.on('touchmove', function(e) {
    if (e.touches.length === 1) {
        e.preventDefault(); // Sprečava pomeranje
    } else if (e.touches.length > 1) {
        // Omogućava pomeranje mape kada su korišćena dva ili više prstiju
        map.dragging.enable();
    }
});

// Omogućavanje mape za pomeranje samo sa dva prsta
map.on('touchend', function(e) {
    if (e.touches.length === 0) {
        map.dragging.enable(); // Ponovno omogućava pomeranje nakon završetka dodira
    }
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
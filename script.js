var map = L.map('map').setView([44.8189, 20.4559], 15); // Promenjene koordinate na Dorćol, Beograd

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

// Dodavanje markera na Dorćol
L.marker([44.8189, 20.4559]) // Promenjene koordinate markera
  .addTo(map)
  .bindPopup('We are here.') // Popup tekst
  .openPopup();

window.addEventListener('load', () => {
  window.scrollTo(0, 0); // Scroll to top on load
});


document.querySelectorAll('.nav-link').forEach((link) => {
  // Dodavanje event listenera na svaki link
  link.addEventListener('click', () => {
      // Selektovanje nav-toggler dugmeta
      const toggler = document.querySelector('.navbar-toggler');
      // Provera da li je nav-toggler otvoren
      if (toggler) {
          // Zatvaranje navigacije (uklanjanje klase 'show' na navbar)
          const navbar = document.querySelector('.navbar-collapse');
          if (navbar.classList.contains('show')) {
              navbar.classList.remove('show');
          }
      }
  });
});










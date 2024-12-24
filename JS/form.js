 // Dugme za brisanje unosa
 document.getElementById("reset-button1").addEventListener("click", function () {
    document.getElementById("first-name1").value = "";
    document.getElementById("email1").value = "";
    document.getElementById("textarea1").value = "";
  });

  // Dugme za slanje podataka
  document.getElementById("send-button1").addEventListener("click", function () {
    const name = document.getElementById("first-name1").value.trim();
    const email = document.getElementById("email1").value.trim();
    const message = document.getElementById("textarea1").value.trim();

    // Validacija
    if (!name || !email || !message) {
      alert("Sva polja su obavezna!");
      return;
    }

    // Kreiranje mailto linka
    const subject = encodeURIComponent("Kontakt Forma");
    const body = encodeURIComponent(
      `Ime: ${name}\nEmail: ${email}\nPoruka: ${message}`
    );
    const mailtoLink = `mailto:marko.vracaricic.83@gmail.com?subject=${subject}&body=${body}`;

    // Otvaranje mailto linka
    window.location.href = mailtoLink;
  });
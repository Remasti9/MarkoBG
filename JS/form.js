// Dugme za brisanje unosa
document.getElementById("reset-button1").addEventListener("click", function () {
    document.getElementById("first-name1").value = "";
    document.getElementById("email1").value = "";
    document.getElementById("textarea1").value = "";
});
document.getElementById("reset-button2").addEventListener("click", function () {
    document.getElementById("first-name2").value = "";
    document.getElementById("email2").value = "";
    document.getElementById("textarea2").value = "";
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
    const mailtoLink = `mailto:vdmmarko@gmail.com?subject=${subject}&body=${body}`;

    // Otvaranje mailto linka u novom prozoru
    window.open(mailtoLink, '_blank');

    // Isprazni formu nakon otvaranja mailto
    document.getElementById("first-name1").value = "";
    document.getElementById("email1").value = "";
    document.getElementById("textarea1").value = "";
});

document.getElementById("send-button2").addEventListener("click", function () {
    const name = document.getElementById("first-name2").value.trim();
    const email = document.getElementById("email2").value.trim();
    const message = document.getElementById("textarea2").value.trim();

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
    const mailtoLink = `mailto:vdmmarko@gmail.com?subject=${subject}&body=${body}`;

    // Otvaranje mailto linka u novom prozoru
    window.open(mailtoLink, '_blank');

    // Isprazni formu nakon otvaranja mailto
    document.getElementById("first-name2").value = "";
    document.getElementById("email2").value = "";
    document.getElementById("textarea2").value = "";
});
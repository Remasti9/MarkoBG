// Inicijalizacija EmailJS
emailjs.init("wD8I0xkh-YNYd6Yaj"); // Zamenite sa vašim pravi "user ID" ako je potrebno

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

// Funkcija za slanje forme putem EmailJS-a
function sendForm(firstNameId, emailId, messageId) {
    const name = document.getElementById(firstNameId).value.trim();
    const email = document.getElementById(emailId).value.trim();
    const message = document.getElementById(messageId).value.trim();

    // Validacija
    if (!name || !email || !message) {
        alert("Sva polja su obavezna!");
        return;
    }

    // Kreiranje podataka za EmailJS
    const templateParams = {
        from_name: name,  // Ime osobe koja šalje poruku
        from_email: email, // Email adresa osobe koja šalje poruku
        message: message, // Sadržaj poruke
        // to_email: "vdmmarko@gmail.com", // Tvoj fiksni e-mail
        to_email: "selidbeplavislon@gmail.com", // Tvoj fiksni e-mail
    };
    

    // Slanje emaila putem EmailJS
    email.send("service_pe5828p", "template_1bazftn", templateParams)
        .then(function (response) {
            console.log("Uspešno poslato!", response.status, response.text);
            alert("Poruka je uspešno poslata!");

            // Isprazni formu nakon uspešnog slanja
            document.getElementById(firstNameId).value = "";
            document.getElementById(emailId).value = "";
            document.getElementById(messageId).value = "";
        }, function (error) {
            console.log("Greška pri slanju poruke:", error);
            alert("Došlo je do greške prilikom slanja. Pokušajte ponovo.");
        });
}

// Dugme za slanje podataka iz prve forme
document.getElementById("send-button1").addEventListener("click", function () {
    sendForm("first-name1", "email1", "textarea1");
});

// Dugme za slanje podataka iz druge forme
document.getElementById("send-button2").addEventListener("click", function () {
    sendForm("first-name2", "email2", "textarea2");
});

const click = document.getElementById('about-me-btn');
var aboutMe = document.querySelector('#about-us .container');
var profileImg = document.getElementById('profile-image');
var textAboutMe = document.getElementById('text-about-me');

click.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        aboutMe.style.filter = 'saturate(1)';
        setTimeout(() => {
            profileImg.style.transform = 'scale(1.5)';
            textAboutMe.style.transform = 'scale(1.3)';
            textAboutMe.style.marginLeft = '100px';
            textAboutMe.style.color = 'white';
            profileImg.style.marginTop = '-30px';
            profileImg.style.filter = 'saturate(1)';
            click.style.top = '-5px';
            click.style.borderColor = 'white';
            click.style.color = 'white';
        }, 800);

        // Ako nije u full screen režimu, pokreni full screen
        if (aboutMe.requestFullscreen) {
            aboutMe.requestFullscreen();
        } else if (aboutMe.webkitRequestFullscreen) { /* Safari/Opera/Chrome */
            aboutMe.webkitRequestFullscreen();
        } else if (aboutMe.msRequestFullscreen) { /* IE/Edge */
            aboutMe.msRequestFullscreen();
        }
    } else {
        // Ako je već u full screen režimu, izađi iz njega
        exitFullscreen();
    }
});

// Izlazak iz fullscreen režima
function exitFullscreen() {
    profileImg.style.transform = 'scale(.7)';
    textAboutMe.style.transform = 'scale(.7)';
    textAboutMe.style.marginLeft = '';
    textAboutMe.style.color = 'black';
    profileImg.style.marginTop = '';
    profileImg.style.filter = 'saturate(0)';
    click.style.top = '0';
    click.style.borderColor = 'black';
    click.style.color = 'black';
    
    setTimeout(() => {
        aboutMe.style.filter = 'saturate(0)';
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari/Opera/Chrome */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }, 800);
}

// Događaj za pritisak na dugme 'Esc'
document.addEventListener('keydown', (event) => {
    event.preventDefault()
    console.log(event); // Debugging
    if (event.key === 'Escape') {
        exitFullscreen();
    }
});

const click = document.getElementById('about-me-btn');
var aboutMe = document.querySelector('#about-us .container');
var profileImg = document.getElementById('profile-image');
var textAboutMe = document.getElementById('text-about-me');
var titleOfText = document.getElementById('title-of-text');
var aboutUsTitle = document.querySelector('.about-us-title');

click.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        aboutMe.style.filter = 'saturate(1)';
        setTimeout(() => {
            aboutUsTitle.style.color = 'goldenrod';
            profileImg.style.transform = 'scale(1.5)';
            textAboutMe.style.transform = 'scale(1.3)';
            textAboutMe.style.marginLeft = '100px';
            textAboutMe.style.color = 'goldenrod';
            textAboutMe.style.background = 'rgba(0,0,0,.5)';
            titleOfText.style.color='goldenrod';
            profileImg.style.marginTop = '-30px';
            profileImg.style.filter = 'saturate(1)';
            click.style.top = '-5px';
            click.style.borderColor = 'goldenrod';
            click.style.color = 'goldenrod';
            click.textContent='Povratak u glavni meni';
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
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari/Opera/Chrome */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }
});

// Izlazak iz fullscreen režima
function exitFullscreen() {

        aboutUsTitle.style.color = 'white';
        profileImg.style.transform = 'scale(.7)';
        textAboutMe.style.transform = 'scale(.7)';
        textAboutMe.style.marginLeft = '';
        textAboutMe.style.color = 'black';
        textAboutMe.style.background = 'rgba(255,255,255,.5)';
        titleOfText.style.color='goldenrod';
        profileImg.style.marginTop = '';
        profileImg.style.filter = 'saturate(0)';
        click.style.top = '0';
        click.style.borderColor = 'black';
        click.style.color = 'black';
        click.textContent='Tačni kao sat. Klikni!';
            aboutMe.style.filter = 'saturate(0)';
            
    }
    
  




document.addEventListener('fullscreenchange', () => {
   
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
     exitFullscreen()
    }
});

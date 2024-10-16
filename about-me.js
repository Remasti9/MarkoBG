const click = document.getElementById('about-me-btn');

click.addEventListener('click', () => {
    var aboutMe = document.getElementById('about-us');
    var profileImg = document.getElementById('profile-image');
    var textAboutMe = document.getElementById('text-about-me');
    if (!document.fullscreenElement) {
        aboutMe.style.filter='saturate(1)'
        setTimeout(()=>{
            profileImg.style.transform='scale(1.5)';
            textAboutMe.style.transform='scale(1.3)';
            textAboutMe.style.marginLeft='100px';
             profileImg.style.marginTop='-30px';
             profileImg.style.filter='saturate(1)';
        },800)
        
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
        
        profileImg.style.transform='scale(.7)';
        textAboutMe.style.transform='scale(.7)';
        textAboutMe.style.marginLeft='';
        profileImg.style.marginTop='';
        profileImg.style.filter='saturate(0)';
        setTimeout(()=>{
            aboutMe.style.filter='saturate(0)' ;
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari/Opera/Chrome */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
            }
        },800)
        
        
    }
});

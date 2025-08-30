



//settings of imgMain sizes on a different screen
const mainImg = document.getElementById('main-img');

function setMainImg () {
  if(window.innerWidth>=576 && window.innerWidth <= 750){
    mainImg.src='images/750x750-template.png'
     mainImg.style.aspectRatio='1/.7'
  } else if(window.innerWidth>=751 && window.innerWidth <=1000){
    mainImg.src='images/mainTabletMiddle.webp'
     mainImg.style.aspectRatio='1/.6'
  } else if (window.innerWidth>=1001 && window.innerWidth<=1199) {
   mainImg.src='images/1200.jpg'
     mainImg.style.aspectRatio='1/.5'
  } 
  else if(window.innerWidth<=575) {
      mainImg.src='images/imgMobile2.png'
    mainImg.style.aspectRatio='1/1.62'
  }
  else {
    mainImg.src='images/imgDesktop2.png'
    mainImg.style.aspectRatio='2.7/1'
  
  }
}


window.addEventListener('load',()=>{
    setMainImg();
});
window.addEventListener('resize',()=>{
    setMainImg();
});
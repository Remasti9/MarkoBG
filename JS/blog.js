
  if(window.innerWidth>768){
    document.querySelectorAll('.blog-article').forEach(article => {
        let isAnimating = false; // Promenljiva za praćenje animacije
    
        article.addEventListener('mouseover', (event) => {
            if (isAnimating) return; // Sprečava pokretanje animacije ako je već u toku
    
            const cardData = Array.from(article.children).find(child => 
                child.classList.contains('blog-card-data')
            );
    
            if (!cardData) return; // Ako nema cardData, prekini
    
            const relatedTarget = event.relatedTarget; // Element sa kojeg je miš otišao
            if (relatedTarget && (article.contains(relatedTarget) || cardData.contains(relatedTarget))) {
                return; // Ako je miš još uvek unutar article ili cardData, ne pokreći animaciju
            }
    
            const computedStyles = window.getComputedStyle(cardData);
            const bottomValue = parseFloat(computedStyles.bottom);
    
            const link = article.querySelector('a');
            if (cardData.contains(event.target) || (link && link.contains(event.target))) {
                return; // Ne pokreći animaciju unutar istog članka
            }
    
            isAnimating = true;
    
            document.querySelectorAll('.blog-article').forEach(otherArticle => {
                if (otherArticle !== article) {
                    const otherCardData = Array.from(otherArticle.children).find(child => 
                        child.classList.contains('blog-card-data')
                    );
    
                    if (otherCardData && otherCardData.style.animation.includes('blog-animate')) {
                        otherCardData.style.animation = 'blog-animate-reverse 1s forwards';
    
                        setTimeout(() => {
                            otherArticle.style.overflow = 'hidden';
                        }, 200);
                    }
                }
            });
    
            setTimeout(() => {
                article.style.overflow = 'visible';
                article.style.borderRadius = '20px';
            }, 600);
    
            if (cardData) {
                cardData.classList.add('animating');
    
                cardData.style.animation = 'none'; 
                article.style.animation = 'none';
    
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        cardData.style.animation = 'blog-animate 1.5s forwards'; 
    
                        cardData.addEventListener('animationend', () => {
                            cardData.classList.remove('animating');
                            isAnimating = false;
                        }, { once: true });
                    }, 1);
                });
            }
        });
    
        article.addEventListener('mouseout', (event) => {
            const cardData = Array.from(article.children).find(child => 
                child.classList.contains('blog-card-data')
            );
    
            if (!cardData || cardData.classList.contains('animating')) return;
    
            const relatedTarget = event.relatedTarget; // Element na koji je miš prešao
            if (relatedTarget && (article.contains(relatedTarget) || cardData.contains(relatedTarget))) {
                return; // Ako je miš još uvek unutar article ili cardData, ne pokreći obrnutu animaciju
            }
    
            cardData.style.animation = 'none';
    
            requestAnimationFrame(() => {
                setTimeout(() => {
                    cardData.style.animation = 'blog-animate-reverse 1s forwards'; 
    
                    setTimeout(() => {
                        article.style.overflow = 'hidden';
                    }, 200);
    
                    cardData.addEventListener('animationend', () => {
                        article.style.overflow = 'hidden';
                        article.style.borderRadius = '0px';
                    }, { once: true });
                }, 1);
            });
        });
    });
  } else{
    const blogArticles = document.querySelectorAll('.blog-article');

let lastAnimatingArticle = null; // Članak koji je poslednji bio animiran
let currentAnimatingArticle = null; // Članak koji je trenutno animiran

// Funkcija za proveru pozicije i dodavanje/uklanjanje animacija
const checkArticlePosition = () => {
    blogArticles.forEach(article => {
        const rect = article.getBoundingClientRect();
        const top = rect.top;
        const bottom = rect.bottom;
        const windowHeight = window.innerHeight;

        const isAnimating = article.getAttribute('data-animating') === 'true';
        const cardData = Array.from(article.children).find(child =>
            child.classList.contains('blog-card-data')
        );

        if (!cardData) return;

        // Provera da li je sredina viewporta između gornje i donje pozicije članka
        const middleViewport = windowHeight / 2;
        const isInMiddle = top < middleViewport && bottom > middleViewport;

        // Ako je članak u sredini ekrana
        if (isInMiddle) {
            // Ako trenutni članak nije animiran i nije poslednji animirani članak
            if (!isAnimating && article !== lastAnimatingArticle) {
                currentAnimatingArticle = article; // Postavi trenutni animirani članak

                // Postavi overflow na visible
                article.style.overflow = 'visible';
                article.style.borderRadius = '20px';
                article.setAttribute('data-animating', 'true');

                // Simuliraj prvu animaciju
                cardData.style.opacity = '0';
                cardData.style.bottom = '-100%'; // Postavi početnu poziciju
                requestAnimationFrame(() => {
                    let startTime = null;

                    const animate = (timestamp) => {
                        if (!startTime) startTime = timestamp;
                        const progress = timestamp - startTime;
                        const duration = 500; // trajanje animacije u ms
                        const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // funkcija za jednostavno animiranje

                        const percent = Math.min(progress / duration, 1);
                        const eased = easeInOutQuad(percent);

                        // Ažuriraj stilove na osnovu progresije
                        cardData.style.opacity = eased;
                        cardData.style.bottom = `${eased * 10}%`; // Promenimo poziciju od -100% do 10%

                        if (percent < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            // Kada se prva animacija završi, pokreni drugu animaciju
                            requestAnimationFrame(() => {
                                let secondStartTime = null;

                                const secondAnimate = (secondTimestamp) => {
                                    if (!secondStartTime) secondStartTime = secondTimestamp;
                                    const secondProgress = secondTimestamp - secondStartTime;
                                    const secondDuration = 300; // trajanje druge animacije

                                    const secondPercent = Math.min(secondProgress / secondDuration, 1);
                                    const secondEased = easeInOutQuad(secondPercent);

                                    // Sada spuštamo `cardData` za dodatnih 15%
                                    cardData.style.bottom = `${10 - secondEased * 15}%`; // Ovde idemo na dole

                                    if (secondPercent < 1) {
                                        requestAnimationFrame(secondAnimate);
                                    } else {
                                        article.setAttribute('data-animating', 'false');
                                        lastAnimatingArticle = article; // Ažuriraj poslednji animirani članak
                                    }
                                };

                                requestAnimationFrame(secondAnimate);
                            });
                        }
                    };
                    requestAnimationFrame(animate);
                });

                // Obrni animaciju za ostale članke
                blogArticles.forEach(otherArticle => {
                    if (otherArticle !== currentAnimatingArticle) {
                        const otherCardData = Array.from(otherArticle.children).find(child =>
                            child.classList.contains('blog-card-data')
                        );

                        if (otherCardData) {
                            // Postavi druge članke na "sakriven"
                            otherCardData.style.opacity = '1';
                            otherCardData.style.bottom = '10%'; // Postavi na finalnu poziciju
                            otherArticle.style.overflow = 'hidden'; // Uveri se da su drugi članci sakriveni

                            // Simuliraj obrnuto animiranje
                            let startTime = null;

                            const reverseAnimate = (timestamp) => {
                                if (!startTime) startTime = timestamp;
                                const progress = timestamp - startTime;
                                const duration = 300; // trajanje animacije u ms
                                const percent = Math.min(progress / duration, 1);

                                // Ažuriraj stilove na osnovu progresije
                                otherCardData.style.opacity = 1 - percent; // Fade out
                                otherCardData.style.bottom = `${10 - (10 * percent)}%`; // Kreće se do -100%

                                if (percent < 1) {
                                    requestAnimationFrame(reverseAnimate);
                                } else {
                                    otherArticle.style.overflow = 'visible';
                                    otherArticle.style.borderRadius = '10px';
                                    otherArticle.setAttribute('data-animating', 'false'); // Ukloni animiranje
                                }
                            };
                            requestAnimationFrame(reverseAnimate);
                        }
                    }
                });
            }
        } else {
            // Ako članak nije u sredini i trenutno se animira
            if (isAnimating && currentAnimatingArticle === article) {
                const otherCardData = Array.from(article.children).find(child =>
                    child.classList.contains('blog-card-data')
                );

                if (otherCardData) {
                    // Obrni animaciju
                    let startTime = null;

                    const reverseAnimate = (timestamp) => {
                        if (!startTime) startTime = timestamp;
                        const progress = timestamp - startTime;
                        const duration = 300; // trajanje animacije u ms
                        const percent = Math.min(progress / duration, 1);

                        // Ažuriraj stilove na osnovu progresije
                        otherCardData.style.opacity = 1 - percent; // Fade out
                        otherCardData.style.bottom = `${20 - (10 * percent)}%`; // Vraća se u početnu poziciju (-100%)

                        if (percent < 1) {
                            requestAnimationFrame(reverseAnimate);
                        } else {
                            article.style.overflow = 'visible';
                            article.style.borderRadius = '10px';
                            article.setAttribute('data-animating', 'false'); // Ukloni animiranje
                        }
                    };
                    requestAnimationFrame(reverseAnimate);
                }
            }
        }
    });
};

// Pokreni proveru prilikom svakog skrola
window.addEventListener('scroll', () => {
    checkArticlePosition();
});

// Takođe proveri poziciju odmah po učitavanju stranice
checkArticlePosition();

    
    
    
    
    
    
    
    

    
    
    

    
    

    
    


    
  }





document.addEventListener('DOMContentLoaded', function () {
  let animationFrameId = null; // Čuva trenutno aktivni requestAnimationFrame ID

  function smoothScroll(element, duration) {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId); // Prekini prethodnu animaciju ako postoji
    }

    const start = element.scrollTop;
    const end = element.scrollHeight - element.clientHeight;
    const distance = end - start;
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      element.scrollTop = start + distance * progress;
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    }

    animationFrameId = requestAnimationFrame(step);
  }

  function stopScrollAnimation() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  function updateBlogShow(title, text, imgSrc) {
    const showBlogTitle = document.getElementById('show-blog-title');
    const showBlogText = document.getElementById('show-blog-text');
    const showBlogImg = document.querySelector('#blog-show img');
    const scrollDiv = document.querySelector('.show-blog-text');

    showBlogTitle.innerHTML = title;
    showBlogText.innerHTML = text;
    showBlogImg.src = imgSrc;

    window.scrollTo(0, 0);

    if (scrollDiv) {
      // Vrati scroll na početak odmah
      scrollDiv.scrollTop = 0;

      // Prekini bilo koju prethodnu animaciju odmah ako postoji
      stopScrollAnimation();

      // Pokreni polako skrolovanje posle 1.5s
      setTimeout(() => {
        smoothScroll(scrollDiv, 15000);
      }, 1500);

      // Dodaj event listenere koji će zaustaviti animaciju čim korisnik pokuša da skroluje ručno
      const stopEvents = ['wheel', 'touchstart', 'mousedown'];

      stopEvents.forEach(eventType => {
        scrollDiv.addEventListener(eventType, stopScrollAnimation, { once: true, passive: true });
      });
    }
  }

  const articles = document.querySelectorAll('.blog-article');
  articles.forEach((article) => {
    const link = article.querySelector('a');
    const h2 = article.querySelector('h2').textContent;
    const div = article.querySelector('.blog-text').innerHTML;
    const imgSrc = article.querySelector('img').src;

    link.addEventListener('click', function (event) {
      event.preventDefault();
      updateBlogShow(h2, div, imgSrc);
    });
  });
});




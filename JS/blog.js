
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
    
    // Funkcija za proveru pozicije i dodavanje/uklanjanje animacija
    const checkArticlePosition = () => {
        let currentAnimatingArticle = null; // Članak koji je trenutno animiran
    
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
                    currentAnimatingArticle = article;
    
                    // Animacija za trenutni članak
                    article.style.overflow = 'visible';
                    article.style.borderRadius = '20px';
                    article.setAttribute('data-animating', 'true');
    
                    // Resetovanje animacije
                    cardData.style.animation = 'none';
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            cardData.style.animation = 'blog-animate 1.5s forwards';
    
                            // Ukloni status animacije kada se završi
                            cardData.addEventListener('animationend', () => {
                                article.setAttribute('data-animating', 'false');
                                lastAnimatingArticle = article; // Ažuriraj poslednji animirani članak
                            }, { once: true });
                        }, 1);
                    });
    
                    // Dodaj animaciju za sve druge članke
                    blogArticles.forEach(otherArticle => {
                        if (otherArticle !== currentAnimatingArticle) {
                            const otherCardData = Array.from(otherArticle.children).find(child => 
                                child.classList.contains('blog-card-data')
                            );
    
                            if (otherCardData && otherArticle.getAttribute('data-animating') !== 'true') {
                                otherCardData.style.animation = 'blog-animate-reverse 1s forwards';
                                otherArticle.style.overflow = 'hidden';
    
                                otherCardData.addEventListener('animationend', () => {
                                    otherArticle.style.overflow = 'hidden';
                                    otherArticle.style.borderRadius = '0px';
                                    otherArticle.setAttribute('data-animating', 'false'); // Ukloni animiranje
                                }, { once: true });
                            }
                        }
                    });
                }
            } else {
                // Ako članak nije u sredini i trenutno se animira
                if (isAnimating) {
                    const otherCardData = Array.from(article.children).find(child => 
                        child.classList.contains('blog-card-data')
                    );
    
                    if (otherCardData) {
                        otherCardData.style.animation = 'blog-animate-reverse 1s forwards';
                        article.style.overflow = 'hidden';
    
                        otherCardData.addEventListener('animationend', () => {
                            article.style.overflow = 'hidden';
                            article.style.borderRadius = '0px';
                            article.setAttribute('data-animating', 'false'); // Ukloni animiranje
                        }, { once: true });
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
    // Funkcija za ažuriranje sadržaja blog-show sekcije
    function updateBlogShow(title, text, imgSrc) {
      const showBlogTitle = document.getElementById('show-blog-title');
      const showBlogText = document.getElementById('show-blog-text');
      const showBlogImg = document.querySelector('#blog-show img');
  
      showBlogTitle.innerHTML = `${title}</span>`;
      showBlogText.textContent = text;
      showBlogImg.src = imgSrc;
    }
  
    // Dodavanje event listenera za sve 'a' tagove unutar članaka
    const articles = document.querySelectorAll('.blog-article');
    articles.forEach((article) => {
      const link = article.querySelector('a');
      const h2 = article.querySelector('h2').textContent;
      const p = article.querySelector('p').textContent;
      const imgSrc = article.querySelector('img').src;
  
      link.addEventListener('click', function (event) {
        // Sprečava default ponašanje linka
        updateBlogShow(h2, p, imgSrc);
      });
    });
  });
  
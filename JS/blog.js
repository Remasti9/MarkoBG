
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

    // Funkcija za proveru pozicije i dodavanje/uklanjanje animacija
    const checkArticlePosition = () => {
        // Proveri da li je neka kartica animirana
        let anyAnimating = Array.from(blogArticles).some(article => 
            article.getAttribute('data-animating') === 'true'
        );
    
        blogArticles.forEach(article => {
            const rect = article.getBoundingClientRect();
            const top = rect.top;
            const bottom = rect.bottom;
            const height = rect.height;
            const windowHeight = window.innerHeight;
    
            // Provera da li je članak već animiran
            const isAnimating = article.getAttribute('data-animating') === 'true';
    
            const cardData = Array.from(article.children).find(child => 
                child.classList.contains('blog-card-data')
            );
    
            if (!cardData) return;
    
            // Provera da li je članak 100% vidljiv i udaljen bar 5% od vrha ili dna viewporta
            const isVisible = top > -(0.3 * height) && bottom < windowHeight + (0.1 * height);
            const isFullyInViewport = top > 0.05 * windowHeight && bottom < windowHeight - 0.05 * windowHeight;
    
            // Pokretanje animacije kada je članak u potpunosti vidljiv i nije već animiran
            if (isVisible && isFullyInViewport && !isAnimating) {
                article.style.overflow = 'visible';
                article.style.borderRadius = '20px';
    
                article.setAttribute('data-animating', 'true'); // Postavi da je animiranje u toku
    
                // Resetovanje animacija
                cardData.style.animation = 'none';
                article.style.animation = 'none';
    
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        cardData.style.animation = 'blog-animate 1.5s forwards';
    
                        // Ukloni status animacije kada se završi
                        cardData.addEventListener('animationend', () => {
                            article.setAttribute('data-animating', 'false');
                        }, { once: true });
                    }, 1);
                });
            }
            // Uklanjanje animacije kada članak izađe iz vidnog polja
            else if (!isVisible && isAnimating) {
                // Ako jedna kartica napušta vidno polje, sve ostale dobijaju reverse animaciju
                if (!anyAnimating) {
                    blogArticles.forEach(otherArticle => {
                        const otherCardData = Array.from(otherArticle.children).find(child => 
                            child.classList.contains('blog-card-data')
                        );
                        if (otherCardData && otherArticle !== article) {
                            otherCardData.style.animation = 'blog-animate-reverse 1s forwards';
                            otherArticle.style.overflow = 'hidden';
                        }
                    });
                }
    
                // Resetovanje animacije
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
                            article.setAttribute('data-animating', 'false'); // Ukloni animiranje
                        }, { once: true });
                    }, 1);
                });
            }
        });
    };
    
    // Pokreni proveru prilikom svakog skrola
    window.addEventListener('scroll', checkArticlePosition);
    
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
  
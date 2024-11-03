document.querySelectorAll('.blog-article').forEach(article => {
    let isAnimating = false; // Varijabla koja prati da li je animacija u toku za ovaj article

    article.addEventListener('mouseover', (event) => {
        // Proveri da li je animacija već pokrenuta za ovaj article
        if (isAnimating) return;

        const cardData = Array.from(article.children).find(child => 
            child.classList.contains('blog-card-data')
        );

        if (!cardData) return; // Ako nema cardData, ne nastavljaj dalje

        const computedStyles = window.getComputedStyle(cardData);
        const bottomValue = parseFloat(computedStyles.bottom); // Uzmi vrednost kao broj

        // Ako je mouseover došao sa cardData ili je bottom vrednost -60px, ne pokreći animaciju
        if (event.target === cardData || cardData.contains(event.target) && bottomValue > -700) {
            return;
        }

        isAnimating = true; // Obeleži da je animacija u toku za ovaj article

        // Prođi kroz sve ostale članke i dodaj suprotnu animaciju samo onima koji imaju blog-animate
        document.querySelectorAll('.blog-article').forEach(otherArticle => {
            if (otherArticle !== article) {
                const otherCardData = Array.from(otherArticle.children).find(child => 
                    child.classList.contains('blog-card-data')
                );
                
                if (otherCardData && otherCardData.style.animation.includes('blog-animate')) {
                    otherCardData.style.animation = 'blog-animate-reverse 2s forwards';

                    // Dodaj odlaganje od 1 sekunde pre postavljanja overflow: hidden
                    setTimeout(() => {
                        otherArticle.style.overflow = 'hidden';
                    }, 800);
                }
            }
        });

        // Postavi overflow na visible za trenutni članak nakon 1 sekunde
        setTimeout(() => {
            article.style.overflow = 'visible';
            article.style.borderRadius = '20px';
        }, 800);

        if (cardData) {
            // Dodaj klasu koja označava da je animacija u toku
            cardData.classList.add('animating');

            // Resetuj animaciju
            cardData.style.animation = 'none'; 
            article.style.animation = 'none';

            requestAnimationFrame(() => {
                setTimeout(() => {
                    cardData.style.animation = 'blog-animate 2s forwards'; 
                    
                    // Resetuj klasu animacije nakon što se animacija završi
                    cardData.addEventListener('animationend', () => {
                        cardData.classList.remove('animating');
                        isAnimating = false; // Ponovo postavi varijablu na false kada se animacija završi
                    }, { once: true });
                }, 1); 
            });
        }
    });
});









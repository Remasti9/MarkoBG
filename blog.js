document.querySelectorAll('.blog-article').forEach(article => {
    let isAnimating = false; // Varijabla koja prati da li je animacija u toku

    article.addEventListener('mouseover', (event) => {
        const cardData = Array.from(article.children).find(child => 
            child.classList.contains('blog-card-data')
        );
        const computedStyles = window.getComputedStyle(cardData);
        const bottomValue = computedStyles.bottom;
        
        console.log('Trenutna vrednost bottom je:', bottomValue);


            if(bottomValue === '-800px' ){
                
            }



        // Ako je mouseover došao sa cardData, ne pokreći animaciju
        if (event.target === cardData || (cardData && cardData.contains(event.target))) {
            return;
        }

        if (isAnimating) return; // Ako je animacija već pokrenuta, ne pokreći je ponovo

        isAnimating = true; // Postavi varijablu na true da označi da je animacija pokrenuta

        setTimeout(() => {
            article.style.overflow = 'visible';
            article.style.borderRadius='20px';
        }, 1000);

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




//   -------======== on Mouse OUt ======== _________

document.querySelectorAll('.blog-article').forEach(article => {
    let isAnimating = false; // Varijabla koja prati da li je animacija u toku

    article.addEventListener('mouseover', (event) => {
        const cardData = Array.from(article.children).find(child => 
            child.classList.contains('blog-card-data')
        );
        const computedStyles = window.getComputedStyle(cardData);
        const bottomValue = computedStyles.bottom;
        
        console.log('Trenutna vrednost bottom je:', bottomValue);

        if (bottomValue === '-60px') {
            return
        }

        // Ako je mouseover došao sa cardData, ne pokreći animaciju
        if (event.target === cardData || (cardData && cardData.contains(event.target))) {
            return;
        }

        if (isAnimating) return; // Ako je animacija već pokrenuta, ne pokreći je ponovo

        isAnimating = true; // Postavi varijablu na true da označi da je animacija pokrenuta

        setTimeout(() => {
            article.style.overflow = 'visible';
            article.style.borderRadius = '20px';
        }, 1000);

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

    // Događaj za mouseout sa obrnutom animacijom
    article.addEventListener('mouseout', (event) => {
        const cardData = Array.from(article.children).find(child => 
            child.classList.contains('blog-card-data')
        );

        // Ako je mouseout došao sa cardData, ne pokreći animaciju
        if (event.target === cardData || (cardData && cardData.contains(event.target))) {
            return;
        }

        if (isAnimating) return; // Ako je animacija već pokrenuta, ne pokreći je ponovo

        isAnimating = true; // Postavi varijablu na true da označi da je animacija pokrenuta

        setTimeout(() => {
            article.style.overflow = 'hidden'; 
            article.style.borderRadius = '0px';
        }, 1000);

        if (cardData) {
            // Dodaj klasu koja označava da je animacija u toku
            cardData.classList.add('animating');

            // Resetuj animaciju
            cardData.style.animation = 'none';
            article.style.animation = 'none';

            requestAnimationFrame(() => {
                setTimeout(() => {
                    cardData.style.animation = 'blog-animate-reverse 2s forwards'; 

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

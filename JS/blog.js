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
  
document.querySelectorAll('.blog-article').forEach(article => {
    let isAnimating = false; // Promenljiva za praćenje animacije

    article.addEventListener('mouseover', (event) => {
        if (isAnimating) return; // Sprečava pokretanje animacije ako je već u toku

        const cardData = Array.from(article.children).find(child => 
            child.classList.contains('blog-card-data')
        );

        if (!cardData) return; // Ako nema cardData, prekini

        const computedStyles = window.getComputedStyle(cardData);
        const bottomValue = parseFloat(computedStyles.bottom);

        // Ako je mouseover na cardData ili je bottom vrednost -60px, ne pokreći animaciju
        if (event.target === cardData || cardData.contains(event.target) && bottomValue > -700) {
            return;
        }

        // Sprečavanje višestrukih animacija
        isAnimating = true;

        // Prođi kroz sve ostale članke i dodaj suprotnu animaciju samo onima koji imaju blog-animate
        document.querySelectorAll('.blog-article').forEach(otherArticle => {
            if (otherArticle !== article) {
                const otherCardData = Array.from(otherArticle.children).find(child => 
                    child.classList.contains('blog-card-data')
                );

                if (otherCardData && otherCardData.style.animation.includes('blog-animate')) {
                    otherCardData.style.animation = 'blog-animate-reverse 2s forwards';

                    setTimeout(() => {
                        otherArticle.style.overflow = 'hidden';
                    }, 800);
                }
            }
        });

        setTimeout(() => {
            article.style.overflow = 'visible';
            article.style.borderRadius = '20px';
        }, 800);

        if (cardData) {
            cardData.classList.add('animating');

            // Reset animacije
            cardData.style.animation = 'none'; 
            article.style.animation = 'none';

            requestAnimationFrame(() => {
                setTimeout(() => {
                    cardData.style.animation = 'blog-animate 2s forwards'; 

                    cardData.addEventListener('animationend', () => {
                        cardData.classList.remove('animating');
                        isAnimating = false; // Reset promenljive kad se animacija završi
                    }, { once: true });
                }, 1);
            });
        }
    });

    // Event listener za mouseout - pokretanje obrnute animacije
    article.addEventListener('mouseout', (event) => {
        const cardData = Array.from(article.children).find(child => 
            child.classList.contains('blog-card-data')
        );

        if (!cardData || cardData.classList.contains('animating')) return; // Ako nema cardData ili je animacija u toku, ne radi ništa

        cardData.style.animation = 'none'; // Reset animacije pre pokretanja obrnute

        requestAnimationFrame(() => {
            setTimeout(() => {
                cardData.style.animation = 'blog-animate-reverse 2s forwards'; // Pokreni obrnutu animaciju

                setTimeout(() => {
                    article.style.overflow = 'hidden'; // Nakon animacije sakrij overflow
                }, 800); // Vreme trajanja animacije

                cardData.addEventListener('animationend', () => {
                    article.style.overflow = 'hidden';
                    article.style.borderRadius = '0px'; // Resetuj borderRadius
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
  
      showBlogTitle.innerHTML = `Obratite pažnju<span class="text-orange"> ${title}</span>`;
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
  
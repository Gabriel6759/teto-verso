    const audio = document.getElementById('meuAudio');
        const audioLogo = document.getElementById('audioLogo');
        const cards = document.querySelectorAll('.video-card');
        const menuLinks = document.querySelectorAll('.menu a');
        const logoLink = document.querySelector('header a');

        cards.forEach(card => {
            card.addEventListener("click", () => {
                audio.currentTime = 0;
                audio.play();
            });
        });

        logoLink.addEventListener("click", (event) => {
            event.preventDefault();
            audioLogo.currentTime = 0;
            audioLogo.play();
            setTimeout(() => {
                window.location.href = logoLink.href;
            }, 2000);
        });
        menuLinks.forEach(link => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                audio.currentTime = 0;
                audio.play();
                setTimeout(() => {
                    window.location.href = link.href;
                }, 800);
            });
        });
        
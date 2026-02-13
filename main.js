document.addEventListener("DOMContentLoaded", function () {

  /* ============================= */
  /* LOAD HEADER                   */
  /* ============================= */
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      const headerContainer = document.getElementById('header');
      if (headerContainer) {
        headerContainer.innerHTML = data;

        // Attach mobile menu toggle AFTER header loads
        const hamburger = headerContainer.querySelector('.hamburger');
        const mobileMenu = headerContainer.querySelector('#mobileMenu');

        if (hamburger && mobileMenu) {
          hamburger.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
          });
        }
      }
    })
    .catch(error => console.error('Header load error:', error));


  /* ============================= */
  /* LOAD FOOTER                   */
  /* ============================= */
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      const footerContainer = document.getElementById('footer');
      if (footerContainer) {
        footerContainer.innerHTML = data;
      }
    })
    .catch(error => console.error('Footer load error:', error));


  /* ============================= */
  /* FADE-IN SCROLL ANIMATION      */
  /* ============================= */
  const faders = document.querySelectorAll('.fade-in');

  if (faders.length > 0) {
    const appearOptions = {
      threshold: 0.2
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, appearOptions);

    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });
  }

});

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('burger');
  const menuWindow = document.getElementById('menu');
  const menuClose = document.getElementById('close');
  if (!menuToggle || !menuWindow || !menuClose) return;
  menuToggle.addEventListener('click', function() {
    menuWindow.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
  menuClose.addEventListener('click', function() {
    menuWindow.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
  const menuSection = document.getElementById('menu');
  const menuContainer = menuSection.querySelector('.container');
  const menuScroll = menuSection.querySelector('.menu__scroll');
  const menuLinks = document.querySelectorAll('#menu a');
  if (menuContainer && menuScroll) {
    menuContainer.style.display = 'none';
    menuScroll.style.display = 'none';
    menuScroll.style.position = 'fixed';
    menuScroll.style.top = '0';
    menuScroll.style.left = '0';
    menuScroll.style.width = '100%';
    menuScroll.style.zIndex = '1000';
    let isMenuOpen = false;
    function openMenu() {
      menuContainer.style.display = 'block';
      menuScroll.style.display = 'none';
      setTimeout(() => {
        menuContainer.style.opacity = '1';
      }, 10);
      isMenuOpen = true;
      document.body.classList.add('menu-open');
    }
    function closeMenu() {
      menuContainer.style.opacity = '0';
      setTimeout(() => {
        menuContainer.style.display = 'none';
      }, 300);
      menuScroll.style.display = 'none';
      isMenuOpen = false;
      document.body.classList.remove('menu-open');
    }
    function checkMenuPosition() {
      if (!isMenuOpen) return;
      const menuRect = menuSection.getBoundingClientRect();
      if (menuRect.bottom <= 0) {
        menuScroll.style.display = 'flex';
      } else {
        menuScroll.style.display = 'none';
      }
    }
    window.addEventListener('scroll', checkMenuPosition);
    menuToggle.addEventListener('click', function() {
      if (!isMenuOpen) {
        openMenu();
      } else {
        closeMenu();
      }
    });
    menuClose.addEventListener('click', closeMenu);
    if (menuLinks) {
      menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          if (link.getAttribute('data-target')) {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('data-target'));
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
              setTimeout(closeMenu, 300);
            }
          }
        });
      });
    }
    if (menuScroll) {
      const scrollLinks = menuScroll.querySelectorAll('a');
      if (scrollLinks) {
        scrollLinks.forEach(link => {
          link.addEventListener('click', function() {
            menuScroll.style.display = 'none';
          });
        });
      }
    }
  }
});
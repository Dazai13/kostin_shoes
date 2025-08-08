document.addEventListener('DOMContentLoaded', function() {
  const openBurger = document.querySelector('.header__burger'); // Открывает меню
  const closeBurger = document.querySelector('.menu__burger'); // Закрывает меню
  const menuWindow = document.getElementById('menu');
  const menuClose = document.getElementById('close');
  
  if (!openBurger || !closeBurger || !menuWindow || !menuClose) return;
  
  // Открытие меню по .header__burger
  openBurger.addEventListener('click', function() {
    menuWindow.classList.add('active');
    document.body.classList.add('menu-open');
  });
  
  // Закрытие меню по .menu__burger
  closeBurger.addEventListener('click', function() {
    menuWindow.classList.remove('active');
    document.body.classList.remove('menu-open');
    
    // Скрываем menu-scroll (если он есть)
    const menuScroll = document.querySelector('.menu__scroll');
    if (menuScroll) {
      menuScroll.style.display = 'none';
    }
  });
  
  // Закрытие меню по крестику (если нужно)
  menuClose.addEventListener('click', function() {
    menuWindow.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
  
  // Остальная логика (прокрутка, ссылки и т. д.)
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
    
    openBurger.addEventListener('click', function() {
      if (!isMenuOpen) {
        openMenu();
      }
    });
    
    closeBurger.addEventListener('click', closeMenu);
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
jQuery(document).ready(function($) {
    $('.accordion-header').on('click', function() {
        var $content = $(this).next('.accordion-content');
        var isActive = $content.hasClass('active');
        
        // Закрываем все открытые аккордеоны
        $('.accordion-content.active').not($content).removeClass('active')
            .prev('.accordion-header').css({
                'padding': '24px 0 24px',
                'transition': 'all .3s'
            });
        
        // Переключаем текущий аккордеон
        $content.toggleClass('active');
        
        if ($content.hasClass('active')) {
            $(this).css({
                'padding': '24px 0 0',
                'transition': 'all .3s'
            });
        } else {
            $(this).css({
                'padding': '24px 0 24px',
                'transition': 'all .3s'
            });
        }
    });
});
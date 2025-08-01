const menuToggle = document.getElementById('burger')
const menuWindow = document.getElementById('menu')
const menuClose = document.getElementById('close')
menuToggle.addEventListener('click', ()=>{
    menuWindow.classList.toggle('active');
})
menuClose.addEventListener('click', ()=>{
    menuWindow.classList.remove('active');
})

// Добавьте этот JavaScript в ваш проект
document.addEventListener('DOMContentLoaded', function() {
  const menuSection = document.getElementById('menu');
  const menuContainer = menuSection.querySelector('.container');
  const menuScroll = menuSection.querySelector('.menu__scroll');
  let isScrolling;
  
  // Изначально скрываем scroll-меню
  menuScroll.style.display = 'none';
  
  window.addEventListener('scroll', function() {
    // Показываем scroll-меню при скролле
    menuScroll.style.display = 'flex';
    
    // Скрываем основной контейнер меню
    menuContainer.style.opacity = '0';
    menuContainer.style.visibility = 'hidden';
    menuContainer.style.transition = 'opacity 0.3s, visibility 0.3s';
    
    // Сбрасываем предыдущий таймер
    clearTimeout(isScrolling);
    
    // Устанавливаем таймер для возврата к обычному состоянию после остановки скролла
    isScrolling = setTimeout(function() {
      // Возвращаем основной контейнер меню
      menuContainer.style.opacity = '1';
      menuContainer.style.visibility = 'visible';
      
      // Скрываем scroll-меню
      menuScroll.style.display = 'none';
    }, 300); // Задержка в миллисекундах перед возвратом
  });
});
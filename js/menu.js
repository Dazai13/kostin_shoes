const menuToggle = document.getElementById('burger')
const menuWindow = document.getElementById('menu')
const menuClose = document.getElementById('close')
menuToggle.addEventListener('click', ()=>{
    menuWindow.classList.toggle('active');
})
menuClose.addEventListener('click', ()=>{
    menuWindow.classList.remove('active');
})

document.addEventListener('DOMContentLoaded', function() {
  const menuSection = document.getElementById('menu');
  const menuContainer = menuSection.querySelector('.container');
  const menuScroll = menuSection.querySelector('.menu__scroll');
  let isScrolling;
  menuScroll.style.display = 'none';
  
  window.addEventListener('scroll', function() {
    menuScroll.style.display = 'flex';
    menuContainer.style.opacity = '0';
    menuContainer.style.visibility = 'hidden';
    menuContainer.style.transition = 'opacity 0.3s, visibility 0.3s';
    clearTimeout(isScrolling);
    isScrolling = setTimeout(function() {
      menuContainer.style.opacity = '1';
      menuContainer.style.visibility = 'visible';
      menuScroll.style.display = 'none';
    }, 300);
  });
});
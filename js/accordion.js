document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    const isActive = content.classList.contains('active');
    document.querySelectorAll('.accordion-content.active').forEach(item => {
      if (item !== content) item.classList.remove('active');
    });
    content.classList.toggle('active');
    if (content.classList.contains('active')) {
        header.style.padding = "24px 0 0";
        header.style.transition = "all .3s";
    } else {
        header.style.padding = "24px 0 24px";
        header.style.transition = "all .3s";
    }
  });
});
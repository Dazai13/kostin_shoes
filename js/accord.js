document.addEventListener('DOMContentLoaded', function() {
    var accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(function(header) {
        header.addEventListener('click', function() {
            var content = this.nextElementSibling;
            var isActive = content.classList.contains('active');
            var icon = this.querySelector('.accordion-icon'); // Находим иконку внутри заголовка
            
            // Закрываем все открытые аккордеоны
            document.querySelectorAll('.accordion-content.active').forEach(function(item) {
                if (item !== content) {
                    item.classList.remove('active');
                    // Сбрасываем стили заголовка и иконки для закрытых элементов
                    var prevHeader = item.previousElementSibling;
                    if (prevHeader) {
                        prevHeader.style.padding = "24px 0 24px";
                        prevHeader.style.transition = "all .3s";
                        var prevIcon = prevHeader.querySelector('.accordion-icon');
                        if (prevIcon) {
                            prevIcon.style.transform = "rotate(0deg)";
                            prevIcon.style.transition = "transform .3s";
                        }
                    }
                }
            });
            
            // Переключаем текущий аккордеон
            content.classList.toggle('active');
            
            if (content.classList.contains('active')) {
                this.style.padding = "24px 0 0";
                this.style.transition = "all .3s";
                if (icon) {
                    icon.style.transform = "rotate(-90deg)";
                    icon.style.transition = "transform .3s";
                }
            } else {
                this.style.padding = "24px 0 24px";
                this.style.transition = "all .3s";
                if (icon) {
                    icon.style.transform = "rotate(0deg)";
                    icon.style.transition = "transform .3s";
                }
            }
        });
    });
});
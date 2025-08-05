document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-target]').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                console.error('Элемент с ID "' + targetId + '" не найден');
            }
        });
    });
});
const popupComment=document.querySelector('.popup__comment')
const popupBtnComment=document.querySelector('.comment__btn')
const popupCloseComment=document.querySelector('.popup__comment-icon')
popupBtnComment.addEventListener('click', ()=>{
    popupComment.classList.toggle('active')
})
popupCloseComment.addEventListener('click', ()=>{
    popupComment.classList.remove('active')
})

document.querySelectorAll('.popup__comment-item .star-icon').forEach(star => {
    star.addEventListener('click', function() {
        const rating = parseInt(this.getAttribute('data-rating'));
        const starsContainer = this.closest('.stars');
        
        // Удаляем активный класс у всех
        starsContainer.querySelectorAll('.star-icon').forEach(s => {
            s.classList.remove('active');
        });
        
        // Добавляем активный класс всем звездам до выбранной
        starsContainer.querySelectorAll('.star-icon').forEach(s => {
            if (parseInt(s.getAttribute('data-rating')) <= rating) {
                s.classList.add('active');
            }
        });
    });
    
    // При наведении - подсвечиваем звезды до текущей
    star.addEventListener('mouseover', function() {
        const starsContainer = this.closest('.stars');
        const hoverRating = parseInt(this.getAttribute('data-rating'));
        
        starsContainer.querySelectorAll('.star-icon').forEach(s => {
            const sRating = parseInt(s.getAttribute('data-rating'));
            if (sRating <= hoverRating) {
                s.style.color = 'var(--gold)';
                s.style.strokeWidth = '0';
            } else {
                s.style.color = 'transparent';
                s.style.strokeWidth = '1px';
            }
        });
    });
    
    // При уходе курсора - восстанавливаем выбранные
    star.addEventListener('mouseout', function() {
        const starsContainer = this.closest('.stars');
        starsContainer.querySelectorAll('.star-icon').forEach(s => {
            s.style.color = s.classList.contains('active') ? 'var(--gold)' : 'transparent';
            s.style.strokeWidth = s.classList.contains('active') ? '0' : '1px';
        });
    });
});
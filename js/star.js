document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.popup__comment-item .star-icon').forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            const starsContainer = this.closest('.stars');
            starsContainer.querySelectorAll('.star-icon').forEach(s => {
                s.classList.remove('active');
            });
            starsContainer.querySelectorAll('.star-icon').forEach(s => {
                if (parseInt(s.getAttribute('data-rating')) <= rating) {
                    s.classList.add('active');
                }
            });
        });
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
        star.addEventListener('mouseout', function() {
            const starsContainer = this.closest('.stars');
            starsContainer.querySelectorAll('.star-icon').forEach(s => {
                s.style.color = s.classList.contains('active') ? 'var(--gold)' : 'transparent';
                s.style.strokeWidth = s.classList.contains('active') ? '0' : '1px';
            });
        });
    });
})
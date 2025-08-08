document.addEventListener("DOMContentLoaded", function() {
    const ajaxurl = window.ajaxurl || '/wp-admin/admin-ajax.php';

    function loadGallery(productId, color) {
        const gallery = document.querySelector('.popup-gallery');
        if (!gallery) return;

        gallery.innerHTML = '<div class="loading">Загрузка...</div>';

        const normalizedColor = color ? color.toString().toLowerCase().trim() : '';
        console.log('Запрос галереи. Товар:', productId, 'Цвет:', normalizedColor || 'все');

        fetch(ajaxurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=get_product_gallery&product_id=${productId}&color=${encodeURIComponent(normalizedColor)}`
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            if (!data || !data.success) {
                throw new Error(data?.data?.message || 'Неверный формат ответа');
            }
            renderGallery(data.data.images);
        })
        .catch(error => {
            console.error('Ошибка загрузки:', error);
            gallery.innerHTML = `<div class="error">Ошибка загрузки: ${error.message}</div>`;
        });
    }

    function renderGallery(images) {
        const gallery = document.querySelector('.popup-gallery');
        if (!gallery) return;

        if (!images || images.length === 0) {
            gallery.innerHTML = '<div class="no-images">Нет изображений</div>';
            return;
        }

        // SVG стрелки
        const arrowSVG = `
            <svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.49023 17.5L9.49023 9.50003L1.49023 1.50003" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;

        const mainImage = images[0];
        let thumbsHTML = '';

        images.forEach((img, index) => {
            thumbsHTML += `
                <div class="thumb" data-index="${index}">
                    <img src="${img.thumbnail}" 
                         alt="${img.color}" 
                         data-color="${img.color}">
                </div>`;
        });

        gallery.innerHTML = `
            <div class="main-image">
                <img src="${mainImage.url}" 
                     alt="${mainImage.color}" 
                     data-color="${mainImage.color}">
            </div>
            <div class="gallery-controls">
                <button class="gallery-arrow prev-arrow" aria-label="Предыдущее изображение">
                    ${arrowSVG}
                </button>
                <div class="thumbnails-container">
                    ${thumbsHTML}
                </div>
                <button class="gallery-arrow next-arrow" aria-label="Следующее изображение">
                    ${arrowSVG}
                </button>
            </div>
        `;

        initGalleryNavigation(images);
    }

    function initGalleryNavigation(images) {
    let currentIndex = 0;
    const mainImage = document.querySelector('.main-image img');
    const thumbs = document.querySelectorAll('.thumb');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');

    function updateGallery(index) {
        mainImage.src = images[index].url;
        mainImage.alt = images[index].color;
        
        thumbs.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
        
        // Обновляем состояние стрелок
        prevArrow.disabled = index === 0;
        nextArrow.disabled = index === images.length - 1;
        
        // Добавляем/удаляем классы состояний
        prevArrow.classList.toggle('disabled', index === 0);
        nextArrow.classList.toggle('disabled', index === images.length - 1);
    }

    // Обработчики для миниатюр
    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            updateGallery(index);
        });
    });

    // Обработчики для стрелок
    prevArrow.addEventListener('click', function() {
        if (currentIndex > 0) {
            updateGallery(currentIndex - 1);
        }
    });

    nextArrow.addEventListener('click', function() {
        if (currentIndex < images.length - 1) {
            updateGallery(currentIndex + 1);
        }
    });

    // Инициализация
    updateGallery(0);
}

    // Остальной код обработчиков событий остается без изменений
    document.addEventListener('click', function(e) {
        // Открытие попапа
        const card = e.target.closest('.catalog__content-item');
        if (card && !e.target.closest('.catalog-color')) {
            const productId = card.getAttribute('data-product-id');
            let color = card.getAttribute('data-active-color');
            
            if (!color || color === '0') {
                const firstColor = card.querySelector('.catalog-color')?.getAttribute('data-color');
                color = firstColor || '';
            }
            
            loadGallery(productId, color);
        }

        // Смена цвета в попапе
        const colorBtn = e.target.closest('.color-image-option');
        if (colorBtn) {
            const color = colorBtn.dataset.color;
            const productId = colorBtn.closest('.popup-card')?.getAttribute('data-product-id');
            if (productId) loadGallery(productId, color);
        }
    });
});
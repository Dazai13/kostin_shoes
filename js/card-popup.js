document.addEventListener("DOMContentLoaded", function() {
    const colorTranslations = {
        'brown': 'Коричневый',
        'black': 'Чёрный',
        'green': 'Зелёный',
        'blue': 'Синий'
    };

    // Проверка доступности товара
    function checkProductAvailability(variationData) {
        return variationData.in_stock !== false && 
               !(variationData.price_html && variationData.price_html.toLowerCase().includes('нет в наличии'));
    }

    // Обновление отображаемого цвета
    function updateSelectedColor(color) {
        const colorNameElement = document.querySelector('.selected-color li');
        if (colorNameElement) {
            colorNameElement.textContent = colorTranslations[color] || color;
        }
    }

    // Загрузка галереи для конкретного цвета
    function loadGalleryForColor(productId, color) {
        const galleryContainer = document.querySelector('.popup-gallery');
        if (!galleryContainer) return;

        galleryContainer.innerHTML = '<div class="gallery-loading">Загрузка изображений...</div>';

        // Проверяем, что jQuery доступен
        if (typeof jQuery === 'undefined') {
            galleryContainer.innerHTML = '<div class="gallery-error">Ошибка: jQuery не загружен</div>';
            return;
        }

        jQuery.ajax({
            url: ajaxurl,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'get_product_gallery',
                product_id: productId,
                color: color
            },
            success: function(response) {
                if (response && response.success && response.data && response.data.images) {
                    renderGallery(response.data.images);
                } else {
                    galleryContainer.innerHTML = '<div class="no-images">Нет изображений для выбранного цвета</div>';
                }
            },
            error: function(xhr, status, error) {
                galleryContainer.innerHTML = `<div class="gallery-error">Ошибка загрузки: ${error}</div>`;
            }
        });
    }

    // Отрисовка галереи с навигацией
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

    // Инициализация навигации по галерее
    function initGalleryNavigation(images) {
        let currentIndex = 0;
        const mainImage = document.querySelector('.main-image img');
        const thumbs = document.querySelectorAll('.thumb');
        const prevArrow = document.querySelector('.prev-arrow');
        const nextArrow = document.querySelector('.next-arrow');

        function updateGallery(index) {
            // Обновляем основное изображение
            mainImage.src = images[index].url;
            mainImage.alt = images[index].color;
            
            // Обновляем активную миниатюру
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

    // Обработчик кликов по цветам в каталоге
    document.addEventListener('click', function(e) {
        const colorElement = e.target.closest('.catalog-color');
        if (colorElement) {
            e.preventDefault();
            e.stopPropagation();
            
            const card = colorElement.closest('.catalog__content-item');
            const color = colorElement.getAttribute('data-color');
            card.setAttribute('data-active-color', color);
            
            const popup = document.querySelector('.popup-card.active');
            if (popup) {
                updateSelectedColor(color);
                
                const popupColor = popup.querySelector(`.color-image-option[data-color="${color}"]`);
                if (popupColor) {
                    popupColor.classList.add('active');
                    const isAvailable = !popupColor.classList.contains('none');
                    document.querySelector('.popup__add-to-cart').classList.toggle('disabled', !isAvailable);
                }
            }
        }
    });

    // Обработчик открытия попапа
    document.querySelectorAll('.catalog__content-item').forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.closest('.catalog-color') || e.target.closest('.catalog__item-colors')) {
                return;
            }
            
            const popupCard = document.querySelector('.popup-card');
            const productId = this.getAttribute('data-product-id');
            popupCard.setAttribute('data-product-id', productId);
            
            // Установка заголовка и описания
            document.getElementById('popup-product-title').textContent = 
                this.getAttribute('data-product-title') || 'Без названия';
            
            const descriptionHtml = this.getAttribute('data-product-description') || 
                                 this.getAttribute('data-product-short-description') || '';
            
            const textDescription = descriptionHtml.replace(/<div id='(green|brown|black|blue)'[^>]*>[\s\S]*?<\/div>/g, '').trim();
            document.getElementById('popup-product-description').innerHTML = textDescription || '—';
            
            // Обработка цветовых вариантов
            const colorsContainer = document.getElementById('popup-product-colors');
            colorsContainer.innerHTML = '';
            
            try {
                const variations = JSON.parse(this.getAttribute('data-variations') || '{}');
                let activeColor = this.getAttribute('data-active-color') || '';
                
                // Если активный цвет не указан, берем первый доступный
                if (!activeColor || !variations[activeColor]) {
                    const availableColors = Object.keys(variations);
                    if (availableColors.length > 0) {
                        activeColor = availableColors[0];
                    }
                }
                
                updateSelectedColor(activeColor);
                
                if (Object.keys(variations).length > 0) {
                    const activeVariation = variations[activeColor];
                    const isActiveAvailable = checkProductAvailability(activeVariation);
                    
                    // Установка цены и кнопки
                    document.getElementById('popup-product-price').innerHTML = 
                        isActiveAvailable ? (activeVariation.price_html || 'Цена не указана') : 'Нет в наличии';
                    
                    document.querySelector('.popup__add-to-cart').classList.toggle('disabled', !isActiveAvailable);
                    
                    // Создание элементов выбора цвета
                    for (const [color, data] of Object.entries(variations)) {
                        if (!data.image) continue;
                        
                        const isAvailable = checkProductAvailability(data);
                        const colorElement = document.createElement('div');
                        colorElement.className = `color-image-option ${color === activeColor ? 'active' : ''} ${!isAvailable ? 'none' : ''}`;
                        colorElement.dataset.color = color;
                        colorElement.innerHTML = `
                            <img src="${data.image}" alt="${color}" class="color-thumbnail">
                            ${!isAvailable ? '<span class="out-of-stock-badge">Нет в наличии</span>' : ''}
                        `;
                        
                        // Обработчик клика по цвету в попапе
                        colorElement.addEventListener('click', function(e) {
                            e.stopPropagation();
                            const selectedColor = this.dataset.color;
                            const isSelectedAvailable = checkProductAvailability(variations[selectedColor]);
                            
                            // Обновление активного цвета
                            document.querySelectorAll('.color-image-option').forEach(opt => {
                                opt.classList.remove('active');
                            });
                            this.classList.add('active');
                            
                            updateSelectedColor(selectedColor);
                            
                            // Обновление цены и кнопки
                            document.getElementById('popup-product-price').innerHTML = 
                                isSelectedAvailable ? (variations[selectedColor].price_html || 'Цена не указана') : 'Нет в наличии';
                            
                            document.querySelector('.popup__add-to-cart').classList.toggle('disabled', !isSelectedAvailable);
                            
                            // Обновление галереи
                            loadGalleryForColor(productId, selectedColor);
                        });
                        
                        colorsContainer.appendChild(colorElement);
                    }
                }
            } catch (e) {
                console.error('Ошибка обработки вариаций:', e);
                document.getElementById('popup-product-price').innerHTML = 'Нет в наличии';
                document.querySelector('.popup__add-to-cart').classList.add('disabled');
                colorsContainer.textContent = 'Нет данных о вариантах';
            }
            
            // Блокировка скролла и открытие попапа
            document.body.classList.add('no-scroll');
            popupCard.classList.add('active');
            
            // Загрузка галереи при открытии попапа
            loadGalleryForColor(productId, activeColor || '');
        });
    });
    
    // Закрытие попапа
    document.querySelector('.popup__card-icon').addEventListener('click', function() {
        document.querySelector('.popup-card').classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
    
    // Обработчик кнопки "Добавить в корзину"
    document.querySelector('.popup__add-to-cart').addEventListener('click', function() {
        if (this.classList.contains('disabled')) {
            return;
        }
        
        const popup = document.querySelector('.popup-card.active');
        if (!popup) return;
        
        const productId = popup.getAttribute('data-product-id');
        const activeColor = popup.querySelector('.color-image-option.active')?.dataset.color;
        
        console.log(`Добавляем в корзину товар ${productId}, цвет: ${activeColor}`);
    });
});
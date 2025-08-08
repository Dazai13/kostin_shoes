<div class="popup-card">
    <div class="popup__card-content">
        <div class="form__popup-close">
            <svg class="popup__card-icon">
                <use xlink:href="<?php echo get_template_directory_uri();?>/images/sprite.svg#close_popup"></use>
            </svg>
        </div>
        <div class="popup__card-items">
            <div class="popup-gallery">
                <!-- Галерея будет загружаться здесь динамически -->
            </div>
            <div class="popup__card-info">
                <h3 id="popup-product-title" class="popup__title"></h3>
                <div id="popup-product-description" class="popup__description"></div>
                <div id="popup-product-price" class="popup__price"></div>
                <div class="selected-color">Цвет <li>Выбранный цвет</li></div>
                <div id="popup-product-colors" class="popup__colors"></div>
                <button class="popup__add-to-cart btn request-popup">Оставить заявку</button>
            </div>
        </div>
    </div>
</div>
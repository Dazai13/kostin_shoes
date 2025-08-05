<div class="popup__form">
    <div class="popup__form-content">
        <div class="form__popup-close"><svg class="form__popup-icon"><use xlink:href="<?php echo get_template_directory_uri();?>/images/sprite.svg#close_popup"></use></svg></div>
        <div class="form__popup-items">
            <div class="form__popup-image"><img src="<?php echo get_template_directory_uri();?>/images/popup-form.png" alt=""></div>
            <form action="" class="form__popup-item">
                <h3 class="form__popup-title">оставить заявку</h3>
                <img src="<?php echo get_template_directory_uri();?>/images/menu-logo.png" alt="" class="form__popup-logo">
                <input id="phone-input" type="text" class="form__popup-input input" placeholder="+7 (___) ___ - __ - __">
                <div class="checkbox__container">
                    <input type="checkbox" value="indigo" class="checkbox" name="colors">
                    <label class="text-3">
                    Оставляя заявку Вы соглашаетесь с <span>политикой конфиденциальности</span>
                    </label>
                </div>
                <button class="form__popup-btn btn">Оставить заявку</button>
            </form>
        </div>
    </div>
</div>
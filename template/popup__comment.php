<div class="popup__comment">
    <div class="popup__comment-content">
        <div class="popup__comment-close"><svg class="popup__comment-icon"><use xlink:href="<?php echo get_template_directory_uri();?>/images/sprite.svg#close_popup"></use></svg></div>
        <div class="popup__comment-items">
            <div class="form__popup-image"><img src="<?php echo get_template_directory_uri();?>/images/popup-comment.png" alt=""></div>
            <form action="" class="popup__comment-item">
                <h3 class="form__popup-title">ваш опыт</h3>
                <img src="<?php echo get_template_directory_uri();?>/images/menu-logo.png" alt="" class="popup__comment-image">
                <div class="rating-block">
                    <p class="rating-text text-4">Ваш рейтинг:</p>
                    <div class="stars">            
                        <svg class="star-icon" data-rating="1"><use xlink:href='<?php echo get_template_directory_uri();?>/images/sprite.svg#star'></use></svg>
                        <svg class="star-icon" data-rating="2"><use xlink:href='<?php echo get_template_directory_uri();?>/images/sprite.svg#star'></use></svg>
                        <svg class="star-icon" data-rating="3"><use xlink:href='<?php echo get_template_directory_uri();?>/images/sprite.svg#star'></use></svg>
                        <svg class="star-icon" data-rating="4"><use xlink:href='<?php echo get_template_directory_uri();?>/images/sprite.svg#star'></use></svg>
                        <svg class="star-icon" data-rating="5"><use xlink:href='<?php echo get_template_directory_uri();?>/images/sprite.svg#star'></use></svg>
                    </div>
                </div>
                <input id="name" type="text" class="popup__comment-input input" placeholder="Ваше имя">
                <input id="prof" type="text" class="popup__comment-input input" placeholder="Чем занимаетесь?">
                <textarea id="text" type="text" class="popup__comment-input input" placeholder="Расскажите о качестве обуви и Вашем опыте сотрудничества с нами."></textarea>
                <button class="form__popup-btn btn">Оставить заявку</button>
            </form>
        </div>
    </div>
</div>
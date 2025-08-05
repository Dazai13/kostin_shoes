<section id="gallery" class="gallery">
    <div class="container">
        <div class="gallery__inner">
            <div class="gallery__intro">
                <h2 class="gallery-title">Галерея Качества</h2>
                <p class="gallery-text text-5">Посмотрите, как выглядит настоящая индивидуальная обувь</p>
            </div>
            <div class="gallery__items">
                <img src="<?php echo get_template_directory_uri();?>/images/gallery-item-1.png" alt="" class="gallery-item">
                <div class="gallery__item-block">
                    <img src="<?php echo get_template_directory_uri();?>/images/gallery-item-2.png" alt="" class="gallery__block-item">
                    <div class="gallery__text-link link"><p class="gallery__link text-3">посмотреть модели</p><svg class="gallery__number-icon"><use xlink:href="<?php echo get_template_directory_uri();?>/images/sprite.svg#arrow"></use></svg></div>
                </div>
                <img src="<?php echo get_template_directory_uri();?>/images/popup-form.png" alt="" class="gallery-item">    
                <picture>
                    <source media="(max-width: 1199px)" srcset="<?php echo get_template_directory_uri();?>/images/gallery-item-4-mob.png">
                    <img src="<?php echo get_template_directory_uri();?>/images/gallery-item-4.png" alt="" class="gallery-item">
                </picture>
            </div>
        </div>
    </div>
</section>
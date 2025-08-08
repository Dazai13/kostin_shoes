<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title() ?></title>
    <?php wp_head(); ?>
</head>
<body class="body">
    <header class="header">
        <div class="container">
            <div class="header__inner inner">
                <nav class="header__nav">
                    <a data-target="catalog" class="header__nav-link link text-3">Коллекция</a>
                    <a data-target="privilages" class="header__nav-link link text-3">Преимущества</a>
                    <a data-target="comment" class="header__nav-link link text-3">Отзывы</a>
                </nav>
                <img src="<?php echo get_template_directory_uri();?>/images/logo.png" alt="" class="header__logo">
                <div class="header__contact">
                    <a href="tel:+79991234567" class="header__contact-number link">
                        <svg class="header__number-icon"><use xlink:href="<?php echo get_template_directory_uri();?>/images/sprite.svg#phone"></use></svg>
                        <p class="header__number-text text-4">+ 7 (999) 123-45-67</p>
                    </a>
                    <button class="header__contact-btn .btn text-4 request-popup">Оставить заявку</button>
                </div>
                <svg id="burger" class="header__burger"><use xlink:href="<?php echo get_template_directory_uri();?>/images/sprite.svg#burger"></use></svg>
            </div>
        </div>
    </header>
    <section id='menu' class="menu">
        <div class="container">
            <div class="menu__wrapper">
                <div class="menu__close">
                    <svg id="close" class="menu__close-icon"><use xlink:href='<?php echo get_template_directory_uri();?>/images/sprite.svg#close'></use></svg>
                </div>
                <div class="menu__content">
                    <div class="menu__content-logo menu__content-item">
                        <img src="<?php echo get_template_directory_uri();?>/images/menu-logo.png" alt="">
                    </div>
                    <nav class="menu__nav menu__content-item">
                        <a data-target="catalog" class="menu__nav-link link text-4">Коллекция</a>
                        <a data-target="privilages" class="menu__nav-link link text-4">Преимущества</a>
                        <a data-target="gallery" class="menu__nav-link link text-4">Галерея</a>
                        <a data-target="qa" class="menu__nav-link link text-4">Вопрос-ответ</a>
                        <a data-target="comment" class="menu__nav-link link text-4">Отзывы</a>
                        <a data-target="garanty" class="menu__nav-link link text-4">Гарантия</a>
                    </nav>
                    <div class="menu__social menu__content-item">
                        <a href="tel:+79991234567" class="menu__social-item">
                            <svg class="menu__social-icon"><use xlink:href='<?php echo get_template_directory_uri();?>/images/sprite.svg#phone'></use></svg>
                            <p class="menu__social-text text-4">+ 7 (999) 123-45-67</p>
                        </a>
                        <a href="https://wa.me/79223636474" class="menu__social-item">
                            <svg class="menu__social-icon"><use xlink:href='<?php echo get_template_directory_uri();?>/images/sprite.svg#whatsapp'></use></svg>
                            <p class="menu__social-text text-4">WhatsApp</p>
                        </a>
                        <a href='https://t.me/koster90' class="menu__social-item">
                            <svg class="menu__social-icon"><use xlink:href='<?php echo get_template_directory_uri();?>/images/sprite.svg#telegram'></use></svg>
                            <p class="menu__social-text text-4">Telegram</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="menu__scroll">
            <a href="tel:+79991234567"><svg class="menu__social-icon"><use xlink:href='<?php echo get_template_directory_uri();?>/images/sprite.svg#phone'></use></svg></a>
            <a href="https://wa.me/79223636474"><svg class="menu__social-icon"><use xlink:href='<?php echo get_template_directory_uri();?>/images/sprite.svg#whatsapp'></use></svg></a>  
            <a href='https://t.me/koster90'><svg class="menu__social-icon"><use xlink:href='<?php echo get_template_directory_uri();?>/images/sprite.svg#telegram'></use></svg></a>
            <svg class="menu__burger"><use xlink:href="<?php echo get_template_directory_uri();?>/images/sprite.svg#burger"></use></svg>
        </div>
    </section>
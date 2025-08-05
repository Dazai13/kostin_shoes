    <footer class="footer">
        <div class="container">
            <div class="footer__inner">
                <div class="footer__content">
                    <div class="footer__logo ">
                        <img src="<?php echo get_template_directory_uri();?>/images/menu-logo.png" alt="" class="footer__logo-image">
                        <p class="footer__logo-title text-4">Индивидуальная мужская обувь</p>
                        <p class="footer__logo-text text-4">Онлайн-замеры. Быстрый пошив. Гарантия результата.</p>
                    </div>
                    <div class="footer__contact">
                        <p class="text-4">
                            <a href="mailto:kostinshoes@mail.ru">kostinshoes@mail.ru</a>
                        </p>
                        <p class="text-4">
                            <a href="tel:+79991234567">+ 7 (999) 123-45-67</a>
                        </p>
                        <div class="footer__contact-social">
                            <a href="tel:+79991234567"><svg class="footer__social-icon"><use xlink:href="<?php echo get_template_directory_uri();?>/images/sprite.svg#phone"></use></svg></a>
                            <a href="https://t.me/koster90"><svg class="footer__social-icon"><use xlink:href='<?php echo get_template_directory_uri();?>/images/sprite.svg#telegram'></use></svg></a>
                            <a href="https://wa.me/79223636474"><svg class="footer__social-icon"><use xlink:href='<?php echo get_template_directory_uri();?>/images/sprite.svg#whatsapp'></use></svg></a>
                        </div>
                    </div>
                    <div class="footer__about">
                        <p class="footer__about-title text-2">О нас</p>
                        <p class="footer__about-text text-4">Политика конфиденциальности</p>
                        <p class="footer__about-text text-4">Обработка персональных данных</p>
                    </div>
                    <nav class="footer__nav">
                        <p class="footer__nav-title text-2">Клиентам</p>
                        <a data-target="catalog" class="footer__nav-text text-4">Коллекция</a>
                        <a data-target="privilages" class="footer__nav-text text-4">Преимущества</a>
                        <a data-target="gallery" class="footer__nav-text text-4">Галерея</a>
                        <a data-target="comment" class="footer__nav-text text-4">Отзывы</a>
                        <a data-target="qa" class="footer__nav-text text-4">Вопрос-ответ</a>
                        <a data-target="garanty" class="footer__nav-text text-4">Гарантия</a>
                    </nav>
                </div>
                <div class="footer__under">
                    <p class="footer__under-text">ИП Серебренников Константин Сергеевич</p>
                    <p class="footer__under-text">ИНН 592061069935</p>
                </div>
            </div>
        </div>
    </footer>
    <?php include(locate_template('template/popup__form.php'));?>
    <?php include(locate_template('template/popup__comment.php'));?>
    <?php include(locate_template('template/popup__phone.php'));?>
</body>
</html>
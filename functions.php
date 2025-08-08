<?php
function my_theme_styles() {
    wp_enqueue_style(
        'main-style', 
        get_template_directory_uri() . '/css/style.css',
        array(),
        filemtime(get_template_directory() . '/css/style.css')
    );
    wp_enqueue_style(
        'slick-style', 
        'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css'
    );
    wp_enqueue_style(
        'slick-theme', 
        'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css',
        array('slick-style')
    );
}
add_action('wp_enqueue_scripts', 'my_theme_styles');

function my_theme_scripts() {
    if (!is_admin()) {
        wp_deregister_script('jquery');
        wp_register_script(
            'jquery',
            'https://code.jquery.com/jquery-3.6.0.min.js',
            false,
            '3.6.0',
            true
        );
        wp_enqueue_script('jquery');
        wp_enqueue_script(
            'slick-js',
            'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',
            array('jquery'),
            '1.8.1',
            true
        );
        wp_enqueue_script(
            'mask-js',
            'https://cdn.jsdelivr.net/npm/jquery.maskedinput@1.4.1/src/jquery.maskedinput.min.js',
            array('jquery'),
            '1.4.1',
            true
        );
        $scripts = array(
            'slider'     => array('jquery', 'slick-js'),
            'target'     => array(),
            'menu'       => array(),
            'comment'    => array(),
            'catalog' => array(),
            'card-popup' => array(),
            'accord'  => array(),
            'card-gallery'  => array('jquery', 'slick-js'),
            'star'       => array(),
            'popup_form' => array(),
            'card'       => array(),
            'phone_popup'=> array(),
            'phone_mask' => array('mask-js')
        );
        
        foreach ($scripts as $handle => $deps) {
            wp_enqueue_script(
                $handle,
                get_template_directory_uri() . '/js/' . $handle . '.js',
                $deps,
                filemtime(get_template_directory() . '/js/' . $handle . '.js'),
                false
            );
        }
    }
}
add_action('wp_enqueue_scripts', 'my_theme_scripts');

function get_color_hex($color_name) {
    $color_name = trim(strtolower((string)$color_name));
    
    $color_map = [
        'brown' => '#3D312B',
        'black' => '#000000',
        'green' => '#32493D',
        'blue'  => '#00295F'
    ];
    
    return $color_map[$color_name] ?? '#cccccc';
}

function get_product_gallery_html($product, $color = '') {
    $gallery_ids = $product->get_gallery_image_ids();
    $html = '';
    
    // Основное изображение
    if ($main_image_id = $product->get_image_id()) {
        $alt = strtolower(get_post_meta($main_image_id, '_wp_attachment_image_alt', true));
        $html .= wp_get_attachment_image($main_image_id, 'woocommerce_single', false, array(
            'class' => 'gallery-image',
            'data-color' => $alt
        ));
    }
    
    // Галерея
    foreach ($gallery_ids as $image_id) {
        $alt = strtolower(get_post_meta($image_id, '_wp_attachment_image_alt', true));
        $html .= wp_get_attachment_image($image_id, 'woocommerce_single', false, array(
            'class' => 'gallery-image',
            'data-color' => $alt
        ));
    }
    
    return $html;
}

function get_product_gallery() {
    // Инициализация переменных
    $product_id = isset($_POST['product_id']) ? intval($_POST['product_id']) : 0;
    $requested_color = isset($_POST['color']) ? sanitize_text_field(strtolower($_POST['color'])) : '';
    $images = array();
    $response = array(
        'success' => false,
        'data' => array(
            'message' => 'Товар не найден',
            'images' => array()
        )
    );

    // Получаем продукт
    $product = wc_get_product($product_id);
    if (!$product) {
        wp_send_json($response);
        wp_die();
    }

    // Обработка основного изображения
    if ($main_id = $product->get_image_id()) {
        $main_color = strtolower(get_post_meta($main_id, '_wp_attachment_image_alt', true));
        if (empty($requested_color) || $main_color === $requested_color) {
            $images[] = array(
                'url' => wp_get_attachment_image_url($main_id, 'woocommerce_single'),
                'thumbnail' => wp_get_attachment_image_url($main_id, 'woocommerce_gallery_thumbnail'),
                'color' => $main_color
            );
        }
    }

    // Обработка галереи изображений
    $gallery_ids = $product->get_gallery_image_ids();
    foreach ($gallery_ids as $img_id) {
        $img_color = strtolower(get_post_meta($img_id, '_wp_attachment_image_alt', true));
        if (empty($requested_color) || $img_color === $requested_color) {
            $images[] = array(
                'url' => wp_get_attachment_image_url($img_id, 'woocommerce_single'),
                'thumbnail' => wp_get_attachment_image_url($img_id, 'woocommerce_gallery_thumbnail'),
                'color' => $img_color
            );
        }
    }

    // Формируем ответ
    $response = array(
        'success' => true,
        'data' => array(
            'images' => $images,
            'message' => empty($images) ? 'Нет изображений для выбранного цвета' : ''
        )
    );

    wp_send_json($response);
    wp_die();
}
add_action('wp_ajax_get_product_gallery', 'get_product_gallery');
add_action('wp_ajax_nopriv_get_product_gallery', 'get_product_gallery');function add_ajaxurl_to_frontend() {
    echo '<script type="text/javascript">
        window.ajaxurl = "' . admin_url('admin-ajax.php') . '";
    </script>';
}
add_action('wp_head', 'add_ajaxurl_to_frontend');

// Убедитесь, что jQuery загружается правильно
function fix_jquery_load_order() {
    wp_enqueue_script('jquery');
}
add_action('wp_enqueue_scripts', 'fix_jquery_load_order', 1);


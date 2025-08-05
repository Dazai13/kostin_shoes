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
            'accordion'  => array(),
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
<section id='catalog' class="catalog">
    <div class="container">
        <div class="catalog__inner inner">
            <div class="catalog__text">
                <div class="catalog__text-title">
                    <h3 class="catalog__title">коллекция</h3>
                    <p class="text-5">Выберите модель под свой стиль и вкус</p>
                </div>
                <div class="catalog__text-link link"><p class="catalog__link text-5 request-popup">Оставить заявку</p><svg class="catalog__number-icon"><use xlink:href="<?php echo get_template_directory_uri();?>/images/sprite.svg#arrow"></use></svg></div>
            </div>
            <div class="catalog__content">
                <?php
                $args = array(
                    'post_type' => 'product',
                    'posts_per_page' => 8,
                );
                $loop = new WP_Query($args);
                if ($loop->have_posts()) {
                    while ($loop->have_posts()) : $loop->the_post();
                        global $product;
                        $product_id = $product->get_id();
                        $product_title = get_the_title();
                        $product_description = get_the_content();
                        $product_short_description = get_the_excerpt();
                        
                        $color_settings = [
                            'brown' => ['code' => '#3D312B', 'active' => true],
                            'black' => ['code' => '#000000', 'active' => false],
                            'green' => ['code' => '#32493D', 'active' => false],
                            'blue' => ['code' => '#00295F', 'active' => false]
                        ];
                        $default_image = get_the_post_thumbnail_url($product->get_id(), 'woocommerce_single');
                        $active_image = $default_image;
                        $initial_price = 'Нет в наличии';
                        $has_any_in_stock = false;
                        $initial_stock_status = false;
                        $initial_on_sale = false;
                        
                        $variations_data = [];
                        
                        if ($product->is_type('variable')) {
                            $variations = $product->get_available_variations();
                            foreach ($color_settings as $color => $settings) {
                                $color_settings[$color]['exists'] = false;
                                $color_settings[$color]['in_stock'] = false;
                                $color_settings[$color]['image'] = $default_image;
                                $color_settings[$color]['price'] = 'Нет в наличии';
                                $color_settings[$color]['price_html'] = 'Нет в наличии';
                                $color_settings[$color]['variation_id'] = 0;
                                $color_settings[$color]['on_sale'] = false;
                            }
                            foreach ($variations as $variation) {
                                if (isset($variation['attributes']['attribute_color'])) {
                                    $color_name = strtolower(sanitize_title($variation['attributes']['attribute_color']));
                                    if (isset($color_settings[$color_name])) {
                                        $variation_obj = wc_get_product($variation['variation_id']);
                                        $color_settings[$color_name]['exists'] = true;
                                        $color_settings[$color_name]['in_stock'] = $variation['is_in_stock'];
                                        $color_settings[$color_name]['image'] = $variation['image']['url'] ?? $default_image;
                                        $color_settings[$color_name]['variation_id'] = $variation['variation_id'];
                                        $color_settings[$color_name]['on_sale'] = $variation_obj->is_on_sale();
                                        
                                        $variations_data[$color_name] = [
                                            'image' => $color_settings[$color_name]['image'],
                                            'price_html' => $variation_obj->get_price_html(),
                                            'variation_id' => $variation['variation_id'],
                                            'in_stock' => $variation['is_in_stock'],
                                            'on_sale' => $variation_obj->is_on_sale(),
                                            'color_code' => $color_settings[$color_name]['code']
                                        ];
                                        
                                        if ($variation['is_in_stock']) {
                                            $color_settings[$color_name]['price'] = $variation_obj->get_price();
                                            $color_settings[$color_name]['price_html'] = $variation_obj->get_price_html();
                                            $has_any_in_stock = true;
                                            
                                            if ($color_settings[$color_name]['active']) {
                                                $active_image = $color_settings[$color_name]['image'];
                                                $initial_price = $color_settings[$color_name]['price_html'];
                                                $initial_stock_status = true;
                                                $initial_on_sale = $color_settings[$color_name]['on_sale'];
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            $in_stock = $product->is_in_stock();
                            $has_any_in_stock = $in_stock;
                            $initial_stock_status = $in_stock;
                            $initial_on_sale = $product->is_on_sale();
                            foreach ($color_settings as $color => $settings) {
                                $color_settings[$color]['exists'] = true;
                                $color_settings[$color]['in_stock'] = $in_stock;
                                $color_settings[$color]['image'] = $default_image;
                                $color_settings[$color]['price'] = $in_stock ? $product->get_price() : 'Нет в наличии';
                                $color_settings[$color]['price_html'] = $in_stock ? $product->get_price_html() : 'Нет в наличии';
                                $color_settings[$color]['on_sale'] = $product->is_on_sale();
                                
                                $variations_data[$color] = [
                                    'image' => $default_image,
                                    'price_html' => $product->get_price_html(),
                                    'variation_id' => $product_id,
                                    'in_stock' => $in_stock,
                                    'on_sale' => $product->is_on_sale(),
                                    'color_code' => $color_settings[$color]['code']
                                ];
                                
                                if ($color_settings[$color]['active'] && $in_stock) {
                                    $initial_price = $color_settings[$color]['price_html'];
                                }
                            }
                        }
                        ?>
                        <div class="catalog__content-item <?php echo !$initial_stock_status ? 'none' : ''; ?> <?php echo $initial_on_sale ? 'sale' : ''; ?>"
                            data-product-id="<?php echo esc_attr($product_id); ?>"
                            data-product-title="<?php echo esc_attr($product_title); ?>"
                            data-product-description="<?php echo esc_attr($product_description); ?>"
                            data-product-short-description="<?php echo esc_attr($product_short_description); ?>"
                            data-variations="<?php echo esc_attr(json_encode($variations_data)); ?>"
                            data-active-color="<?php echo array_search(true, array_column($color_settings, 'active')); ?>"
                            data-product-gallery="<?php echo esc_attr(get_product_gallery_html($product)); ?>">
                            <div class="sale-block text-4">20%</div>
                            <img src="<?php echo esc_url($active_image); ?>" alt="<?php the_title_attribute(); ?>" class="catalog__item-image">
                            <div class="catalog__item-info">
                                <p class="catalog__item-title text-2"><?php the_title(); ?></p>
                                <div class="catalog__item-colors">
                                    <?php foreach ($color_settings as $color => $settings): ?>
                                        <?php if ($settings['exists']): ?>
                                            <div class="catalog-color <?php echo $settings['active'] ? 'active' : ''; ?>" 
                                                data-color="<?php echo esc_attr($color); ?>" 
                                                data-image="<?php echo esc_url($settings['image']); ?>"
                                                data-price="<?php echo esc_attr($settings['price_html']); ?>"
                                                data-variation-id="<?php echo esc_attr($settings['variation_id']); ?>"
                                                data-in-stock="<?php echo $settings['in_stock'] ? 'true' : 'false'; ?>"
                                                data-on-sale="<?php echo $settings['on_sale'] ? 'true' : 'false'; ?>">
                                                <div class="color" style="background-color: <?php echo esc_attr($settings['code']); ?>"></div>
                                            </div>
                                        <?php endif; ?>
                                    <?php endforeach; ?>
                                </div>
                                <p class="catalog__item-price text-5"><?php echo $initial_price; ?></p>
                            </div>
                        </div>
                    <?php
                    endwhile;
                }
                wp_reset_postdata();
                ?>
            </div>
        </div>
    </div>
</section>
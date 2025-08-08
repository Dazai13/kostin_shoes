jQuery(document).ready(function($) {
    'use strict';
    function initializeProductImages() {
        $('.catalog__content-item').each(function() {
            var $productItem = $(this);
            var $activeColor = $productItem.find('.catalog-color.active').first();
            if ($activeColor.length === 0) {
                $activeColor = $productItem.find('.catalog-color').first();
            }
            var initialImage = $activeColor.data('image');
            $productItem.find('.catalog__item-image').attr('src', initialImage);
            var hasStrikethroughPrice = $productItem.find('.catalog__item-price del').length > 0;
            updateSaleClass($productItem, hasStrikethroughPrice);
            updateProductAvailability($productItem);
        });
    }
    function handleColorClick() {
        var $colorElement = $(this);
        var $productItem = $colorElement.closest('.catalog__content-item');
        $productItem.find('.catalog-color').removeClass('active');
        $colorElement.addClass('active');
        updateProductImage($productItem, $colorElement.data('image'));
        if ($colorElement.data('price')) {
            $productItem.find('.catalog__item-price').html($colorElement.data('price'));
            var tempDiv = $('<div>').html($colorElement.data('price'));
            var hasStrikethroughPrice = tempDiv.find('del').length > 0;
            updateSaleClass($productItem, hasStrikethroughPrice);
            updateProductAvailability($productItem);
        } else if ($colorElement.data('variation-id')) {
            updateProductPrice($productItem, $colorElement.data('variation-id'));
        }
    }
    function updateProductImage($productItem, newImage) {
        $productItem.find('.catalog__item-image')
            .attr('src', newImage)
            .css('opacity', 0)
            .animate({opacity: 1}, 200);
    }
    function updateSaleClass($productItem, isOnSale) {
        if (isOnSale) {
            $productItem.addClass('sale');
        } else {
            $productItem.removeClass('sale');
        }
    }
    function updateProductPrice($productItem, variationId) {
        $.ajax({
            url: wc_add_to_cart_params.ajax_url,
            type: 'POST',
            data: {
                action: 'woocommerce_get_variation_price',
                variation_id: variationId
            },
            success: function(response) {
                if (response && response.display_price) {
                    $productItem.find('.catalog__item-price').html(response.display_price);
                    var tempDiv = $('<div>').html(response.display_price);
                    var hasStrikethroughPrice = tempDiv.find('del').length > 0;
                    updateSaleClass($productItem, hasStrikethroughPrice);
                    updateProductAvailability($productItem);
                }
            }
        });
    }
    function updateProductAvailability($product) {
        var priceText = $product.find('.catalog__item-price').text().toLowerCase();
        var inStock = $product.find('.catalog-color.active').data('in-stock');
        
        if (inStock === 'false' || priceText.includes('нет в наличии')) {
            $product.addClass('none');
        } else {
            $product.removeClass('none');
        }
    }
    initializeProductImages();
    $('.catalog-color').on('click', handleColorClick);
});
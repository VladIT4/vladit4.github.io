 
$('.scroll-block').fullpage({
    anchors: ['main', 'lease', 'service', 'coffee-machines', 'coffee', 'tea', 'assortment', 'cleaners'],
    scrollOverflow: true,
    sectionSelector: '.scroll-block__page',
    scrollOverflowReset: true,
    scrollOverflowOptions: {
        mouseWheel: true,
        scrollbars: true
    },
    verticalCentered: true
});
$.fn.fullpage.setMouseWheelScrolling(true);
$.fn.fullpage.setAllowScrolling(true);
var slider;
var products_slider = [];
var products_slider_params = {
    'computer': {
        minSlides: 1,
        maxSlides: 10,
        slideWidth: 98,
        slideMargin: 10,
        infiniteLoop: false,
        pager: false,
        hideControlOnEnd: true
    },
    'mobile': {
        minSlides: 1,
        maxSlides: 1,
        slideWidth: 160,
        onSlideNext: emulation_click,
        onSlidePrev: emulation_click
    }
}
$('.big-lease-products__slider ul').each(function () {
    products_slider.push($(this).bxSlider(jQuery(window).width() > 400 ? products_slider_params['computer'] : products_slider_params['mobile']));
});
function emulation_click($slideElement, oldIndex, newIndex) {
    $slideElement.find('a').click();

}
jQuery(window).resize(function () {
    if (jQuery(window).width() > 1070) {
        jQuery('.big-slide').css('height',
            jQuery(window).height() - jQuery('.header').height() - jQuery('.footer-menu').height()
        )
    } else {
        jQuery('.big-slide').css('height', 'auto');
    }
    $.fn.fullpage.reBuild();
    if (jQuery(window).width() < 400) {
        if (!slider) {
            slider = $('.services').bxSlider({
                pager: true,
                slideWidth: 295,
                minSlides: 1,
                maxSlides: 3,
                slideMargin: 10,
                slideSelector: '.services__item',
                controls: false,
                infiniteLoop: false
            });
            $.each(products_slider, function (ind, $el) {

                $el.reloadSlider(products_slider_params['mobile']);
            });

        }
    }
    else if (slider && 'destroySlider' in slider) {
        slider.destroySlider()
        slider = undefined;

        $.each(products_slider, function (ind, $el) {

            $el.reloadSlider(products_slider_params['computer']);
        });
    }

    setTimeout(function () {
        jQuery('.big-lease').each(function () {
            if (jQuery(window).width() > 600) {
                jQuery(this).css('margin-top', Math.max(0, jQuery(this).closest('.fp-tableCell').height() / 2 - jQuery(this).closest('.fp-tableCell').find('.header').height() - jQuery(this).height() / 2));
            } else {
                jQuery(this).css('margin-top', '0px');
            }
        });
        jQuery('.big-service').css('margin-top', Math.max(0, jQuery('.scroll-block__page_service  .fp-tableCell').height() / 2 - jQuery('.scroll-block__page_service .header').height() - jQuery('.scroll-block__page_service .big-service').height() / 2 + 50));
    }, 400);


}).resize();
function onChangeSlide($slideElement, oldIndex, newIndex) {
    var $mores = $slideElement.closest('.big-lease').find('.big-lease__price-block');

    $mores.filter(':visible').stop().animate({ 'opacity': 0 }, 350, function () {
        $mores.css('display', 'none');
        $mores.eq(newIndex).show().animate({ 'opacity': 1 }, 350);
    });
}
$('.big-lease__image ul').bxSlider({
    pager: false,
    slideWidth: 504,
    infiniteLoop: false,
    hideControlOnEnd: true,
    onSlideNext: onChangeSlide,
    onSlidePrev: onChangeSlide
});

jQuery(window).resize();
jQuery('.big-lease').on('click', '.big-lease-products__item a', function () {

    var $img_block = jQuery(this).closest('.big-lease').find('.big-lease__image img');
    var img = jQuery(this).attr('href');
    jQuery('.big-lease-products__item a').removeClass('active');
    jQuery(this).addClass('active');
    $img_block.stop().animate({ 'opacity': '0' }, function () {
        $img_block.attr('src', img);
        $img_block.animate({ 'opacity': '1' })
    });
    var item = parseInt(jQuery(this).data('content'));

    var $descs = jQuery(this).closest('.big-lease').find('.product-description__item');
    $descs.filter(':visible').stop().animate({ 'opacity': 0 }, 350, function () {
        jQuery(this).css('display', 'none');
        $descs.eq(item - 1).show().animate({ 'opacity': 1 }, 350);
    });

    var $mores = jQuery(this).closest('.big-lease').find('.big-lease-more__item');
    $mores.filter(':visible').stop().animate({ 'opacity': 0 }, 350, function () {
        jQuery(this).css('display', 'none');
        $mores.eq(item - 1).show().animate({ 'opacity': 1 }, 350);
    });
    return false;
});
jQuery('.scroll-block__page_product').each(function () {
    jQuery(this).find('.big-lease-products__item a').eq(0).click();
})

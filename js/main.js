function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
$('[name=phone]').mask("+7(999) 999-99-99");
$('.form').submit(function () {
    $(this).find('.errors').html('');
    $(this).find('.error').removeClass('error');
    var is_error = false;
    if (!validateEmail($(this).find('[type="email"]').val())) {
        $(this).addClass('error').find('[type="email"] + span').html("Введите корректный Email");
        is_error = true;
    }
    $(this).find('[name]').each(function () {
        if ($(this).val() == '') {
            $(this).addClass('error').next().html('Необходимо ввести ' + $(this).attr('placeholder').toLowerCase());
            is_error = true;
        }
    });


    return !is_error;
});

$('.callback-click').on('click touchstart', function() {
    $('#form_shadow,#callback_form').fadeIn();
    return false;
})
$('.order-form,.big-lease__buy.big-lease__buy_white,.big-lease__buy.big-lease__buy').on('click touchstart', function() {
    $('#order_form,#form_shadow').fadeIn();
    return false;
})
$('#form_shadow,#callback_form .catalog-menu__close-button').on('click touchstart', function() {
    $('#form_shadow,#callback_form,#order_form').fadeOut();
    return false;
})
$('.mobile-menu__button').click(function (e) {
    setTimeout(function () {
        $('.mobile-menu-block').fadeIn();
    }, 100);
});
$('.mobile-menu__close-button').click(function (e) {
    $('.mobile-menu-block').fadeOut();
})
 
$(window).resize(function() {
    jQuery('.static-page').css('min-height', jQuery(window).height() - jQuery('.header').outerHeight() + jQuery('.static-footer').outerHeight() - 164)
}).resize();
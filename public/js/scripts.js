jQuery('document').ready(function ($) {
    var menuBtn = $('.user-icon');
    var menu = $('.hidden-login ul');

    menuBtn.click(()=> {
        if (menu.hasClass('show')) {
            menu.removeClass('show');
        } else {
            menu.addClass('show')
        }
    })
})

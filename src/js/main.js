$(function(){
    // js here
    ;(function() {
        let hamburger =  $('.header__hamburger');
        let menu = $('.header__menu');
        hamburger.click(function(){
            hamburger.toggleClass('active');

            if(hamburger.hasClass('active')){
                menu.slideDown(function() {
                    menu.addClass('show');
                });
            } else {
                menu.slideUp(function() {
                    menu.removeClass('show');
                    menu.css('display', '');
                });
            }
        });
    })();

    ;(function() {
        let pricing_tab = $('.pricing__body');
        if(pricing_tab.length === 0) return ;

        let pricing_tab_items = pricing_tab.find('[data-tab]');
        let pricing_header = pricing_tab.find('[data-target]');
        let waitMe = false;
        pricing_header.click(function() {
            if(waitMe) return ;

            let target = this.dataset.target;
            let item  = pricing_tab.find('[data-tab="' + target + '"]')
            console.log('[data-tab="' + target + '"]')
            if(item.length === 0 ) return;
            pricing_header.removeClass('active');
            pricing_tab_items.removeClass('active');

            $(this).addClass('active');
            waitMe = true;
            item.fadeIn(200, function() {
                waitMe = false;
                item.css('display', '');
                item.addClass('active');
            })
        })
    })();
})
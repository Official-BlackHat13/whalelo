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

    ;(function() {
        $('.showpopup').on('click', function(e) {
            e.preventDefault();
            let target = $(this).data('target');
            $(target).fadeIn(function() {
                $(target).addClass('show');
                $(target).trigger('popup-opened');
            });
        })

        $('body').on('click', '[data-close-popup]', function(e) {
            let popup = $(this).closest('.popup');
            if(!popup.length) return;
            e.preventDefault();
            popup.fadeOut(function() {
                popup.removeClass('show');
                popup.trigger('popup-closed');
            });
        })
    })();

    ;(function() {
        class BaggageProcess {
            constructor(element) {
                this.$el = $(element);
                this.tabs = this.$el.find('[data-tab]');
                this.tabsData = Array.from(this.tabs).map(function(item) {
                    let name = item.dataset.tab;
                    return {
                        name: name,
                        $el: $(item),
                        $tabTitle: $(element).find(`.process__header [data-target="${name}"]`),
                        active: false
                    }
                })
                this.tabsData[0].active = true;
                this.isDone = false;
                this.$process = this.$el.find('.progress.custom');
                this.initEvent();
                this.rerender();
            }

            initEvent() {

            }

            rerender() {
                this.tabsData.forEach(function(item) {
                    if(item.active) {
                        item.$tabTitle.addClass('active');
                        item.$el.addClass('active');
                    } else {
                        item.$tabTitle.removeClass('active');
                        item.$el.removeClass('active');
                    }
                })

                if(this.isDone) {
                    this.$process.addClass('active');
                }
            }

            nextProcess() {
                let itemActive = null;
                this.tabsData.forEach(function(item, index) {
                    if(item.active) {
                        itemActive =  index;
                    }
                });

                if(itemActive === null) return ;
                let next = itemActive + 1;
                if(this.tabsData.length < next) return;
                this.tabsData[next].active = true;
                this.tabsData[itemActive].active = false;
                if(this.tabsData.length === next) {
                    this.isDone = true;
                } else {
                    this.isDone = false;
                }
                this.rerender();
            }

            prevProcess() {
                let itemActive = null;
                this.tabsData.forEach(function(item, index) {
                    if(item.active) {
                        itemActive =  index;
                    }
                });

                if(itemActive === null) return ;
                let prev = itemActive - 1;
                if(prev < 0) return;
                this.tabsData[prev].active = true;
                this.tabsData[itemActive].active = false;

                this.rerender();
            }
        }

        $('.baggage-process').each(function(item) {
            let instance = new BaggageProcess(this);
            
            $(this).find('.btn-outline-secondary').click(function(e) {
                instance.nextProcess();
            });
            $(this).find('.btn-outline-warning').click(function(e) {
                instance.prevProcess();
            });
        })
    })();
})
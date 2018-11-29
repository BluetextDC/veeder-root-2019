var $ = jQuery.noConflict();

/* Script on ready
------------------------------------------------------------------------------*/
(function ($, Drupal) {
    Drupal.behaviors.veenderTheme = {
        attach: function (context, settings) {
            //do jQuery stuff when DOM is ready

            /* Responsive Jquery Navigation */    
            $('.hamburger').click(function(event){        
                $(this).toggleClass('open');
                $('#mobilenav').slideToggle();
                $('#mobilenav').toggleClass('is-open');
                $('.overlay').toggleClass('open');
            });
            $('body').on('keyup',function(evt) {
                if (evt.keyCode == 27) {
                    $('.hamburger.is-active').removeClass('is-active');
                    $('#mobilenav.is-show').removeClass('is-show');
                    $('.main-header').find('.search-bar').slideUp().removeClass('open'); 
                    $('.sidebar-wrap').removeClass('is-open'); 
                    $('body').removeClass('scroll-hidden');
                    $('.overlay').removeClass('open');
                }
            });
            $('.overlay').click(function(){
                $('.hamburger').removeClass ('open');
                $('#mobilenav').slideUp();
                $('#mobilenav').removeClass('is-open');
                $('.overlay').removeClass('open');
            });

            var clickable = $('#menu').attr('link-clickable');
            $('#mobilenav li:has(ul)').addClass('has-sub');
            $('#mobilenav .has-sub>a').after('<em class="caret">');
            if(clickable == 'true'){
                $('#mobilenav .has-sub>a').addClass('trigger-caret').attr('href','javascript:;');
            }else{
                $('#mobilenav .has-sub>.caret').addClass('trigger-caret');
            }

            /* menu open and close on single click */
            $(document).on('click','#mobilenav .has-sub>.trigger-caret',function(event){
                var element = $(this).parent('li');
                if (element.hasClass('is-open')) {
                    element.removeClass('is-open');
                    element.find('li').removeClass('is-open');
                    element.find('ul').slideUp(200);
                }
                else {
                    element.addClass('is-open');
                    element.find('ul:first').slideDown(200);
                    element.siblings('li').children('ul').slideUp(200);
                    element.siblings('li').removeClass('is-open');
                    element.siblings('li').find('li').removeClass('is-open');
                    element.siblings('li').find('ul').slideUp(200);
                }
            });    
            // $('.navigation .main-nav nav > ul > li > a').contents().wrap('<span/>')

            /* location click */ 
            $('.language-dropdown').on('click', function(){      
                $('.main-header').find('.search-part').removeClass('open');
                $('.main-header').find('.search-bar').slideUp().removeClass('open');
                $(this).toggleClass('open');
                $('.language-dropdown .select-list').slideToggle('fast');  
            });     
            /* End */ 

            var div_tooltip_tpl =  $('.language-dropdown,.search-part');
            $(document).on('click','body , html',function(e){
                if (
                    (div_tooltip_tpl[0] != e.target) &&
                    (!div_tooltip_tpl.has(e.target).length)
                )
                {$('.language-dropdown').removeClass('open');
                 $('.main-header').find('.search-part').removeClass('open');
                 $('.language-dropdown .select-list').slideUp('fast'); 
                 $('.main-header').find('.search-bar').slideUp('fast').removeClass('open'); }
            });
            //    $(document).on('click','body , html',function(e){
            //        /*console.log('out')*/
            //    });
            $(".search-bar").click(function(event) {
                /*console.log('in')*/
                event.stopPropagation();
            });


            /* side bar */
            var hh = $('.main-header').outerHeight();    
            $('.side-bar').css('padding-right',hh);
            $('.dist-locat-sec').css('padding-top',hh);    
            $('.side-bar').click(function(){       
                $(this).parents('.sidebar-wrap').stop().toggleClass('is-open');
                $('body').stop().toggleClass('scroll-hidden');
            });

            /* header-space */
            var hs = $('header.main-header').outerHeight();
            $('.header-space').css('height',hs);
            $('#mobilenav').css('max-height', $(window).height() - hs);

            /* search bar */
            $('.search-part i').click(function(){
                $('.language-dropdown').removeClass('open');
                $('.language-dropdown .select-list').slideUp('fast');
                $(this).parents('.search-part').toggleClass('open');
                $(this).parents('.main-header').find('.search-bar').stop().slideToggle().toggleClass('open'); 
            });
            /* load more */
            $('.product-list .item').slice(4,$('.product-list .item').length).addClass('hide');
            $('.product-list .loadmore').click(function(e){
                e.preventDefault();
                var that =$(this),
                    hideCardI = that.parents('.product-list').find('.hide').index();
                that.parents('.product-list').find('.item').slice(hideCardI,hideCardI+2).removeClass('hide');
            });    

            /*$('.main-container').prepend('<div class="overlay"></div>');*/
        }
    };
})(jQuery, Drupal);

/* Script on load
------------------------------------------------------------------------------*/
$(window).on("load",function(){
    /* header-space */
    var hs = $('header.main-header').outerHeight();
    $('.header-space').css('height',hs);
    $('#mobilenav').css('max-height', $(window).height() - hs);
});

/* Script on scroll
------------------------------------------------------------------------------*/
$(window).scroll(function() {
    /* side bar */
    /*var scroll = $(window).scrollTop();
    var hh = $('.main-header').outerHeight();        
    var ho_hh = hh - scroll;   
    if(scroll <= hh){
        $('.hero-section .side-bar').css('padding-right',ho_hh);
    }else{        
        $('.hero-section .side-bar').css('padding-right',0);
    }*/

    if ($(this).scrollTop() >= 10) {
        $("header.main-header").addClass("header-sticky");    

    } else {
        $("header.main-header").removeClass("header-sticky");    
    }
});

/* Script on resize
------------------------------------------------------------------------------*/
$(window).resize(function() {
    /* header-space */
    setTimeout(function(){
        var hs = $('header.main-header').outerHeight();
        $('.header-space').css('height',hs);      
        $('#mobilenav').css('max-height', $(window).height() - hs);              
    },250);

    if($(window).width() >= 768){          
        $('.hamburger').removeClass('open');
        $('#mobilenav').slideUp();
        $('#mobilenav').removeClass('is-open');
    }else{
    }
    /* side bar */
    var hh = $('.main-header').outerHeight();    
    $('.side-bar').css('padding-right',hh);
    $('.dist-locat-sec').css('padding-top',hh);        
});

/* Script all functions
------------------------------------------------------------------------------*/
$(function() {
    $('.about-sec .about-block-wrap p,.product-list figure').matchHeight({
        byRow: true,
        property: 'height',
        target: null,
        remove: false
    });
});

/* Script on ready
------------------------------------------------------------------------------*/
(function ($, Drupal) {
    
    /* Responsive Jquery Navigation */    
    $('.hamburger').click(function(event) {        
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
    $('.overlay').click(function() {
        $('.hamburger').removeClass ('open');
        $('#mobilenav').slideUp();
        $('#mobilenav').removeClass('is-open');
        $('.overlay').removeClass('open');
    });

    var clickable = $('#menu').attr('link-clickable');
    $('#mobilenav li:has(ul)').addClass('has-sub');
    $('#mobilenav .has-sub > a').after('<em class="caret">');
    if(clickable == 'true') {
        $('#mobilenav .has-sub > a').addClass('trigger-caret').attr('href','javascript:;');
    }
    else{
        $('#mobilenav .has-sub > .caret').addClass('trigger-caret');
    }

    /* menu open and close on single click */
    $(document).on('click', '#mobilenav .has-sub > .trigger-caret', function(event) {
        var element = $(this).parent('li');
        if (element.hasClass('is-open')) {
            element.removeClass('is-open');
            element.find('li').removeClass('is-open');
            element.find('ul').slideUp(200);
        }
        else {
            element.addClass('is-open');
            if (element.children('.drop-down').length > 0) {
                element.children('.drop-down').children('ul').slideDown(200);
            }
            else {
                element.children('ul').slideDown(200);
            }
            element.siblings('li').children('ul').slideUp(200);
            element.siblings('li').removeClass('is-open');
            element.siblings('li').find('li').removeClass('is-open');
            element.siblings('li').find('ul').slideUp(200);
        }
    });
    // Top level menu link replace with javascript.
    $('.main-nav ul.menu-top-level > li > a').attr('href', 'javascript:;');

    /* location click */ 
    /* $('.language-dropdown .dropdown-button').on('click', function(){      
        $('.main-header').find('.search-part').removeClass('open');
        $('.main-header').find('.search-bar').slideUp().removeClass('open');
        $(this).parents('.language-dropdown').toggleClass('open');
        $('.language-dropdown .select-list').slideToggle('fast');  
    }); */    
    /* End */ 

    // var div_tooltip_tpl =  $('.language-dropdown .dropdown-button,.search-part');
    // $(document).on('click', 'body , html',function(e) {
    //     console.log(div_tooltip_tpl[0], e.target, div_tooltip_tpl.has(e.target).length);
    //     if ( (div_tooltip_tpl[0] != e.target) && (!div_tooltip_tpl.has(e.target).length) ) {
    //         $('.language-dropdown').removeClass('open');
    //         $('.main-header').find('.search-part').removeClass('open');
    //         $('.language-dropdown .select-list').slideUp('fast');
    //         $('.main-header').find('.search-bar').slideUp('fast').removeClass('open');
    //     }
    // });

    $(".search-bar i").click(function(event) {
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
    
    $('.sidebar-wrap ul.sidebar-links li:first-child').after('<div class="line-wrap"><span class="verticle-line"></span><i class="ic-chevron-down"></i><span class="verticle-line"></span></div>');

    /* header-space */
    var hs = $('header.main-header').outerHeight();
    $('.header-space').css('height',hs);
    $('#mobilenav').css('max-height', $(window).height() - hs);

    setTimeout(function (e) {
        $('.search-part .search-wrap form').addClass('search-form');
        /* search bar */
        $('.search-part i').click(function() {
            $('.language-dropdown').removeClass('open');
            $('.language-dropdown .select-list').slideUp('fast');
            $(this).parents('.search-part').toggleClass('open');
            $(this).parents('.main-header').find('.search-bar').stop().slideToggle().toggleClass('open'); 
            $('.search-bar .search-wrap .form-search').focus();
        });
     }, 1000);
    /* load more */
    $('.product-list .item').slice(4,$('.product-list .item').length).addClass('hide');
    $('.product-list .loadmore').click(function(e){
        e.preventDefault();
        var that =$(this),
            hideCardI = that.parents('.product-list').find('.hide').index();
        that.parents('.product-list').find('.item').slice(hideCardI,hideCardI+2).removeClass('hide');
    });
    // Product detail sub-navigation.
    if($('.page-sub-nav ul').length > 0){
        $('.page-sub-nav ul').onePageNav({
            currentClass: 'active',
            offsetTop: $('header').height()   
        });
    }
    /* slider */
    $('.text-img-sec .img-part .images-slider.slick-dotted').each(function(){            
        $(this).parents('.text-img-sec').addClass('slider-dots-space');
    });
    // Making same height.
    /* , .four-block-sec .item h6 */
    $('.about-sec .about-block-wrap p, .product-list .item figure, .related-list figure, .blog-list .item figure').matchHeight({
        byRow: true,
        property: 'height',
        target: null,
        remove: false
    });

    /* Script on load
    ------------------------------------------------------------------------------*/
    $(window).on('load', function() {
        /* header-space */
        var hs = $('header.main-header').outerHeight();
        $('.header-space').css('height',hs);
        $('#mobilenav').css('max-height', $(window).height() - hs);

        // Parallax image section. 
        if (jQuery('#parallax').length) {
            var scrollPosition = window.pageYOffset;
            var bgParallax = document.getElementById('parallax');
            var limit = bgParallax.offsetTop + bgParallax.offsetHeight;  
            if (scrollPosition > bgParallax.offsetTop && scrollPosition <= limit) {
                bgParallax.style.backgroundPositionY = (50 + 100 * scrollPosition/limit) + '%';    
            } else {
                bgParallax.style.backgroundPositionY = '50%';    
            }
        }
        $('.text-img-sec .img-part .images-slider.slick-dotted').each(function(){            
            $(this).parents('.text-img-sec').addClass('slider-dots-space');
        });   
        
        $('header').addClass('loaded')
    });

    /* Script on scroll
    ------------------------------------------------------------------------------*/
    $(window).on('scroll', function() {
        if ($(this).scrollTop() >= 10) {
            $("header.main-header").addClass("header-sticky");    
        } else {
            $("header.main-header").removeClass("header-sticky");    
        }

    });

    /* Script on resize
    ------------------------------------------------------------------------------*/
    $(window).on('resize', function() {
        /* header-space */
        setTimeout(function() {
            var hs = $('header.main-header').outerHeight();
            $('.header-space').css('height',hs);      
            $('#mobilenav').css('max-height', $(window).height() - hs);              
        }, 250);
    

        if ($(window).width() >= 768) {          
            $('.hamburger').removeClass('open');
            $('#mobilenav').slideUp();
            $('#mobilenav').removeClass('is-open');
        }else{
            // Add here.
        }

    });



    window.addEventListener('scroll', function(){
        if($('#parallax').length){
            var scrollPosition = window.pageYOffset;
            var bgParallax = document.getElementById('parallax');
            var limit = bgParallax.offsetTop + bgParallax.offsetHeight;  
            if (scrollPosition > bgParallax.offsetTop && scrollPosition <= limit){
                bgParallax.style.backgroundPositionY = (50 + 100 * scrollPosition/limit) + '%';    
            }else{
                bgParallax.style.backgroundPositionY = '50%';    
            }
        }
    });

    /* parallax */
    $.fn.parallax = function () {
        var b = $(window).width();
        return this.each(function () {
            function c(c) {
                if (b >= 768 ) {
                    var e;
                    e = 601 > b ? d.height() > 0 ? d.height() : d.children("img").height() : d.height() > 0 ? d.height() : 500;
                    var f = d.children("img").first(),
                        g = f.height(),
                        h = g - e,
                        i = d.offset().top + e,
                        j = d.offset().top,
                        k = $(window).scrollTop(),
                        l = window.innerHeight,
                        m = k + l,
                        n = (m - j) / (e + l),
                        o = Math.round(h * n);
                    c && f.css("display", "block"), i > k && k + l > j && f.css("transform", "translate3D(-50%," + o + "px, 0)")
                } else {
                    $(this).children("img").first().css("transform", "");
                }
            }
            var d = $(this);
            d.addClass("parallax-img"), d.children("img").one("load", function () {
                c(!0)
            }).each(function () {
                this.complete && $(this).on('load')
            }), $(window).on('scroll', function () {
                b = $(window).width(), c(!1)
            }), $(window).on('resize', function () {
                b = $(window).width(), c(!1)
            });
        });
    }
    if($('.parallax-img').length > 0){
        $('.parallax-img').parallax();
    }

    $('.images-slider').slick({
        dots: true,
        infinite: false,                
        prevArrow:'<span class="slick-prev"><i class="ic-chevron-right"></i></span>',
        nextArrow:'<span class="slick-next"><i class="ic-chevron-right"></i></span>',
    });
    $('.slick-slider').each(function(){
        $(this).find('.slick-dots').wrap('<div class="slick-dots-wrap"></div>');                    
        $(this).find('.slick-dots-wrap').prepend($(this).find('.slick-prev.slick-arrow'));
        $(this).find('.slick-dots-wrap').append($(this).find('.slick-next.slick-arrow'));
    });

    // Responsive table.
    $('.responsive-table').basictable();
})(jQuery, Drupal);


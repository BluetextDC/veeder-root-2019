var $ = jQuery.noConflict();

/* Script on ready
------------------------------------------------------------------------------*/
$(document).ready(function(){
    //do jQuery stuff when DOM is ready

    /* Responsive Jquery Navigation */
    $('.hamburger').click(function(event){        
        $(this).toggleClass('open');
        $('#mobilenav').slideToggle();
        $('#mobilenav').toggleClass('is-open');
    });
    $('body').on('keyup',function(evt) {
        if (evt.keyCode == 27) {
            $('.hamburger.is-active').removeClass('is-active');
            $('#mobilenav.is-show').removeClass('is-show');
        }
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
            element.children('ul').slideDown(200);
            element.siblings('li').children('ul').slideUp(200);
            element.siblings('li').removeClass('is-open');
            element.siblings('li').find('li').removeClass('is-open');
            element.siblings('li').find('ul').slideUp(200);
        }
    });    

    /* Custom select design */    
    $('.language-dropdown').append('<div class="dropdown-button"></div>');  
    $('.language-dropdown').append('<ul class="select-list"></ul>');    
    $('.language-dropdown select option').each(function() {  
        var bg = $(this).css('background-image');    
        $('.select-list').append('<li class="clsAnchor"><span value="' + $(this).val() + '" class="' + $(this).attr('class') + '" style=background-image:' + bg + '>' + $(this).text() + '</span></li>');   
    });    
    $('.language-dropdown .dropdown-button').html('<span style=background-image:' + $('.language-dropdown select').find(':selected').css('background-image') + '>' + $('.language-dropdown select').find(':selected').text() + '</span>' + '<a href="javascript:void(0);" class="icon ic-chevron-down select-list-link"></a>');   
    $('.language-dropdown ul li').each(function() {   
        if ($(this).find('span').text() == $('.language-dropdown select').find(':selected').text()) {  
            $(this).addClass('active');       
        }      
    });     
    $('.language-dropdown .select-list span').on('click', function()                                              {          
        var dd_text = $(this).text();  
        var dd_img = $(this).css('background-image'); 
        var dd_val = $(this).attr('value');   
        $('.language-dropdown .dropdown-button').html('<span style=background-image:' + dd_img + '>' + dd_text + '</span>' + '<a href="javascript:void(0);" class="select-list-link icon ic-chevron-down"></a>');      
        $('.language-dropdown .select-list span').parent().removeClass('active');    
        $(this).parent().addClass('active');     
        $('.language-dropdown select[name=options]').val( dd_val ); 
        $('.language-dropdown .select-list').slideUp();     
    });       
    $('.language-dropdown .dropdown-button').on('click','a.select-list-link', function()                                    {      
        $('.language-dropdown .select-list').slideToggle();  
    });     
    var cal_tooltip_tpl =  $('.language-dropdown .dropdown-button');
    $(document).on('click touchstart','body , html',function(e){
        if (
            (cal_tooltip_tpl[0] != e.target) &&
            (!cal_tooltip_tpl.has(e.target).length)
        )
        { $('.language-dropdown .select-list').slideUp(); }
    });
    /* End */ 

    /* side bar */
    var hh = $('.main-header').outerHeight();    
    $('.hero-section .side-bar').css('padding-right',hh);


    if($(window).width() <= 767){    
        //   $('.side-bar').remove();
    }else{
        //  $('.side-bar').show();
    }
});

/* Script on load
------------------------------------------------------------------------------*/
$(window).load(function() {
    // page is fully loaded, including all frames, objects and images
});

/* Script on scroll
------------------------------------------------------------------------------*/
$(window).scroll(function() {
    /* side bar */
    var scroll = $(window).scrollTop();
    var hh = $('.main-header').outerHeight();    
    var ho_hh = hh - scroll;   
    if(scroll <= hh){
        $('.hero-section .side-bar').css('padding-right',ho_hh);
    }else{        
        $('.hero-section .side-bar').css('padding-right',0);
    }

});

/* Script on resize
------------------------------------------------------------------------------*/
$(window).resize(function() {
    if($(window).width() >= 768){          
        $('.hamburger').removeClass('open');
        $('#mobilenav').slideUp();
        $('#mobilenav').removeClass('is-open');
    }else{

    }
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
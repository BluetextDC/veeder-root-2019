(function ($, window, Drupal) {
  'use strict';

  Drupal.behaviors.selection_module = {
    attach: function(context, settings){
      if (jQuery(context).find('.ajax-response').length > 0) {
        console.log(context);
        $.fancybox.open(context);
      }
    }
  }
  $('.datafilteredvalues').each(function(index, el) {
    $(this).hide();
  });
  $('#__htmlprbProductGroup').prepend('<option selected>--empty list--</option>');
  $('#__htmlprbProduct').attr('disabled', 'disabled');
  $('#__htmlprbProduct').find('option').remove().end().append('<option>--empty list--</option>');
  $('.disable-fields').css('background', 'red');
  $('#product-selection-form .form-submit').hide();
  $('#__htmlprbMeasurement').change(function(event) {
      $('.datafilteredvalues').each(function(index, el) {
          $(this).show();
          var inputVal = $(this).find('input').text();
          $(this).find('input').val(inputVal);
      });
  });
  $('#__htmlfltCableLength').change(function(event) {
      $('#product-selection-form .form-submit').show();
      var inputVal = $('#__htmlfltPartNumber').text();
      $('#__htmlfltPartNumber').val(inputVal);
  });
  $('.js-form-type-select').each(function(index, el) {
    if ($(this).children('select').is(':disabled')) {
      $(this).addClass('disable-fields');
    }
  });
  $('.js-form-type-select').change(function(event) {
    // if ($(this).next().hasClass('disable-fields')) {
    //   $(this).next().removeClass('disable-fields');
    // }
    $('.js-form-type-select').each(function(index, el) {
      if ($(this).find('select').find('option').val() != '--empty list--') {
         $(this).removeClass('disable-fields');
      }
    });

    
  });
})(jQuery, window, Drupal);
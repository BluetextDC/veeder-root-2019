(function ($, window, Drupal) {
  'use strict';

  Drupal.behaviors.selection_module = {
    attach: function(context, settings){
      if (jQuery(context).find('.ajax-response').length > 0) {
        $.fancybox.open(context);
      }
    }
  }
  // Adding default option for the Product Group field.
  $('#__htmlprbProductGroup').prepend('<option selected>--Please Select--</option>');
  // Adding disabled attr for the Product field.
  $('#__htmlprbProduct').attr('disabled', 'disabled');
  // Adding default option for the Product field.
  $('#__htmlprbProduct').find('option').remove().end().append('<option>--Please Select--</option>');
  // Onchange event for the CableLength field.
  $('#__htmlprbProductGroup').change(function(event) {
    $('#__htmlprbProduct').prepend('<option disabled selected>--Please Select--</option>');
  });

  // Hide submit button till last option will not select.
  $('#product-selection-form .form-submit').hide();

  // Onchange event for the Measurement field.
  $('#__htmlprbMeasurement').change(function(event) {
      $('.datafilteredvalues').each(function(index, el) {
          var inputVal = $(this).find('input').text();
          $(this).find('input').val(inputVal);
      });
  });
  // Onchange event for the CableLength field.
  $('#__htmlfltCableLength').change(function(event) {
      $('#product-selection-form .form-submit').show();
      var inputVal = $('#__htmlfltPartNumber').text();
      $('#__htmlfltPartNumber').val(inputVal);
  });

  // Adding disabled class where we will get select disabled.
  $('.js-form-type-select').each(function(index, el) {
    if ($(this).children('select').is(':disabled')) {
      $(this).addClass('disable-fields');
    }
  });
  // Removing disabled class where we won't get --Please Select--.
  $('.js-form-type-select').change(function(event) {
    $('.js-form-type-select').each(function(index, el) {
      if (($(this).find('select').find('option').val() != '--Please Select--') || ($(this).find('select').find('option').is(':disabled'))) {
         $(this).removeClass('disable-fields');
      }
      else if($(this).find('select').is(':disabled')) {
        $(this).addClass('disable-fields');
      }
    });
  });
})(jQuery, window, Drupal);
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
  $('#__htmlsnsrProductGroup').prepend('<option selected>--Please Select--</option>');
  // Adding disabled attr for the Product field.
  $('#__htmlsnsrProduct').attr('disabled', 'disabled');
  // Adding default option for the Product field.
  $('#__htmlsnsrProduct').find('option').remove().end().append('<option>--Please Select--</option>');
  // Onchange event for the ProductGroup field.
  $('#__htmlsnsrProductGroup').change(function(event) {
    $('#__htmlsnsrProductGroup').find('option:first').val($(this).val());
  });

  // Onchange event for the Product field.
  $('#__htmlsnsrProduct').change(function(event) {
    $('#__htmlsnsrProduct').find('option:disabled').removeAttr('selected');
    $('#__htmlsnsrProduct').find('option:disabled').val($(this).val());
  });

  // Hide submit button till last option will not select.
  //$('#product-sensor-form .form-submit').attr('disabled', 'disabled');

  // Onchange event for the Measurement field.
  $('#__htmlsnsrSensorLength, #__htmlsnsrCableLength, #__htmlsnsrPipes').change(function(event) {
      //$('#product-sensor-form .form-submit').removeAttr('disabled');
      $('.datafilteredvalues').each(function(index, el) {
          var inputVal = $(this).find('input').text();
          $(this).find('input').val(inputVal);
      });
  });
  // Onchange event for the CableLength field.
  // $('#__htmlsnsrSensorLength, #__htmlsnsrCableLength').change(function(event) {
  //     $('#product-sensor-form .form-submit').removeAttr('disabled');
  //     var inputVal = $('#__htmlfltPartNumber').text();
  //     $('#__htmlfltPartNumber').val(inputVal);
  // });

  // Adding disabled class where we will get select disabled.
  $('.js-form-type-select').each(function(index, el) {
    if ($(this).children('select').is(':disabled')) {
      $(this).addClass('disable-fields');
    }
  });
  // Removing disabled class where we won't get --Please Select--.
  $('.js-form-type-select').change(function(event) {
    $('.datafilteredvalues').each(function(index, el) {
        var inputVal = $(this).find('input').text();
        if (inputVal.length > 0) {
          $(this).find('input').val(inputVal);
        }
    });
    // Append Warning into the measurement label.
    // if ($('#__htmlprbChemNote font em strong').text() != '') {
    //   var warningText = $('#__htmlprbChemNote font em strong').text();
    //   if (warningText != '' && $('.form-item-measurement').find('font em strong').text() == '') {
    //     $('#__htmlfldMeasurement').after('<font color="red"><em><strong>' + warningText + '</strong></em></font>');
    //   }
    // }
    // else {
    //   $('.form-item-measurement').find('font em strong').remove();
    // }
    // Enable and disable with fields on change.
    $('.js-form-type-select').each(function(index, el) {
      if (($(this).find('select').find('option:first').val() != '') && ($(this).find('select').find('option:first').prop('disabled'))) {
         $(this).removeClass('disable-fields');
      }
      else if($(this).find('select').is(':disabled')) {
        $(this).addClass('disable-fields');
      }

      if ($(this).hasClass('select-indicator')) {
        $(this).removeClass('select-indicator');
      }

      if (($(this).find('select').find('option').length > 2) && ($(this).find('select').find('option:disabled').val() != '') && ($(this).find('select').find('option:selected').text() == '--Please Select--')) {
        $(this).addClass('select-indicator');
      } else {
        $(this).removeClass('select-indicator');
      }
      var is_disabled = $('#product-sensor-form .form-submit').prop('disabled');
      // if ((is_disabled == false) && ($(this).find('#__htmlsnsrSensorLength, #__htmlsnsrCableLength, #__htmlsnsrPipes').find('option:first').val() == '--empty list--')) {
      //   $('#product-sensor-form .form-submit').attr('disabled', 'disabled');
      // }
    });
  });
})(jQuery, window, Drupal);

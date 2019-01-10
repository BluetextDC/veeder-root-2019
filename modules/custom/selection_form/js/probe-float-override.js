(function ($, window, Drupal) {
  'use strict';
  $('.datafilteredvalues').each(function(index, el) {
    $(this).hide();
  });
  $('#__htmlfltFormSubmit').hide();
  $('#__htmlprbMeasurement').change(function(event) {
      $('.datafilteredvalues').each(function(index, el) {
          $(this).show();
          var inputVal = $(this).find('input').text();
          $(this).find('input').val(inputVal);
      });
  });
  $('#__htmlfltCableLength').change(function(event) {
      $('#__htmlfltFormSubmit').show();
      var inputVal = $('#__htmlfltPartNumber').text();
      $('#__htmlfltPartNumber').val(inputVal);
  });
})(jQuery, window, Drupal);
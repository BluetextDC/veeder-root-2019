(function ($, window, Drupal) {
  'use strict';

  if (drupalSettings.viewfield_autocomplete.product != null && drupalSettings.viewfield_autocomplete.solution != null) {
    var productTerms = drupalSettings.viewfield_autocomplete.product;
    var solutionTerms = drupalSettings.viewfield_autocomplete.solution;
    var availableTags = productTerms.concat(solutionTerms);
  }

  if (drupalSettings.viewfield_autocomplete.blog != null) {
    var blogTerms = drupalSettings.viewfield_autocomplete.blog;
    var availableTags = productTerms.concat(solutionTerms, blogTerms);
  }

  $( ".field--type-viewfield .js-form-type-textfield input" ).autocomplete({
    source: availableTags
  });
  
  $(document).ajaxSuccess(function (event, xhr, settings) {
    $( ".field--type-viewfield .js-form-type-textfield input" ).autocomplete({
      source: availableTags
    });
  });
})(jQuery, window, Drupal);
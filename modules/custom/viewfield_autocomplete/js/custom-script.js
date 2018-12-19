(function ($, window, Drupal) {
  'use strict';

  if (drupalSettings.viewfield_autocomplete.product != null ) {
    var productTerms = drupalSettings.viewfield_autocomplete.product;
  }
  if (drupalSettings.viewfield_autocomplete.solution != null ) {
    var solutionTerms = drupalSettings.viewfield_autocomplete.solution;
  }
  if (drupalSettings.viewfield_autocomplete.blog != null) {
    var blogTerms = drupalSettings.viewfield_autocomplete.blog;
  }

  var availableTags = productTerms.concat(solutionTerms);
  
  $( ".paragraph-type--3-column-taxonomy-listing .js-form-type-textfield input" ).autocomplete({
    source: availableTags
  });
  $( ".paragraph-type--4-column-taxonomy-listing .js-form-type-textfield input" ).autocomplete({
    source: availableTags
  });
  
  
  $(document).ajaxSuccess(function (event, xhr, settings) {
    $( ".paragraph-type--3-column-taxonomy-listing .js-form-type-textfield input" ).autocomplete({
      source: availableTags
    });
    $( ".paragraph-type--4-column-taxonomy-listing .js-form-type-textfield input" ).autocomplete({
      source: availableTags
    });
  });
})(jQuery, window, Drupal);
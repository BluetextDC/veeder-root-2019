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
  

  function split( val ) {
    return val.split( /,\s*/ );
  }
  function extractLast( term ) {
    return split( term ).pop();
  }
 
  $( "#edit-field-components-6-subform-field-3-column-taxonomy-view-0-arguments" )
    // don't navigate away from the field on tab when selecting an item
    .on( "keydown", function( event ) {
      if ( event.keyCode === $.ui.keyCode.TAB &&
          $( this ).autocomplete( "instance" ).menu.active ) {
        event.preventDefault();
      }
    })
    .autocomplete({
      minLength: 0,
      source: function( request, response ) {
        // delegate back to autocomplete, but extract the last term
        response( $.ui.autocomplete.filter(
          availableTags, extractLast( request.term ) ) );
      },
      focus: function() {
        // prevent value inserted on focus
        return false;
      },
      select: function( event, ui ) {
        var terms = split( this.value );
        // remove the current input
        terms.pop();
        // add the selected item
        terms.push( ui.item.value );
        // add placeholder to get the comma-and-space at the end
        terms.push( "" );
        this.value = terms.join( ", " );
        return false;
      }
  });
})(jQuery, window, Drupal);
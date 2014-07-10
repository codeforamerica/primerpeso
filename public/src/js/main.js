var SearchView = require('./search.js');

$(document).ready(function() {
	$("#fundMeWizard").steps({
	  headerTag: "h3",
	  bodyTag: "fieldset",
	  transitionEffect: "slideLeft",
    saveState: true,
    titleTemplate: '<span class="monkey">#index#.</span> #title#',
    /*onStepChanging: function(event, currentIndex, newIndex) {
      console.log(event);
    },*/
	  //onStepChanging: function (event, currentIndex, newIndex) {
	      //$("#form-3").validate().settings.ignore = ":disabled,:hidden";
	      //return $("#form-3").valid();
	  //},
	  /*onStepChanged: function (event, currentIndex, priorIndex) {
	  },
	  onFinishing: function (event, currentIndex) {
	  },*/
	  onFinished: function (event, currentIndex){
      console.log(event);
      console.log(currentIndex);
      var form = $(this);
      console.log(form);
      form.submit();
	  }
	});

  $('.delete-model').on('click', function(e){
    var conf = confirm('Are you sure you want to delete this entry?');
    if (!conf) {
      e.preventDefault();
    }
  });

  $('select').select2();

  // For admin page
  $('.choiceOther').hide();
  $('div#eligibleIndustries').next().show();
  $('select').on('change', function() {
    var name = $(this).attr('name');
    if ($('option:selected', this).attr('value') == 'other') {
      $('div#'+ name).next().show();
    };
  });

  $('button.array-text-field').click(function(e) { 
    var inp = $(this).next().clone().removeAttr('required');
    $(this).parent().append(inp);
  });

  $('input.array-text-field').each(function(index, element) {
    var text = $(this).val().split(',');
    $(this).val(text[0]);
    for (var i = 1; i < text.length; i++) {
      var value = text[i]
      var input = $(this).clone().val(value);
      $(this).parent().append(input);
    };
  });

  // For results page
  if ($('body').hasClass('searchResults')) {
    var searchView = new SearchView();
  }
});

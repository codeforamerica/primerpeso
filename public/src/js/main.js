var SearchView = require('./search.js');

$(document).ready(function() {
	$("#fundMeWizard").steps({
	  headerTag: "h3",
	  bodyTag: "fieldset",
	  transitionEffect: "slideLeft",
    saveState: true,
    titleTemplate: '<span class="monkey">#index#.</span> #title#',
	  onStepChanging: function (event, currentIndex, newIndex) {
      var valid = true;

      var label = $('fieldset#fundMeWizard-p-'+currentIndex).prev().text();
      var fieldSets = formInfo['options']['fieldSets'] 

      for (var key in fieldSets) {
        if (fieldSets[key]['label'] == label) {
          var fieldSetName = key;
          break;
        };
      }

      var currentFields = formInfo['fields'][fieldSetName]
      for (var field in currentFields) {
        if (currentFields[field]['widget'] == 'checkbox' || currentFields[field]['widget'] == 'radio') {
          var checked = $('input[name="'+ field +'"]:checked').attr('value');
          valid = !checked ? false : true;
        } else if (currentFields[field]['widget'] == 'text') {
          var text = $('input[name="'+ field +'"]').val();
          valid = text === "" ? false : true;
        }
      };

      if (!valid) {
        alert('You have missing fields');
      };
      return valid;
	  },
	  onFinished: function (event, currentIndex){
      console.log(event);
      console.log(currentIndex);
      var form = $(this);
      console.log(form);
      form.submit();
	  },
		onFinishing: function (event, currentIndex){
      var valid = true;

      var label = $('fieldset#fundMeWizard-p-'+currentIndex).prev().text();
      var fieldSets = formInfo['options']['fieldSets'] 

      for (var key in fieldSets) {
        if (fieldSets[key]['label'] == label) {
          var fieldSetName = key;
          break;
        };
      }

      var currentFields = formInfo['fields'][fieldSetName]
      for (var field in currentFields) {
        if (currentFields[field]['widget'] == 'checkbox' || currentFields[field]['widget'] == 'radio') {
          var checked = $('input[name="'+ field +'"]:checked').attr('value');
          valid = !checked ? false : true;
        } else if (currentFields[field]['widget'] == 'text') {
          var text = $('input[name="'+ field +'"]').val();
          valid = text === "" ? false : true;
        }
      };

      if (!valid) {
        alert('You have missing fields');
      };
      return valid;
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

  $('.model-form').on('submit', function(event) {
    var nameList = [];
    var valid = true;
    if ($('.model-form input[name="eligibleEntityTypes"]:checked').length == 0) {
      valid = false;
    }
    else if ($('.model-form input[name="eligibleIndustries"]:checked').length == 0) {
      valid = false
    }

    if (!valid) {
      alert('You have missing checkboxes');
    };

    return valid;
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

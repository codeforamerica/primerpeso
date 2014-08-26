var _ = require('lodash');
var SearchShop = require('./searchShop.js');
var FormValidator = require('./ppFormValidator.js');

var validateTransition = function(currentIndex, newIndex) {
  // Only do validation on forward.
  if (!newIndex || currentIndex < newIndex) {
    var fieldSets = _.keys(formInfo.options.fieldSets);
    var validator = new FormValidator();
    var currentFieldSet = fieldSets[currentIndex];
    var currentFields = formInfo.fields[currentFieldSet];
    validatorResult = validator.validateFields(currentFields);
    $('.empty').remove();
    _.each(validatorResult, function(valRes) {
      var element = $('label[for="' + valRes.fieldName + '"]');
      element.after('<div class="empty">' + valRes.message + '</div>');
    });
    if (!_.isEmpty(validatorResult))
      return false;
  }
  return true;
}

$(document).ready(function() {
	$("#fundMeWizard").steps({
	  headerTag: "h3",
	  bodyTag: "fieldset",
	  transitionEffect: "slideLeft",
    saveState: true,
    titleTemplate: '<span class="monkey">#index#.</span> #title#',
    labels: {
      next: "Siguiente",
      previous: "Anterior",
      finish: "Finalizar"
    },
    onStepChanging: function (event, currentIndex, newIndex) {
      return validateTransition(currentIndex, newIndex);
    },
    onFinished: function (event, currentIndex) {
      var form = $(this);
      form.submit();
    },
    onFinishing: function (event, currentIndex) {
      return validateTransition(currentIndex);
    }
  });

  $('.delete-model').on('click', function(e){
    var conf = confirm('Are you sure you want to delete this entry?');
    if (!conf) {
      e.preventDefault();
    }
  });

  $('select').each(function(index, sel) {
    if ($(this).attr("multiple") == "multiple") {
      $(this).select2($(this).val());
    } else{
      $(this).select2();
    };
  });

  // For admin page
  $('.choiceOther').hide();
  $('div#eligibleIndustries').next().show();
  $('select').on('change', function() {
    var name = $(this).attr('name');
    if ($('option:selected', this).attr('value') == 'other') {
      $('div#'+ name).next().show();
    };
  });

  // TODO -- will need refactor
  // Look at using backbone statemachine to clean up this whole file.
  $("#fundMeWizard #investingOwnMoney").change(function(event)  {
    var val = $('input[name=investingOwnMoney]:checked', this).attr('value');
    console.log(val);
    if (val == 1)
      $('#fundMeWizard #moneyInvested').show();
    else
      $('#fundMeWizard #moneyInvested').hide();
  });
  $('.model-form').on('submit', function(event) {
    var nameList = [];
    var valid = true;
    $('.select2-choices').each( function(index, elem) {
      if ($(this).children('.select2-search-choice').length == 0) {
        valid = false;
      };
    });

    if (!valid) {
      alert('You have missing fields');
    };

    return valid;
  });

  $('button.array-text-field').click(function(e) {
    var inp = $(this).next().clone().removeAttr('required').val("");
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
    SearchShop.oppList = new SearchShop.View.OppListView({});
  }
  // For Confirm Page.
  if ($('body').hasClass('confirmPickedResults')) {
    $("#sendRequestForm").steps({
      headerTag: "h3",
      bodyTag: "fieldset",
      transitionEffect: "fade",
      saveState: true,
      titleTemplate: '<span class="monkey">#index#.</span> #title#',
      labels: {
        next: "Siguiente",
        previous: "Anterior",
        finish: "Finalizar"
      },
      onStepChanging: function (event, currentIndex, newIndex) {
        if (validateTransition(currentIndex) === false)
          return false;
        if (currentIndex === 0 && $('input[name=areYouInc]:checked', '#sendRequestForm').val() == false) {
          var form = $(this);
          form.submit();
        }
        else
          return true;
      },
      onFinished: function (event, currentIndex) {
        var form = $(this);
        form.submit();
      },
      onFinishing: function (event, currentIndex) {
        return validateTransition(currentIndex);
      }
    });
  }

	$("[data-toggle=tooltip]").tooltip();

});

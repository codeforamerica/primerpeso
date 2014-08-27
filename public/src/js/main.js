var _ = require('lodash');
var SearchShop = require('./searchShop.js');
var FormValidator = require('./ppFormValidator.js');

var validateGivenFields = function(fields) {
  var validator = new FormValidator();
  validatorResult = validator.validateFields(fields);
  $('.form-group').removeClass('has-error');
  $('.empty').remove();
  console.log(validatorResult);
  _.each(validatorResult, function(valRes) {
    var element = $('label[for="' + valRes.fieldName + '"]');
    element.parent('.form-group').addClass('has-error');
    element.after('<div class="empty">' + valRes.message + '</div>');
  });

  return _.isEmpty(validatorResult);
}

var validateTransition = function(currentIndex, newIndex) {
  // Only do validation on forward.
  if (!newIndex || currentIndex < newIndex) {
    var fieldSets = _.keys(formInfo.options.fieldSets);
    var currentFieldSet = fieldSets[currentIndex];
    var currentFields = formInfo.fields[currentFieldSet];
    return validateGivenFields(currentFields);
  }
  return true;
}

$(document).ready(function() {
  // Preguntas;
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

  // Confirm Page.
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
  // SearchResults.
  if ($('body').hasClass('searchResults')) {
    SearchShop.oppList = new SearchShop.View.OppListView({});
  }

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
    val == 1 ? $('#fundMeWizard #moneyInvested').show() : $('#fundMeWizard #moneyInvested').hide();
  });


  // Admin.
  $('.model-form').submit(function(e) {
    var valRes = validateGivenFields(formInfo);
    if (valRes !== true) {
      e.preventDefault();
      e.stopPropagation();
    }
    return valRes;
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


	$("[data-toggle=tooltip]").tooltip();

});

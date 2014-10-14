var _ = require('lodash');
var SearchShop = require('./searchShop.js');
var FormValidator = require('./ppFormValidator.js');


var validateGivenFields = function(fields) {
  var validator = new FormValidator();
  validatorResult = validator.validateFields(fields);
  $('.form-group').removeClass('has-error');
  $('.empty').remove();
  // Return false if result from validator is NOT empty.
  if (!_.isEmpty(validatorResult)) {
    // Scroll into view
    var firstRes = _.first(validatorResult);
    $('label[for="' + firstRes.fieldName + '"]')[0].scrollIntoView();

    _.each(validatorResult, function(valRes) {
      var element = $('label[for="' + valRes.fieldName + '"]');
      element.parent('.form-group').addClass('has-error');
      element.after('<div class="empty">' + valRes.message + '</div>');
    });
    return false;
  }
  return true;
}

var validateTransition = function(currentIndex, newIndex) {
  // Only do validation on forward.
  if (!newIndex || currentIndex < newIndex) {
    var fieldSets = _.keys(formInfo.options.fieldSets);
    var currentFieldSet = fieldSets[currentIndex];
    var currentFields = formInfo.fields[currentFieldSet];
    // HACK
    if (currentFields.phone)
      currentFields.phone.validate.isPhone = 'isPhone';
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
    var conf = confirm('¿Estas seguro que quieres borrar esta entrada?');
    if (!conf) {
      e.preventDefault();
    }
  });

  $('select').each(function(index, sel) {
    var config = {};
    if ($(this).attr('name') == 'eligibleIndustries' || $(this).attr('name') == 'industry') {
      config.sortResults = function(results, container, query) {
        var newResults = [];
        _.each(results, function(element, index) {
          if (element.id !== 'any')
            newResults.push(element);
          else
            newResults.unshift(element);
        });
        return newResults;
      }
    }
    $(this).select2(config);
  });

  // For admin page
  $('.choiceOther').hide();
  $('div#eligibleIndustries').next().show();
  $('.model-form input.ref').each(function(index, element) {
    //var multiple = $(element).hasClass('multiple');
    var multiple = $(element).attr('multiple') === 'multiple' ? true : false;
    var separateBy = $(element).data('separateby') || null;
    $(element).select2({
      minimumInputLength: 0,
      multiple: multiple,
      ajax: {
        dataType: 'json',
        url: function() {
          var urlString =  '/api/' + $(this).data('reftarget');
          if (separateBy)
            urlString += '?separateby=' + separateBy;
          return urlString;
        },
        results: function(data, page) {
          var res = [];
          var mapper = function (dataToMap) {
            return _.map(dataToMap, function(dataPiece, index) {
              return { id: dataPiece.id, text: dataPiece.name };
            });
          }
          if (separateBy) {
            _.each(data, function(sepChildren, sepParent) {
              res.push({ text: sepParent, children: mapper(sepChildren) });
            });
          }
          else
            res = mapper(data);

          return { results: res };
        },
      },
      initSelection: function(element, callback) {
        var cVal = $(element).val();
        $.ajax({
          dataType: 'json',
          url: '/api/' + $(element).data('reftarget') + '?id=' + cVal,
        }).done(function(data) {
          var result;
          if (multiple === true) {
            var retData = _.isArray(data) ? data : new Array(data);
            result = _.map(retData, function(selectedValue) {
              return { id: selectedValue.id, text: selectedValue.title || selectedValue.name };
            });
          }
          else {
            data = _.first(data);
            result = { id: data.id, text: data.title || data.name };
          }
          callback(result);
        });
      }
    });
  });

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

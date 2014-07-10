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
      switch (currentIndex) {
        case 0:
          var checked = $('input[name="age"]:checked').attr('value');
          if (!checked) {
            valid = false;
          };
          break;
        case 1:
          var checked = $('input[name="purpose"]:checked').attr('value');
          if (!checked) {
            valid = false;
          };
          var checked = $('input[name="investingOwnMoney"]:checked').attr('value');
          if (!checked) {
            valid = false;
          };
          var moneyInvested = $('input[name="moneyInvested"]').val();
          if (moneyInvested === "") {
            valid = false;
          };
          break;
        case 2:
					var checked = $('input[name="businessType"]:checked').attr('value');
					if (!checked) {
						valid = false;
					};
					break;
        case 4:
					var checked = $('input[name="employeeNumber"]:checked').attr('value');
					if (!checked) {
						valid = false;
					};
					var checked = $('input[name="yearsInBusiness"]:checked').attr('value');
					if (!checked) {
						valid = false;
					};
					var checked = $('input[name="annualRevenue"]:checked').attr('value');
					if (!checked) {
						valid = false;
					};
					break;
      }

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
			var checked = $('input[name="employeeNumber"]:checked').attr('value');
			if (!checked) {
				valid = false;
			};
			var checked = $('input[name="yearsInBusiness"]:checked').attr('value');
			if (!checked) {
				valid = false;
			};
			var checked = $('input[name="annualRevenue"]:checked').attr('value');
			if (!checked) {
				valid = false;
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

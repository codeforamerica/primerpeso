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
  $('.choiceOther').hide();
  $('div#eligibleIndustries').next().show();
  $('select').on('change', function() {
    var name = $(this).attr('name');
    if ($('option:selected', this).attr('value') == 'other') {
      $('div#'+name).next().show();
    };
  });
});

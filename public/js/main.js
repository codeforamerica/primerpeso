$(document).ready(function() {
	$("#form-3").steps({
	  headerTag: "h3",
	  bodyTag: "fieldset",
	  transitionEffect: "slideLeft",
	  onStepChanging: function (event, currentIndex, newIndex)
	  {
	      // Allways allow previous action even if the current form is not valid!
	      if (currentIndex > newIndex)
	      {
	          return true;
	      }

	      // Forbid next action on "Warning" step if the user is to young
	      if (newIndex === 3 && Number($("#age-2").val()) < 18)
	      {
	          return false;
	      }

	      // Needed in some cases if the user went back (clean up)
	      if (currentIndex < newIndex)
	      {
	          // To remove error styles
	          $("#form-3 .body:eq(" + newIndex + ") label.error").remove();
	          $("#form-3 .body:eq(" + newIndex + ") .error").removeClass("error");
	      }

	      $("#form-3").validate().settings.ignore = ":disabled,:hidden";
	      return $("#form-3").valid();
	  },
	  onStepChanged: function (event, currentIndex, priorIndex)
	  {
	      // Used to skip the "Warning" step if the user is old enough.
	      if (currentIndex === 2 && Number($("#age-2").val()) >= 18)
	      {
	          $("#form-3").steps("next");
	      }

	      // Used to skip the "Warning" step if the user is old enough and wants to the previous step.
	      if (currentIndex === 2 && priorIndex === 3)
	      {
	          $("#form-3").steps("previous");
	      }
	  },
	  onFinishing: function (event, currentIndex)
	  {
	      $("#form-3").validate().settings.ignore = ":disabled";
	      return $("#form-3").valid();
	  },
	  onFinished: function (event, currentIndex)
	  {
	      alert("Submitted!");
	  }
	}).validate({
	  errorPlacement: errorPlacement,
	  rules: {
	      confirm: {
	          equalTo: "#password-2"
	      }
	  }
	});

});

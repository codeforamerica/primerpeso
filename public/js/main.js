$(document).ready(function() {
	$("#fundMeWizard").steps({
	  headerTag: "h3",
	  bodyTag: "fieldset",
	  transitionEffect: "slideLeft",
    saveState: true,
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
      //form.submit();
	  }
	});
});

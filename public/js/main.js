$(document).ready(function() {
	$("#form-3").steps({
	  headerTag: "h3",
	  bodyTag: "fieldset",
	  transitionEffect: "slideLeft",
	  onStepChanging: function (event, currentIndex, newIndex) {
	      //$("#form-3").validate().settings.ignore = ":disabled,:hidden";
	      //return $("#form-3").valid();
	  },
	  onStepChanged: function (event, currentIndex, priorIndex) {
	  },
	  onFinishing: function (event, currentIndex) {
	  },
	  onFinished: function (event, currentIndex){
	  }
	}).validate({});
});

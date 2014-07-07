$(document).ready(function() {
	$("#fundMeWizard").steps({
	  headerTag: "h3",
	  bodyTag: "fieldset",
	  transitionEffect: "slideLeft",
    saveState: true,
    titleTemplate: '<span class="monkey">#index#.</span> #title#',
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
  $('.choiceOther').hide();
  $('div#eligibleIndustries').next().show();
  $('select').on('change', function() {
    var name = $(this).attr('name');
    if ($('option:selected', this).attr('value') == 'other') {
      $('div#'+name).next().show();
    };
  });
});

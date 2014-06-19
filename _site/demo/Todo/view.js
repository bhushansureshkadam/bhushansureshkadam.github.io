function view(){

}
view.prototype = {

	showDefaultTemplate: function(data) {
     var template = Handlebars.compile($('#taskContainer').html());
		var templateHtml = template(data);
		$("#list").prepend(templateHtml); 
   }
};


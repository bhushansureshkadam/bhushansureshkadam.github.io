$(document).ready(function($) {
 (function(){

    var sessionFile = window.sessionStorage;
	  intialize(sessionFile);
	  $('body').on('keypress','input', function(event) {  
	  //var sessionFile=window.sessionStorage;
     var e = window.event || e;
     var keyunicode = e.charCode || e.keyCode;
     if(keyunicode===13){
      var pattExpwithSpace = /\s[a-z]/i;
      var pattExpwithOutSpace = /[a-z]/i;
      var value = this.value;
      var withSpace = pattExpwithSpace.test(value);
      var withoutSpace = pattExpwithOutSpace.test(value);
      if(withSpace || withoutSpace){

	     var output = $('#newItem').val();
       var dbObj = new DbManager(sessionFile);
       var count = dbObj.keyCount();
       var incomplete="incomplete";
       var data = {
       	output: output,
       	key:count,
       	class: incomplete,
       	un:"undone"
     
}
         var dataItemObj =   new DataItem(data,sessionFile);
         var dataValues  =   dataItemObj.getData();
	 	     var viewObj     =   new view();   
	 	     viewObj.showDefaultTemplate(dataValues);
        }
        this.value="";
      }

    });      

	       $('#toggleAll').click(function(){

            $('#itemContainer').toggle();
         })

	     $('body').delegate('.show','click',function(e) {  
              var incomp = $(this).siblings()[1];  
              var task = $(this).parents('li')[0]; 
		          var key = $(this).parent('li')[0].id;   
		          var dbObj = new DbManager(sessionFile);
		          var className = $(incomp).attr('class');

    		       if (className == "incomplete") {
		           
		          	  $(incomp).attr('class', 'completed');

			           dbObj.changeDbItemStatus( key , 'completed');

		     } 

		          else {

			               $(incomp).attr('class', 'incomplete');
			   
			                dbObj.changeDbItemStatus( key , 'incomplete');
          		    } 

                  
                    if(task.className == "undone") {
                   	$(task).attr('class','done');
                 	  dbObj.changeDb(key , 'done');

                 } 

                    else {

                 	         $(task).attr('class','undone');
                 	         dbObj.changeDb(key , 'undone');
                 }
                  
                   
		});
          $('body').delegate('.destroy','click',function(e){ 
             	 var task = $(this).parents('li')[0]; 
             	 var key = $(this).parent()[0].id;
             	 task.remove();
             	 var dbObj = new DbManager(sessionFile);
             	 dbObj.removeItemFromDb(key);
	        });

           $('body').delegate('button#all','click',function(){
            $('li').show();
           })
           $('body').delegate('button#active','click',function(event){
            $('li').hide();
            $('li.undone').show();
           })
           $('body').delegate('button#showComplete','click',function(event){
            $('li').hide();
            $('li.done').show();
           })

             $('body').delegate('button#clearCompleted','click', function(event){
	           	 	        var list = $(this).parents().find('li');  
                        var length = list.length;
                        var keys = $(this).parents().find('li');
                        var dbObj = new DbManager(sessionFile);
                        for(i=0;i<length;i++){

                          if(list[i].className==="done") {
                            $(list[i]).remove();
                            dbObj.removeItemFromDb(keys[i].id);
                          }
                          else{

                             $(list[i]).show();
                          }
                        }
          })
})();


function intialize(sessionFile){

	for(var i in sessionFile){    

		var dataString = sessionFile[i];
		var dataObj = JSON.parse(dataString);
		var viewObj = new view();
		viewObj.showDefaultTemplate(dataObj);
	}
}

});
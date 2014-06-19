
    $("button").bind('click',function(){ 
          var $this = $(this);
     
          var parentWrapperId =$this.parents().attr('id');
          var value = $this.text();

          if(parentWrapperId =="blueBoxControls"){

          	$("#blue").css("float",value);
          	$("#blue h4").html("float:"+value);
          }
          if(parentWrapperId=="pinkBoxControls"){
          	$("#pink").css("float",value);
          	$("#pink h4").html("float:"+value);
          }
   });

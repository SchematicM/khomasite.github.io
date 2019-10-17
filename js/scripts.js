$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // обработка ошибки формы...
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        // все в порядке!
        $("#contactForm")[0].reset();
		submitMSG(true, "Message Submitted!")
        //event.preventDefault();
        //submitForm();
    }
});
function submitForm(){
    // Инициируем переменную с содержимым формы
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();

   $.ajax({
      type: "POST",
      url: "php/form-process.php",
      data: "name=" + name + "&email=" + email + "&message=" + message,
      success : function(text){
          if (text == "success"){
              formSuccess();
          } else {
              formError();
              submitMSG(false,text);
          }
      }
  });
}
function formSuccess(){
    $( "#msgSubmit" ).removeClass( "hidden" );
}

function formError(){
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
        var msgClasses;
    if(valid){
        msgClasses = "h3 text-center tada animated text-success";
    } else {
        msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}
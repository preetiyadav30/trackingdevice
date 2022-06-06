


(function () {
  "use strict";

  var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = 'http://code.jquery.com/jquery-latest.js'; // set the source of the script to your script
newScript.onload = function() {
 
  $(document).ready(function() {
    
  

    var forms = $('.php-email-form');
 
      forms.submit(function (e) {
    //  e.addEventListener('submit', function(event) {
        e.preventDefault();
  
       // let thisForm = forms;
  
      ////  let action = thisForm.getAttribute('action');
      //  let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
        
        // if( ! action ) {
        //   displayError(thisForm, 'The form action property is not set!')
        //   return;
        // }
        // thisForm.querySelector('.loading').classList.add('d-block');
        // thisForm.querySelector('.error-message').classList.remove('d-block');
        // thisForm.querySelector('.sent-message').classList.remove('d-block');
  
        // let formData = new FormData( thisForm );
        // console.log(formData,"dmjdjd")
        
      //  php_email_form_submit( forms);
      
     // });


     var data=forms.serializeArray()
   
     console.log(data)
      fetch("http://65.2.31.229:3000",{
        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json'
        },
       // formData.serializeArray()
       
        body: JSON.stringify({name:data[0].value,email:data[1].value,username:data[2].value,password:data[3].value }  )
      })
      .then(response => {
        if( response.ok ) {
  
          console.log(response,"dnkj")
          return response.text()
              
            
  
        } else {
          throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
        }
      })
      .then(data => {
         
        var returnData =JSON.parse(data);
        console.log(returnData.sucessCode,"smndnsm")
        // thisForm.querySelector('.loading').classList.remove('d-block');
        // if (data.trim() == 'OK') {
        //   thisForm.querySelector('.sent-message').classList.add('d-block');
        //   thisForm.reset(); 
        //} else {
         // throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
       // }
        
       if(returnData.sucessCode=="1"){
       // alert("message has been sent!");
        
       $('.sent-message').addClass('d-block');
       setTimeout(function(){
      
        $('.sent-message').removeClass('d-block');
       },5000);
       
       $('.php-email-form')[0].reset(); 
  
       }
  
  
      })
      .catch((error) => {
        //displayError(thisForm, error);
      });


    });
  });
 
};
var head = document.getElementsByTagName("head")[0];
head.appendChild(newScript);

  //let forms = document.querySelectorAll('.php-email-form');

  

  

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();

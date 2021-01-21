
function getUser()
{
const Http = new XMLHttpRequest();
var email = document.getElementById("email").value;
var password = document.getElementById("password").value;
const url='http://localhost:8090/api/users/' + email;
Http.open("GET", url);
Http.send();

Http.onreadystatechange = () => {
 var user = Http.responseText;
 var jsonText = user.substring(1,user.length-1);
 var json = JSON.parse(jsonText);
 
 if(password.localeCompare(json.password) == 0)
 {
  var response = json.firstName + " " + json.lastName +" has been signed in"; 
  err.innerText = response;
 }
 else
 {
   err.innerText = "Invalid email or password";
 }
}
err.innerText = "You do not have an account yet";

}

function addUser()
{
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var firstName = document.getElementById('firstName').value;
  var lastName = document.getElementById('lastName').value;

  
  const emailUrl='http://localhost:8090/api/users/' + email;
  var check = checkUser(emailUrl, email);
  const url = 'http://localhost:8090/api/users/';

  if(check == true)
  {
    err.innerText = "User already exists. Try a different email."
  }
  else
  {
      var data = 
      {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
      }
    $.post(url, data, function(data, status){
      console.log(`${data} and status is ${status}`);
    });
    err.innerText = email + " Was added";
  }
    
    
    
  
}

function checkUser(Url, email)
{
  var result = null;
     
     $.ajax({
        url: Url,
        type: 'get',
        dataType: 'html',
        async: false,
        success: function(data) {
            result = data;
        } 
     });
     if(result == "[]")
     {
       return false;
     }
     else
     {
       var jsonText = result.substring(1,result.length-1);
       var json = JSON.parse(jsonText);
       if(json.email.localeCompare(email) == 0)
       {
        return true;
       }
       else
       {
         return false;
       }
     }
}









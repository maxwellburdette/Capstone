
function getUser()
{
const Http = new XMLHttpRequest();
var email = document.getElementById("email").value;
var password = document.getElementById("password").value;
const url='https://kam.azurewebsites.net/api/users/' + email;
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
  if(typeof(Storage) !== "undefined")
  {
    localStorage.setItem("userLogin", email);
  }
  window.location.replace("home.html");
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
  if(validEmail(email))
  {
    var password = document.getElementById("password").value;
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    if(password == "" || firstName == "" || lastName == "")
    {
      err.innerText = "One or more fields are blank";
    }
    else
    {
    const emailUrl='https://kam.azurewebsites.net/api/users/' + email;
    var check = checkUser(emailUrl, email);
    const url = 'https://kam.azurewebsites.net/api/users';

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
  }
  else
  {
    err.innerText = "You have entered an email in the wrong format";
  }
    
    
    
  
}

function validEmail(email)
{
  
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
  if(email.match(pattern))
  {
    return true;
  }

  return false;
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
















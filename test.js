function login()
{
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  if(email.localeCompare("") == 0)
  {
    email = "FAIL";
  }
  Url='https://kam.azurewebsites.net/api/users/' + email;
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
    var user;
    var dbEmail;
    var dbPassword;
    if(result == "[]")
    {
      err.innerText = "You do not have an account! Sign Up!"
    }
    else
    {
      user = JSON.parse(result);
      dbEmail = user[0].email;
      dbPassword = user[0].password;
    }
    if(dbEmail.localeCompare("maxbdevelops@gmail.com") == 0 ||
    dbEmail.localeCompare("schlegek@csp.edu") == 0 ||
    dbEmail.localeCompare("perrinea@csp.edu") == 0)
    {
      if(password.localeCompare(dbPassword) == 0)
      {
        var response = user[0].firstName + " " + user[0].lastName +" has been signed in"; 
        err.innerText = response;
        if(typeof(Storage) !== "undefined")
        {
          localStorage.setItem("userLogin", email);
        }
        window.location.replace("adminhome.html");
      }
      else
      {
        err.innerText = "Invalid email or password";
      }
    }
    else
    {
      if(password.localeCompare(dbPassword) == 0)
      {
        var response = user[0].firstName + " " + user[0].lastName +" has been signed in"; 
        err.innerText = response;
        if(typeof(Storage) !== "undefined")
        {
          localStorage.setItem("userLogin", email);
        }
        window.location.replace("index.html");
      }
      else
      {
        err.innerText = "Invalid email or password";
      }
    }
 
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



















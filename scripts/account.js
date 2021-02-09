function edit()
{
    var user = getUser();
    var span = document.getElementsByClassName("close")[0];
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    document.getElementById('firstName').value = user.firstName;
    document.getElementById('lastName').value = user.lastName;
    document.getElementById('password').value = user.password;

    span.onclick = function() {
        modal.style.display = "none";
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }

    submit.onclick = function() {
        if(document.getElementById('firstName').value.localeCompare("") == 0
        || document.getElementById('lastName').value.localeCompare("") == 0
        || document.getElementById('password').value.localeCompare("") == 0)
        {
            descriptionHeader.innerText = "One or more fields is blank";
        }
        else
        {
            descriptionHeader.innerText = "";
            setUserInfo(document.getElementById('firstName').value, document.getElementById('lastName').value, document.getElementById('password').value);
            modal.style.display = "none";
        }
    }
}

function setCard()
{
    var user = getUser();
    console.log(user.firstName);
    $('#name').text("Name: " + user.firstName + " " + user.lastName);
    $('#emailAddress').text("Email: " + user.email);

}

function getUser()
{
    if(localStorage.getItem("userLogin") == null)
    {
        return null;
    }
    Url = 'https://kam.azurewebsites.net/api/users/' + localStorage.getItem("userLogin");
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
     var json = JSON.parse(result);
     var user = json[0];
     return user;
}



function setUserInfo(firstName, lastName, password)
{
    const url = "https://kam.azurewebsites.net/api/users/" + localStorage.getItem('userLogin');
    var user = 
    {
        firstName: firstName,
        lastName: lastName,
        email: localStorage.getItem("userLogin"),
        password: password
    };
    $.ajax({
        url: url,
        type: 'PUT',
        data: user,
        dataType: 'json',
        success: function(result){
        }
     });
    var text = user.firstName + " " + user.lastName + " | Sign Out";
    $('#userName').text(text); 
    $('#name').text("Name: " + user.firstName + " " + user.lastName);
    $('#emailAddress').text("Email: " + user.email);

}
setCard();
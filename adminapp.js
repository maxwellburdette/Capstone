const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.navlinks');
    const navlinks = document.querySelectorAll('.navlinks li');
    //Toggle nav
    burger.addEventListener('click', ()=>{


        nav.classList.toggle('nav-active');
        //Animate Nav Links
        navlinks.forEach((link, index) =>{
            if(link.style.animation)
            {
                link.style.animation = '';
            }
            else
            {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + .4}s`;
            }
            
        });
        //Burger animation
        burger.classList.toggle('toggle');
        //Get user unfo
        
    });

    
}

//Logs user out and redirects them to login page 
window.onload = function () {
    var myClass = document.querySelector(".id")
        .onclick = function () {
            if(typeof(Storage) !== "undefined")
            {
              localStorage.clear();
              sessionStorage.clear();
              
            }
            window.location.href = "login.html";
        return false;
    }
    if(localStorage.getItem("userLogin") == null)
    {
        window.location.href = "index.html";
    }
    if(localStorage.getItem("userLogin").localeCompare("maxbdevelops@gmail.com") == 0 ||
    localStorage.getItem("userLogin").localeCompare("schlegek@csp.edu") == 0||
    localStorage.getItem("userLogin").localeCompare("perrinea@csp.edu") == 0)
    {
        
    }
    else
    {
        window.location.href = "index.html";
    }
  
}





navSlide();
getSignout();

//Displays firstName + lastName | sign out, if clicked it signs user out
function getSignout()
{
    var user = getJson();
    var text = user.firstName + " " + user.lastName + " | Sign Out";
    $('#userName').text(text); 
    $('#account').text("Account");
    $('#messages').text("Messages");
    $('#manageReviews').text("Manage Reviews");

    
}

//Gets json file from api server
function getJson()
{
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
    var jsonText = result.substring(1,result.length-1);
    var json = JSON.parse(jsonText);
    return json;
}

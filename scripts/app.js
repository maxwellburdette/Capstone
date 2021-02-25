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
            window.location.href = "loginPages/login.html";
        return false;
    }

    $('.preloader').addClass('complete');

    console.log(localStorage.getItem('userLogin'));
    if(localStorage.getItem('userLogin') == null)
    {
        return false;
    }
    //If admin goes to index and is still signed in it redirects them to admin page
    if(localStorage.getItem("userLogin").localeCompare("maxbdevelops@gmail.com") == 0 ||
    localStorage.getItem("userLogin").localeCompare("schlegek@csp.edu") == 0||
    localStorage.getItem("userLogin").localeCompare("perrinea@csp.edu") == 0)
    {
        window.location.href = "adminPages/adminhome.html";
    }
    
}





navSlide();
getSignout();


//Displays firstName + lastName | sign out, if clicked it signs user out
function getSignout()
{
    if(localStorage.getItem('userLogin') == null)
    {
        return false;
    }
    var user = getJson();
    var text = user.firstName + " " + user.lastName + " | Sign Out";
    $('#userName').text(text); 
    $('#account').text("Account");
    $('#userMessages').text("Messages");
    $('#manageReservation').text("Manage Reservations");
    $('#makeReservation').text("Make Reservation");
    $('#leaveReview').text("Leave us a review");

    
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


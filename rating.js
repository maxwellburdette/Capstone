function getJSON()
{
    Url = "https://kam.azurewebsites.net/api/reviews"
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
     return json;
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
     var user = json[0].email;
     return user;
}

function addRating()
{
    var email = getUser();
    var description = document.getElementById('comment_text').value;
    var starValue = 0;
    const url = 'https://kam.azurewebsites.net/api/reviews';


    var fiveStar = document.getElementById('star5');
    var fourHalfStar = document.getElementById('star4half');
    var fourStar = document.getElementById('star4');
    var threehalfStar = document.getElementById('star3half');
    var threeStar = document.getElementById('star3');
    var twoStarHalf = document.getElementById('star2half');
    var twoStar = document.getElementById('star2');
    var oneStarHalf = document.getElementById('star1half');
    var oneStar = document.getElementById('star1');
    var halfStar = document.getElementById('starhalf');
    if(email == null)
    {
        
    }
    else
    {
        if(fiveStar.checked)
        {
            starValue = fiveStar.value;
        }
        else if(fourHalfStar.checked)
        {
            starValue = fourHalfStar.value
        }
        else if(fourStar.checked)
        {
            starValue = fourStar.value;
        }
        else if(threehalfStar.checked)
        {
            starValue = threehalfStar.value;
        }
        else if(threeStar.checked)
        {
            starValue = threeStar.value;
        }
        else if(twoStarHalf.checked)
        {
            starValue = twoStarHalf.value;
        }
        else if(twoStar.checked)
        {
            starValue = twoStar.value;
        }
        else if(oneStarHalf.checked)
        {
            starValue = oneStarHalf.value;
        }
        else if(oneStar.checked)
        {
            starValue = oneStar.value;
        }
        else if(halfStar.checked)
        {
            starValue = halfStar.value;
        }
    var data = 
      {
      email: email,
      rating: starValue,
      description: description
      }
      $.post(url, data, function(data, status){
        console.log(`${data} and status is ${status}`);
      });
    }
    return false;
    
}


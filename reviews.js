function getJSON()
{
    Url = "http://localhost:8090/api/reviews"
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


function getRandomsArray()
{
    var json = getJSON();
    var randoms = [];
    let check = 0;
    let temp;
    while(check < 3)
    {
        temp = getRandomInt(json.length);
        if(json[temp].rating >= 4)
        {
            if(check == 0)
            {
               randoms.push(temp);
               check++;
            }
            else
            {
                let exists = false;
                for(let j = 0; j < randoms.length; j++)
                {
                    if(randoms[j] == temp)
                    {
                        exists = true;
                        break;
                    }
            
                }
                if(exists == false)
                {
                    randoms.push(temp);
                    check++;
                }
            }
            
        }
        
    }
    return randoms;
}
function getRandomInt(max)
{
    return Math.floor(Math.random() * Math.floor(max));
}

function displayReviews()
{
    var json = getJSON();
    var randoms = getRandomsArray();
    for(let i = 0; i < json.length; i++)
    {
        var row = document.getElementById('row' + (i+1));
        row.querySelector('.col-1').innerText = json[randoms[i]].email;
        row.querySelector('.col-2').innerText = json[randoms[i]].description;
        row.querySelector('.col-3').innerText = json[randoms[i]].rating;
    }
    
}

function calculateRating()
{
    Url = 'http://localhost:8090/api/reviews';
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
     let rating = 0;
     for(let i = 0; i < json.length; i++)
     {
         rating += json[i].rating;
     }
      
}
displayReviews();
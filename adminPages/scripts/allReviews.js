let idCount = 0;
function addMessage(user, description, rating)
{
    //Get table
    var ul = document.getElementById('list');

    //Create row
    var li = document.createElement('LI');
    li.className = 'table-row';
    //Assign id for element
    li.setAttribute('id', 'row'+idCount);
    var id = 'row'+idCount;
    li.setAttribute('onclick', 'viewReview('+id + ')');
    //Create column 1
    var col1 = document.createElement('div');
    col1.className = 'col col-1';
    col1.innerText = user;
    col1.setAttribute('data-label', 'User');
    
    //Create column 2
    var col2 = document.createElement('div');
    col2.className = 'col col-2';
    col2.innerText = description;
    col2.setAttribute('data-label', 'Description');

    //Create column 3
    var col3 = document.createElement('div');
    col3.className = 'col col-3';
    col3.innerText = rating;
    col3.setAttribute('data-label', 'Rating');

    //Add col1 to row
    li.appendChild(col1);
    //Add col2 to row
    li.appendChild(col2);
    //Add col3 to row
    li.appendChild(col3);
    //Add row to table
    ul.appendChild(li);

    //Change height of container when new row is added to page
    //var container = document.getElementById('box');
    //var getHeight = container.offsetHeight + 97;
    //container.style.height = getHeight + "px";
    //Change count of id so the next row has a unique id
    idCount++;
}

function displayMessages()
{
    if(localStorage.getItem("userLogin") == null)
    {
        return null;
    }
    var container = document.getElementById('box');
    //container.style.height = "125px"
    clearList();
    Url = 'https://kam.azurewebsites.net/api/reviews/';
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
     for(let i = 0; i < json.length; i++)
     {
         addMessage(json[i].email, json[i].description, json[i].rating);
     }
}

function clearList() {
    idCount = 0;
    var ul = document.getElementById('list');
    while(ul.lastElementChild != document.getElementById('tableHead'))
    {
        ul.removeChild(ul.lastElementChild);
    }
}




function viewReview(id) {
    var user = id.childNodes.item(0).innerText;
    var review = id.childNodes.item(1).innerText;
    var rating = id.childNodes.item(2).innerText;
    var span = document.getElementsByClassName("close")[0];
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }
    
    userHeader.innerText = "To: " + user;
    descriptionHeader.innerText = "Review: " + review;
    ratingHeader.innerText = "Rating: " + rating + " stars";
    footer.innerText = "From: " + localStorage.getItem("userLogin");
    submit.onclick = function() {
    var from = localStorage.getItem("userLogin");
    var subject = document.getElementById('subject').value;
    document.getElementById('subject').value = "";
    sendMessge(user, from, subject);
    modal.style.display = "none";
    }
}

function sendMessge(to, from, contents)
{
    const url = "https://kam.azurewebsites.net/api/messages";
    var message = 
    {
        toMessage: to,
        fromMessage: from,
        contents: contents
    };
    $.post(url, message, function(message, status){
        console.log(`${message} and status is ${status}`);
      });
}

displayMessages();

//Autoscrolls after reaching top or bottom
//Better for mobile site
$('#box').on('scroll', function()
{
  var scrollTop = $(this).scrollTop();
  
  if(scrollTop + $(this).innerHeight() >= this.scrollHeight)
  {
    $("#fullview").animate({ scrollTop: $('#fullview').prop("scrollHeight")}, 1000);
  }
  else if(scrollTop <= 0)
  {
    $("#fullview").animate({ scrollTop: 0 }, "slow");
  }
  
});


//Refresh button animation
$( "#button" ).click(function() {
    $( "#button" ).addClass( "onclic", 250, validate());
  });

  function validate() {
    setTimeout(function() {
      $( "#button" ).removeClass( "onclic" );
      $( "#button" ).addClass( "validate", 450, callback() );
    }, 750 );
  }
    function callback() {
      setTimeout(function() {
        $( "#button" ).removeClass( "validate" );
      }, 750 );
    }
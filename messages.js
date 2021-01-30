let idCount = 0;
function addMessage(user)
{
    //Get table
    var ul = document.getElementById('list');

    //Create row
    var li = document.createElement('LI');
    li.className = 'table-row';

    //Create column 1
    var col1 = document.createElement('div');
    col1.className = 'col col-1';
    col1.innerText = user;
    
    //Create column 2
    var col2 = document.createElement('div');
    col2.className = 'col col-2';
    col2.innerText = "Message goes here";

    //Add col1 to row
    li.appendChild(col1);
    //Add col2 to row
    li.appendChild(col2);
    //Assign id for element
    li.setAttribute('id', 'row'+idCount);
    //Add row to table
    ul.appendChild(li);

    //Change height of container when new row is added to page
    var container = document.getElementById('box');
    var getHeight = container.offsetHeight + 95;
    container.style.height = getHeight + "px";
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
    container.style.height = "125px"
    clearList();
    Url = 'https://kam.azurewebsites.net/api/users/'
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
     console.log(json[0].email);
     for(let i = 0; i < json.length; i++)
     {
         addMessage(json[i].email);
     }
}

function clearList()
{
    var ul = document.getElementById('list');
    while(ul.lastElementChild != document.getElementById('tableHead'))
    {
        ul.removeChild(ul.lastElementChild);
    }
}

displayMessages();
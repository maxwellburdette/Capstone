let idCount = 0;
let ticketCount = 0;

function refresh()
{
    if(localStorage.getItem("userLogin").localeCompare("maxbdevelops@gmail.com") == 0 ||
    localStorage.getItem("userLogin").localeCompare("schlegek@csp.edu") == 0||
    localStorage.getItem("userLogin").localeCompare("perrinea@csp.edu") == 0)
    {
        displayTickets();
        displayMessages();
    }
    else
    {
        displayMessages();
    }
}
function addMessage(toMessage, contents)
{
    //Get table
    var ul = document.getElementById('list');

    //Create row
    var li = document.createElement('LI');
    li.className = 'table-row';
    //Assign id for element
    li.setAttribute('id', 'row'+idCount);
    var id = 'row'+idCount;
    li.setAttribute('onclick', 'viewMessage('+id + ')');
    //Create column 1
    var col1 = document.createElement('div');
    col1.className = 'col col-1';
    col1.innerText = toMessage;
    col1.setAttribute('data-label', "User");
    
    //Create column 2
    var col2 = document.createElement('div');
    col2.className = 'col col-2';
    col2.innerText = contents;
    col2.setAttribute('data-label', 'Message');

    //Create column 3
    var col3 = document.createElement('div');
    col3.setAttribute('id', idCount.toString(2));
    var hoverBody = document.createElement('div');
    hoverBody.className = "hoverBody";
    var hover = document.createElement('div');
    hover.className = "hover";
    var span = document.createElement('span');
    var ellipsis = document.createElement('i');
    ellipsis.className = 'fa fa-ellipsis-v';
    ellipsis.setAttribute('aria-hidden', 'true');
    span.appendChild(ellipsis);
    var a  = document.createElement('a');
    a.className = "social-link";
    a.target = "_blank";
    var i = document.createElement('i');
    i.className = "fa fa-trash";
    i.setAttribute('aria-hidden', 'true');
    a.appendChild(i);
    hover.appendChild(span);
    hover.appendChild(a);
    hoverBody.appendChild(hover);
    col3.appendChild(hoverBody);
    console.log(col3);
    // <div class="hoverBody">
    //   <div class="hover">
    //     <span>Hover</span>
    //     <a class="social-link" href="#" target="_blank"><i class="fa fa-trash" aria-hidden="true"></i></a>
    //   </div>
    // </div>

    //Add col1 to row
    li.appendChild(col1);
    //Add col2 to row
    li.appendChild(col2);
    //ADd col3 to row
    li.appendChild(col3);
    li.childNodes.item(2).setAttribute('pointer-events', 'none');
    //Add row to table
    ul.appendChild(li);

    //Change height of container when new row is added to page
    //var container = document.getElementById('box');
    //var getHeight = container.offsetHeight + 95;
    //container.style.height = getHeight + "px";
    //Change count of id so the next row has a unique id
    idCount++;
}

function addTicket(from, message, messageId)
{
    //Get table
    var ul = document.getElementById('tickets');

    //Create row
    var li = document.createElement('LI');
    li.className = 'table-row';
    //Assign id for element
    li.setAttribute('id', 'ticket'+ticketCount);
    var id = 'ticket'+ticketCount;
    li.setAttribute('onclick', 'viewTicket('+id + ')');

    //Create column 1
    var col1 = document.createElement('div');
    col1.className = 'col col-1';
    col1.innerText = from;
    col1.setAttribute('data-label', "User");

    //Create column 2
    var col2 = document.createElement('div');
    col2.className = 'col col-2';
    col2.innerText = message;
    col2.setAttribute('data-label', 'Message');

    //Create column 3
    var col3 = document.createElement('div');
    col3.className = "col col-3";
    col3.innerText = messageId;
    col3.setAttribute('data-label', 'ID');

    //Add col1 to row
    li.appendChild(col1);
    //Add col2 to row
    li.appendChild(col2);
    //Add col3 to row
    li.appendChild(col3);
    //Add row to table
    ul.appendChild(li);

    ticketCount++;

}
function displayTickets()
{
    if(localStorage.getItem("userLogin") == null)
    {
        return null;
    }
    var container = document.getElementById('ticketBox');
    //container.style.height = "125px"

    Url = 'https://kam.azurewebsites.net/api/messages/to/admin';
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
    clearTickets();
    if(json.length == 0)
    {
        var ul = document.getElementById('tickets');
        var li = document.createElement('LI');0
        li.className = 'table-row';
        li.style.textAlign = "center";
        //Create column 1
        var col1 = document.createElement('div');
        col1.innerText = "No Tickets at this time";
        li.appendChild(col1);
        ul.appendChild(li);

    }
    else
    {
        for(let i = 0; i < json.length; i++)
        {
            addTicket(json[i].fromMessage, json[i].contents, json[i].messageId);
        }
    }

}

function displayMessages()
{
    if(localStorage.getItem("userLogin") == null)
    {
        return false;
    }
    var container = document.getElementById('box');
    //container.style.height = "125px"
    
    //Check for all messages sent from user signed in
    Url = 'https://kam.azurewebsites.net/api/messages/from/' + localStorage.getItem("userLogin");
    var userArray = getTo(Url);

    //Check for all messages sent to user signed in
    Url = 'https://kam.azurewebsites.net/api/messages/to/' + localStorage.getItem("userLogin");
    userArray = getFrom(Url, userArray);
    console.log(userArray);
    if(userArray[0] == undefined || userArray.length == 0)
    {
        clear();
        var ul = document.getElementById('list');
        var li = document.createElement('LI');
        li.className = 'table-row';
        li.style.textAlign = "center";
        //Create column 1
        var col1 = document.createElement('div');
        col1.innerText = "No Messages";
        li.appendChild(col1);
        ul.appendChild(li);
    }
    else
    {
        clear();
    for(let i = 0; i < userArray.length; i++)
    {
        const urlTo = 'https://kam.azurewebsites.net/api/messages/to/' + userArray[i];
        const urlFrom = 'https://kam.azurewebsites.net/api/messages/from/' + userArray[i];
        var contents = getLatest(urlTo, urlFrom);
        addMessage(userArray[i], contents);
     }
    }
}

function getTo(url)
{
    var result = null;
     
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'html',
        async: false,
        success: function(data) {
            result = data;
        } 
    });
    var json = JSON.parse(result);
    var tempArray = [];
    for(let i = 0; i < json.length; i++)
    {
        tempArray.push(json[i].toMessage)
    }
    var userArray = [];
    userArray.push(tempArray[0]);
    for(let i = 0; i < tempArray.length; i++)
    {
        let exists = false;
        for(let j = 0; j < userArray.length; j++)
        {
            if(userArray[j].localeCompare(tempArray[i]) == 0)
            {
                exists = true;
                break;
            }
            else
            {
                exists = false;
            }
         }
         if(exists == false)
         {
            userArray.push(tempArray[i]);
         }
    }
    return userArray;
     
}

function getFrom(url, userArray)
{
    var result = null;
     
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'html',
        async: false,
        success: function(data) {
            result = data;
        } 
    });
    var json = JSON.parse(result);
    var tempArray = [];
    for(let i = 0; i < json.length; i++)
    {
        tempArray.push(json[i].fromMessage)
    }
    var newArray;
    if(userArray[0] == undefined)
    {
        newArray = [];
        newArray.push(tempArray[0]);
    }
    else
    {
        newArray = userArray;
    }
    for(let i = 0; i < tempArray.length; i++)
    {
        let exists = false;
        for(let j = 0; j < userArray.length; j++)
        {
            if(newArray[j].localeCompare(tempArray[i]) == 0)
            {
                exists = true;
                break;
            }
            else
            {
                exists = false;
            }
         }
         if(exists == false)
         {
            newArray.push(tempArray[i]);
         }
    }
    return newArray;
     
}

function getLatest(urlTo, urlFrom)
{
    var result = null;
    $.ajax({
        url: urlTo,
        type: 'get',
        dataType: 'html',
        async: false,
        success: function(data) {
            result = data;
        } 
    });
    var tempArray = [];
    if(result == '[]')
    {

    }
    else
    {
        var json = JSON.parse(result);
        for(let i = 0; i < json.length; i++)
        {
            if(json[i].fromMessage.localeCompare(localStorage.getItem('userLogin'))==0)
            {
                tempArray.push(json[i]);
            }
        }
    }
    result = null;
    $.ajax({
        url: urlFrom,
        type: 'get',
        dataType: 'html',
        async: false,
        success: function(data) {
            result = data;
        } 
    });
    if(result == '[]')
    {

    }
    else
    {
        json = JSON.parse(result);
        for(let i = 0; i < json.length; i++)
        {
            if(json[i].toMessage.localeCompare(localStorage.getItem('userLogin')) == 0)
            {
                tempArray.push(json[i]);
            }
        }
        
    }

    for(let i = 0; i < tempArray.length; i++)
    {
        for(let j = i+1; j < tempArray.length; j++)
        {
            if(tempArray[j].messageId < tempArray[i].messageId)
            {
                let current = tempArray[i];
                tempArray[i] = tempArray[j];
                tempArray[j] = current;
            }
        }
    }
    return tempArray[tempArray.length-1].contents;
}

function clearList()
{
    idCount = 0;
    var ul = document.getElementById('list');
    while(ul.lastElementChild != document.getElementById('tableHead'))
    {
        ul.removeChild(ul.lastElementChild);
    }
}

function viewTicket(id)
{
    var user = id.childNodes.item(0).innerText;
    var message = id.childNodes.item(1).innerText;
    var ticketNumber = id.childNodes.item(2).innerText;
    var span = document.getElementsByClassName("close")[1];
    var modal = document.getElementById("ticketResponse");
    modal.style.display = "block";
    deleteTicket.style.background = 'red';
    span.onclick = function() {
        modal.style.display = "none";
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }
    ticketNumberHeader.innerText = "Ticket: " + ticketNumber;
    messageHeader.innerText = "Issue: " + message;
    footer2.innerText = "From: " + user;

    addTicketButton.onclick = function()
    {
        moveTicket(ticketNumber);
        displayMessages();
        displayTickets();
        modal.style.display = "none";
    }

    deleteTicket.onclick = function()
    {
        deleteMessage(ticketNumber);
        modal.style.display = "none";
        refresh();
    }


}
function moveTicket(id)
{
    var admin = localStorage.getItem('userLogin');
    const url = 'https://kam.azurewebsites.net/api/messages/' + id;
    var json = 
    {
        toMessage: admin
    };
    $.ajax({
        url: url,
        type: 'PUT',
        data: json,
        dataType: 'json',
        success: function(result){
        }
     });

}
function viewMessage(id)
{
    //Getid to check if delete button is clicked
    var numberId = id.id;
    var numb = numberId.match(/\d/g);
    numb = numb.join("");
    var deleteButton = document.getElementById(numb.toString(2));
    deleteButton.onclick = function()
    {
        console.log('clicked');
    };
    var span = document.getElementsByClassName("close")[0];
    var modal = document.getElementById("myModal");
    var user = id.childNodes.item(0).innerText;
    var allMessages = [];
    Url = 'https://kam.azurewebsites.net/api/messages/from/' + localStorage.getItem("userLogin");
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
     var toMessages = JSON.parse(result);

     for(let i = 0; i < toMessages.length; i++)
     {
         if(toMessages[i].toMessage.localeCompare(user) == 0)
         {
             allMessages.push(toMessages[i]);
         }
     }
    Url = 'https://kam.azurewebsites.net/api/messages/from/' + user;
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
    var fromMessages = JSON.parse(result);
    for(let i = 0; i < fromMessages.length; i++)
    {
        if(fromMessages[i].toMessage.localeCompare(localStorage.getItem('userLogin')) == 0)
        {
            allMessages.push(fromMessages[i]);
        }
    }
    
    for(let i = 0; i < allMessages.length; i++)
    {
        for(let j = i+1; j < allMessages.length; j++)
        {
            if(allMessages[j].messageId < allMessages[i].messageId)
            {
                let current = allMessages[i];
                allMessages[i] = allMessages[j];
                allMessages[j] = current;
            }
        }
    }
    
    fromMessageThread.innerText = user;
    modal.style.display = "block";
    var body = document.getElementById('messageBody');
    for(let i = 0; i < allMessages.length; i++)
    {
        if(allMessages[i].toMessage.localeCompare(user) == 0)
        {
            var message = document.createElement('div');
            message.className = "message";
            var text = document.createElement('p');
            var node = document.createTextNode(allMessages[i].contents);
            var time = document.createElement('span');
            time.className ="time-right";
            time.innerText = getStamp(allMessages[i].dataCreated);
            text.appendChild(node);
            var label = document.createElement('h3');
            label.style.textAlign = "right";
            label.innerText = allMessages[i].fromMessage;
            message.appendChild(text);
            message.appendChild(time);
            body.appendChild(label);
            body.appendChild(message);
        }
        else
        {
            var message = document.createElement('div');
            message.className = "message darker";
            var text = document.createElement('p');
            var node = document.createTextNode(allMessages[i].contents);
            var time = document.createElement('span');
            time.className ="time-left";
            time.innerText = getStamp(allMessages[i].dataCreated);
            text.appendChild(node);
            var label = document.createElement('h3');
            label.innerText = allMessages[i].fromMessage;
            message.appendChild(text);
            message.appendChild(time);
            body.appendChild(label);
            body.appendChild(message);
        }
    }
    //Create text area for user entry
    var textArea = document.createElement('textarea');
    //Sets attributes to style it to the page and allow us to use input to send it to the database
    textArea.setAttribute('name', 'subject' );
    textArea.setAttribute('placeholder', 'Write something...');
    textArea.setAttribute('id','subject');
    textArea.style.height = '40px';
    
    //Create button to send message
    var button = document.createElement('input');
    //Set attributes to style button and get information to send to database
    button.type = 'submit';
    button.setAttribute('value', 'Send');
    button.setAttribute('id', 'submit');

    var deleteThread = document.createElement('input');
    deleteThread.type = 'submit';
    deleteThread.setAttribute('value','Delete Thread');
    deleteThread.setAttribute('id', 'delete');
    deleteThread.style.float = 'right';
    deleteThread.style.background = 'red';
    //deleteThread.style.float('right');
    //Add children to our body of text after messages come in
    body.appendChild(textArea);
    body.appendChild(button);
    body.appendChild(deleteThread);


    span.onclick = function() {
        modal.style.display = "none";
        clearList();
        //displayMessages();
    }
    
    window.onclick = function(event) {
        if (event.target == modal) 
        {
          modal.style.display = "none";
          clearList();
          //displayMessages();
        }
    }

    submit.onclick = function() {
        var from = localStorage.getItem("userLogin");
        var subject = document.getElementById('subject').value;
        document.getElementById('subject').value = "";
        sendMessge(user, from, subject);
        modal.style.display = "none";
        id.childNodes.item(1).innerText = subject;
        clearList();
        }
    
    deleteThread.onclick = function() 
    {
        var results = [];
        for(let i = 0; i < allMessages.length; i++)
        {    
            results.push(deleteMessage(allMessages[i].messageId));
        }    
        for(let i = 0; i < results.length; i++)
        {

        }
        modal.style.display = "none";
        clearList();
        refresh();
    }
    
}
displayMessages();
if(localStorage.getItem("userLogin").localeCompare("maxbdevelops@gmail.com") == 0 ||
    localStorage.getItem("userLogin").localeCompare("schlegek@csp.edu") == 0||
    localStorage.getItem("userLogin").localeCompare("perrinea@csp.edu") == 0)
{
        displayTickets();   
}

//Clears message body so that it updates the message threads without having repeated values
function clearList()
{
    var body = document.getElementById('messageBody');
    while(body.lastElementChild != null)
    {
        body.removeChild(body.lastElementChild);
    }
}

//Clears table of the messages you have sent to different users, so that you can refresh new messages
function clear()
{
    idCount = 0;
    var ul = document.getElementById('list');
    while(ul.lastElementChild != document.getElementById('tableHead'))
    {
        ul.removeChild(ul.lastElementChild);
    }
}
function clearTickets()
{
    ticketCount = 0;
    var ul = document.getElementById('tickets');
    while(ul.lastElementChild != document.getElementById('ticketHead'))
    {
        ul.removeChild(ul.lastElementChild);
    }
}

//Adds message to message database
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


function deleteMessage(id)
{
    const url = 'https://kam.azurewebsites.net/api/messages/'+id;
    var result = null;
    $.ajax({
        url: url,
        type: 'DELETE',
        dataType: 'html',
        async: false,
        success: function(data) {
            result = data;
        } 
     });
    return result;
}

//Gets time stamp for messages
function getStamp(date)
{
    var year = '';
    for(let i = 0; i < 4; i++)
    {
        year += date.charAt(i);
    }
    var month = getMonth(parseInt(date.charAt(5) + date.charAt(6)));
    var day = date.charAt(8) + date.charAt(9);

    //Hour is 6 hours ahead of current time zone, subtract 6 to fix issue
    var hour = parseInt(date.charAt(11) + date.charAt(12))-6;
    if(hour < 0)
    {
        hour -= 12;
        hour *= -1;
    }
    var minute = date.charAt(13) + date.charAt(14) + date.charAt(15);
    //If hour is more than 12 we subtract 12 to convert time to standard time zone
    if(hour > 12)
    {
        hour -= 12;
        hour = hour + minute+ "PM";
    }
    //If hour is 12 then leave it as is and set it to PM
    else if(hour == 12)
    {
        hour = hour + minute + "PM";
    }
    //If hour is 0 we set it to 12 to convert to standard time zone
    else if(hour == 0)
    {
        hour = 12;
        hour = hour + minute + "AM";
    }
    //Otherwise we just set to AM
    else
    {
        hour = hour = hour + minute+ "AM";
    }

    return "Date: " + month + " " + day + ", " + year + ", Time: " + hour;
}
//Converts integer to month name
function getMonth(number)
{
    if(number == 1)
    {
        return "January";
    }
    else if(number == 2)
    {
        return "February";
    }
    else if(number == 3)
    {
        return "March";
    }
    else if(number == 4)
    {
        return "April";
    }
    else if(number == 5)
    {
        return "May";
    }
    else if(number == 6)
    {
        return "June";
    }
    else if(number == 7)
    {
        return "July";
    }
    else if(number == 8)
    {
        return "Auguest";
    }
    else if(number == 9)
    {
        return "September";
    }
    else if(number == 10)
    {
        return "October";
    }
    else if(number == 11)
    {
        return "November";
    }
    else if(number == 12)
    {
        return "December";
    }
    return "";
}

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
 
      
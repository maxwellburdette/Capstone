function sendForm()
{
    var from = document.getElementById('userEmail').value;
    var message = document.getElementById('userMessage').value;
    var to = "admin";
    sendMessage(to, from, message);
}

function sendMessage(to, from, contents)
{
    const url = "https://kam.azurewebsites.net/api/messages";
    var message = 
    {
        toMessage: to,
        fromMessage: from,
        contents: contents
    };
    $.post(url, message, function(message, status){
        console.log(`${data} and status is ${status}`);
      });
}

function autoFill()
{
    if(localStorage.getItem('userLogin') != null)
    {
        document.getElementById('userEmail').value = localStorage.getItem('userLogin');
    }
}
autoFill();
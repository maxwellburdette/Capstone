/****************************************************************
 * 
 *   Functions to get information from the tables
 * 
****************************************************************/
function getRoute(param) {
    var route = "https://kam.azurewebsites.net/api" + param;
  
    return route;
  }
  
  // get a json file based on the url
  function getJSON(route) {
    $.ajax({
      url: route,
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

/****************************************************************
 * 
 *   Functions to get room data and reservation data
 * 
****************************************************************/
// get the parameter's value from the URL
function getParam(string) {
    const query = window.location.search;
    const regex = new RegExp(string + '[^&]+');
    let str = query.match(regex).toString().split("=")[1];
    return str;
}

function getRoomType(roomTypeId) {
    const route = getRoute("/roomtypes/booktype/" + roomTypeId);
    const json = getJSON(route);
    return json[0];
}

function getEmail() {
    return localStorage.getItem('userLogin');
}

/****************************************************************
 * 
 *   Functions to display the selected room's data
 * 
****************************************************************/
// show the information selected from the reservations page
function showSelectedRoom() {
    const roomTypeId = parseInt(getParam("roomTypeId"));
    const roomType = getRoomType(roomTypeId);
    const checkInDate = dateParamToDateObj(getParam("checkIn"));
    const checkOutDate = dateParamToDateObj(getParam("checkOut"));
    const checkIn = formatDate(checkInDate);
    const checkOut = formatDate(checkOutDate);
    const numNights = (checkOutDate - checkInDate)/1000/60/60/24;
    document.getElementById("resDates").innerText += checkIn + " - " + checkOut;
    document.getElementById("resRoomType").innerText += roomType.roomTypeName;
    document.getElementById("resCost").innerText +=  "$" + (numNights * roomType.totalCost);
    document.getElementById("email").value = getEmail();
}

function formatDate(date) {
    const dateArr = date.toDateString().split(" ");
    // if the date is between 1 and 9, remove the leading 0
    if (dateArr[2][0] == 0) {
        dateArr[2] = dateArr[2][1];
    }
    const dateStr = dateArr[0] + ", " + dateArr[1] + " " + dateArr[2]; 
    return dateStr;
}

// convert the string parameter to a Date object
function dateParamToDateObj(date) {
    let year = date.substring(0, 4);
    let month = date.substring(5, 6);
    let day = date.substring(6);
    return new Date(year, month - 1, day);
}

/****************************************************************
 * 
 *   Functions to deal with the cart/card info/checkout
 * 
****************************************************************/
// for now, we're just making sure the card number has 13-16 digits
function testCreditCard() {
    const cardNumber = document.getElementById("cardNumber").value;
    if (cardNumber.length < 13 || cardNumber.length > 16) {
        alert("Please enter a valid card number.");
        return false;
    }
    else {
        return true;
    }
}

// make sure the expiration date is valid
function testExpDate() {
    const input = document.getElementById("cardExpDate").value.split("/");
    const expDate = new Date("20" + input[1], input[0] - 1);
    if (!isDate(input)) {
        alert("Please enter a valid expiration date in format MM/YY");
        document.getElementById("cardExpDate").value = "";
        return false;
    } else if(expDate < new Date()) {
        alert("Past expiration. Please enter correct date.");
        document.getElementById("cardExpDate").value = "";
        return false;
    } else {
        return true;
    }
}

// is the date a date?
function isDate(date) {
    if (isNaN(date[0]) || isNaN(date[1]) || date[0] < 1 || date[0] > 12 || date[1] < 0 || date[1] > 99) {
        return false;
    } else {
        return true;
    }
}

/****************************************************************
 * 
 *   Functions to actually book the room
 * 
****************************************************************/
// add the reservation if the information is complete and valid on the form
function validateForm() {
    if (testCreditCard() && testExpDate()) {
        addReservation();
        return true;
    } else {
        return false;
    }
}

// add a reservation to the table
function addReservation() {
    const url = getRoute("/reservations");
    const data = {
        email: document.getElementById("email").value,
        // convert the dates into SQL date format
        checkIn: dateParamToDateObj(getParam("checkIn")).toISOString().split("T")[0],
        checkOut: dateParamToDateObj(getParam("checkOut")).toISOString().split("T")[0],
        roomTypeId: parseInt(getParam("roomTypeId")),
        totalCost: parseInt(document.getElementById("resCost").innerText.split("$")[1])
    }

    $.post(url, data, function(data, status){
        console.log(`${data} and status is ${status}`);
    });
}

/****************************************************************
 * 
 *   Functions to make sure the user is logged in
 * 
****************************************************************/
function displaySignUp() {

}
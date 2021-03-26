/****************************************************************
 * 
 *   Functions to get information from the tables
 * 
****************************************************************/
function getRoute(param) {
  var route = "http://localhost:8090/api" + param;

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
 *   Functions to show the available rooms to the user
 * 
****************************************************************/

/*
TO-DO: this function needs to be redone since we're only showing the
       types of the rooms instead of the actual rooms

       Should probably add some functionality to list how many are remaining
*/

// display the rooms on the reservations page
function displayRooms() {
  event.preventDefault();

  /*
  * TO-DO: this page crashes when one or more fields are blank - fix it
  */
  // get the number of people from the user's entries
  var numAdults = document.getElementById("resNumAdults").value;
  var numKids = document.getElementById("resNumChildren").value;
  var numberGuests = parseInt(numAdults) + parseInt(numKids);

  // get the room types that can hold that many people
  var route = getRoute("/roomtypes/numberGuests/" + numberGuests);
  var roomTypes = getJSON(route);

  // make the area where the rooms will populate visible
  const listContainer = document.getElementById("roomsContainer");
  // make the area where the rooms will populate visible
  listContainer.style['display'] = 'block';
  // clear what was generated so that the page "refreshes" each time the user clicks submit
  listContainer.innerHTML = "";
  const list = document.createElement("ul");

  for (let i = 0; i < roomTypes.length; i++) {
    // get the number of nights
    /*
    TO-DO: calculate the number of nights based on the dates
    */
   
    // TEMP VARIABLES
    var numberNights = 2;

    let amenities = getJSON(getRoute("/amenities/roomTierId/" + roomTypes[i].roomTierId))
    let images = getJSON(getRoute("/images/roomTypeId/" + roomTypes[i].roomTypeId));

    /*
    TO-DO: make the images window have arrows on either side to click between the images
    */

    let room = document.createElement("li");
    room.className="roomLi";
    // image section HTML
    room.innerHTML += (
      "<div class='col1'>" +
        "<img src='" + images[0].imageName + "' id='roomPreviewImage'>" +
      "</div>");

    // generate html for the featured amenities
    var amenityHTML = "";
    for (let j = 0; j < amenities.length; j++) {
      if (amenities.isFeatured) {
        amenityHTML += "<li>" + amenities.amenityName + "</li>"
        console.log(j);
      }
    };

    // amenities section HTML
    room.innerHTML += (
      "<div class='col2'>" +
        "<span class='title'>" + roomTypes[i].roomTypeName + "</span><br>" +
        "<span class='roomOccupancy'> Max Occupancy: " + roomTypes[i].maxOccupancy + "</span><br>" +
        "<ul class='amenities'>" +
          amenityHTML +
        "</ul>" +
      "</div>"
    );
    
    // pricing section HTML
    room.innerHTML += (
      "<div class='col3'>" +
        "<span class='numNights'>Nights: " + numberNights + " Guests: " + numberGuests + "</span><br>" +
        "<span class='pricePerNight'>Per Night: $" + roomTypes[i].totalCost + "</span><br>" +
        "<span class='totalCost'>Total: $" + (roomTypes[i].totalCost * numberNights) + "</span><br>" +
        "<button class='btnViewRoom' onClick='viewRoom(" + roomTypes[i].roomTypeId + ")'>View Room</button><br>" +
        "<button class='btnBookRoom' onClick='bookRoom(" + roomTypes[i].roomTypeId + ")'>Book Room</button>" +
      "</div>");

    list.appendChild(room);
  }
  listContainer.appendChild(list);
}

// create the popup window for that room's information
function viewRoom(roomTypeId) {
  // show the popup
  document.getElementById("roomPopup").style['display'] = 'block';
  console.log("roomTypeId: " + roomTypeId + " selected");
}

function closePopup() {
  document.getElementById("roomPopup").style['display'] = 'none';
}



/****************************************************************
 * 
 *   Functions to Make, Update, and Cancel a Reservation
 * 
****************************************************************/
// add a reservation to the table
function addReservation() {
  // some code
}

/*
TO-DO: create manageReservations.html page; the below functions aren't needed without that page
*/

// update a reservation based on the information provided on the form at manageReservations.html
function updateReservation() {
  // some code
}

// delete a reservation
function deleteReservation() {
  // some code
}



/****************************************************************
 * 
 *               Admin Reservation Functions
 * 
****************************************************************/

/*
TO-DO: create a function to show all reservations based on date, user, and/or room
*/
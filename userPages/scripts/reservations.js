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

    let amenities = getJSON(getRoute("/amenities/roomTierId/" + roomTypes[i].roomTierId));
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
     if (amenities[j].isFeatured) {
       amenityHTML += "<li>" + amenities[j].amenityName + "</li>"
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
       "<button class='btnViewRoom' onclick='viewRoom(" + roomTypes[i].roomTypeId + ")'>View Room</button><br>" +
       "<button class='btnBookRoom' onclick='bookRoom(" + roomTypes[i].roomTypeId + ")'>Book Room</button>" +
     "</div>");

    list.appendChild(room);
  
    createPopup(roomTypes[i], amenities, images);  
  }
  listContainer.appendChild(list);
}

function createPopup(roomType, amenities, images) {

  // create the window that will hold the room type information
  const container = document.getElementById("roomPopupContainer");
  const popup = document.createElement('div');
  popup.className = "roomPopup";
  popup.id = "roomPopup" + roomType.roomTypeId; // <div id = "roomPopup1">
  
  // create the main blocks of the popup
  const btnClose = document.createElement('button');
  btnClose.innerText = 'Close';
  const roomTypeName = document.createElement('h2');
  const imgContainer = document.createElement('div');
  imgContainer.className = "popupImagesContainer";
  imgContainer.innerHTML = "<h2>Images: </h2>";
  const amenitiesContainer = document.createElement('div');
  amenitiesContainer.className = "popupInfoContainer";
  amenitiesContainer.innerHTML = "<h2>Amenities: </h2>";

  
  // set all of the blocks to contain information pertaining to that room type
  btnClose.onclick = function() {
    closePopup(roomType.roomTypeId);
  }

  roomTypeName.innerText = roomType.roomTypeName;
  // display all images
  for (let i = 0; i < images.length; i++) {
    let image = document.createElement('img');
    image.src = images[i].imageName;
    image.alt = images[i].imageAlt;
    imgContainer.appendChild(image);
  }

  for (let j = 0; j < amenities.length; j++) {
    let amenity = document.createElement('li');
    amenity.innerText = amenities[j].amenityName;
    amenitiesContainer.appendChild(amenity);
  }
  popup.appendChild(btnClose);
  popup.appendChild(roomTypeName);
  popup.appendChild(imgContainer);
  popup.appendChild(amenitiesContainer);
  container.appendChild(popup);
}

// create the popup window for that room's information
function viewRoom(roomTypeId) {
  // show the popup
  document.getElementById("roomPopup" + roomTypeId).style['display'] = 'block';
  // hide the room selection menu
  document.getElementById("roomsContainer").style['display'] = 'none';
}

// close the popup window
function closePopup(roomTypeId) {
  // hide the popup
  document.getElementById("roomPopup" + roomTypeId).style['display'] = 'none';
  // show the room selection menu
  document.getElementById("roomsContainer").style['display'] = 'block';
}

// navigate to the book room page
function bookRoom(roomTypeId) {
  window.location.replace("bookReservation.html?roomTypeId=" + roomTypeId);
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
TO-DO: create a spot to manage reservations; the below functions aren't needed without that page
*/

// update a reservation based on the information provided on the form at manageReservations.html
function updateReservation() {
  // some code
}

// delete a reservation
function deleteReservation() {
  // some code
}
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

  var checkIn = new Date(document.getElementById("resCheckIn").value);
  var checkOut = new Date(document.getElementById("resCheckOut").value);
  // get the number of nights
  let numberNights = ((checkOut - checkIn)/1000/60/60/24);

  // get only the dates in string form
  let checkInArr = checkIn.toISOString().split("T")[0].split("-");
  let checkOutArr = checkOut.toISOString().split("T")[0].split("-");
  let checkInString = checkInArr[0] + checkInArr[1] + checkInArr[2];
  let checkOutString = checkOutArr[0] + checkOutArr[1] + checkOutArr[2];

  // get the number of people from the user's entries
  var numAdults = document.getElementById("resNumAdults").value;
  var numKids = document.getElementById("resNumChildren").value;
  var numberGuests = parseInt(numAdults) + parseInt(numKids);

  // get the room types that can hold that many people
  let roomTypes = getAvailableRoomTypes(numberGuests, checkIn, numberNights);

  // make the area where the rooms will populate visible
  const listContainer = document.getElementById("roomsContainer");
  // make the area where the rooms will populate visible
  listContainer.style['display'] = 'block';
  // clear what was generated so that the page "refreshes" each time the user clicks submit
  listContainer.innerHTML = "";

  // if there are no available rooms for that number of people and that date range...
  if (roomTypes.length == 0) {
    listContainer.innerText = "We're sorry!\nThere are no available rooms that can sleep " + numberGuests + " of people for the selected dates.";
  }
 
  const list = document.createElement("ul");

  for (let i = 0; i < roomTypes.length; i++) {

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
       "<button class='btnBookRoom' onclick='bookRoom(" + roomTypes[i].roomTypeId + ", " + checkInString + ", " + checkOutString + ")'>Book Room</button>" +
     "</div>");

    list.appendChild(room);
  
    createPopup(roomTypes[i], amenities, images);  
  }
  listContainer.appendChild(list);
}

function createPopup(roomType, amenities, images) {
// create the window that will hold the room type information
const container = document.getElementById("roomPopupContainer");
  const popup = document.createElement('section');
  popup.className = "roomPopup";
  popup.id = "roomPopup" + roomType.roomTypeId; // <section id = "roomPopup1">

    // create the main blocks of the popup
    const btnClose = document.createElement('button');
    btnClose.innerText = 'Close';
    btnClose.className = "btnClose";
    const roomTypeName = document.createElement('h1');
    const popupInfo = document.createElement('div');
    popupInfo.className = "popupInfo";

      // create the 2 columns within the popup
      const imgContainer = document.createElement('div');
      imgContainer.className = "popupImagesContainer";
      imgContainer.innerHTML = "<h2>Images: </h2>";
      const amenitiesContainer = document.createElement('div');
      amenitiesContainer.className = "popupInfoContainer";
      amenitiesContainer.innerHTML = "<h2>Amenities: </h2>";
    
    // end popupInfo div
  // end roomPopup section
  
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

  // display all amenities
  for (let j = 0; j < amenities.length; j++) {
    let amenity = document.createElement('li');
    amenity.innerText = amenities[j].amenityName;
    amenitiesContainer.appendChild(amenity);
  }
  
  // add all of these elements to the page
  popup.appendChild(btnClose);
  popup.appendChild(roomTypeName);
  popup.appendChild(popupInfo);
  popupInfo.appendChild(imgContainer);
  popupInfo.appendChild(amenitiesContainer);
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

function getAvailableRoomTypes(numberGuests, checkIn, numNights) {
  // calculate the number of available room types
  const allRooms = getJSON(getRoute("/rooms"));
  let availableTypes = getTypeCount(allRooms);
  const reservedTypes = getReservedTypes(checkIn, numNights);
  for (let i = 0; i < availableTypes.length; i++) {
    availableTypes[i] -= reservedTypes[i];
  }
  
  // tell the site which rooms to display of the ones available based on the number of guests
  const allRoomTypes = getJSON(getRoute("/roomtypes/numberGuests/" + numberGuests));
  for (j = 0; j < allRoomTypes.length; j++) {
    let roomTypeId = allRoomTypes[j].roomTypeId;
    // if this room type has 0 available, remove it from the array
    if (availableTypes[roomTypeId - 1] == 0) {
      allRoomTypes.splice(j, 1);
    }
  }
  return allRoomTypes;
}

function getReservedTypes(checkIn, numNights) {
    // this will store the max number of reserved rooms per room type over this date range
  // which will determine which rooms are not available for the dates the customer selected
  let maxReserved = [0, 0, 0, 0, 0, 0];
  let route, reservations, reserved;
  let date = new Date(checkIn);
  // get the room types of all of the reservations for this date range
  for (let i = 0; i < numNights; i++) {
    date.setDate(date.getDate() + 1);
    route = getRoute("/reservations/" + date.toISOString().split('T')[0]);
    reservations = getJSON(route)[0];
    reserved = getTypeCount(reservations);
    // adjust the max number of reservations per room type if needed
    for (let j = 0; j < reserved.length; j++) {
      maxReserved[j] = Math.max(maxReserved[j], reserved[j]);
    }
  }
  return maxReserved;
}

function getTypeCount(rooms) {
  let typeCount = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < rooms.length; i++) {
    let roomTypeId = rooms[i].roomTypeId;
    typeCount[roomTypeId - 1]++;
  }
  return typeCount;
}


/****************************************************************
 * 
 *   Date Picker Functions
 * 
****************************************************************/
function getTomorrow(today) {
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  document.getElementById("resCheckIn").value = formatFullDate(today);
  document.getElementById("resCheckOut").value = formatFullDate(tomorrow);
}

// convert the full date to a locale date string and format it with leading 0s where necessary
function formatFullDate(date) {
  let str = date.toLocaleDateString().split('/');
  return formatDate(str[0]) + "/" + formatDate(str[1]) + "/" + str[2];
}

// format with leading zeros where necessary
function formatDate(date) {
  if (date.length < 2) {
    return "0" + date;
  } else {
    return date;
  }
}

// use Zebra_Datepicker for a cross-browser-friendly date picker
$(document).ready(function() {
  const today = new Date();
  getTomorrow(today);
  // check in date defaults to today
  $('#resCheckIn').Zebra_DatePicker({
    direction: true,
    start_date: today,
    pair: $('#resCheckOut'),
    format: 'm/d/Y',
    default_position: 'below',
    offset: [20, 0]
  });
  // check out date allows only dates after today
  $('#resCheckOut').Zebra_DatePicker({
    direction: 1,
    format: 'm/d/Y',
    default_position: 'below',
    offset: [20, 0]
  });
});


/****************************************************************
 * 
 *      Sign In/Out Functions
 *          & Navigate to bookReservation.html
 * 
****************************************************************/

// navigate to the book room page
function bookRoom(roomTypeId, checkIn, checkOut) {
  // if the user isn't signed in, make them do so (or create an account)
  if(localStorage.getItem('userLogin') == null) {
    document.getElementById("sectLogin").style['display'] = "block";
    showSignIn();
  } else {
    // pull this out of the else later, but i need it to not run automatically for testing
    window.location.assign("bookReservation.html?roomTypeId=" + roomTypeId + "&checkIn=" + checkIn + "&checkOut=" + checkOut);
  }
}

function closeLogin() {
  document.getElementById("sectLogin").style['display'] = "none";
  showSignIn();
}

function showSignIn() {
  document.getElementById("signIn").style['display'] = "block";
  document.getElementById("signUp").style['display'] = "none";
}

function showSignUp() {
  document.getElementById("signIn").style['display'] = "none";
  document.getElementById("signUp").style['display'] = "block";
}
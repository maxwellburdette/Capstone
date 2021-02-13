/****************************************************************
 * 
 *   Functions to Add, Update, and Delete Rooms from the table
 * 
****************************************************************/
// add a room to the table based on the information entered on the editRoom page
function addRoom() {

    /*
    TO-DO: make sure each question is answered so that there are no nulls
    */
    const url = "http://localhost:8090/api/rooms";
    var roomNumber = parseInt(document.getElementById("roomNumber").value);
    var bedType = parseInt(document.querySelector('input[name="bedType"]:checked').value);
    var bedCount = parseInt(document.querySelector('input[name="bedCount"]:checked').value);
    var cost = parseInt(document.getElementById("cost").value);
    /*
    TO-DO: two people per bed for now -- can adjust this to include children
    */
    var maxOccupancy = bedCount * 2;
    var viewRoom = document.getElementById('viewRoom').value;

    /*
    TO-DO: we might want to add functionality to make sure that we can't have two rooms in
          the table with the same room number
    */

    // save the parameters in an object
    var data = {
      roomNumber: roomNumber,
      bedType: bedType,
      bedCount: bedCount,
      cost: cost,
      maxOccupancy: maxOccupancy,
      viewRoom: viewRoom
    }

    /*
    TO-DO: this currently is only sending the first character of the image string, fix it
    */
    // send the object to the database to add the room with this information
    $.post(url, data, function(data, status){
      console.log(`${data} and status is ${status}`);
    });
}

// update a specific room's information with the information entered on the editRoom page
function updateRoom() {
  const url = "http://localhost:8090/api/rooms/" + document.getElementById("roomNumber").value;

  /*
  TO-DO: check if the room number exists. if it does not, have a popup asking the user if they want to add it
  */

  // when we get editRoom working with the dynamic input, it'll always have the fields filled in,
  // so we should never have to fall onto this catch.
  try {
    var bedType = parseInt(document.querySelector('input[name="bedType"]:checked').value);
    var bedCount = parseInt(document.querySelector('input[name="bedCount"]:checked').value);
    var cost = parseInt(document.getElementById("cost").value);
    /*
    TO-DO: two people per bed for now -- can adjust this to include children
    */
    var maxOccupancy = bedCount * 2;
    var viewRoom = document.getElementById('viewRoom').value;
  } catch (error) {
    console.log(error);
    console.log("missing field(s)");
  }

  // put all of this info into a data object to be sent to the database
  var roomData = {
    bedType: bedType,
    bedCount: bedCount,
    cost: cost,
    maxOccupancy: maxOccupancy,
    viewRoom: viewRoom
  }

  // send the room data info to the database to update it
  $.ajax({
    url: url,
    type: 'put',
    data: roomData,
    async: false,
    success: function(data) {
        result = data;
    } 
  });
}

// delete a room from the table based on the roomNumber
function deleteRoom() {
  const url = "http://localhost:8090/api/rooms/" + document.getElementById("roomNumber").value;

  /*
  TO-DO: check if the room number exists and only delete it if it does
  */

  $.ajax({
    url: url,
    type: 'delete',
    dataType: 'html',
    async: false,
    success: function(data) {
        result = data;
    } 
  });

  /*
  TO-DO: make some type of message pop up showing that the room has been deleted
  */
}


/****************************************************************
 * 
 *   Functions to show the available rooms to the user
 * 
****************************************************************/
// get a json file based on what the search parameters are
function getJSON(param)
{
    Url = "http://localhost:8090/api/rooms/search/" + param;
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

// get the json file for the rooms that apply to the user's query
function getRooms() {
  event.preventDefault();
  // var checkIn = document.getElementById(resCheckIn).value;
  // var checkOut = document.getElementById(resCheckOut).value;

  /*
  TO-DO: separate adults and children and build out this functionality
  */
 
  var numberPeople = parseInt(document.getElementById("resNumAdults").value) + parseInt(document.getElementById("resNumChildren").value);

  var json = getJSON(numberPeople);
  var rooms = [];
  var roomIndex = 0;

  try {
    for (i = 0; i < json.length; i++) {
      rooms[roomIndex++] = json[i];
    }
  } catch (error) {
    console.log(error);
  }

  return rooms;
}

/*
TO-DO:
  right now, this page only works on first load. If you try to do it again with a different number of people,
  it doesn't reload itself.
  note that i had to prevent reloading in the getRooms function. could work around this or just make it more dynamic.
*/

// display the rooms on the reservations page
function displayRooms(rooms) {
  const listContainer = document.getElementById("roomsContainer");
  const list = document.createElement("ul");
  var numberPeople = parseInt(document.getElementById("resNumAdults").value) + parseInt(document.getElementById("resNumChildren").value);
  for (i = 0; i < rooms.length; i++) {
    // convert the int bed type to a string
    if (rooms[i].bedType == 0) {
      var bedType = "Queen";
    } else {
      var bedType = "King";
    }
    // get the number of nights
    /*
    TO-DO: calculate the number of nights based on the dates
    */
    var numberNights = 2;

    var room = document.createElement("li");
    room.className="roomLi";
    // image section HTML
    room.innerHTML += (
      "<div class='col1'>" +
        "<img src='../RoomPic/" + rooms[i].viewRoom + "'>" +
      "</div>");
    
    /*
    TO-DO: add some type of room hierarchy: standard, deluxe, suite, or something like that with amenity upgrades to each
    */

    // amenities section HTML
    room.innerHTML += (
      "<div class='col2'>" +
        "<span class='title'>" + rooms[i].bedCount + " " + bedType + 
          ((rooms[i].bedCount > 1) ? " beds" : " bed") +
        "</span><br>" +
        "<span class='roomOccupancy'> Max Occupancy: " + rooms[i].maxOccupancy + ".</span><br>" +
        "<ul class='amenities'>" +
          "<li>Mini Fridge</li>" +
          "<li>Microwave</li>" +
          "<li>Pet-Friendly</li>" +
        "</ul>" +
      "</div>");
    
    // pricing section HTML
    room.innerHTML += (
      "<div class='col3'>" +
        "<span class='numNights'>Nights: " + numberNights + ". Guests: " + numberPeople + ".</span><br>" +
        "<span class='pricePerNight'>Per Night: $" + rooms[i].cost + "</span><br />" +
        "<span class='totalCost'>Total: $" + (rooms[i].cost * numberNights) + "</span>" +
      "</div>");

      room.innerHTML += "<hr>";
    list.appendChild(room);
  }
  listContainer.appendChild(list);
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


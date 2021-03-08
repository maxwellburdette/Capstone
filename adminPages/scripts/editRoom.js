/*
TO-DO: consider storing variables that are used in multiple functions in a namespace that is 
       saved each time the user clicks one of the submit buttons
*/

/****************************************************************
 * 
 *   Functions to get information from the database tables
 * 
****************************************************************/
// get the route
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
 *               Design/Styling of Form Selection
 * 
****************************************************************/
function selectForm(formType) {
  // first, hide all of the forms and reset the button colors
  resetForms();
  var form = document.getElementById(formType);
  var btn = document.getElementById(formType + "Btn");
  // then show the form
  form.style.display = 'block';
  // then change the button color
  btnSelect(btn);
}

function resetForms() {
  // hide all of the forms
  document.getElementById("roomForm").style['display'] = 'none';
  document.getElementById("typeForm").style['display'] = 'none';
  document.getElementById("tierForm").style['display'] = 'none';
  // color all of the buttons
  resetBtn(document.getElementById("roomFormBtn"));
  resetBtn(document.getElementById("typeFormBtn"));
  resetBtn(document.getElementById("tierFormBtn"));
}

function resetBtn(btn) {
  btn.style['background-color'] = '#EBE8EA';
  btn.style['color'] = '#5d4954';
}

function btnSelect(btn) {
  btn.style['background-color'] = '#5d4954';
  btn.style['color'] = '#EBE8EA';
}


/****************************************************************
 * 
 *            Design/Styling of Edit Room Form
 * 
****************************************************************/
function generateRoomNumberSelector() {
  const route = getRoute("/rooms");
  var rooms = getJSON(route);
  
  // clear what was generated so that the page "refreshes" each time the user clicks submit
  const selectRoom = document.getElementById("roomNumberSelector");
  selectRoom.innerHTML = "";
  var room = new Option("Select a Room", null, true);
  selectRoom.appendChild(room);

  // create an option for each room number
  for (let i = 0; i < rooms.length; i++) {
    room = new Option(rooms[i].roomNumber, rooms[i].roomNumber);
    selectRoom.appendChild(room);
  }

  // add an option to add a new room
  var newRoom = new Option("Add a New Room", "new");
  selectRoom.appendChild(newRoom);
}

// populate the radio fields with the correct room info
function generateRoomInfo() {
  const selectRoom = document.getElementById("roomNumberSelector");
  var selected = selectRoom.value;

  // testing
  console.log(selected + " was clicked");

  // if we have selected a room to edit
  if (typeof selected === "number") {
    const roomRoute = getRoute("/rooms/alldata/" + selected.value);
    var room = getJSON(route);

    console.log(room.roomNumber);
  }
}


/****************************************************************
 * 
 *                  Functions to Edit Rooms
 * 
****************************************************************/
// add a room to the table based on the information entered on the editRoom page
function addRoom() {

    /*
    TO-DO: make sure each question is answered so that there are no nulls
    */
    const url = getRoute("/rooms");
    var roomNumber = parseInt(document.getElementById("roomNumber").value);
    var roomSizeId = parseInt(document.querySelector('input[name="roomSizeId"]:checked').value);
    var roomTierId = parseInt(document.querySelector('input[name="roomTierId"]:checked').value);

    // get the room that corresponds to the parameters
    var searchBy = "/roomtypes/size/" + roomSizeId + "/tier/" + roomTierId;
    var route = getRoute(searchBy);
    var json = getJSON(route);
    var roomTypeId = parseInt(json[0].roomTypeId);

    /*
    TO-DO: we might want to add functionality to make sure that we can't have two rooms in
          the table with the same room number
    */

    // save the parameters in an object
    var data = {
      roomNumber: roomNumber,
      roomTypeId: roomTypeId
    }

    // send the object to the database to add the room with this information
    $.post(url, data, function(data, status){
      console.log(`${data} and status is ${status}`);
    });
}

// update a specific room's information with the information entered on the editRoom page
function updateRoom() {
  var roomNumber = parseInt(document.getElementById("roomNumber").value);

  const url = getRoute("/rooms" + roomNumber);

  /*
  TO-DO: check if the room number exists. if it does not, have a popup asking the user if they want to add it
  */
  try {
    var roomSizeId = parseInt(document.querySelector('input[name="roomSizeId"]:checked').value);
    var roomTierId = parseInt(document.querySelector('input[name="roomTierId"]:checked').value);
  } catch (error) {
    console.log(error);
    console.log("missing field(s)");
  }

 // get the room that corresponds to the parameters
 var searchBy = "/roomtypes/size/" + roomSizeId + "/tier/" + roomTierId;
 var route = getRoute(searchBy);
 var json = getJSON(route);
 var roomTypeId = parseInt(json[0].roomTypeId);

 /*
 TO-DO: we might want to add functionality to make sure that we can't have two rooms in
       the table with the same room number
 */

    // save the parameters in an object
    var roomData = {
      roomNumber: roomNumber,
      roomTypeId: roomTypeId
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
  const url = getRoute("/rooms/" + document.getElementById("roomNumber").value);

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
 *   Functions to Add, Update, and Delete Images from the table
 * 
****************************************************************/
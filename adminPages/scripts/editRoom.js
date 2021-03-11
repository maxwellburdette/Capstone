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
  btn.style['background-color'] = 'var(--lightColor)';
  btn.style['color'] = 'var(--darkColor)';
}

function btnSelect(btn) {
  btn.style['background-color'] = 'var(--darkColor)';
  btn.style['color'] = 'var(--lightColor)';
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
  // html element variables
  var btnAddRoom = document.getElementById("addRoomBtn");
  var btnUpdateRoom = document.getElementById("updateRoomBtn");
  var btnDeleteRoom = document.getElementById("deleteRoomBtn");
  var txtRoomNumber = document.getElementById("roomNumberText");

  const selectRoom = document.getElementById("roomNumberSelector");
  var selected = selectRoom.value;

  if (selected === "new") {
    // unhide the add button so we can add the room
    // hide the update and delete buttons so we can't update or delete a room that hasn't been added
    btnAddRoom.hidden = false;
    btnUpdateRoom.hidden = true;
    btnDeleteRoom.hidden = true;

    txtRoomNumber.style.display = "block";
  }
  // if we have selected a room to edit
  else if (selected != "") {
    // hide the add button so we can't add a room that already exists
    // unhide the update and delete buttons, if they were hidden
    btnAddRoom.hidden = true;
    btnDeleteRoom.hidden = false;
    btnUpdateRoom.hidden = false;

    // hide the new room number input field
    txtRoomNumber.style.display = "none";

    // get all of the information that pertains to that room and its room type
    const roomRoute = getRoute("/rooms/" + selected);
    var room = getJSON(roomRoute)[0];
    const roomTypeRoute = getRoute("/roomtypes/" + room.roomTypeId);
    var roomType = getJSON(roomTypeRoute)[0];

    // set the correct radio buttons to be selected based on the room number
    document.getElementById("selectSize" + roomType.roomSizeId).checked = true;;
    document.getElementById("selectTier" + roomType.roomTierId).checked = true;

    // populate the type page with this information
    getRoomTypeInfo(roomType);
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
    var roomNumber = parseInt(document.getElementById("roomNumberText").value);
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
  var roomNumber = parseInt(document.getElementById("roomNumberSelector").value);

  const url = getRoute("/rooms/" + roomNumber);

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
  const url = getRoute("/rooms/" + document.getElementById("roomNumberSelector").value);

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
 *            Design/Styling of Edit Type Form
 * 
****************************************************************/
// populate the text boxes with the information gathered from the radios
  /*
  TO-DO: only make the radio buttons appear at first, and have a submit button to get the type info. 
        then allow the user to modidy the max occupancy, cost, and image
        For cost, should probably display the suggested cost based on the size and tier amounts
        For max occ, should probably display the suggested max occ based on the bed numbers/sizes/etc
  */
function populateTypeForm(type) {
  // populate the fields in the table with the room type information
  document.getElementById("typeSize" + type.roomSizeId).checked = true;
  document.getElementById("typeTier" + type.roomTierId).checked = true;
  document.getElementById("typeName").value = type.roomTypeName;
  document.getElementById("typeMaxOccupancy").value = parseInt(type.maxOccupancy);
  document.getElementById("typeCost").value = parseInt(type.totalCost);
}


/****************************************************************
 * 
 *   Functions to Get Info from Type Form & Update Types
 * 
****************************************************************/
// get the room type info depending on whether the room form is filled out or not
function getRoomTypeInfo(roomType) {
  var type;
  // get the radios from the type form
  var typeSizeRadio = document.querySelector('input[name="typeSizeId"]:checked');
  var typeTierRadio = document.querySelector('input[name="typeTierId"]:checked');

  // if the rooms form is filled out, get the type associated with that at first
  // but otherwise just allow the user to select whatever they want
  if (typeSizeRadio != null && typeTierRadio != null) {
    type = getAllRoomTypeInfo(typeSizeRadio.value, typeTierRadio.value)[0];
    populateTypeForm(type);
  } else if (roomType != null && roomType != undefined) {
    type = getAllRoomTypeInfo(roomType.roomSizeId, roomType.roomTierId)[0];
    populateTypeForm(type);
  }

  // populate the tier page with this information
  getRoomTierInfo(type);
}

// get all room type info
function getAllRoomTypeInfo(size, tier) {
    // get the room type that corresponds to the buttons selected
    var searchBy = "/roomtypes/size/" + size + "/tier/" + tier;
    var route = getRoute(searchBy);
    var json = getJSON(route)[0];
    var typeId = parseInt(json.roomTypeId);
    const typeRoute = getRoute("/roomtypes/alldata/" + typeId);
    // variable that stores all data associated with the room type
    var type = getJSON(typeRoute);

    return type;
}

function updateRoomType(roomTypeId) {
  var roomTypeName = document.getElementById("typeName").value;
  var maxOccupancy = parseInt(document.getElementById("typeMaxOccupancy").value);
  var totalCost = parseInt(document.getElementById("typeCost").value);

  // save the parameters in an object
  var typeData = {
    roomTypeId: roomTypeId,
    roomTypeName: roomTypeName,
    maxOccupancy: maxOccupancy,
    totalCost: totalCost
  }

  // send the room data info to the database to update it
  $.ajax({
    url: url,
    type: 'put',
    data: typeData,
    async: false,
    success: function(data) {
        result = data;
    } 
  });
}


/****************************************************************
 * 
 *            Design/Styling of Edit Tier Form
 * 
****************************************************************/

// populate the text boxes with the information gathered from the radios
function populateTierForm(tier) {
  // populate the fields in the table with the room type information
  document.getElementById("tier" + tier.roomTierId).checked = true;
  document.getElementById("tierCost").value = tier.roomTierPercent;
}


/****************************************************************
 * 
 *   Functions to Get Info from Tier Form & Update Tiers
 * 
****************************************************************/
function getRoomTierInfo(roomType) {
  // get the radios from the type form
  var tierRadio = document.querySelector('input[name="tierId"]:checked');

  // if the rooms form is filled out, get the tier associated with that at first
  // but otherwise just allow the user to select whatever they want
  if (tierRadio != null) {
    var tier = getAllRoomTierInfo(tierRadio.value);
    populateTierForm(tier);
  } else if (roomType != null && roomType != undefined) {
    populateTierForm(roomType);
  }
}

// edit below to be for tiers -- also, we want tier form to populate from type form, too

// get all room type info
function getAllRoomTierInfo(tierId) {
  var route = getRoute("/roomtiers/" + tierId);
  var tier = getJSON(route)[0];
  return tier;
}
 
/****************************************************************
 * 
 *   Functions to Add, Update, and Delete Images from the table
 * 
****************************************************************/
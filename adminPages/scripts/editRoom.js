/*
TO-DO: consider storing variables that are used in multiple functions in a namespace that is 
       saved each time the user clicks one of the submit buttons
*/

/****************************************************************
 * 
 *   Functions to manipulate the database/communicate with the API
 * 
****************************************************************/
// get the route
function getRoute(param) {
  return "https://kam.azurewebsites.net/api" + param;
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
  return JSON.parse(result);
}

// send the object to the database to add the item with this information
function addItem(url, data) {
  $.post(url, data, function(data, status){
    console.log(`${data} and status is ${status}`);
  });
}

// update the item in the database with the data provided
function updateItem(url, data) {
  $.ajax({
    url: url,
    type: 'put',
    data: data,
    async: false,
    success: function(data) {
        result = data;
    } 
  });
}

// delete this item from the database
function deleteItem(url) {
  $.ajax({
    url: url,
    type: 'delete',
    dataType: 'html',
    async: false,
    success: function(data) {
        result = data;
    } 
  });
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
    document.getElementById("selectSize" + roomType.roomSizeId).checked = true;
    document.getElementById("selectTier" + roomType.roomTierId).checked = true;
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

    var data = {
      roomNumber: parseInt(document.getElementById("roomNumberText").value),
      roomTypeId: getRoomTypeId('room')
    }

    /*
    TO-DO: we might want to add functionality to make sure that we can't have two rooms in
          the table with the same room number
    */
    
    addItem(url, data);
}

// update a specific room's information with the information entered on the editRoom page
function updateRoom() {
  const url = getRoute("/rooms/" + roomNumber);

  var roomData = {
    roomNumber: parseInt(document.getElementById("roomNumberSelector").value),
    roomTypeId: getRoomTypeId('room')
  }
  updateItem(url, roomData);
}

// delete a room from the table based on the roomNumber
function deleteRoom() {
  const url = getRoute("/rooms/" + document.getElementById("roomNumberSelector").value);
  deleteItem(url)

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
function populateTypeForm(type) {
  // populate the fields in the table with the room type information
  document.getElementById("typeSize" + type.roomSizeId).checked = true;
  document.getElementById("typeTier" + type.roomTierId).checked = true;
  document.getElementById("typeName").value = type.roomTypeName;
  document.getElementById("typeMaxOccupancy").value = parseInt(type.maxOccupancy);
  document.getElementById("typeCost").value = parseInt(type.totalCost);
}

function populateImageFields(img) {
  document.getElementById("typeImageName").value = img.src;
  document.getElementById("typeImageAlt").value = img.alt;
  document.getElementById("typeImageSource").value = img.credit;
  document.getElementById("typeImageId").value = img.imageId;
}

function resetImageFields() {
  document.getElementById("typeImageName").value = "";
  document.getElementById("typeImageAlt").value = "";
  document.getElementById("typeImageSource").value = "";
  document.getElementById("imagesContainer").innerHTML="";
}

/****************************************************************
 * 
 *   Functions to Get Info from Type Form & Update Types
 * 
****************************************************************/
// get the room type id based on the size and tier
function getRoomTypeId(visibleForm) {
  // get the room type id based on the radios on the currently visible form
  let sizeIdRadio = document.querySelector('input[name="' + visibleForm +'SizeId"]:checked');
  let tierIdRadio = document.querySelector('input[name="' + visibleForm + 'TierId"]:checked');

  // if the user has selected a size and a tier, return the corresponding type
  if (sizeIdRadio != undefined && tierIdRadio != undefined) {
    let sizeId = parseInt(sizeIdRadio.value);
    let tierId = parseInt(tierIdRadio.value);
    // get the room that corresponds to the parameters
    let searchBy = "/roomtypes/size/" + sizeId + "/tier/" + tierId;
    let route = getRoute(searchBy);
    let json = getJSON(route);
    let typeId = parseInt(json[0].roomTypeId);

    return typeId;
  }
}

// get all room type info
function getRoomType() {
  const typeId = getRoomTypeId('type');
  if (typeId != null) {
    const route = getRoute("/roomtypes/" + typeId);
    const json = getJSON(route)[0];
    populateTypeForm(json);
    getImages(json.roomTypeId);
  }
}

function updateRoomType() {
  const roomTypeId = parseInt(getRoomTypeId('type'));
  const url = getRoute('/roomtypes/' + roomTypeId);

  const data = {
    roomTypeName: document.getElementById("typeName").value,
    maxOccupancy: parseInt(document.getElementById("typeMaxOccupancy").value),
    totalCost: parseInt(document.getElementById("typeCost").value)
  }

  updateItem(url, data);
}
 
/****************************************************************
 * 
 *   Functions to Add, Update, and Delete Images from the table
 * 
****************************************************************/
// get all images associated with a room type
function getImages(roomTypeId) {
  // if we don't give the function a room type, get it
  if (roomTypeId == null) {
    roomTypeId = getRoomTypeId('type');
  }
  var route = getRoute('/images/roomTypeId/' + roomTypeId);
  var json = getJSON(route);
  var images = document.getElementById("imagesContainer");
  // clear all existing images to "refresh" the page
  resetImageFields();
  document.getElementById("imagesContainerLabel").style.display = "block";
  // create the image object(s) based on the info in the database
  for (let i = 0; i < json.length; i++) {
    // use let for the image so that a new image is created each iteration through the loop
    let image = document.createElement("img");
    image.src = json[i].imageName;
    image.alt = json[i].imageAlt;
    image.credit = json[i].imageSource;
    image.imageId = json[i].imageId;
    // still kind of trying to understand why this works
    // js doesnt have block scope, so i think putting the function inside of a function
    // makes it so that there is a separate function tied to each image's onclick
    // whereas it would be just the last image's onclick that would normally be tied to them all
    image.onclick = function() {
      populateImageFields(image);
    }
    images.appendChild(image);
  }
}

// add an image to the database
function addImage() {
  // don't reload the page
  event.preventDefault();
  // make sure the user has filled in all the fields
  let data;
  try {
    data = {
      imageName: document.getElementById("typeImageName").value,
      imageAlt: document.getElementById("typeImageAlt").value,
      imageSource: document.getElementById("typeImageSource").value,
      roomTypeId: getRoomTypeId('type')
    }
  } catch (error) {
    console.log(error);
    return;
  }

  const url = getRoute('/images');
  addItem(url, data);
  // clear all existing images to "refresh" the page
  resetImageFields();
}

function updateImage() {
  // don't reload the page
  event.preventDefault();
  // make sure the user has filled in all the fields
  let data;
  try {
    data = {
      imageName: document.getElementById("typeImageName").value,
      imageAlt: document.getElementById("typeImageAlt").value,
      imageSource: document.getElementById("typeImageSource").value
    }
  } catch (error) {
    console.log(error);
    return;
  }

  const url = getRoute('/images/' + document.getElementById("typeImageId").value);
  updateItem(url, data);
  getImages();
}

function deleteImage() {
  // don't reload the page
  event.preventDefault();
  const url = getRoute('/images/' + document.getElementById("typeImageId").value);
  deleteItem(url);
}


/****************************************************************
 * 
 *            Design/Styling of Edit Tier Form
 * 
****************************************************************/

function generateAmenityCheckboxes() {
  const route = getRoute("/amenities");
  var json = getJSON(route);
  const amenitiesCheckboxes = document.getElementById('tierAmenitiesCheckboxes');
  // clear any existing checkboxes to "refresh" the page
  amenitiesCheckboxes.innerHTML = ""
  // get each amenity
  for (let i = 0; i < json.length; i++) {
    var amenityContainer = document.createElement('div');
    amenityContainer.className = 'amenityContainer';
    // set attributes for each checkbox element
    var amenity = document.createElement('input');
    amenity.type = "checkbox";
    amenity.id = "has" + json[i].amenityName;
    amenity.name = "tierAmenities";
    amenity.value = parseInt(json[i].amenityId);
    var amenityLabel = document.createElement('label');
    amenityLabel.htmlFor = amenity.id;
    amenityLabel.appendChild(document.createTextNode(json[i].amenityName)); 
    // add the checkbox and label to the div
    amenityContainer.appendChild(amenity);
    amenityContainer.appendChild(amenityLabel);
    // add the box div to the page
    amenitiesCheckboxes.appendChild(amenityContainer);
  }
  // add the box div to the page
  amenitiesCheckboxes.appendChild(amenityContainer);
}

// populate the text boxes with the information gathered from the radios
function populateTierForm(tier) {
  const featuredSelects = document.getElementsByName('featuredAmenities');
  let featuredAmenities = [];
  // check all of the amenities that this tier has
  for (let i = 0; i < tier.length; i++) {
    // if the tier doesn't have any amenities, no need to try to populate them
    if (tier[0].amenityName == null) {
      break;
    }
    // check the amenity and add it to the possible featured selects elements
    document.getElementById("has" + tier[i].amenityName).checked = true;
    for (let j = 0; j < featuredSelects.length; j++) {
      // add a default option
      if (i == 0) featuredSelects[j].appendChild(new Option("Select an Amenity to be Featured", "", true));
      featuredSelects[j].appendChild(new Option(tier[i].amenityName, tier[i].amenityId, false));
    }
    // if it is featured, select it in the select menu
    if (tier[i].isFeatured) {
      featuredAmenities.push(tier[i].amenityId);
    }
  }
  selectFeatures(featuredAmenities);
}

function selectFeatures(feats) {
  const featuredSelects = document.getElementsByName('featuredAmenities');
  for (let i = 0; i < feats.length; i++) {
    featuredSelects[i].value = feats[i];
  }
}

// clear the checkboxes and the select menus to "refresh" the form
function resetTierForm() {
  const featuredSelects = document.getElementsByName('featuredAmenities');
  for (let i = 0; i < featuredSelects.length; i++) {
    featuredSelects[i].innerHTML = "";
  }
  let amenities = document.getElementsByName('tierAmenities');
  for (let i = 0; i < amenities.length; i++) {
    amenities[i].checked = false;
  }
}


/****************************************************************
 * 
 *   Functions to Get Info from Tier Form & Update Tier Amenities
 * 
****************************************************************/
function getRoomTier() {
  const tierRadio = document.querySelector('input[name="tierId"]:checked');
  if (tierRadio != null) {
    const route = getRoute("/roomtiers/" + tierRadio.value);
    const json = getJSON(route);
    resetTierForm();
    populateTierForm(json);
  }
}

// update the amenities that the tier has
function updateRoomTier() {
  var amenities = document.getElementsByName("tierAmenities");
  // make sure the user selects a tier
  try {
    var roomTierId = document.querySelector('input[name="tierId"]:checked').value;
  } catch (error) {
    console.log('missing radio selection.');
  }

  // get the featured amenities from the select menus
  var feats = getFeatures();

  for (let i = 0; i < amenities.length; i++) { 
    // check if this tier should have this amenity
    var search = "/roomtiers/" + roomTierId + "/amenity/" + amenities[i].value;
    var route = getRoute(search);
    var json = getJSON(route)[0];

    // if the amenity is checked and there is not data in the tierdetail table, add it
    if (amenities[i].checked && (json == null || json == undefined)) {
      var url = getRoute('/tierdetail');

      // save the parameters in an object
      var data = {
        roomTierId: roomTierId,
        amenityId: amenities[i].value,
        isFeatured: false
      }
      addItem(url, data);
    } 
    // if the amenity is not checked and there is data in the tierdetail table, remove it
    else if (!amenities[i].checked && json != null && json != undefined) {
      deleteItem(route);
    }

    // by now, the tierdetail table contains the correct amenities, so we can just add/remove features as needed
    // if the amenity should be featured, set it to true; otherwise, set it to false
    if (feats.includes(amenities[i].value)) {
      var data = {isFeatured: true}
      updateItem(route, data);
    } else {
      var data = {isFeatured: false}
      updateItem(route, data);
    }
  }
}

// get the featured amenities from the select menus
function getFeatures() {
  let selects = document.getElementsByName("featuredAmenities");
  let arr = [];
  for (let i = 0; i < selects.length; i++) {
    // if a value is selected, add it to the array
    if (selects[i].value != null) {
      arr.push(selects[i].value);
    }
  }
  return arr;
}
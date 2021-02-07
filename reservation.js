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

  // testing
  console.log(result);

  /*
  TO-DO: make some type of message pop up showing that the room has been deleted
  */
}





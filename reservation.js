function getJSON()
{
    Url = "http://localhost:8090/api/rooms"
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

/****************************************************************
 * 
 *   Functions to Add, Update, and Delete Rooms from the table
 * 
****************************************************************/
// add a room to the table based on the information entered on the editRoom page
/*
  TO-DO: we might want to add functionality to make sure that we can't have two rooms in
         the table with the same room number
*/
function addRoom() {

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

    // save the parameters in an object
    var data = 
      {
      roomNumber: roomNumber,
      bedType: bedType,
      bedCount: bedCount,
      cost: cost,
      maxOccupancy: maxOccupancy,
      viewRoom: viewRoom
      }

    console.log("right after data declaration " + data.viewRoom);
    // send the object to the database to add the room with this information
    $.post(url, data, function(data, status){
      console.log(`${data} and status is ${status}`);
    });

    console.log("right after post in reservation.js " + data.viewRoom);
}

// update a specific room's information with the information entered on the editRoom page
function updateRoom() {
  // do stuff here
}

// delete a room from the table based on the roomNumber
function deleteRoom() {
  // do stuff here
}

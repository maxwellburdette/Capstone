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
// NOTE: we might want to add functionality to make sure that we can't have two rooms in
//       the table with the same room number
function addRoom() {

    const url = "http://localhost:8090/api/rooms";
    var roomNumber = parseInt(document.getElementById("roomNumber").value);
    var bedType = parseInt(document.querySelector('input[name="bedType"]:checked').value);
    var bedCount = parseInt(document.querySelector('input[name="bedCount"]:checked').value);
    var cost = parseInt(document.getElementById("cost").value);
    // two people per bed for now -- can adjust this to include children
    var maxOccupancy = bedCount * 2;

    // save the parameters in an object
    var data = 
      {
      roomNumber: roomNumber,
      bedType: bedType,
      bedCount: bedCount,
      cost: cost,
      maxOccupancy: maxOccupancy
      };

    /* testing
    console.log("after data declaration");
    console.log("roomNumber is " + data.roomNumber + " and the type is " + typeof data.roomNumber);
    console.log("bedType is " + data.bedType + " and the type is " + typeof data.bedType);
    console.log("bedCount is " + data.bedCount + " and the type is " + typeof data.bedCount);
    console.log("cost is " + data.cost + " and the type is " + typeof data.cost);
    console.log("maxOccupancy is " + data.maxOccupancy + " and the type is " + typeof data.maxOccupancy);
    */

    // send the object to the database to add the room with this information
    $.post(url, data, function(data, status){
      console.log(`${data} and status is ${status}`);
    });
}

<?php
// i am using MAMP to run all of this, but it should be able to be linked up to Azure as well.
// just thought you'd like to see how it is done in php

// note: within php -> is the same as . in most other languages
// so $conn->query($sql) on line 35 would just be conn.query(sql) in many other languages
// the $ before a variable name just says that it's a variable name

// set up the variables for the login
$db_host = 'localhost';
$db_user = 'root';
$db_password = 'root';
$db_db = 'hotel';
$db_port = 8888;

// basically, this creates a connection to the database
$conn = new mysqli(
  $db_host,
  $db_user,
  $db_password,
  $db_db
);

// if the connection has an error, display the error message and exit
if ($conn->connect_error) {
  echo 'Errno: '.$mysqli->connect_errno;
  echo '<br>';
  echo 'Error: '.$mysqli->connect_error;
  exit();
}

// we're going to get the entire Room table
$sql = "SELECT * FROM Room";
// save the output of the SQL as an object
$result = $conn->query($sql);

// iterate through the object to display each row
if ($result->num_rows > 0) {
  // while the row has data, loop
  while($row = $result->fetch_assoc()) {
    // if the bedtype is false, it's queen; otherwise, it's king
    // i used a boolean here for memory-saving reasons
    if ($row["bedType"] == 0) {
        $bedType = 'Queen';
    } else {
        $bedType = 'King';
    }
    if ($row["couchBed"] == 0) {
        $hasCouchBed = 'No';
    } else {
        $hasCouchBed = 'Yes';
    }
    // send this info to the HTML page
    echo "Room #: " . $row["roomNum"]. "<br>" . 
         "Bed Type: " . $bedType . "<br>" . 
         "Bed Count: " . $row["bedCount"] . "<br>" .
         "Has Pull-out Couch: " . $hasCouchBed . "<br>" .
         "Max Occupancy: " . $row["maxOccupancy"] . "<br><br>";
  }
} else {
  echo "0 results";
}
$conn->close();

?>
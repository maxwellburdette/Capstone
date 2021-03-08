var config = require('./dbconfig');
const sql = require('mssql');



/**
 * SQL functions for users
 */
//Get users from table
async function getUsers()
{
    try
    {
        let pool = await sql.connect(config);
        let users = await pool.request().query("SELECT * FROM users");
        return users.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}
//Get specific user from table
async function getUser(email)
{
    try
    {
        let pool = await sql.connect(config);
        let users = await pool.request()
            .input('input_parameter', sql.NVarChar, email)
            .query("SELECT * from users where email = @input_parameter");
        return users.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}
//Add  new user to user table
async function addUser(user)
{
    try
    {
        let pool = await sql.connect(config);
        let insertUser = await pool.request()
            .input('firstName', sql.NVarChar, user.firstName)
            .input('lastName', sql.NVarChar, user.lastName)
            .input('email', sql.NVarChar, user.email)
            .input('password', sql.NVarChar, user.password)
            .execute('InsertUser');
        return insertUser.recordsets;

    }
    catch(error)
    {
        console.log(error);
    }
}
//Update user
async function updateUser(user, email)
{
    try
    {
        let pool = await sql.connect(config);
        let updateUser = await pool.request()
            .input('firstName', sql.NVarChar, user.firstName)
            .input('lastName', sql.NVarChar, user.lastName)
            .input('email', sql.NVarChar, user.email)
            .input('password', sql.NVarChar, user.password)
            .input('input_parameter', sql.NVarChar, email)
            .query('BEGIN  UPDATE users  SET firstName = @firstName,  lastName = @lastName,  email = @email, password = @password  WHERE  email = @input_parameter END');
        return updateUser.recordsets;

    }
    catch(error)
    {
        console.log(error);
    }
}
//Delete user
async function deleteUser(email)
{
    try
    {
        let pool = await sql.connect(config);
        let users = await pool.request()
            .input('input_parameter', sql.NVarChar, email)
            .query("BEGIN DELETE FROM users  WHERE  email = @input_parameter END ");
        return users.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}


/**
 * SQL functions for reviews
 */
//Get from ratings db
async function getReviews()
{
    try
    {
        let pool = await sql.connect(config);
        let ratings = await pool.request().query('SELECT * FROM reviews');
        return ratings.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}
//Get rating from specific user
async function getUserReview(email)
{
    try
    {
        let pool = await sql.connect(config);
        let users = await pool.request()
            .input('input_parameter', sql.NVarChar, email)
            .query("SELECT * from reviews where email = @input_parameter");
        return users.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}
//Add review
async function addReview(review)
{
    try
    {
        let pool = await sql.connect(config);
        let insertReview = await pool.request()
            .input('email', sql.NVarChar, review.email)
            .input('rating', sql.NVarChar, review.rating)
            .input('description', sql.NVarChar, review.description)
            .execute('InsertReview');
        return insertReview.recordsets;

    }
    catch(error)
    {
        console.log(error);
    }
}


/*************************************************************
*                       ROOMS TABLE
*   getRooms ........... gets all rooms
*   getRoom ............ gets a room based on room number
*   getCertainRooms .... gets rooms based on max occupancy
*   addRoom ............ adds a room to the table
*   deleteRoom ......... deletes a room from the table
*   updateRoom ......... updates a room in the table with the input data
**************************************************************/
// Get rooms from table
async function getRooms()
{
    try
    {
        let pool = await sql.connect(config);
        let rooms = await pool.request().query('SELECT * FROM rooms');
        return rooms.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}

//Get specific room from table
async function getRoom(roomNumber)
{
    try
    {
        console.log("dboperations.getRoom(" + roomNumber + ") running");
        let pool = await sql.connect(config);
        let room = await pool.request()
            .input('roomNumber', sql.Int, roomNumber)
            .query("SELECT * from rooms r where roomNumber = @roomNumber");
        return room.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}

// Add a room to the table
async function addRoom(room)
{
    try
    {
        let pool = await sql.connect(config);
        let insertRoom = await pool.request()
            .input('roomNumber', sql.Int, room.roomNumber)
            .input('roomTypeId', sql.Int, room.roomTypeId)
            .query('INSERT INTO rooms (roomNumber, roomTypeId) VALUES (@roomNumber, @roomTypeId);');
        return insertRoom.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}

// Delete a room from the table
async function deleteRoom(roomNumber)
{
    try
    {
        let pool = await sql.connect(config);
        let deleteRoom = await pool.request()
            .input('input_parameter', sql.Int, roomNumber)
            .query("BEGIN DELETE FROM rooms  WHERE  roomNumber = @input_parameter END ");
        return deleteRoom.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}

// Update a room in the table
async function updateRoom(room, roomNumber)
{
    try
    {
        let pool = await sql.connect(config);
        let updateRoom = await pool.request()
            .input('roomNumber', sql.Int, roomNumber)
            .input('roomTypeId', sql.Int, room.roomTypeId)
            .query('UPDATE rooms  SET roomTypeId = @roomTypeId WHERE  roomNumber = @roomNumber');
        return updateRoom.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}

/*************************************************************
*                      ROOM TYPE TABLE
*   getRoomTypes ......... gets all room types
*   getRoomType .......... gets a room type based on room type id
*   getCertainRoomTypes .. gets room types based on max occupancy
**************************************************************/
// Get rooms types from table
async function getRoomTypes()
{
    try
    {
        let pool = await sql.connect(config);
        let roomTypes = await pool.request()
            .query('SELECT * FROM roomTypes');
        return roomTypes.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}

//Get specific room type from table
async function getRoomType(roomTypeId)
{
    try
    {
        let pool = await sql.connect(config);
        let roomType = await pool.request()
            .input('input_parameter', sql.Int, roomTypeId)
            .query("SELECT * FROM roomTypes WHERE roomTypeId = @input_parameter");
        return roomType.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}

//Get specific room types from table based on the number of people who will be staying in the room
async function getCertainRoomTypes(numberPeople)
{
    try
    {
        let pool = await sql.connect(config);
        let roomTypeList = await pool.request()
            .input('numberPeople', sql.Int, numberPeople)
            .query("SELECT roomTypeId, roomTypeName, maxOccupancy, totalCost " +
                   "FROM roomTypes " +
                   "WHERE maxOccupancy >= @numberPeople");
        return roomTypeList.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}

//get the room type based on the roomSizeId and roomTierId
async function getRoomTypeId(roomSizeId, roomTierId)
{
    try
    {
        let pool = await sql.connect(config);
        let roomTypeId = await pool.request()
            .input('roomSizeId', sql.Int, roomSizeId)
            .input('roomTierId', sql.Int, roomTierId)
            .query("SELECT roomTypeId " +
                   "FROM roomTypes " +
                   "WHERE roomSizeId = @roomSizeId AND roomTierId = @roomTierId");
        return roomTypeId.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}


/*************************************************************
*                      AMENITY TABLE
*   getAmenities ......... gets all room types
*   getAmenity ........... gets a room type based on room type id
**************************************************************/
// Get rooms types from table
async function getAmenities()
{
    try
    {
        let pool = await sql.connect(config);
        let amenities = await pool.request()
            .query('SELECT * FROM amenities');
        return amenities.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}

// Get specific amenity from table
async function getAmenity(amenityName)
{
    try
    {
        let pool = await sql.connect(config);
        let amenity = await pool.request()
            .input('input_amenityName', sql.NVarChar, amenityName)
            .query("SELECT * FROM amenities WHERE amenityName = @input_amenityName");
        return amenity.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}


/*************************************************************
*                   FUNCTIONS FOR SQL JOINS
*   getAmenitiesByRoomType
*   getImagesByRoomType
*   getAllRoomTypeInfo
*   getAllRoomInfo
**************************************************************/




/*

ive been working on this quite literally all day, and my brain is tired.

probably combine these functions into one big joined function to pull ALL
data that goes with a certain room number so that we can display it on the edit rooms page

*/




// get all amenities based on the room type
async function getAmenitiesByRoomType(roomTypeId) {
    try {
        let pool = await sql.connect(config);
        let amenities = await pool.request()
            .input('roomTypeId', sql.Int, roomTypeId)
            .query("SELECT a.amenityName, a.amenityDescription " +
                   "FROM roomTypes rt " +
                   "JOIN tierDetail td ON rt.roomTierId = td.roomTierId " +
                   "JOIN amenities a ON td.amenityName = a.amenityName " +
                   "WHERE rt.roomTypeId = @roomTypeId");
        return amenities.recordsets;
    }
    catch(error)
    {
        //console.log(error);
    }
}

// get all images based on the room type
async function getImagesByRoomType(roomTypeId) {
    try {
        let pool = await sql.connect(config);
        let images = await pool.request()
            .input('roomTypeId', sql.Int, roomTypeId)
            .query("SELECT i.imageName, i.imageAlt" +
                   "FROM roomTypes t" +
                   "JOIN roomImages i ON t.roomTypeId = i.roomTypeId" +
                   "WHERE i.roomTypeId = @roomTypeId");
        return images.recordsets;
    }
    catch(error)
    {
        //console.log(error);
    }
}

// get all info about the room type
async function getAllRoomTypeInfo(roomTypeId) {
    try {
        let pool = await sql.connect(config);
        let roomType = await pool.request()
            .input('roomTypeId', sql.Int, roomTypeId)
            .query("SELECT r.roomTypeId, s.*, t.*, i.imageId, i.imageName, i.imageAlt, td.isFeatured, a.* " +
                   "FROM roomTypes r " +
                   "JOIN roomSizes s ON r.roomSizeId = s.roomSizeId " +
                   "JOIN roomTiers t ON r.roomTierId = t.roomTierId " +
                   "JOIN roomImages i ON r.roomTypeId = i.roomTypeId " +
                   "LEFT JOIN tierDetail td ON r.roomTierId = td.roomTierId " +
                   "LEFT JOIN amenities a ON td.amenityId = a.amenityId " +
                   "WHERE r.roomTypeId = @roomTypeId;");
        //let result = getImagesByRoomType(roomTypeId) + getAmenitiesByRoomType(roomTypeId);
        return roomType.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}


/*************************************************************
*                     ROOM TIERS TABLE
*   getRoomTiers ......... gets all room tiers
*   getRoomTier .......... gets a room tier based on tier name
*   addRoomTier .......... adds a room tier to the table
*   deleteRoomTier ....... deletes a room tier from the table
*   updateRoomTier ....... updates a room tier with the input data
**************************************************************/
// Get room tiers from table
async function getRoomTiers()
{
    try
    {
        let pool = await sql.connect(config);
        let roomTiers = await pool.request().query('SELECT * FROM roomTiers');
        return roomTiers.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}

//Get specific room tier from table
async function getRoomTier(roomTierId)
{
    try
    {
        let pool = await sql.connect(config);
        let roomTier = await pool.request()
            .input('roomTierId', sql.Int, roomTierId)
            .query("SELECT * from roomTiers where roomTierId = @roomTierId");
        return roomTier.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}

// Add a tier to the table
async function addRoomTier(roomTier)
{
    try
    {
        let pool = await sql.connect(config);
        let insertTier = await pool.request()
            .input('roomTierPercentage', sql.NVarChar(20), roomTier.roomTierPercentage)
            .input('roomTierName', sql.Bit, roomTier.roomTierName)
            .query('INSERT INTO roomTiers (roomTierPercent, roomTierName) VALUES (@roomTierPercent, @roomTierName);');
        return insertTier.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}

// Delete a tier from the table
async function deleteRoomTier(roomTierId)
{
    try
    {
        let pool = await sql.connect(config);
        let deleteTier = await pool.request()
            .input('roomTierId', sql.Int, roomTierId)
            .query("DELETE FROM roomTiers  WHERE  roomTierId = @roomTierId");
        return deleteTier.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}

// Update a tier in the table
async function updateRoomTier(roomTier, roomTierId)
{
    try
    {
        let pool = await sql.connect(config);
        let updateTier = await pool.request()
            .input('roomTierPercent', sql.Int, roomTier.roomTierPercent)
            .input('roomTierName', sql.NVarChar, roomTier.roomTierName)
            .query('UPDATE roomTiers  SET ' +
                   'roomTierPercent = @roomTierPercent,  ' + 
                   'roomTierName = @roomTierName ' +
                   'WHERE roomTierId = @roomTierId');
        return updateTier.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}



module.exports = {
    getUsers : getUsers,
    getUser : getUser,
    addUser : addUser,
    updateUser : updateUser,
    deleteUser : deleteUser,
    getReviews : getReviews,
    getUserReview : getUserReview,
    addReview : addReview,
    getRooms : getRooms,
    getRoom : getRoom,
    addRoom : addRoom,
    deleteRoom : deleteRoom,
    updateRoom : updateRoom,
    getRoomType : getRoomType,
    getRoomTypes : getRoomTypes,
    getCertainRoomTypes : getCertainRoomTypes,
    getRoomTiers : getRoomTiers,
    getRoomTier : getRoomTier,
    addRoomTier : addRoomTier,
    deleteRoomTier : deleteRoomTier,
    updateRoomTier : updateRoomTier,
    getAmenities : getAmenities,
    getAmenity : getAmenity,
    getAmenitiesByRoomType : getAmenitiesByRoomType,
    getImagesByRoomType : getImagesByRoomType,
    getAllRoomTypeInfo : getAllRoomTypeInfo,
    getRoomTypeId : getRoomTypeId,
}

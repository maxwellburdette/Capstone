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
async function getRooms() {
    try {
        let pool = await sql.connect(config);
        let rooms = await pool.request().query('SELECT * FROM rooms');
        return rooms.recordsets;
    }
    catch(error) {
        console.log(error);
    }
}

//Get specific room from table
async function getRoom(roomNumber) {
    try {
        console.log("dboperations.getRoom(" + roomNumber + ") running");
        let pool = await sql.connect(config);
        let room = await pool.request()
            .input('roomNumber', sql.Int, roomNumber)
            .query("SELECT * from rooms r where roomNumber = @roomNumber");
        return room.recordsets;
    }
    catch(error) {
        console.log(error);
    }
}

// Add a room to the table
async function addRoom(room) {
    try {
        let pool = await sql.connect(config);
        let insertRoom = await pool.request()
            .input('roomNumber', sql.Int, room.roomNumber)
            .input('roomTypeId', sql.Int, room.roomTypeId)
            .query('INSERT INTO rooms (roomNumber, roomTypeId) VALUES (@roomNumber, @roomTypeId);');
        return insertRoom.recordsets;
    }
    catch(error) {
        console.log(error);
    }
}

// Delete a room from the table
async function deleteRoom(roomNumber) {
    try {
        let pool = await sql.connect(config);
        let deleteRoom = await pool.request()
            .input('input_parameter', sql.Int, roomNumber)
            .query("BEGIN DELETE FROM rooms  WHERE  roomNumber = @input_parameter END ");
        return deleteRoom.recordsets;
    }
    catch(error) {
        console.log(error);
    }
}

// Update a room in the table
async function updateRoom(room, roomNumber) {
    try {
        let pool = await sql.connect(config);
        let updateRoom = await pool.request()
            .input('roomNumber', sql.Int, roomNumber)
            .input('roomTypeId', sql.Int, room.roomTypeId)
            .query('UPDATE rooms  SET roomTypeId = @roomTypeId WHERE  roomNumber = @roomNumber');
        return updateRoom.recordsets;
    }
    catch(error) {
        console.log(error);
    }
}

/*************************************************************
*                      ROOM TYPE TABLE
*   getRoomTypes ......... gets all room types
*   getRoomType .......... gets a room type based on room type id
*   getCertainRoomTypes .. gets room types based on max occupancy
*   getAllRoomTypeInfo ... gets ALL the info about a room type through joins
*   updateRoomType ....... updates the room type selected
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
async function getRoomTypeId(roomSizeId, roomTierId) {
    try {
        let pool = await sql.connect(config);
        let roomTypeId = await pool.request()
            .input('roomSizeId', sql.Int, roomSizeId)
            .input('roomTierId', sql.Int, roomTierId)
            .query("SELECT roomTypeId " +
                   "FROM roomTypes " +
                   "WHERE roomSizeId = @roomSizeId AND roomTierId = @roomTierId");
        return roomTypeId.recordsets;
    }
    catch(error) {
        console.log(error);
    }
}

// get all info about the room type
async function getAllRoomTypeInfo(roomTypeId) {
    try {
        let pool = await sql.connect(config);
        let roomType = await pool.request()
            .input('roomTypeId', sql.Int, roomTypeId)
            .query("SELECT r.roomTypeId, r.roomTypeName, r.maxOccupancy, r.totalCost, s.*, t.*, i.imageId, i.imageName, i.imageAlt, i.imageSource, td.isFeatured, a.* " +
                   "FROM roomTypes r " +
                   "JOIN roomSizes s ON r.roomSizeId = s.roomSizeId " +
                   "JOIN roomTiers t ON r.roomTierId = t.roomTierId " +
                   "LEFT JOIN roomImages i ON r.roomTypeId = i.roomTypeId " +
                   "LEFT JOIN tierDetail td ON r.roomTierId = td.roomTierId " +
                   "LEFT JOIN amenities a ON td.amenityId = a.amenityId " +
                   "WHERE r.roomTypeId = @roomTypeId;");
        //let result = getImagesByRoomType(roomTypeId) + getAmenitiesByRoomType(roomTypeId);
        return roomType.recordsets;
    }
    catch(error) {
        console.log(error);
    }
}
/*
TO-DO: need to be able to update the room type
*/
// Update a room in the table
async function updateRoomType(roomType, roomTypeId) {
    try {
        let pool = await sql.connect(config);
        let updateRoomType = await pool.request()
            .input('roomTypeId', sql.Int, roomTypeId)
            .input('roomTypeName', sql.NVarChar, roomType.roomTypeName)
            .input('maxOccupancy', sql.Int, roomType.maxOccupancy)
            .input('totalCost', sql.Int, roomType.totalCost)
            .query('UPDATE roomTypes ' +
                   'SET roomTypeName = @roomTypeName, ' +
                   'maxOccupancy = @maxOccupancy, ' +
                   'totalCost = @totalCost ' +
                   'WHERE roomTypeId = @roomTypeId');
        return updateRoomType.recordsets;
    }
    catch(error) {
        console.log(error);
    }
}

/*
TO-DO: add the ability to update the images table from this form
*/


/*************************************************************
*                      IMAGES TABLE
*   getImages ............ gets the images associated with the roomTypeId
**************************************************************/
// Get rooms types from table
async function getImages(roomTypeId) {
    try {
        let pool = await sql.connect(config);
        let images = await pool.request()
            .input('roomTypeId', sql.Int, roomTypeId)
            .query('SELECT * FROM images ' +
                   'WHERE roomTypeId = @roomTypeId');
        return amenities.recordsets;
    }
    catch(error) {
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
        let roomTiers = await pool.request()
        .query('SELECT rt.*, td.*, a.* ' +
        'FROM roomTiers rt ' +
        'JOIN tierDetail td ON rt.roomTierId = td.roomTierId ' +
        'JOIN amenities a ON td.amenityId = a.amenityId ');
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
    try {
        let pool = await sql.connect(config);
        let roomTier = await pool.request()
            .input('roomTierId', sql.Int, roomTierId)
            .query('SELECT rt.*, td.isFeatured, a.* ' +
            'FROM roomTiers rt ' +
            'LEFT JOIN tierDetail td ON rt.roomTierId = td.roomTierId ' +
            'LEFT JOIN amenities a ON td.amenityId = a.amenityId ' +
            'WHERE rt.roomTierId = @roomTierId');
        return roomTier.recordsets;
    }
    catch(error) {
        console.log(error);
    }
}

/*
TO-DO: need to add the ability to update the tierDetail and amenities tables from this form
*/

/*
TO-DO: if we update a tier, we should display a list of roomtypes this will affect (and maybe rooms)
       or at least display some type of message when deleting the tier since we can't delete it
       unless no room type uses it, due to the fact that room types rely on room tiers
*/

/*************************************************************
*                   AMENITIES & TIERDETAIL TABLES
*   getAmenities ......... gets either the amenities based on roomTierId or all amenities
*   getTierDetail ........ gets the tierdetail for that roomtierid/amenityid combo
*   addTierDetail ........ adds a tier/amenity relationship
*   deletesTierDetail .... deletes a tier/amenity relationship
**************************************************************/
// get either the amenities based on roomTierId or all amenities
async function getAmenities(roomTierId) {
    // if a roomTierId is passed, get the amenities based on the room tier
    if (roomTierId != null) {
        try {
            let pool = await sql.connect(config);
            let amenities = await pool.request()
                .input('roomTierId', sql.Int, roomTierId)
                .query("SELECT td.*, a.amenityName, a.amenityDescription " +
                    "FROM tierDetail td " +
                    "JOIN amenities a ON td.amenityName = a.amenityName " +
                    "WHERE rt.roomTierId = @roomTierId " +
                    "ORDER BY a.amenityName ASC");
            return amenities.recordsets;
        }
        catch(error)
        {
            //console.log(error);
        }
    } 
    // get all amenities
    else {
        try {
            let pool = await sql.connect(config);
            let amenities = await pool.request()
                .query('SELECT * FROM amenities ORDER BY amenityName ASC');
            return amenities.recordsets;
        }
        catch(error) {
            console.log(error);
        }
    }
}

// Get specific amenity from table
async function getTierDetail(roomTierId, amenityId) {
    try {
        let pool = await sql.connect(config);
        let amenity = await pool.request()
            .input('roomTierId', sql.Int, roomTierId)
            .input('amenityId', sql.Int, amenityId)
            .query("SELECT * FROM tierDetail WHERE roomTierId = @roomTierId AND amenityId = @amenityId");
        return amenity.recordsets;
    }
    catch(error) {
        console.log(error);
    }
}

// Add a tierdetail
async function addTierDetail(tierDetail) {
    try {
        let pool = await sql.connect(config);
        let insertTierDetail = await pool.request()
            .input('roomTierId', sql.Int, tierDetail.roomTierId)
            .input('amenityId', sql.Int, tierDetail.amenityId)
            .query('INSERT INTO tierdetail (roomTierId, amenityId) VALUES (@roomTierId, @amenityId);');
        return insertTierDetail.recordsets;
    }
    catch(error) {
        console.log(error);
    }
}

// Delete a room from the table
async function deleteTierDetail(roomTierId, amenityId) {
    try {
        let pool = await sql.connect(config);
        let deleteTierDetail = await pool.request()
            .input('roomTierId', sql.Int, roomTierId)
            .input('amenityId', sql.Int, amenityId)
            .query("DELETE FROM tierdetail WHERE roomTierId = @roomTierId AND amenityId = @amenityId");
        return deleteTierDetail.recordsets;
    }
    catch(error) {
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
    getAmenities : getAmenities,
    getTierDetail : getTierDetail,
    addTierDetail : addTierDetail,
    deleteTierDetail : deleteTierDetail,
    getAllRoomTypeInfo : getAllRoomTypeInfo,
    updateRoomType : updateRoomType,
    getRoomTypeId : getRoomTypeId,
}

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
**************************************************************/
// Get rooms from table
async function getRooms()
{
    try
    {
        let pool = await sql.connect(config);
        let rooms = await pool.request().query('SELECT * FROM ROOMS');
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
        let pool = await sql.connect(config);
        let room = await pool.request()
            .input('input_parameter', sql.Int, roomNumber)
            .query("SELECT * from rooms where roomNumber = @input_parameter");
        return room.recordsets;
    }
    catch(error)
    {
        console.log(error);
    }
}

//Get specific rooms from table based on the number of people who will be staying in the room
async function getCertainRooms(numberPeople)
{
    try
    {
        let pool = await sql.connect(config);
        let roomList = await pool.request()
            .input('input_parameter', sql.Int, numberPeople)
            .query("SELECT room.* from hotelRooms r INNER JOIN roomType t" +
                   "ON r.roomTypeId = t.roomTypeId" + 
                   "WHERE t.maxOccupancy >= @input_parameter");
        return roomList.recordsets;
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
            .input('roomType', sql.Int, room.roomType)
            .input('roomTier', sql.Int, room.roomTier)
            .execute('InsertRoom');
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
            .query("BEGIN DELETE FROM hotelRooms  WHERE  roomNumber = @input_parameter END ");
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
            .input('roomType', sql.Int, room.roomType)
            .input('roomTier', sql.NVarChar(20), room.roomTier)
            .query('BEGIN  UPDATE hotelRooms  SET roomType = @roomType,  roomTier = @roomTier  WHERE  roomNumber = @input_parameter END');
        return updateRoom.recordsets;
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
    getCertainRooms: getCertainRooms,
    addRoom : addRoom,
    deleteRoom : deleteRoom,
    updateRoom : updateRoom,
}

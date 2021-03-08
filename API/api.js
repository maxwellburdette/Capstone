var Db = require('./dboperations');
var User = require('./dbTableClasses/user');
var Review = require('./dbTableClasses/review');
var Amenity = require('./dbTableClasses/roomType');
var Reservation = require('./dbTableClasses/reservation');
var Room = require('./dbTableClasses/room');
var RoomImage = require('./dbTableClasses/roomImage');
var RoomSize = require('./dbTableClasses/roomSize');
var RoomTier = require('./dbTableClasses/roomTier');
var RoomType = require('./dbTableClasses/roomType');
const dboperations = require('./dboperations');


var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((request, response, next) => {
    console.log('middleware');
    next();
})


/**
 * SQL commands for accessing from users table
 */
//Gets list of all user data
router.route("/users").get((request, response) =>
{
    dboperations.getUsers().then(result => {
        //console.log(result);
        response.json(result[0]);
    })
});
//Gets specific user from user table
router.route("/users/:email").get((request, response) =>
{
    dboperations.getUser(request.params.email).then(result => {
        //console.log(result);
        response.json(result[0]);
    })
});
//Post new user to table
router.route("/users").post((request, response) =>
{
    let user = {...request.body}
    dboperations.addUser(user).then(result => {
        response.status(201).json(result);
    })
});
//Put to update entry in user table
router.route("/users/:email").put((request, response) =>
{
    let user = {...request.body}
    dboperations.updateUser(user, request.params.email).then(result => {
        response.status(201).json(result);
    })
});
//Put to delete user from table
router.route("/users/:email").delete((request, response) =>
{
    dboperations.deleteUser(request.params.email).then(result => {
        response.status(200).json(result);
    })
});



/**
 * SQL commands for reviews table
 */
//Get request: Gets all user reviews
router.route("/reviews").get((request, response) =>
{
    dboperations.getReviews().then(result => {
        console.log(result);
        response.json(result[0]);
    })
});
//Gets reviews from a specific user
router.route("/reviews/:email").get((request, response) =>
{
    dboperations.getUserReview(request.params.email).then(result => {
        response.json(result[0]);
    })
});
//Posts request: Adds reviews to table
router.route("/reviews").post((request, response) =>
{
    let review = {...request.body}
    dboperations.addReview(review).then(result => {
        response.status(201).json(result);
    })
});



/*************************************************************
*                       ROOMS TABLE
**************************************************************/
// Get request: retrieves a list of all rooms and their data
router.route("/rooms").get((request, response) =>
{
    dboperations.getRooms().then(result => {
        response.json(result[0]);
    })
});

// Get request: retrieves a specific room and its data
router.route("/rooms/:roomNumber").get((request, response) =>
{
    dboperations.getRoom(request.params.roomNumber).then(result => {
        response.json(result[0]);
    })
});

// Post request: Adds room to table
router.route("/rooms").post((request, response) =>
{
    let room = {...request.body}
    dboperations.addRoom(room).then(result => {
        response.status(201).json(result);
    })
});

// Put request: Updates the room in the table with the new info
router.route("/rooms/:roomNumber").put((request, response) =>
{
    let room = {...request.body}
    dboperations.updateRoom(room, request.params.roomNumber).then(result => {
        response.status(201).json(result);
    })
});

// Delete request: Deletes the room from the table
router.route("/rooms/:roomNumber").delete((request, response) =>
{
    dboperations.deleteRoom(request.params.roomNumber).then(result => {
        response.status(200).json(result);
    })
});

/*************************************************************
*                      ROOM TYPES TABLE
**************************************************************/
// Get request: retrieves a list of all room types and their data
router.route("/roomtypes").get((request, response) =>
{
    dboperations.getRoomTypes().then(result => {
        response.json(result[0]);
    })
});

// Get request: retrieves a specific room type and its data
router.route("/roomtypes/:roomTypeId").get((request, response) =>
{
    dboperations.getRoomType(request.params.roomTypeId).then(result => {
        response.json(result[0]);
    })
});

// Get request: retrieves a specific room type and ALL of its data (through joins)
router.route("/roomTypes/alldata/:roomTypeId").get((request, response) =>
{
    dboperations.getAllRoomTypeInfo(request.params.roomTypeId).then(result => {
        response.json(result[0]);
    })
});

// Get request: retrieves a list of room types and their data based on the max occupancy
router.route("/roomtypes/numberGuests/:numberPeople").get((request, response) =>
{
    dboperations.getCertainRoomTypes(request.params.numberPeople).then(result => {
        response.json(result[0]);
    })
});

// Get request: retrieves the roomTypeId that corresponds to the provided roomSizeId and roomTierId
router.route("/roomtypes/size/:roomSizeId/tier/:roomTierId").get((request, response) =>
{
    dboperations.getRoomTypeId(request.params.roomSizeId, request.params.roomTierId).then(result => {
        response.json(result[0]);
    })
});


/*************************************************************
*                      ROOM TIERS TABLE
**************************************************************/
// Get request: retrieves a list of all room tiers and their data
router.route("/roomtiers").get((request, response) =>
{
    dboperations.getRoomTiers().then(result => {
        response.json(result[0]);
    })
});

// Get request: retrieves a specific room tier and its data
router.route("/roomtiers/:roomTierId").get((request, response) =>
{
    dboperations.getRoomTier(request.params.roomTierId).then(result => {
        response.json(result[0]);
    })
});

// Post request: Adds a room tier to table
router.route("/roomtiers").post((request, response) =>
{
    let roomTier = {...request.body}
    dboperations.addRoomTier(roomTier).then(result => {
        response.status(201).json(result);
    })
});

// Put request: Updates the room tier in the table with the new info
router.route("/roomtiers/:roomTierId").put((request, response) =>
{
    let roomTier = {...request.body}
    dboperations.updateRoomTier(roomTier, request.params.roomTierId).then(result => {
        response.status(201).json(result);
    })
});

// Delete request: Deletes the room tier from the table
router.route("/roomtiers/:roomTierId").delete((request, response) =>
{
    dboperations.deleteRoomTier(request.params.roomTierId).then(result => {
        response.status(200).json(result);
    })
});


/*************************************************************
*                      AMENITIES TABLE
**************************************************************/
// Get request: retrieves a list of all amenities and their data
router.route("/amenities").get((request, response) =>
{
    dboperations.getAmenities().then(result => {
        response.json(result[0]);
    })
});

// Get request: retrieves a specific amenity and its data
router.route("/amenities/:amenityName").get((request, response) =>
{
    dboperations.getAmenity(request.params.amenityName).then(result => {
        response.json(result[0]);
    })
});

// Get request: retrieves a list of amenities for a given room type
router.route("/amenities/roomTypeId/:roomTypeId").get((request, response) =>
{
    dboperations.getAmenitiesByRoomType(request.params.roomTypeId).then(result => {
        response.json(result[0]);
    })
});



/*************************************************************
*                      IMAGES TABLE
**************************************************************/
// Get request: retrieves a list of images for a given room type
router.route("/images/roomTypeId/:roomTypeId").get((request, response) =>
{
    dboperations.getImagesByRoomType(request.params.roomTypeId).then(result => {
        response.json(result[0]);
    })
});



var port = process.env.PORT || 8090;
app.listen(port);
console.log("User API is running at " + 'http://localhost:' +  port);
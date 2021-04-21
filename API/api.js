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
router.route("/rooms").get((request, response) => {
    dboperations.getRooms().then(result => {
        response.json(result[0]);
    })
});

// Get request: retrieves a specific room and its data
router.route("/rooms/:roomNumber").get((request, response) => {
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

// Get request: retrieves a specific room type ALL of its data (through joins)
router.route("/roomtypes/:roomTypeId").get((request, response) =>
{
    dboperations.getRoomType(request.params.roomTypeId).then(result => {
        response.json(result[0]);
    })
});

// Get request: retrieves a specific room type's name
router.route("/roomtypes/booktype/:roomTypeId").get((request, response) =>
{
    dboperations.getRoomTypeName(request.params.roomTypeId).then(result => {
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

// Put request: Updates the room in the table with the new info
router.route("/roomtypes/:roomTypeId").put((request, response) =>
{
    let roomType = {...request.body}
    dboperations.updateRoomType(roomType, request.params.roomTypeId).then(result => {
        response.status(201).json(result);
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
router.route("/amenities/:amenityId").get((request, response) =>
{
    dboperations.getAmenity(request.params.amenityId).then(result => {
        response.json(result[0]);
    })
});

// Get request: retrieves a list of amenities by room tier
router.route("/amenities/roomTierId/:roomTierId").get((request, response) =>
{
    dboperations.getAmenities(request.params.roomTierId).then(result => {
        response.json(result[0]);
    })
});


/*************************************************************
*                      IMAGES TABLE
**************************************************************/
// Get request: retrieves an image from the database
router.route("/images/:imageId").get((request, response) => {
    dboperations.getImage(request.params.imageId).then(result => {
        response.json(result[0]);
    })
});

// Get request: retrieves a list of images for a given room type
router.route("/images/roomTypeId/:roomTypeId").get((request, response) => {
    dboperations.getImages(request.params.roomTypeId).then(result => {
        response.json(result[0]);
    })
});

// Post request: Adds image to table
router.route("/images").post((request, response) =>
{
    let image = {...request.body}
    dboperations.addImage(image).then(result => {
        response.status(201).json(result);
    })
});

// Put request: Updates the image in the table with the new info
router.route("/images/:imageId").put((request, response) =>
{
    let image = {...request.body}
    dboperations.updateImage(image, request.params.imageId).then(result => {
        response.status(201).json(result);
    })
});

// Delete request: Deletes the image from the table
router.route("/images/:imageId").delete((request, response) =>
{
    dboperations.deleteImage(request.params.imageId).then(result => {
        response.status(200).json(result);
    })
});


/*************************************************************
*                      TIERDETAIL TABLE
**************************************************************/
// Get request: retrieves a tierdetail based on the roomtierid and amenityid
router.route("/roomtiers/:roomTierId/amenity/:amenityId").get((request, response) =>
{
    dboperations.getTierDetail(request.params.roomTierId, request.params.amenityId).then(result => {
        response.json(result[0]);
    })
});

// Post request: Adds a tierdetail (tier/amenity relationship) to table
router.route("/tierdetail").post((request, response) =>
{
    let td = {...request.body}
    dboperations.addTierDetail(td).then(result => {
        response.status(201).json(result);
    })
});

// Put request: Updates the tierdetail in the table with the new info
router.route("/roomtiers/:roomTierId/amenity/:amenityId").put((request, response) =>
{
    let td = {...request.body}
    dboperations.updateTierDetail(request.params.roomTierId, request.params.amenityId, td).then(result => {
        response.status(201).json(result);
    })
});

// Delete request: Deletes the room from the table
router.route("/roomtiers/:roomTierId/amenity/:amenityId/").delete((request, response) =>
{
    dboperations.deleteTierDetail(request.params.roomTierId, request.params.amenityId).then(result => {
        response.status(200).json(result);
    })
});


/*************************************************************
*                      RESERVATIONS TABLE
**************************************************************/
// Post request: Adds a reservation to table
router.route("/reservations").post((request, response) =>
{
    let res = {...request.body}
    dboperations.addReservation(res).then(result => {
        response.status(201).json(result);
    })
});

// Get request: retrieves all reservations for a certain day
router.route("/reservations/:date").get((request, response) =>
{
    dboperations.getReservations(request.params.date).then(result => {
        response.json(result);
    })
});

// Get request: retrieves all reservations for a certain user
router.route("/reservations/user/:email").get((request, response) =>
{
    dboperations.getUserReservations(request.params.email).then(result => {
        response.json(result);
    })
});


var port = process.env.PORT || 8090;
app.listen(port);
console.log("User API is running at " + 'http://localhost:' +  port);
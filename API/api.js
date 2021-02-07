var Db = require('./dboperations');
var User = require('./user');
var Review = require('./review');
var Room = require('./room');
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
        console.log(result);
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
        console.log(result);
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
    let user = {...request.body}
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



var port = process.env.PORT || 8090;
app.listen(port);
console.log("User API is running at " + 'http://localhost:' +  port);

dboperations.getUsers().then(result  => 
{
    console.log(result[0]);
});
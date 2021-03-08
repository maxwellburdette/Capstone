class Room {
    constructor(roomNumber, roomTypeId)
    {
        this.roomNumber = roomNumber;
        this.roomTypeId = roomTypeId;
    }

    toString() {
        return "room number: " + this.roomNumber;
    }
}
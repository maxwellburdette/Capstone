class reservation {
    constructor(reservationId, email, roomNumber, checkIn, checkOut, totalCost) {
        this.reservationId = reservationId;
        this.email = email;
        this.roomNumber = roomNumber;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.totalCost;
    }

    toString() {
        return "reservation id: " + this.reservationId;
    }
}
class roomType {
    constructor(roomTypeId, roomSizeId, roomTierId, roomTypeName, maxOccupancy, roomTypeCost)
    {
        this.roomTypeId = roomTypeId;
        this.roomSizeId = roomSizeId;
        this.roomTierId = roomTierId;
        this.roomTypeName = roomTypeName;
        this.maxOccupancy = maxOccupancy;
        this.roomTypeCost = roomTypeCost;
    }

    toString() {
        return "room type name: " + this.roomTypeName;
    }
}
class roomsize {
    constructor(roomSizeId, bedCount, bedSize, roomSizeCost) {
        this.roomSizeId = roomSizeId;
        this.bedCount = bedCount;
        this.bedSize = bedSize;
        this.roomSizeCost = roomSizeCost;
    }

    toString() {
        return "bed count: " + this.bedCount + " & bed size: " + this.bedSize;
    }
}
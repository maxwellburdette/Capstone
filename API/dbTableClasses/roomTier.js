class roomTier {
    constructor(roomTier, roomTierPercentage, roomTierName) {
        this.roomTier = roomTier;
        this.roomTierPercentage = roomTierPercentage;
        this.roomTierName = roomTierName;
    }

    toString() {
        return "room tier name: " + this.roomTierName;
    }
}
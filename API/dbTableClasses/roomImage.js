class roomImage {
    constructor(imageId, imageName, imageAlt, roomTypeId) {
        this.imageId = imageId;
        this.imageName = imageName;
        this.imageAlt = imageAlt;
        this.roomTypeId = roomTypeId;
    }

    toString() {
        return "image name: " + this.imageName;
    }
}
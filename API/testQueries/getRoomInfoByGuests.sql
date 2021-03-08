DECLARE @numberPeople int = 4;

SELECT room.roomNumber, 
    type.roomTypeName, type.maxOccupancy, type.totalCost, 
    img.imageName, amen.amenityName
    FROM rooms room
    JOIN roomTypes type on room.roomTypeId = type.roomTypeId 
    JOIN roomImages img on type.roomTypeId = img.roomTypeId 
    JOIN roomtiers tier on type.roomTierId = tier.roomTierId
    JOIN tierdetail det on type.roomTierId = tier.roomTierId
    JOIN amenities amen on det.amenityName = amen.amenityName 
    WHERE type.maxOccupancy >= @numberPeople;
DECLARE @roomTypeId int = 3;

SELECT r.roomTypeId, s.*, t.*, i.imageId, i.imageName, i.imageAlt, td.isFeatured, a.*
FROM roomTypes r
JOIN roomSizes s ON r.roomSizeId = s.roomSizeId
JOIN roomTiers t ON r.roomTierId = t.roomTierId
JOIN roomImages i ON r.roomTypeId = i.roomTypeId
LEFT JOIN tierDetail td ON r.roomTierId = td.roomTierId
LEFT JOIN amenities a ON td.amenityId = a.amenityId
WHERE r.roomTypeId = @roomTypeId;
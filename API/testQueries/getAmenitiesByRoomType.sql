DECLARE @roomTypeId int = 3;

SELECT rt.roomTypeId, a.amenityName
    FROM roomTypes rt
    JOIN tierDetail td ON rt.roomTierId = td.roomTierId
    JOIN amenities a ON td.amenityName = a.amenityName
    WHERE rt.roomTypeId = @roomTypeId;
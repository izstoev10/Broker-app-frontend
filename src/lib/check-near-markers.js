export const checkNearMarkers = (markerPoint, centerPoint, radius) => {
  const earthRadiusKm = 6371;
  const dLat = degreesToRadians(markerPoint.latitude - centerPoint.lat);
  const dLon = degreesToRadians(markerPoint.longitude - centerPoint.lng);
  const latRadius = degreesToRadians(centerPoint.lat);
  const lngRadius = degreesToRadians(markerPoint.latitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(latRadius) * Math.cos(lngRadius);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const calcRadius = earthRadiusKm * c;
  return radius >= calcRadius;
};

const degreesToRadians = (degrees) => {
  return (degrees * Math.PI) / 180;
};

import React, { useCallback, useRef } from "react";
import { DrawingManager, Polygon } from "@react-google-maps/api";
import { useGoogleMapsContext } from "../../../contexts/google-maps-context";
import { markersData } from "../../../__mocks__/markers";

const shapeOptions = {
  fillColor: "red",
  strokeColor: "red",
  fillOpacity: 0.1,
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: true,
  editable: true,
  draggable: false,
  zIndex: 1,
  suppressUndo: true,
};

const GoogleMapsGeofence = () => {
  const { drawingMode, setDrawingMode, currentGeofence, setCurrentGeofence, setMarkers } =
    useGoogleMapsContext();
  const polygonRef = useRef(null);
  const listenerRef = useRef([]);
  const options = {
    polygonOptions: shapeOptions,
    circleOptions: shapeOptions,
    rectangleOptions: shapeOptions,
  };

  const getPolygonLatLng = (polygon) => {
    return polygon
      .getPath()
      .getArray()
      .map((item) => ({ lat: item.lat(), lng: item.lng() }))
      .map((location) => {
        return new google.maps.LatLng(location.lat, location.lng);
      });
  };

  const onPolygonChange = (polygonPaths) => {
    const polygon = new google.maps.Polygon({ paths: polygonPaths });
    const allMarkers = markersData.filter((marker) => {
      const latLng = new google.maps.LatLng(marker.latitude, marker.longitude);
      const isInRange = google.maps.geometry.poly.containsLocation(latLng, polygon);
      if (isInRange) return marker;
    });
    setMarkers(allMarkers);
  };

  const onPolygonComplete = (shape) => {
    const polygonPaths = getPolygonLatLng(shape);
    onPolygonChange(polygonPaths);
    shape.setMap(null);
    setCurrentGeofence(shape);
    setDrawingMode("");
  };
  
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = getPolygonLatLng(polygonRef.current);
      onPolygonChange(nextPath);
    }
  }, [setCurrentGeofence]);

  const onLoad = useCallback(
    (polygon) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenerRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  const onUnmount = useCallback(() => {
    listenerRef.current.forEach((events) => {
      events.remove();
    });
    polygonRef.current = null;
  });

  return (
    <>
      <DrawingManager
        options={options}
        drawingMode={drawingMode}
        onPolygonComplete={onPolygonComplete}
        editable
      />
      {currentGeofence?.visible && (
        <Polygon
          options={shapeOptions}
          path={currentGeofence.getPath().getArray()}
          onLoad={onLoad}
          onMouseUp={onEdit}
          onDragEnd={onEdit}
          onUnmount={onUnmount}
        />
      )}
    </>
  );
};

export default GoogleMapsGeofence;

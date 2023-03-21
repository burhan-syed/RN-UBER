import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import tw from "twrnc";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOrigin,
  selectDestination,
  setTravelTimeInformation,
} from "../slices/navSlice";
import { GOOGLE_MAPS_APIKEY } from "@env";
const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  const mapRef = useRef(null);

  useEffect(() => {
    if (!destination) return;

    //Zoom and fit to markers
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!destination || !origin || !GOOGLE_MAPS_APIKEY) return;
    const getTravelTime = async () => {
      const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origin=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`;
      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTravelTimeInformation(data?.rows?.[0]?.elements?.[0]));
        });
    };
    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin?.location?.lat ?? 37.78825,
        longitude: origin?.location?.lng ?? -122.4324,
        // latitudeDelta: 0.005,
        // longitudeDelta: 0.005,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {/* {destination && (
        <MapViewDirections
          origin={origin?.description ?? "origin description"}
          destination={destination?.description ?? "dest description"}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )} */}

      {(origin?.location || true) && (
        <Marker
          coordinate={{
            latitude: origin?.location?.lat ?? 37.78825,
            longitude: origin?.location?.lng ?? -122.4324,
          }}
          title="Origin"
          description={origin?.description ?? "description"}
          identifier="origin"
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination?.location?.lat ?? 37.78825,
            longitude: destination?.location?.lng ?? -122.4324,
          }}
          title="Destination"
          description={destination?.description ?? "description"}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;

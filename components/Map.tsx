import { useFetch } from "@/lib/fetch";
import {
  calculateDriverTimes,
  calculateRegion,
  generateMarkersFromData,
} from "@/lib/map";
import { useDriverStore, userLocation } from "@/store";
import { Driver, MarkerData } from "@/types/type";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { ActivityIndicator } from "react-native-paper";
import MapViewDirections from "react-native-maps-directions";

const Map = () => {
  const { data: drivers, loading, error } = useFetch<Driver[]>("/(api)/driver");
  const {
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  } = userLocation();

  // console.log({drivers});

  const [isLocationReady, setIsLocationReady] = useState(false);
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const { selectedDriver, setDrivers } = useDriverStore();

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  useEffect(() => {
    // Check if the location is available
    if (userLatitude && userLongitude) {
      setIsLocationReady(true); // Set location ready to true when data is available
    } else {
      console.log("User location is not available.");
    }
  }, [userLatitude, userLongitude]);

  useEffect(() => {
    setDrivers(drivers as MarkerData[]);
    if (isLocationReady && Array.isArray(drivers)) {
      // Generate markers when location is ready
      const newMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude: userLatitude as number,
        userLongitude: userLongitude as number,
      });

      // console.log("Generated Markers:", newMarkers);

      if (newMarkers && newMarkers.length > 0) {
        setMarkers(newMarkers);
      } else {
        console.log("No markers generated.");
      }
    }
  }, [isLocationReady, drivers, userLatitude, userLongitude]);

  useEffect(() => {
    console.log("problem started");
    // console.log(markers);

    if (
      markers.length > 0 &&
      destinationLatitude !== undefined &&
      destinationLongitude !== undefined
    ) {
      console.log("if block started");

      calculateDriverTimes({
        markers,
        destinationLatitude,
        destinationLongitude,
        userLatitude,
        userLongitude,
      }).then((drivers) => {
        setDrivers(drivers as MarkerData[]);
      });
    }
  }, [markers, destinationLatitude, destinationLongitude]);

  // console.log("Markers in state:", markers);

  if (!isLocationReady) {
    return <Text>Loading user location...</Text>; // Show a loading state until location is ready
  }

  if (loading || !userLatitude || !userLongitude) {
    return (
      <View className="flex-1 w-full flex items-center justify-center">
        <ActivityIndicator size="small" color="black" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center w-full">
        <Text>Error occured:{error}</Text>
      </View>
    );
  }

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      style={{ width: "100%", height: "100%" }}
      tintColor="black"
      showsPointsOfInterest={false}
      mapType="standard"
      showsUserLocation={true}
      userInterfaceStyle="light"
      initialRegion={region}
    >
      {markers.length > 0 ? (
        markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
          />
        ))
      ) : (
        <Text>No markers available</Text>
      )}
      {destinationLatitude && destinationLongitude && (
        <>
          <Marker
            key="destination"
            coordinate={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            title="Destination"
          />
          <MapViewDirections
            origin={{ 
              latitude: userLatitude, 
              longitude: userLongitude 
            }}
            destination={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY || ""}
            strokeColor="#0286ff"
            strokeWidth={2}
          />
        </>
      )}
    </MapView>
  );
};

export default Map;

import { Driver, MarkerData } from "@/types/type";

const directionsAPI = process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY;

export const generateMarkersFromData = ({
  data,
  userLatitude,
  userLongitude,
}: {
  data: Driver[];
  userLatitude: number;
  userLongitude: number;
}): MarkerData[] => {
  return data.map((driver) => {
    const latOffset = (Math.random() - 0.5) * 0.01; // Random offset between -0.005 and 0.005
    const lngOffset = (Math.random() - 0.5) * 0.01; // Random offset between -0.005 and 0.005

    return {
      latitude: userLatitude + latOffset,
      longitude: userLongitude + lngOffset,
      title: `${driver.first_name} ${driver.last_name}`,
      ...driver,
    };
  });
};

export const calculateRegion = ({
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude?: number | null;
  destinationLongitude?: number | null;
}) => {
  if (!userLatitude || !userLongitude) {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  if (!destinationLatitude || !destinationLongitude) {
    return {
      latitude: userLatitude,
      longitude: userLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  const minLat = Math.min(userLatitude, destinationLatitude);
  const maxLat = Math.max(userLatitude, destinationLatitude);
  const minLng = Math.min(userLongitude, destinationLongitude);
  const maxLng = Math.max(userLongitude, destinationLongitude);

  const latitudeDelta = (maxLat - minLat) * 1.3; // Adding some padding
  const longitudeDelta = (maxLng - minLng) * 1.3; // Adding some padding

  const latitude = (userLatitude + destinationLatitude) / 2;
  const longitude = (userLongitude + destinationLongitude) / 2;

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
};

export const calculateDriverTimes = async ({
  markers,
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  markers: MarkerData[];
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
}) => {
  console.log("Calculating driver times...");
  console.log("User Location:", userLatitude, userLongitude);
  console.log("Destination:", destinationLatitude, destinationLongitude);

  if (
    userLatitude === null ||
    userLongitude === null ||
    destinationLatitude === null ||
    destinationLongitude === null
  ) {
    console.warn("Invalid user or destination coordinates.");
    return [];
  }

  try {
    console.log("Try block started");

    // markers.forEach((marker) => {
    //   console.log("Marker Location:", marker.latitude, marker.longitude);
    // });

    const timesPromises = markers.map(async (marker) => {
      try {
        console.log("Try block started 2");
        // Fetch time from marker to user
        const responseToUser = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${marker.latitude},${marker.longitude}&destination=${userLatitude},${userLongitude}&key=AIzaSyANdLxXxRfRtW3XiwKOsWWcRud1ehql6uk`
        );
        const dataToUser = await responseToUser.json();

        if (!dataToUser.routes?.length || !dataToUser.routes[0].legs?.length) {
          throw new Error("Invalid response for marker to user.");
        }

        const timeToUser = dataToUser.routes[0].legs[0].duration.value; // Time in seconds

        // Fetch time from user to destination
        const responseToDestination = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${userLatitude},${userLongitude}&destination=${destinationLatitude},${destinationLongitude}&key=AIzaSyANdLxXxRfRtW3XiwKOsWWcRud1ehql6uk`
        );
        const dataToDestination = await responseToDestination.json();

        if (
          !dataToDestination.routes?.length ||
          !dataToDestination.routes[0].legs?.length
        ) {
          throw new Error("Invalid response for user to destination.");
        }

        const timeToDestination =
          dataToDestination.routes[0].legs[0].duration.value; // Time in seconds

        // Calculate total time and price
        const totalTime = (timeToUser + timeToDestination) / 60; // Convert to minutes
        const price = (totalTime * 0.5).toFixed(2); // Pricing logic

        return { ...marker, time: totalTime, price };
      } catch (error) {
        console.error("Error processing marker:", marker.id, error);
        return { ...marker, time: null, price: null }; // Handle errors gracefully
      }
    });

    return await Promise.all(timesPromises);
  } catch (error) {
    console.error("Error calculating driver times:", error);
    return [];
  }
};

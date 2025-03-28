import { View, Text } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GooglePlacesAutocompleteProps } from "@/types/type";

const googlePlacesAPIKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const PlaceInputText = ({
  icon,
  handlePress,
  placeHolder
}: GooglePlacesAutocompleteProps) => {
  return (
    <View
      className={`flex flex-row w-full py-2 items-center justify-center relative z-50`}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder={placeHolder}
        debounce={200}
        styles={{
          textInputContainer: {
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            marginHorizontal: 10,
            position: "relative",
            shadowColor: "#d4d4d4",
            paddingVertical:2
          },
          textInput: {
            backgroundColor: "white",
            fontSize: 16,
            fontWeight: 600,
            width: "100%",
            borderRadius: 15,
            borderBottomWidth:1
          },
          listView: {
            backgroundColor: "white",
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
        onPress={(data, details) => {
          // console.log("Google API data:", data);  // Log the description
          // console.log("Google API details:", details);  // Log the full details

          // Ensure that we have valid details before proceeding
          if (details?.geometry?.location) {
            handlePress({
              latitude: details.geometry.location.lat ?? 0,
              longitude: details.geometry.location.lng ?? 0,
              address: data.description,
            });
          } else {
            console.log("Details are missing the location data.");
          }
        }}
        query={{ key: googlePlacesAPIKey, language: "en" }}
        renderLeftButton={() => {
          return <View>{icon}</View>;
        }}
      />
    </View>
  );
};

export default PlaceInputText;

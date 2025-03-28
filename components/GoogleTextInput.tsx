import { GoogleInputProps } from "@/types/type";
import { Text, TouchableOpacity, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const googleApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleTextInput = ({
  icon,
  returnIcon,
  handlePress,
  handleCancel,
  containerStyle,
  textInputBackgroundColor,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row w-full p-2 items-center justify-center relative z-50 ${containerStyle}`}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Where you want to go?"
        debounce={200}
        styles={{
          textInputContainer: {
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            marginHorizontal: 10,
            position: "relative",
            shadowColor: "#d4d4d4",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor || "white",
            fontSize: 16,
            fontWeight: 600,
            width: "100%",
            borderRadius: 20,
          },
          listView: {
            backgroundColor: textInputBackgroundColor || "white",
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
        query={{ key: googleApiKey, language: "en" }}
        renderLeftButton={() => {
          return <View>{icon}</View>;
        }}
        renderRightButton={() => {
          return (
            <TouchableOpacity onPress={handleCancel}>
              {returnIcon}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default GoogleTextInput;

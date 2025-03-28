import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import RideLayout from "@/components/RideLayout";
import GoogleTextInput from "@/components/GoogleTextInput";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { userLocation } from "@/store";
import PlaceInputText from "@/components/PlaceInputText";
import { useRouter } from "expo-router";

const TargetIcon = <MaterialCommunityIcons name="target" size={28} />;
const MapIcon = <MaterialIcons name="map" size={28} />;

const FindRide = () => {
  const router=useRouter()
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = userLocation();
  return (
    <RideLayout title="Find Ride" snapPoints={["14%", "35%"]}>
      <View  className="flex flex-col w-full">
        <Text className="text-2xl font-bold" >From</Text>
        <PlaceInputText
        placeHolder="Where are you?"
          icon={MapIcon}
          handlePress={(location) => setUserLocation(location)}
        />
      </View>
      <View className="flex flex-col w-full mt-2">
        <Text className="text-2xl font-bold" >To</Text>
        <PlaceInputText
        placeHolder="Where you want to go?"
          icon={TargetIcon}
          handlePress={(location) => setDestinationLocation(location)}
        />
      </View>
      <TouchableOpacity onPress={()=>router.push('/(root)/confirm-ride')} className="bg-black px-2 py-3 rounded-full items-center w-[90%] mt-4 mx-auto" >
        <Text className="text-white font-bold text-3xl" >Confirm Ride</Text>
      </TouchableOpacity>
    </RideLayout>
  );
};

export default FindRide;

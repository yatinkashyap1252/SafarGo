import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { useFetch } from "@/lib/fetch";
import { userLocation } from "@/store";
import { useUser } from "@clerk/clerk-expo";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import "react-native-get-random-values";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { setDestinationLocation, setUserLocation } = userLocation();
  const [hasPermission, setHasPermission] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useUser();
  const router=useRouter()
  const {data:recentRides=[],loading}=useFetch(`/(api)/(ride)/${user?.id}`)
  const searchIcon = <MaterialIcons name="search" size={30} />;
  const returnIcon = <MaterialIcons name="clear" size={30} />;

  const handleDestinationSearch = () => {
    setIsSearchOpen((prev) => !prev); // Toggle search box visibility
  };

  // Handle destination selection
  const handleDestinationSelection = ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    console.log("Updating destination location:", { latitude, longitude, address });
    
    // Update the state with the new destination
    setDestinationLocation({
      latitude,
      longitude,
      address,
    });

    router.push('/(root)/find-ride')
  
    // If you need to navigate to another screen after this:
    // navigation.navigate("NextScreen", { latitude, longitude, address });
  };
  

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync();
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    };
    requestLocation();
  }, []);

  console.log("Recent Rides Data:", recentRides);

  return (
    <SafeAreaView className="flex-1 p-2">
      <StatusBar style="dark" />
      <FlatList
        className="w-full px-2"
        contentContainerStyle={{
          paddingBottom: 70,
        }}
        scrollEnabled
        data={Array.isArray(recentRides) ? recentRides.slice(0, 5) : []}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={() => (
          <>
            <View className="flex w-full items-start h-fit rounded-e-[25px] my-5">
              {isSearchOpen ? (
                <GoogleTextInput
                  icon={searchIcon}
                  handlePress={handleDestinationSelection}
                  containerStyle="bg-white shadow-md shadow-neutral-300 rounded-[20px]"
                  textInputBackgroundColor=""
                  returnIcon={returnIcon}
                  handleCancel={handleDestinationSearch}
                />
              ) : (
                <TouchableOpacity
                  onPress={handleDestinationSearch}
                  className="flex w-12 h-12 absolute bg-zinc-300 justify-center items-center rounded-full top-0 z-10 right-0"
                >
                  <MaterialIcons name="search" size={24} color="black" />
                </TouchableOpacity>
              )}
              <Text className="text-[35px] font-light tracking-wider">
                Welcome,
              </Text>
              <View className="flex-row items-center">
                <Text
                  className={`text-[35px] font-bold capitalize ${
                    isSearchOpen ? "-mt-2" : "mt-2"
                  }`}
                >
                  {user?.firstName ||
                    user?.emailAddresses[0].emailAddress.split("@")[0]}
                </Text>
                <Text className="text-[35px]">👋</Text>
              </View>
              <View className="rounded-xl bg-white w-full h-fit p-3 mt-7">
                <Text className="text-2xl font-bold text-zinc-600 mb-3">
                  Your current location:
                </Text>
                <View className="w-full h-[275]" >
                <Map />
                </View>
              </View>
            </View>
            <Text className="text-2xl my-3 font-bold ">Recent Rides</Text>
          </>
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center">
            {loading ? (
              <ActivityIndicator size={30} color="black" />
            ) : (
              <Text className="font-bold text-3xl text-slate-600">Empty</Text>
            )}
          </View>
        )}
        renderItem={({ item }) => {
          return (
            <RideCard
              ride={{
                ...item,
                fare_price: Number(item.fare_price),
                origin_latitude: Number(item.origin_latitude),
                origin_longitude: Number(item.origin_longitude),
                destination_latitude: Number(item.destination_latitude),
                destination_longitude: Number(item.destination_longitude),
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
}
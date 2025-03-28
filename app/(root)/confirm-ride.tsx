import DriverCard from "@/components/DriverCard";
import RideLayout from "@/components/RideLayout";
import { useDriverStore } from "@/store";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const ConfirmRide = () => {
  const router = useRouter();
  const { selectedDriver, drivers, setSelectedDriver } = useDriverStore();
  console.log({selectedDriver});
  
  return (
    <RideLayout title="Choose a Driver" snapPoints={["12%", "65%"]}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => (
          <DriverCard
            selected={selectedDriver}
            setSelected={() => setSelectedDriver(Number(item.id!))}
            item={item}
          />
        )}
        ListFooterComponent={() => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => router.push("/(root)/book-ride")}
                className="bg-black rounded-full p-3 items-center mt-7"
              >
                <Text className="text-white font-bold text-[25px]">
                  Book Ride
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </RideLayout>
  );
};

export default ConfirmRide;

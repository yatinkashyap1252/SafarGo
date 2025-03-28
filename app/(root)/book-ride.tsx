import Payment from "@/components/Payment";
import RideLayout from "@/components/RideLayout";
import { useDriverStore, userLocation } from "@/store";
import { MarkerData } from "@/types/type";
import { formatTime } from "@/utils/formatDate";
import { useUser } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StripeProvider } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  View
} from "react-native";

const BookRide = () => {
  const { userAddress, destinationAddress } = userLocation();
  const { drivers, selectedDriver } = useDriverStore();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [driverDetails, setDriverDetails] = useState<MarkerData | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchDriverDetails = async () => {
      try {
        const selectedDriverData = drivers?.find(
          (driver) => +driver.id === selectedDriver
        );
        setDriverDetails(selectedDriverData || null);
      } catch (error) {
        console.error("Error fetching driver details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverDetails();
  }, [drivers, selectedDriver]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading ride details...</Text>
      </View>
    );
  }

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      merchantIdentifier="merchant.safar.com"
      urlScheme="myapp"
    >
      <RideLayout title="Book Ride" snapPoints={["12%", "55%"]}>
        <View>
          <Text
            className="text-3xl font-bold text-center my-2"
            style={{ letterSpacing: 2 }}
          >
            Ride Details
          </Text>
          <View className="w-fit mx-auto my-2">
            <Image
              source={{ uri: driverDetails?.profile_image_url }}
              style={{ width: 124, height: 124, borderRadius: 62 }}
              resizeMode="cover"
            />
          </View>
          <View className="flex-col items-center mx-auto p-2 pb-4 rounded-[25px]">
            <Text className="text-2xl font-semibold">
              {driverDetails?.first_name} {driverDetails?.last_name}
            </Text>
            <Text>⭐ {driverDetails?.rating}</Text>
          </View>
          <View className="flex-col w-[96%] rounded-xl mx-auto bg-blue-100">
            <View className="flex-row justify-between p-2 border-b-2 border-white items-center rounded-[25px]">
              <Text className="text-xl">Car Seats</Text>
              <Text className="text-xl">-</Text>
              <Text className="text-2xl font-semibold w-20 text-right flex">
                {driverDetails?.car_seats}
              </Text>
            </View>
            <View className="flex-row justify-between p-2 border-b-2 border-white items-center rounded-[25px]">
              <Text className="text-xl">Ride Fare</Text>
              <Text className="text-xl">-</Text>
              <Text className="text-2xl font-semibold w-20 text-right">
                {driverDetails?.price}
              </Text>
            </View>
            <View className="flex-row justify-between p-2 items-center rounded-[25px]">
              <Text className="text-xl">Ride Time</Text>
              <Text className="text-xl">-</Text>
              <Text className="text-2xl font-semibold w-20 text-right">
                {formatTime(parseInt(`${driverDetails?.time!}`))}
              </Text>
            </View>
          </View>
          <View>
            <View className="flex-row w-[96%] items-center mx-auto mt-4 bg-[#f8f8f8] p-1 rounded-2xl">
              <MaterialCommunityIcons
                name="source-commit-start"
                size={40}
                className="mb-2"
                color="black"
              />
              <Text className="text-xl w-[90%] font-semibold">{userAddress}</Text>
            </View>
            <View className="flex-row w-[96%] items-center mx-auto mt-4 bg-[#f8f8f8] p-1 rounded-2xl">
              <MaterialCommunityIcons
                name="map-marker"
                size={40}
                className="mb-2"
                color="black"
              />
              <Text className="text-xl w-[90%] font-semibold">
                {destinationAddress}
              </Text>
            </View>
          </View>
          <Payment
            fullName={user?.fullName!}
            email={user?.emailAddresses[0].emailAddress!}
            amount={driverDetails?.price!}
            driverId={driverDetails?.id!}
            rideTime={driverDetails?.time!}
          />
        </View>
      </RideLayout>
    </StripeProvider>
  );
};

export default BookRide;

// import Payment from "@/components/Payment";
// import RideLayout from "@/components/RideLayout";
// import { useDriverStore, userLocation } from "@/store";
// import { useUser } from "@clerk/clerk-expo";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { StripeProvider } from "@stripe/stripe-react-native";
// import React from "react";
// import { Image, Text, View } from "react-native";

// const BookRide = () => {
//   const { userAddress, destinationAddress } = userLocation();
//   const { drivers, selectedDriver } = useDriverStore()
//   const {user}=useUser()

//   const driverDetails = drivers?.filter(
//     (driver) => +driver.id === selectedDriver
//   )[0];

//   console.log({drivers});
//   // console.log({selectedDriver});

//   return (
//     <StripeProvider
//       publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
//       merchantIdentifier="merchant.safargo.com"
//       urlScheme="myapp"
//     >
//       <RideLayout title="Book Ride" snapPoints={["12%", "55%"]}>
//         <View>
//           <Text
//             className="text-3xl font-bold text-center my-2"
//             style={{ letterSpacing: 2 }}
//           >
//             Ride Details
//           </Text>
//           <View className="w-fit mx-auto my-2">
//             <Image
//               source={{ uri: driverDetails.profile_image_url }}
//               style={{ width: 124, height: 124, borderRadius: 62 }}
//               resizeMode="cover"
//             />
//           </View>
//           <View className="flex-col items-center mx-auto p-2 pb-4 rounded-[25px]">
//             <Text className="text-2xl font-semibold">
//               {driverDetails.first_name}
//               {driverDetails.last_name}
//             </Text>
//             <Text>⭐ {driverDetails.rating}</Text>
//           </View>
//           <View className="flex-col w-[96%] rounded-xl mx-auto bg-blue-100">
//             <View className="flex-row justify-between p-2 border-b-2 border-white items-center rounded-[25px]">
//               <Text className="text-xl">Car Seats</Text>
//               <Text className="text-xl">-</Text>
//               <Text className="text-2xl font-semibold w-12 text-right flex">
//                 {driverDetails.car_seats}
//               </Text>
//             </View>
//             <View className="flex-row justify-between p-2 border-b-2 border-white items-center rounded-[25px]">
//               <Text className="text-xl">Ride Fare</Text>
//               <Text className="text-xl">-</Text>
//               <Text className="text-2xl font-semibold w-12 text-right">
//                 {driverDetails.price}
//               </Text>
//             </View>
//           </View>
//           <View>
//             <View className="flex-row w-[96%] items-center mx-auto mt-4 bg-[#f8f8f8] p-1 rounded-2xl">
//               <MaterialCommunityIcons
//                 name="source-commit-start"
//                 size={40}
//                 className="mb-2"
//                 color="black"
//               />
//               <Text className="text-2xl font-semibold">{userAddress}</Text>
//             </View>
//             <View className="flex-row w-[96%] items-center mx-auto mt-4 bg-[#f8f8f8] p-1 rounded-2xl">
//               <MaterialCommunityIcons
//                 name="map-marker"
//                 size={40}
//                 className="mb-2"
//                 color="black"
//               />
//               <Text className="text-2xl w-[95%] font-semibold">
//                 {destinationAddress}
//               </Text>
//             </View>
//           </View>
//           <Payment
//           fullName={user?.fullName!}
//           email={user?.emailAddresses[0].emailAddress!}
//           amount={driverDetails?.price!}
//           driverId={driverDetails?.id!}
//           rideTime={driverDetails?.time!} />
//         </View>
//       </RideLayout>
//     </StripeProvider>
//   );
// };

// export default BookRide;

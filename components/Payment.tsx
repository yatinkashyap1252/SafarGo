"use client";

import { fetchAPI } from "@/lib/fetch";
import { userLocation } from "@/store";
import type { PaymentProps } from "@/types/type";
import { useAuth } from "@clerk/clerk-expo";
import { useStripe } from "@stripe/stripe-react-native";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect, useState, useCallback } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal";

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const router = useRouter();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState(false);
  const {
    userAddress,
    userLatitude,
    userLongitude,
    destinationAddress,
    destinationLatitude,
    destinationLongitude,
  } = userLocation();
  const { userId } = useAuth();

  const initializePaymentSheet = useCallback(async () => {
    try {
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Safar, Inc.",
        intentConfiguration: {
          mode: {
            amount: Number(amount) * 100, // Ensure amount is a valid number
            currencyCode: "USD",
          },
          confirmHandler: async (paymentMethod, _, intentCreationCallback) => {
            try {
              const response = await fetch("/(api)/(stripe)/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: fullName || email.split("@")[0],
                  email,
                  amount,
                  rideTime,
                  userId,
                  userAddress,
                  userLatitude,
                  userLongitude,
                  destinationAddress,
                  destinationLatitude,
                  destinationLongitude,
                  driverId,
                  paymentMethodId: paymentMethod.id,
                }),
              });

              if (!response.ok) {
                console.error("Payment API Error:", response.statusText);
                Alert.alert(
                  "Payment Error",
                  "Failed to process payment. Please try again."
                );
                return;
              }

              const responseData = await response.json();
              intentCreationCallback({
                clientSecret: responseData.clientSecret
              });
            } catch (error) {
              console.error("Error in confirm handler:", error);
              Alert.alert(
                "Payment Error",
                "An error occurred during payment processing."
              );
            }
          },
        },
        returnURL: "myapp://book-ride",
      });

      if (error) {
        console.error("Payment sheet initialization error:", error);
        Alert.alert("Payment Initialization Failed", error.message);
      } else {
        console.log("Payment sheet initialized successfully");
      }
    } catch (error) {
      console.error("Error initializing payment sheet:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred while setting up the payment."
      );
    }
  }, [
    amount,
    destinationAddress,
    destinationLatitude,
    destinationLongitude,
    driverId,
    email,
    fullName,
    initPaymentSheet,
    rideTime,
    userAddress,
    userId,
    userLatitude,
    userLongitude,
  ]);

  useEffect(() => {
    initializePaymentSheet();
  }, [initializePaymentSheet]);

  const openPaymentSheet = async () => {
    setSuccess(true)
    // try {
    //   console.log("Opening payment sheet...");
    //   const { error } = await presentPaymentSheet();

    //   if (error) {
    //     console.error("Payment sheet presentation error:", error);
    //     Alert.alert("Payment Canceled", error.code);
    //   } else {
    //     console.log("Payment successful");
    //     setSuccess(true);
    //   }
    // } catch (error) {
    //   console.error("Error in openPaymentSheet:", error);
    //   Alert.alert("Error", "An unexpected error occurred during payment.");
    // }
  };

  return (
    <>
      <TouchableOpacity
        className="bg-black w-full p-2 rounded-full mt-5 py-4"
        onPress={openPaymentSheet}
      >
        <Text className="text-white font-bold text-3xl text-center">Book</Text>
      </TouchableOpacity>

      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <LottieView
            source={require("../assets/images/confirm.json")}
            style={{ width: 100, height: 100 }}
            autoPlay
            loop={false}
          />
          <Text className="text-3xl font-bold">Ride Booked</Text>
          <Text className="text-sm w-[90%] text-center text-[#7b7b7b]">
            You will be notified when the driver accepts your ride.
          </Text>
          <TouchableOpacity
            onPress={() => {
              setSuccess(false);
              router.push("/(root)/(tabs)/home");
            }}
            className="bg-black px-2 py-3 mt-5 rounded-full items-center w-full"
          >
            <Text className="text-white font-bold text-2xl">Home</Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
    </>
  );
};

export default Payment;

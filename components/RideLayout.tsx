import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "./Map";

const RideLayout = ({
  title,
  children,
  snapPoints
}: {
  title: string;
  children: React.ReactNode;
  snapPoints?:string[]
}) => {
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <StatusBar style="dark" backgroundColor="#fff" />
        <View className="flex-1 bg-white">
          <View className="flex flex-col h-screen ">
            <View
              className="w-full absolute bg-[#ffffff] top-0 min-h-20 z-10 px-3 py-2 items-center flex-row"
              style={{
                borderBottomLeftRadius: 26,
                borderBottomRightRadius: 26,
              }}
            >
              <TouchableOpacity
                onPress={() => router.back()}
                className="p-1 rounded-full bg-black"
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={37}
                  color="white"
                />
              </TouchableOpacity>
              <Text className="text-3xl text-black font-bold ml-3">
                {title || "Go back"}
              </Text>
            </View>
            <Map />
            <BottomSheet
            keyboardBehavior="extend"
              ref={bottomSheetRef}
              index={0}
              snapPoints={snapPoints || ["43%", "85%"]}
            >
              <BottomSheetView
                style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 10 }}
              >
                {children}
              </BottomSheetView>
            </BottomSheet>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default RideLayout;

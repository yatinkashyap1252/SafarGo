import React from "react";
import { Tabs } from "expo-router";
import { Image, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "white",
          height: 64,
          borderRadius: 35,
          marginHorizontal: 20,
          marginBottom: 15,
          paddingBottom: 0,
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow:"0 0 15px #888"
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className={`flex h-12 w-12 mb-8 justify-center items-center rounded-full ${focused?"bg-green-400":""}`}>
              <MaterialIcons
                name="home-filled"
                size={34}
                color={`${focused?"white":"black"}`}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className={`flex h-12 w-12 mb-8 justify-center items-center rounded-full ${focused?"bg-green-400":""}`} >
              <MaterialIcons name="chat" size={30} color={`${focused?"white":"black"}`} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="ride"
        options={{
          title: "Ride",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className={`flex h-12 w-12 mb-8 justify-center items-center rounded-full ${focused?"bg-green-400":""}`} >
              <MaterialIcons name="list" size={36} color={`${focused?"white":"black"}`} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className={`flex h-12 w-12 mb-8 justify-center items-center rounded-full ${focused?"bg-green-400":""}`} >
              <MaterialIcons name="account-circle" size={34} color={`${focused?"white":"black"}`} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

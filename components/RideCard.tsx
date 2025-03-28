import { Ride } from "@/types/type";
import { formatDate, formatTime } from "@/utils/formatDate";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

const RideCard = ({ ride }: { ride: Ride }) => {
  const url = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`;

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#fff",
        marginBottom: 12,
        borderRadius: 12,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // For Android shadow
      }}
    >
      {/* Top section with Image */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
        }}
      >
        <Image
          source={{ uri: url }}
          style={{
            width: 120,
            height: 100,
            borderRadius: 10,
          }}
          resizeMode="cover"
        />

        {/* Ride Details */}
        <View style={{ flex: 1 }}>
          {/* From Location */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <MaterialIcons name="wallet-travel" size={22} color="#444" />
            <Text
              style={{
                marginLeft: 8,
                fontSize: 14,
                color: "#333",
                fontWeight: "500",
              }}
            >
              {ride.origin_address}
            </Text>
          </View>

          {/* To Location */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <MaterialIcons name="mode-of-travel" size={22} color="#444" />
            <Text
              style={{
                marginLeft: 8,
                fontSize: 14,
                color: "#333",
                fontWeight: "500",
              }}
            >
              {ride.destination_address}
            </Text>
          </View>

          {/* Date and Time */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <MaterialIcons name="calendar-today" size={22} color="#444" />
            <Text
              style={{
                marginLeft: 8,
                fontSize: 14,
                color: "#333",
                fontWeight: "500",
              }}
            >
              {formatDate(ride.created_at)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="lock-clock" size={22} color="#444" />
            <Text
              style={{
                marginLeft: 8,
                fontSize: 14,
                color: "#333",
                fontWeight: "500",
              }}
            >
              {formatTime(ride.ride_time)}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-row justify-between" style={{borderTopWidth:2,paddingTop:12,marginTop:10}} >
        <Text>Driver</Text>
        <View className="flex-row">
          <Text>{ride.driver.first_name}</Text>
          <Text>{ride.driver.last_name}</Text>
        </View>
      </View>
    </View>
  );
};

export default RideCard;

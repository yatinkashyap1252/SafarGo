import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { DriverCardProps } from "@/types/type";
import { formatTime } from "@/utils/formatDate";

const DriverCard = ({ item, selected, setSelected }: DriverCardProps) => {
  return (
    <TouchableOpacity
      onPress={() => setSelected(item.id)}
      className="w-[97%] flex flex-row items-center mb-4 p-3 mx-auto rounded-[20px] bg-[#f8f7f7]"
    >
      <View className="mr-2">
        <Image
          className="rounded-full"
          source={{ uri: item.profile_image_url }}
          style={{ width: 50, height: 50 }}
          resizeMode="cover"
        />
      </View>
      <View className="flex-col flex-1">
        <View>
          <Text className="text-2xl font-bold">
            {item.first_name} {item.last_name}
          </Text>
        </View>
        <View className="flex-row">
          <Text className="text-sm">💲 {item.price} |</Text>
          <Text className="text-sm"> ⭐ {item.rating} |</Text>
          <Text className="text-sm"> 💺 {item.car_seats} |</Text>
          <Text className="text-sm">
            🕛 {formatTime(parseInt(`${item.time}`))}
          </Text>
        </View>
      </View>
      <View className="w-[50px] h-[50px]">
        <Image
          source={{ uri: item.car_image_url }}
          style={{ width: 50, height: 50 }}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

export default DriverCard;

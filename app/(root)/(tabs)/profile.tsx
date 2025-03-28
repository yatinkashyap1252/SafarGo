import { useUser, useAuth } from "@clerk/clerk-expo";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const signoutHandler = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="dark" />
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className="text-2xl font-bold text-center mt-10">Profile</Text>

        <View className="flex items-center justify-center my-5">
          <Image
            source={{
              uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
            }}
            style={{ width: 110, height: 110, borderRadius: 55 }}
            className="border-[3px] border-white shadow-sm shadow-neutral-300"
          />
        </View>

        <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
          <TextInput
            placeholder={user?.firstName || "Not Found"}
            editable={false}
          />
          <TextInput
            placeholder={user?.lastName || "Not Found"}
            editable={false}
          />
          <TextInput
            placeholder={user?.primaryEmailAddress?.emailAddress || "Not Found"}
            editable={false}
          />
          <TextInput
            placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
            editable={false}
          />
        </View>

        <View className="w-[95%] mx-auto pt-5">
          <TouchableOpacity
            onPress={signoutHandler}
            className="px-4 py-5 bg-[#f4f4f4] rounded-lg"
          >
            <Text className="text-2xl font-semibold text-center">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

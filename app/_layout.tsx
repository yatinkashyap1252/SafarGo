import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import "../global.css";

import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import { tokenCache } from "./cache";
import { Provider } from "react-native-paper";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

export default function RootLayout() {
  useFonts({
    inria: require("../assets/fonts/InriaSans-Regular.ttf"),
    italiana: require("../assets/fonts/Italiana-Regular.ttf"),
    "inria-bold": require("../assets/fonts/InriaSans-Bold.ttf"),
    "inria-bold-italic": require("../assets/fonts/InriaSans-BoldItalic.ttf"),
    "inria-italic": require("../assets/fonts/InriaSans-Italic.ttf"),
    "inria-light": require("../assets/fonts/InriaSans-Light.ttf"),
  });

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }
  return (
    <Provider>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <ClerkLoaded>
          <Stack>
            <StatusBar style="dark" />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(root)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
        </ClerkLoaded>
      </ClerkProvider>
    </Provider>
  );
}

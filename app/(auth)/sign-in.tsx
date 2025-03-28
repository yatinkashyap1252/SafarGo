import { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { InputField } from "@/components/InputFields";
import * as AuthSession from 'expo-auth-session'
import { useSignIn, useSSO } from "@clerk/clerk-expo";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

    // Use the `useSSO()` hook to access the `startSSOFlow()` method
    const { startSSOFlow } = useSSO()
  
    const GoogleSignIn = useCallback(async () => {
      try {
        const { createdSessionId } = await startSSOFlow({
          strategy: "oauth_google",
          redirectUrl: AuthSession.makeRedirectUri(),
        });
    
        if (createdSessionId && setActive) {
          setActive({ session: createdSessionId });
        }
      } catch (err) {
        console.error(JSON.stringify(err, null, 2));
      }
    }, [startSSOFlow, setActive]);
    

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password:form.password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/(root)/(tabs)/home')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, form.email, form.password])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="rgba(0,0,0,0.8)" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        bounces={false}
      >
        {/* Image container */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/door.jpg")}
            resizeMode="cover"
            style={styles.image}
          />
          {/* Text over the image */}
          <View style={styles.textOverlay}>
            <View style={styles.borderTop} />
            <Text style={styles.overlayText}>Safar</Text>
            <Text style={styles.overlaySubText}>Every Trip, A New Story</Text>
            <View style={styles.borderBottom} />
          </View>
        </View>

        {/* Form View */}
        <View style={styles.viewContainer}>
          <Text style={styles.formTitle}>Login Now</Text>
          <InputField
            label="Email"
            placeholder="Enter your email"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            secureTextEntry
          />
          {/* <View style={styles.termsContainer}>
            <Text style={styles.termsText}>I agree to</Text>
            <Text style={styles.termsLink}>terms & condition</Text>
          </View> */}
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={onSignInPress}
          >
            <Text style={styles.signUpButtonText}>Sign In</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "65%",
              marginVertical: 10,
            }}
          >
            <View
              style={{
                width: "35%",
                height: 1,
                backgroundColor: "#cbd5e1",
              }}
            />
            <Text className="font-[inria-bold] text-xl text-slate-300">Or</Text>
            <View
              style={{
                width: "35%",
                height: 1,
                backgroundColor: "#cbd5e1",
              }}
            />
          </View>
          <TouchableOpacity
          onPress={GoogleSignIn}
            style={{
              width: "90%",
              borderRadius: 30,
              borderWidth: 1,
              padding: 13,
            }}
          >
            <Text
              style={{
                fontFamily: "italiana",
                fontSize: 20,
                textAlign: "center",
                letterSpacing: 1,
              }}
            >
              SignIn with Google
            </Text>
          </TouchableOpacity>
          <View className="flex items-center flex-row gap-1">
            <Text className="font-[italiana] mt-1 text-black">
              Don't have an Account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.replace("/(auth)/sign-up");
              }}
            >
              <Text className="font-[italiana] mt-1 text-blue-600 underline">
                Register Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  imageContainer: {
    height: SCREEN_HEIGHT * 0.6,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: "white",
    width: "50%",
    position: "absolute",
    top: "40%",
    left: -56,
  },
  borderBottom: {
    borderTopWidth: 1,
    borderColor: "white",
    width: "50%",
    position: "absolute",
    bottom: "40%",
    right: -56,
  },
  overlayText: {
    fontSize: 54,
    color: "white",
    letterSpacing: 2,
    fontFamily: "italiana",
  },
  overlaySubText: {
    letterSpacing: 5,
    color: "white",
    fontFamily: "italiana",
  },
  viewContainer: {
    backgroundColor: "white",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingTop: 30,
    marginTop: -40,
    minHeight: SCREEN_HEIGHT * 0.5,
  },
  formTitle: {
    fontFamily: "italiana",
    fontSize: 30,
    marginBottom: 20,
    width: "100%",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginTop: 15,
  },
  termsText: {
    fontFamily: "inria",
    fontSize: 12,
  },
  termsLink: {
    fontFamily: "inria-bold",
    fontSize: 12,
    textDecorationLine: "underline",
    color: "#0e7490",
    marginLeft: 5,
  },
  signUpButton: {
    width: "90%",
    backgroundColor: "black",
    borderRadius: 30,
    marginTop: 20,
  },
  signUpButtonText: {
    color: "white",
    textAlign: "center",
    padding: 12,
    fontSize: 24,
    fontFamily: "italiana",
  },
});

export default SignIn;

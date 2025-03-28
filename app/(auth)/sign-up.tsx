import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { InputField } from "@/components/InputFields";
import { useOAuth, useSignUp } from "@clerk/clerk-expo";
import { ReactNativeModal } from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import CustomAlertDialog from "@/components/AlertDialog"; // Import the custom alert dialog
import { fetchAPI } from "@/lib/fetch";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const SignUp = () => {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });
  const [visible, setVisible] = useState(false); // Dialog visibility
  const [errorMessage, setErrorMessage] = useState(""); // Error message


  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

const onGoogleSignUpPress = async () => {
  try {
    const { createdSessionId } = await startOAuthFlow();
    if (createdSessionId) {
      if (setActive) {
        await setActive({ session: createdSessionId });
      }
      router.replace("/(root)/(tabs)/home");
    }
  } catch (err) {
    showErrorDialog(err);
  }
};

  const showErrorDialog = (err: any) => {
    if (err instanceof Error && "errors" in err) {
      const error = err as any;
      setErrorMessage(
        error.errors ? error.errors[0].longMessage : "An unknown error occurred"
      );
    } else {
      setErrorMessage("An unknown error occurred");
    }
    setVisible(true); // Show the dialog
  };

  const hideDialog = () => setVisible(false); // Hide the dialog

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err) {
      showErrorDialog(err); // Show the error in the custom dialog
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      console.log("Hello,verification start");
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      console.log("sending the user data to the server");

      if (signUpAttempt.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: signUpAttempt.createdUserId,
          }),
        });
        console.log("User data sent to the server");

        await setActive({ session: signUpAttempt.createdSessionId });
        console.log("User session set to active");

        setVerification({ ...verification, state: "success" });
        router.replace("/(root)/(tabs)/home");
      } else {
        console.log("Verification failed");

        setVerification({
          ...verification,
          error: "Verification failed",
          state: "failed",
        });
      }
    } catch (err) {
      console.log("Error in verification")
      showErrorDialog(err); // Show the error in the custom dialog
    }
  };

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
            source={require("../../assets/images/signup.jpg")}
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
          <Text style={styles.formTitle}>Create Your Account!</Text>
          <InputField
            label="Name"
            placeholder="Enter your name"
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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
          <TouchableOpacity style={styles.signUpButton} onPress={onSignUpPress}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
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
            style={{
              width: "90%",
              borderRadius: 30,
              borderWidth: 1,
              padding: 13,
            }}
            onPress={onGoogleSignUpPress}
          >
            <Text
              style={{
                fontFamily: "italiana",
                fontSize: 20,
                textAlign: "center",
                letterSpacing: 1,
              }}
            >
              SignUp with Google
            </Text>
          </TouchableOpacity>
          <View className="flex items-center flex-row gap-1">
            <Text className="font-[italiana] mt-1 text-black">
              Already have an Account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.replace("/(auth)/sign-in");
              }}
            >
              <Text className="font-[italiana] mt-1 text-blue-600 underline">
                Login Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") setShowSuccessModel(true);
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px] items-center justify-between">
            <LottieView
              source={require("../../assets/images/loading.json")}
              style={{ width: 200, height: 200 }}
              autoPlay
              loop
            />
            <Text className="font-[italiana] text-[35px] text-start w-full tracking-tighter">
              Verification
            </Text>
            <Text className="font-[inria] text-slate-400 text-xs text-start w-full tracking-widest">
              We've sent a verification code to {form.email}
            </Text>

            {/* OTP Code Input */}
            <TextInput
              style={{
                height: 50,
                width: "100%",
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 15,
                paddingLeft: 10,
                fontSize: 16,
                marginVertical: 15,
              }}
              placeholder="Enter OTP"
              value={verification.code}
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
              keyboardType="number-pad" // Ensure numeric input
              maxLength={6} // Limit input to 5 digits
            />

            {/* Error Message */}
            {verification.error && <Text>{verification.error}</Text>}

            <TouchableOpacity
              className="w-full bg-black rounded-full p-2"
              onPress={onVerifyPress}
            >
              <Text className="text-white text-center font-[italiana] text-3xl">
                Proceed
              </Text>
            </TouchableOpacity>
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={showSuccessModel}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px] items-center justify-between">
            <AntDesign name="checkcircle" color="green" size={80} />
            <Text className="font-[italiana] text-[35px]">Verified</Text>
            <Text className="text-center font-[inria] text-slate-400 text-xs">
              Your account is successfully verified...you can proceed further!
            </Text>
            <TouchableOpacity
              className="w-full bg-black rounded-full p-2"
              onPress={() => {
                setShowSuccessModel(false);
                router.push("/(root)/(tabs)/home");
              }}
            >
              <Text className="text-white text-center font-[italiana] text-3xl">
                Go to Home
              </Text>
            </TouchableOpacity>
          </View>
        </ReactNativeModal>

        {/* Custom Alert Dialog for errors */}
        <CustomAlertDialog
          visible={visible}
          errorMessage={errorMessage}
          hideDialog={hideDialog}
        />
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

export default SignUp;

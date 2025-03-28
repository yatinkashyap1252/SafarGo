import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Swipper from "react-native-swiper";
import { onBoarding } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";

const Welcome = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onBoarding.length - 1;
  const swipperRef = useRef<Swipper>(null);

  // Function to go to the next slide
  const goToNextSlide = () => {
    if (isLastSlide) {
      router.replace("/(auth)/sign-in");
    }
    if (swipperRef.current) {
      swipperRef.current.scrollBy(1, true); // Move forward by 1 slide
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <StatusBar style="light" />
      <Swipper
        ref={swipperRef}
        loop={false}
        dot={<></>} // Hiding the dots
        activeDot={<></>} // Hiding the active dot
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onBoarding.map((item) => (
          <ImageBackground
            key={item.id}
            source={item.image} // Fallback image if no image is provided
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
            resizeMode="cover"
          >
            <LinearGradient
              colors={["rgba(0, 0, 0, 0.6)", "rgba(0, 0, 0, 0.6)"]}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  justifyContent: "space-between",
                  paddingBottom: 40,
                }}
              >
                {/* Skip Button */}
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    paddingRight: 20,
                    paddingTop: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      router.replace("/(auth)/sign-in");
                    }}
                  >
                    <Text
                      style={{
                        color: "#0286fF",
                        fontSize: 16,
                        textDecorationLine: "underline",
                        fontFamily: "inria",
                      }}
                    >
                      Skip
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Title, Description, and Divider */}
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 45,
                      textAlign: "center",
                      fontFamily: "italiana",
                      marginBottom: 10,
                      paddingHorizontal: 15,
                    }}
                  >
                    {item.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "80%",
                      marginBottom: 10,
                    }}
                  >
                    <View
                      style={{
                        width: "45%",
                        height: 1,
                        backgroundColor: "white",
                      }}
                    />
                    <View
                      style={{
                        width: 12,
                        height: 12,
                        backgroundColor: "white",
                        transform: [{ rotate: "45deg" }],
                      }}
                    />
                    <View
                      style={{
                        width: "45%",
                        height: 1,
                        backgroundColor: "white",
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      fontFamily: "inria-light",
                      textAlign: "center",
                      width: "90%",
                      marginTop: 10,
                    }}
                  >
                    {item.desc}
                  </Text>
                </View>

                {/* Next Button */}
                <View>
                  {isLastSlide ? (
                    <TouchableOpacity
                      onPress={goToNextSlide}
                      style={{
                        width: "80%", // Replace with appropriate value
                        height: 60, // Replace with appropriate value
                        borderRadius: 50,
                        padding: 12,
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "auto",
                        backgroundColor: item?.icon_color || "gray", // Dynamically setting background color
                      }}
                    >
                      <Text className="text-3xl font-bold" >Get Started</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={goToNextSlide}
                      style={{
                        width: 60, // Replace with appropriate value
                        height: 60, // Replace with appropriate value
                        borderRadius: 50,
                        padding: 12,
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "auto",
                        backgroundColor: item?.icon_color || "gray", // Dynamically setting background color
                      }}
                    >
                      <AntDesign name="right" size={34} color="white" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        ))}
      </Swipper>
    </SafeAreaView>
  );
};

export default Welcome;

import React from "react";
import {
  TextInput,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  containerStyle?: object;
  inputStyle?: object;
  [key: string]: any;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  ...props
}) => {
  return (
    <KeyboardAvoidingView behavior="padding" style={{ width: "100%", flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[{ marginVertical: 10 }, containerStyle]}>
          <Text style={{ fontSize: 16, color: "#333", fontFamily: "italiana" }}>
            {label}
          </Text>
          <View
            style={{
              backgroundColor: "#F7F7F7",
              borderRadius: 25,
              paddingHorizontal: 16,
              paddingVertical: 4,
              borderColor: "#E0E0E0",
              borderWidth: 1,
              marginTop: 2,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
          >
            <TextInput
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor="#999"
              secureTextEntry={secureTextEntry}
              style={[{ fontSize: 16, color: "#333" }, inputStyle]}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

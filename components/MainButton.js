import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const MainButton = ({ title, handlePress, disabled, styleProps }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.5}
      disabled={disabled}
      style={{
        ...styles.button,
        ...styleProps,
        backgroundColor: disabled ? "#F6F6F6" : "#FF6C00",
      }}
    >
      <Text
        style={{
          ...styles.buttonTitle,
          color: disabled ? "#BDBDBD" : "#FFFFFF",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  button: {
    width: 343,
    borderRadius: 100,
    paddingVertical: 16,
    marginTop: 42,
    marginBottom: 16,
  },
  buttonTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 22,
    textAlign: "center",
  },
});

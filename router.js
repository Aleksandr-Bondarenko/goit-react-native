import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import HomeScreen from "./screens/main/HomeScreen";

const AuthStack = createNativeStackNavigator();

export const useRoutes = (isAuth) => {
  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="register"
          component={RegistrationScreen}
          options={{
            headerShown: false,
            // gestureDirection: "vertical",
            // animationTypeForReplace: "push",
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
        />
        <AuthStack.Screen
          name="login"
          component={LoginScreen}
          options={{
            headerShown: false,
            // gestureDirection: "vertical",
            // animationTypeForReplace: "push",
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
      </AuthStack.Navigator>
    );
  }
};

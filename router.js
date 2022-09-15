import React from "react";
import { View } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import PostsScreen from "./screens/main/PostsScreen";
import CreatePostScreen from "./screens/main/CreatePostScreen";
import ProfileScreen from "./screens/main/ProfileScreen";
import HomeScreen from "./screens/main/HomeScreen";

import AllPosts from "./components/svg/AllPosts";
import CreatePost from "./components/svg/CreatePost";
import ProfileInfo from "./components/svg/ProfileInfo";

const AuthStack = createNativeStackNavigator();
const MainTabs = createBottomTabNavigator();

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
  //   return (
  //     <MainTabs.Navigator
  //       screenOptions={{
  //         tabBarShowLabel: false,
  //         headerShown: false,
  //         tabBarStyle: {
  //           height: 84,
  //         },
  //         tabBarItemStyle: {},
  //       }}
  //     >
  //       <MainTabs.Screen
  //         options={{
  //           tabBarIcon: ({ focused, size, color }) => <AllPosts />,
  //         }}
  //         name="Posts"
  //         component={PostsScreen}
  //       />
  //       {/* <MainTabs.Screen
  //         options={{
  //           tabBarIcon: ({ focused, size, color }) => <ProfileInfo />,
  //         }}
  //         name="Profile"
  //         component={ProfileScreen}
  //       /> */}
  //       <MainTabs.Screen
  //         options={{
  //           tabBarIcon: ({ focused, size, color }) => (
  //             <View
  //               style={{
  //                 width: 70,
  //                 height: 40,
  //                 backgroundColor: "#FF6C00",
  //                 borderRadius: 20,
  //                 alignItems: "center",
  //                 justifyContent: "center",
  //               }}
  //             >
  //               {/* {focused ? <CreatePost /> : <ProfileInfo />} */}
  //               <CreatePost />
  //             </View>
  //           ),
  //         }}
  //         name="Create"
  //         component={CreateScreen}
  //       />
  //       <MainTabs.Screen
  //         options={{
  //           tabBarIcon: ({ focused, size, color }) => (
  //             // focused ? <CreatePost /> : <ProfileInfo />,
  //             <ProfileInfo />
  //           ),
  //         }}
  //         name="Profile"
  //         component={ProfileScreen}
  //       />
  //     </MainTabs.Navigator>
  //   );
};

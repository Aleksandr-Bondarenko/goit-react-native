import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderBackButton } from "@react-navigation/elements";

import CreatePostScreen from "./CreatePostScreen";
import ProfileScreen from "./ProfileScreen";

import AllPosts from "../../components/svg/AllPosts";
import CreatePost from "../../components/svg/CreatePost";
import ProfileInfo from "../../components/svg/ProfileInfo";
import LogOut from "../../components/svg/LogOut";
import BackIcon from "../../components/svg/BackIcon";

const MainTabs = createBottomTabNavigator();
import PostsScreen from "./PostsScreen";

export default function Home({ navigation }) {
  return (
    // <View style={styles.container}>
    //   {/* <PostsScreen /> */}
    // </View>

    <MainTabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: true,
        headerShadowVisible: true,
        headerTitleAlign: "center",
        headerLeftContainerStyle: {
          paddingLeft: 16,
        },
        headerRightContainerStyle: {
          paddingRight: 16,
        },
        tabBarStyle: {
          height: 84,
        },
        headerStyle: {
          //   borderBottomWidth: 1,
          //   borderBottomColor: "rgba(0, 0, 0, 0.3)",
        },
        headerTitleStyle: {
          color: "#212121",
          fontFamily: "Roboto-Medium",
          fontSize: 17,
        },
        tabBarItemStyle: {},
      }}
    >
      <MainTabs.Screen
        options={{
          title: "Публикации",
          headerRight: () => <LogOut />,
          tabBarIcon: ({ focused, size, color }) => <AllPosts />,
        }}
        name="Posts"
        component={PostsScreen}
      />
      {/* <MainTabs.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => <ProfileInfo />,
        }}
        name="Profile"
        component={ProfileScreen}
      /> */}
      <MainTabs.Screen
        options={{
          title: "Создать публикацию",
          headerLeft: () => (
            <HeaderBackButton
              backImage={() => <BackIcon />}
              onPress={() => navigation.navigate("Posts")}
            />
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                width: 70,
                height: 40,
                backgroundColor: "#FF6C00",
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* {focused ? <CreatePost /> : <ProfileInfo />} */}
              <CreatePost />
            </View>
          ),
          tabBarStyle: {
            display: "none",
          },
        }}
        name="Create"
        component={CreatePostScreen}
      />
      <MainTabs.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            // focused ? <CreatePost /> : <ProfileInfo />,
            <ProfileInfo />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTabs.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

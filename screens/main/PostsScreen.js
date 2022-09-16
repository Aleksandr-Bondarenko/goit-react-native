import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultPostsScreen from "../nested/DefaultPostsScreen";
import MapScreen from "../nested/MapScreen";
import CommentsScreen from "../nested/CommentsScreen";

import LogOut from "../../components/svg/LogOut";

const PostStack = createNativeStackNavigator();

export default function PostsScreen() {
  return (
    <PostStack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <PostStack.Screen
        name="DefaultPosts"
        component={DefaultPostsScreen}
        options={{
          title: "Публикации",
          headerRight: () => <LogOut />,
        }}
      />
      <PostStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Карта",
        }}
      />
      <PostStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Комментарии",
        }}
      />
    </PostStack.Navigator>
  );
}

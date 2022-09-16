import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button, FlatList, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";

export default function DefaultPostsScreen({ navigation, route }) {
  const [posts, setPosts] = React.useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    route.params &&
      setPosts((prevState) => [
        ...prevState,
        { ...route.params.postData, coords: route.params.location },
      ]);
    console.log(">>>params", route.params);
  }, [route.params]);

  return (
    isFocused && (
      <View style={styles.container}>
        <Text>Posts Screen</Text>
        <FlatList
          data={posts}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View>
              <Image
                source={{ uri: item.photo }}
                style={{ width: 350, height: 200 }}
              />
              <Text>{item.name}</Text>
              <Button
                title="Location"
                onPress={() =>
                  navigation.navigate("Map", {
                    coords: {
                      latitude: item.coords.latitude,
                      longitude: item.coords.longitude,
                    },
                    title: item.name,
                    description: item.place,
                  })
                }
              />
            </View>
          )}
        />

        {/* <Button
          title="Comments"
          onPress={() => navigation.navigate("Comments")}
        /> */}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

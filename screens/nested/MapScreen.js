import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  console.log(">>>Map", route.params);
  return (
    <View style={styles.container}>
      <Text>Map Screen</Text>
      <MapView
        initialRegion={{
          latitude: 48.466166,
          longitude: 35.034938,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{
          width: "100%",
          height: "90%",
        }}
      >
        <Marker
          coordinate={{
            latitude: route.params.coords.latitude,
            longitude: route.params.coords.longitude,
          }}
          title={route.params.title}
          description={route.params.description}
        />
      </MapView>
    </View>
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

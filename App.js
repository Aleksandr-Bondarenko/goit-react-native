import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Linking, Button } from "react-native";

export default function App() {
  const onPressLearnMore = () => {
    Linking.openURL("http://161.35.81.124:3000/login");
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Run my app on phone!</Text>
      <Button
        onPress={onPressLearnMore}
        title="EnterXL"
        color="#841584"
        accessibilityLabel="Label of EnterXL button"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
});

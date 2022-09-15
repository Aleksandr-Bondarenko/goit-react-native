import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import Location from "../../components/svg/Location";
import TrashPost from "../../components/svg/TrashPost";
import MainButton from "../../components/MainButton";

export default function CreatePostScreen() {
  const initialPostData = {
    image: null,
    name: "",
    location: "",
  };
  const [postData, setPostData] = useState(initialPostData);
  const [isDisableBtn, setIsDisableBtn] = useState(true);

  useEffect(() => {
    const isPostDataReady = Object.values(postData).every(
      (value) => value !== ("" || null)
    );
    setIsDisableBtn(!isPostDataReady);
  }, [postData]);

  const handleInput = (type, value) => {
    setPostData((prevState) => ({ ...prevState, [type]: value }));
  };

  const handlePress = () => {
    console.log(">>>PostData", postData);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        // contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View style={styles.photoBlock}>
            <Image source={require("../../assets/add-photo.png")} />
          </View>
          <Text style={styles.blockLabel}>Загрузите фото</Text>
        </View>

        <View style={{}}>
          <View
            style={{
              ...styles.input,
              marginTop: 32,
              marginBottom: 16,
            }}
          >
            <TextInput
              value={postData.name}
              onChangeText={(value) => handleInput("name", value)}
              style={styles.inputText}
              placeholder="Название..."
              placeholderTextColor="#BDBDBD"
            />
          </View>
          <View
            style={{ ...styles.input, paddingLeft: 28, position: "relative" }}
          >
            <Location style={{ position: "absolute", top: 18 }} />
            <TextInput
              value={postData.location}
              onChangeText={(value) => handleInput("location", value)}
              style={styles.inputText}
              placeholder="Местность"
              placeholderTextColor="#BDBDBD"
            />
          </View>

          <MainButton
            title="Опубликовать"
            handlePress={handlePress}
            disabled={isDisableBtn}
            styleProps={{}}
          />
        </View>
      </ScrollView>

      <View style={{ height: 84, justifyContent: "center" }}>
        <View
          style={{
            width: 70,
            height: 40,
            backgroundColor: "#F6F6F6",
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TrashPost />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    // paddingHorizontal: 16,
  },
  photoBlock: {
    width: 343,
    height: 240,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  blockLabel: {
    marginTop: 8,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    alignSelf: "flex-start",
  },
  input: {
    width: 342,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingVertical: 16,
  },
  inputText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
  },
});

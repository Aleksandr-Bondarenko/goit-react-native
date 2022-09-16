import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Camera, takePictureAsync, PermissionStatus } from "expo-camera";
import * as Location from "expo-location";

// icons imports
import LocationIcon from "../../components/svg/Location";
import TrashPost from "../../components/svg/TrashPost";
import MainButton from "../../components/MainButton";

export default function CreatePostScreen({ navigation, route }) {
  const initialPostData = {
    photo: "",
    name: "",
    place: "",
  };
  const [postData, setPostData] = useState(initialPostData);
  const [location, setLocation] = useState(null);
  const [isDisableBtn, setIsDisableBtn] = useState(true);
  const [hasCamPermission, setHasCamPermission] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [camRef, setCamRef] = useState(null);

  // const [permission, requestPermission] = Camera.useCameraPermissions();

  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      // await MediaLibrary.requestPermissionsAsync();

      setHasCamPermission(status === "granted");

      const locationStatus = await Location.requestForegroundPermissionsAsync();
      if (locationStatus.status) {
        setHasLocationPermission(locationStatus.status === "granted");
      }
      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData);
      // console.log(">>>>>locationData", locationData);
    })();
  }, []);

  useEffect(() => {
    const isPostDataReady = Object.values(postData).every(
      (value) => value !== ""
    );
    setIsDisableBtn(!isPostDataReady);
  }, [postData]);

  useEffect(() => {
    if (!isFocused) {
      setPostData(initialPostData);
    }
  }, [isFocused]);

  const handleInput = (type, value) => {
    setPostData((prevState) => ({ ...prevState, [type]: value }));
  };

  const handlePress = () => {
    navigation.navigate("DefaultPosts", {
      postData,
      location: location.coords,
    });
    setPostData(initialPostData);
    // setLocation(null);
  };

  const takePhoto = async () => {
    try {
      const photo = await camRef.takePictureAsync({ skipProcessing: false });
      console.log(">>>>PHOTO", photo.uri);
      setPostData((prevState) => ({ ...prevState, photo: photo.uri }));
      camRef.pausePreview();
      // navigation.navigate("login");
    } catch (err) {
      setPostData((prevState) => ({ ...prevState, photo: "file" }));
      console.log(">>>err", err);
    }
  };

  // if (hasCamPermission === null) {
  //   return <View />;
  // }

  return (
    <View style={styles.container}>
      <ScrollView
        // contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {isFocused && (
          <View style={styles.photoBlock}>
            {hasCamPermission ? (
              <Camera
                onCameraReady={() => console.log(">>>cameraISready")}
                onMountError={() => console.log(">>>cameraNOTready")}
                type="back"
                ref={(ref) => setCamRef(ref)}
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                // style={styles.photoBlock}
              >
                {postData.photo && (
                  <Image
                    source={{ uri: postData.photo }}
                    style={{
                      borderRadius: 8,
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
                <TouchableOpacity
                  onPress={takePhoto}
                  style={{ position: "absolute" }}
                >
                  <Image source={require("../../assets/add-photo.png")} />
                </TouchableOpacity>
              </Camera>
            ) : (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>No access to camera!</Text>
              </View>
            )}
          </View>
        )}
        <Text style={styles.blockLabel}>Загрузите фото</Text>

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
            <LocationIcon style={{ position: "absolute", top: 18 }} />
            <TextInput
              value={postData.place}
              onChangeText={(value) => handleInput("place", value)}
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
        <TouchableOpacity
          style={{
            width: 70,
            height: 40,
            backgroundColor: postData.photo ? "#FF6C00" : "#F6F6F6",
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
          disabled={!postData.photo}
          onPress={() => {
            console.log(">>>>camRef", camRef);
            setPostData((prevState) => ({ ...prevState, photo: "" }));
            camRef.resumePreview();
          }}
        >
          <TrashPost />
        </TouchableOpacity>
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
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
    marginTop: 32,
    overflow: "hidden",
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

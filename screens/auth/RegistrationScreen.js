import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ImageBackground,
} from "react-native";

import AddAvatar from "../../components/svg/AddAvatar";

const RegistrationScreen = ({ navigation }) => {
  const initialState = {
    login: "",
    email: "",
    password: "",
  };
  const [credentials, setCredentials] = useState(initialState);
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState({
    login: false,
    email: false,
    password: false,
  });

  //   useEffect(() => {
  //     const { login, email, password } = isInputFocused;
  //     if (!login && !email && !password) {
  //       setIsKeyboardShow(false);
  //     }
  //   }, [isInputFocused]);

  useEffect(() => {
    const listaner = Keyboard.addListener("keyboardDidShow", () =>
      setIsKeyboardShow(true)
    );
    const keyBoardListener = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardShow(false);
      setCredentials(initialState);
    });

    return () => {
      keyBoardListener.remove();
      listaner.remove();
    };
  }, []);

  const inputHandler = (type, value) => {
    setCredentials((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const loginInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handlePress = () => {
    console.log(">>>UserCred:", credentials);
    Keyboard.dismiss();
    // setIsKeyboardShow(false);
    setCredentials(initialState);
  };

  const onFocusInput = (type) => {
    // setIsKeyboardShow(true);
    setIsInputFocused((prevState) => ({ ...prevState, [type]: true }));
  };

  const onBlurInput = (type) => {
    setIsInputFocused((prevState) => ({ ...prevState, [type]: false }));
  };

  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.backgroundImage}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{ ...styles.form, paddingBottom: isKeyboardShow ? 32 : 80 }}
        >
          <View style={styles.avatar}>
            <AddAvatar style={styles.addAvatar} />
          </View>

          <Text style={styles.formTitle}>Регистрация</Text>

          <View
            style={{
              ...styles.input,
              borderWidth: 1,
              borderColor: isInputFocused.login ? "#FF6C00" : "transparent",
            }}
          >
            <TextInput
              style={styles.inputText}
              value={credentials.login}
              onChangeText={(value) => inputHandler("login", value)}
              onFocus={() => onFocusInput("login")}
              onBlur={() => onBlurInput("login")}
              placeholder="Логин"
              placeholderTextColor="#BDBDBD"
            />
          </View>

          <View
            style={{
              ...styles.input,
              borderWidth: 1,
              borderColor: isInputFocused.email ? "#FF6C00" : "transparent",
              // borderColor: emailInputRef.current.isFocused()
              //   ? "#FF6C00"
              //   : "transparent",
            }}
          >
            <TextInput
              style={styles.inputText}
              value={credentials.email}
              onChangeText={(value) => inputHandler("email", value)}
              onFocus={() => onFocusInput("email")}
              onBlur={() => onBlurInput("email")}
              placeholder="Адрес электронной почты"
              placeholderTextColor="#BDBDBD"
              keyboardType="email-address"
              ref={emailInputRef}
            />
          </View>

          <View
            style={{
              ...styles.input,
              marginBottom: 0,
              position: "relative",
              borderWidth: 1,
              borderColor: isInputFocused.password ? "#FF6C00" : "transparent",
              // borderColor: passwordInputRef.current.isFocused()
              //   ? "#FF6C00"
              //   : "transparent",
            }}
          >
            <TextInput
              style={styles.inputText}
              value={credentials.password}
              onChangeText={(value) => inputHandler("password", value)}
              onFocus={() => onFocusInput("password")}
              onBlur={() => onBlurInput("password")}
              placeholder="Пароль"
              placeholderTextColor="#BDBDBD"
              secureTextEntry={isHidePassword}
              ref={passwordInputRef}
            />
            <Text
              style={styles.passwordShowBtn}
              onPress={() => setIsHidePassword((prevState) => !prevState)}
              // onLongPress={() => setIsHidePassword(false)}
              // onPressOut={() => setIsHidePassword(true)}
              // delayLongPress={3000}
            >
              Показать
            </Text>
          </View>

          {!isKeyboardShow && (
            <TouchableOpacity
              onPress={handlePress}
              activeOpacity={0.5}
              style={styles.button}
            >
              <Text style={styles.buttonTitle}>Зарегистрироваться</Text>
            </TouchableOpacity>
          )}

          {!isKeyboardShow && (
            <>
              <Text style={styles.linkToAnotherScreen}>
                Уже есть аккаунт?{" "}
                <Text
                  style={{
                    ...styles.linkToAnotherScreen,
                    textDecorationLine: "underline",
                  }}
                  onPress={() => navigation.navigate("login")}
                >
                  Войти
                </Text>
              </Text>

              {/* <TouchableOpacity
                onPress={() =>
                  type === "register"
                    ? navigation.navigate("login")
                    : navigation.navigate("register")
                }
              >
                <Text style={styles.linkToAnotherScreen} onPress={() =>
                  type === "register"
                    ? navigation.navigate("login")
                    : navigation.navigate("register")
                }>
                  {type === "register" ? "Войти" : "Зарегистрироваться"}
                </Text>
              </TouchableOpacity> */}
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
    position: "relative",
  },
  form: {
    position: "absolute",
    bottom: 0,

    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    // position: "relative",
  },
  formTitle: {
    fontSize: 30,
    fontFamily: "Roboto-Bold",
    color: "#212121",
    marginBottom: 32,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: -60,
  },
  addAvatar: {
    position: "absolute",
    bottom: 14,
    right: -12,
  },
  input: {
    width: 343,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },
  inputText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  passwordShowBtn: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
    position: "absolute",
    top: 18,
    right: 16,
  },
  button: {
    width: 343,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 16,
    marginTop: 42,
    marginBottom: 16,
  },
  buttonTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 22,
    textAlign: "center",
    color: "#FFFFFF",
  },
  linkToAnotherScreen: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
  },
});

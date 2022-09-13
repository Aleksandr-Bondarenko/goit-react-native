import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

import AddSvg from "../components/AddSvg";

export default function AuthForm({ type }) {
  const initialState =
    type === "register"
      ? {
          login: "",
          email: "",
          password: "",
        }
      : {
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
    setIsKeyboardShow(false);
    // setIsInputFocused(false);
    setCredentials(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={{ ...styles.form, paddingBottom: isKeyboardShow ? 32 : 80 }}>
        <View style={styles.avatar}>
          <AddSvg style={styles.addAvatar} />
        </View>

        <Text style={styles.formTitle}>
          {type === "register" ? "Регистрация" : "Войти"}
        </Text>
        {type === "register" && (
          <View
            style={{
              ...styles.input,
              borderWidth: 1,
              //   borderColor: isInputFocused ? "#FF6C00" : "transparent",
            }}
          >
            <TextInput
              style={styles.inputText}
              value={credentials.login}
              onChangeText={(value) => inputHandler("login", value)}
              onFocus={() => {
                // setIsInputFocused(true);
                setIsKeyboardShow(true);
              }}
              placeholder="Логин"
              placeholderTextColor="#BDBDBD"
            />
          </View>
        )}

        <View
          style={{
            ...styles.input,
            borderWidth: 1,
            // borderColor: emailInputRef.current.isFocused()
            //   ? "#FF6C00"
            //   : "transparent",
          }}
        >
          <TextInput
            style={styles.inputText}
            value={credentials.email}
            onChangeText={(value) => inputHandler("email", value)}
            onFocus={() => {
              //   if (emailInputRef.current.isFocused()) {
              //     console.log(">>>EMAIL");
              //   }
              setIsKeyboardShow(true);
            }}
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
            // borderColor: passwordInputRef.current.isFocused()
            //   ? "#FF6C00"
            //   : "transparent",
          }}
        >
          <TextInput
            style={styles.inputText}
            value={credentials.password}
            onChangeText={(value) => inputHandler("password", value)}
            onFocus={() => {
              //   if (passwordInputRef.current.isFocused()) {
              //     console.log(">>>PASSWORD");
              //   }
              setIsKeyboardShow(true);
            }}
            // onBlur={()=>}
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
            <Text style={styles.buttonTitle}>
              {type === "register" ? "Зарегистрироваться" : "Войти"}
            </Text>
          </TouchableOpacity>
        )}

        {!isKeyboardShow && (
          <Text style={styles.linkToAnotherScreen}>
            {type === "register"
              ? "Уже есть аккаунт? Войти"
              : "Нет аккаунта? Зарегистрироваться"}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    position: "relative",
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

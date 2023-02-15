import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import { Formik } from "formik";
import Input from "../../../Components/Input/Input";
import ButtonSubmit from "../../../Components/ButtonSubmit/ButtonSubmit";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [state, setstate] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [dimensions, setDimension] = useState(Dimensions.get("window").width);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimension(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener?.("change", onChange);
    };
  }, []);

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", () => {
      keyboardHide();
    });
    return () => {
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, [keyboardHide]);

  const toggleShowPassword = () => {
    setIsHidePassword((prev) => !prev);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../../../assets/mountain.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
          >
            <View style={styles.wrapper}>
              <Text style={styles.title}>Log In</Text>

              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={() => {
                  keyboardHide();
                }}
              >
                {({ handleChange, handleSubmit }) => (
                  <View
                    style={{
                      ...styles.form,
                      paddingBottom: isShowKeyboard ? 32 : 144,
                      width: dimensions,
                    }}
                  >
                    <View
                      style={{
                        position: "relative",
                      }}
                    >
                      <Input
                        name="email"
                        placeholder="Email"
                        onFocus={() => setIsShowKeyboard(true)}
                        value={state.email}
                        onChangeText={(value) =>
                          setstate((prevState) => ({
                            ...prevState,
                            email: value,
                          }))
                        }
                      />
                    </View>

                    <View style={{ position: "relative" }}>
                      <Input
                        name="password"
                        placeholder="Password"
                        stylesProp={{ marginTop: 16 }}
                        onFocus={() => setIsShowKeyboard(true)}
                        value={state.password}
                        onChangeText={(value) =>
                          setstate((prevState) => ({
                            ...prevState,
                            password: value,
                          }))
                        }
                        secureTextEntry={isHidePassword}
                      />
                      <TouchableOpacity
                        style={styles.btnShowPassword}
                        activeOpacity={0.7}
                        onPress={toggleShowPassword}
                      >
                        <Text style={styles.btnShowPasswordText}>
                          {isHidePassword ? "Show" : "Hide"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {!isShowKeyboard && (
                      <View>
                        <ButtonSubmit
                          title={"Sign In"}
                          onPress={handleSubmit}
                        />

                        <Text style={styles.linkText}>
                          Don't have an account?{" "}
                          <Text style={styles.linkText}>Sigh Up</Text>
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </Formik>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    marginBottom: 25,
    textAlign: "center",
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapper: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    alignItems: "center",
  },
  form: {
    paddingHorizontal: 16,
  },

  btnShowPassword: {
    position: "absolute",
    right: 16,
    top: 30,
  },
  btnShowPasswordText: {
    fontSize: 16,
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
  },
  linkText: {
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});

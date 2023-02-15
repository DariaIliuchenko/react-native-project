import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
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
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
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
              <View style={styles.userPhoto}>
                <Image
                  //   source={require("../../../../assets/addPhoto.png")}
                  style={styles.avatar}
                />
                <TouchableOpacity style={styles.btnAdd} activeOpacity={0.7}>
                  <Image
                    source={require("../../../../assets/union.png")}
                    style={styles.addIcon}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Registration</Text>

              <Formik
                initialValues={{ name: "", email: "", password: "" }}
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
                        name="name"
                        placeholder="Login"
                        onFocus={() => setIsShowKeyboard(true)}
                        value={state.login}
                        onChangeText={(value) =>
                          setstate((prevState) => ({
                            ...prevState,
                            login: value,
                          }))
                        }
                      />
                    </View>
                    <View
                      style={{
                        position: "relative",
                      }}
                    >
                      <Input
                        name="email"
                        placeholder="Email"
                        stylesProp={{ marginTop: 16 }}
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
                          Already have an account?{" "}
                          <Text style={styles.linkText}>Sigh In</Text>
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
    marginBottom: 32,
    textAlign: "center",
    paddingTop: 52,
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
  btnAdd: {
    height: 25,
    width: 25,
    backgroundColor: "#ffffff",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#FF6C00",
    position: "absolute",
    bottom: 12,
    right: -12,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userPhoto: {
    height: 120,
    width: 120,
    borderRadius: 16,
    position: "absolute",
    top: -60,
    backgroundColor: "#F6F6F6",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
});

import AppStyles from "../styles/AppStyles";
import React, { useEffect, useState } from "react";
import SocialButton from "../components/SocialButton";
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  Animated,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback
} from "react-native";
import * as Animatable from "react-native-animatable";
import {

  Text,
  Heading,

  FormControl,
  Input,

  NativeBaseProvider,
  Icon,
} from "native-base";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";

import { Button } from "react-native-paper";

import { auth } from "../firebase";

import InlineTextButton from "../components/InlineTextButton";

export default function Login({ navigation }) {
  const background = require("../assets/background.jpg");
  const [show, setShow] = useState(false);

  if (auth.currentUser) {
    navigation.navigate("WelcomeImage");
  } else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("WelcomeImage");
      }
    });
  }

 const [errorMessage, setErrorMessage] = React.useState("");
 const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password,)
        .then((userCredential) => {
          navigation.navigate("WelcomeImage", { user: userCredential.user });
          // setErrorMessage("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          error.message;
          Alert.alert(
            "Warning",

            " invalid password or username"
          );
        
        });
    } else {
      setErrorMessage("Please enter an email and password");
    }
    if (email == null || email == "") {
      Alert.alert("Email", "Email  required");
      return false;
    } else if (password.length == 0) {
      Alert.alert("password", "Password required");
      return false;
    }

    setEmail("");
    setPassword("");
  
  };

  return (
    <NativeBaseProvider>
      
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
       
       <ImageBackground source={background} style={{flex: 1,
    backgroundColor: '#fff',
  }}>
       <Animatable.View style={{padding:20,flex:1,}} animation="zoomInUp">
      <View
        style={{
          flex: 1,
          padding: 30,
          marginTop:40,
         
        }}
      >
       
        <View
          style={{
            justifyContent: "center",
            flex: 1,
           
          }}
        >
          <View
            style={{
              justifyContent: "flex-start",
              paddingBottom: 20,
              alignItems: "flex-start",
            }}
          >
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
            >
              <Heading
                letterSpacing="2xl"
                size="2xl"
                fontWeight="600"
                color="orange.500"
                _dark={{
                  color: "warmGray.50",
                }}
              >
                Hi
              </Heading>
            </Heading>
            <Heading
              mt="1"
              _dark={{
                color: "warmGray.200",
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="md"
            >
              Login Here
            </Heading>
          </View>

          <FormControl>
        
            <Input
              pb="3"
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              placeholderTextColor="black"
            />
          </FormControl>
          <FormControl mt="4">
            <Input
              pb="3"
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
              placeholderTextColor="black"
              type={show ? "text" : "password"}
              InputRightElement={
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                  onPress={() => setShow(!show)}
                />
              }
            />
          </FormControl>
          <View style={{ marginTop: 20 }}>
            <Button
              onPress={() => {
                login();
              }}
              mode="contained"
              color = "orange"
            >
              Login
            </Button>
         
         
            {/* <Text style={AppStyles.errorText}>{errorMessage}</Text> */}
            <TouchableOpacity style={{ marginTop: 20 }}>
              <SocialButton
                buttonTitle="Sign In with Facebook"
                btnType="facebook"
                color="#4867aa"
                backgroundColor="#e6eaf4"
                // onPress={() => fbLogin()}
              />
       </TouchableOpacity>
       <TouchableOpacity >
              <SocialButton
                buttonTitle="Sign In with Google"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                // onPress={() => GoogleSignIn()}
              />
 </TouchableOpacity>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: 40,
                }}
              >
                <Text style={{ color: "black" }}>Don't have an account? </Text>
                <InlineTextButton
                  color="blue"
                  text="Sign Up"
                  onPress={() => navigation.navigate("SignUp")}
                />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: 20,
                }}
              >
                <Text style={{ color: "black" }}>
                  Forgotten your password?{" "}
                </Text>
                <InlineTextButton
                  color="blue"
                  text="Reset"
                  onPress={() => navigation.navigate("ResetPassword")}
                />
              </View>
     
          </View>
        </View>
      
      </View>
      </Animatable.View>  
      </ImageBackground>

      </TouchableWithoutFeedback>

    </NativeBaseProvider>
  );
}

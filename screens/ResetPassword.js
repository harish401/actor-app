import { Text, View, TextInput, ImageBackground, Button, KeyboardAvoidingView, Platform,Alert } from 'react-native';
import AppStyles from '../styles/AppStyles';
import InlineTextButton from '../components/InlineTextButton';
import React from 'react';
import { auth } from "../firebase";
import { sendPasswordResetEmail } from 'firebase/auth';
import * as Animatable from "react-native-animatable";
export default function ResetPassword({ navigation }) {
  const background = require("../assets/background.jpg");

  const [email, setEmail] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigation.popToTop();
      })
      .catch((error) => {
        error.message;
        
      });
      if (email == null || email == "") {
        Alert.alert("Email", "Email  required");
        return false;
      } 
  }

  return (
    <ImageBackground  style={{flex:1,justifyContent:'center',}} source={background}>
      <Animatable.View style={{padding:15}} animation="zoomInUp">
        <KeyboardAvoidingView 
        style={AppStyles.backgroundCover} 
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={60}>
        <Text style={{color:'orange',fontSize:25}}>Reset Password</Text>
        <Text style={AppStyles.errorText}>{errorMessage}</Text>
        <TextInput 
          style={[AppStyles.textInput, AppStyles.lightTextInput, AppStyles.lightText]} 
          placeholder='Email' 
          placeholderTextColor="#BEBEBE"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail} />
        <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
          <Text style={AppStyles.lightText}>Don't have an account? </Text>
          <InlineTextButton text="Sign Up" onPress={() => navigation.navigate("SignUp")} />
        </View>
        <Button title="Reset Password" onPress={resetPassword} color="orange" />
      </KeyboardAvoidingView>
      </Animatable.View>
    </ImageBackground>
  );
}



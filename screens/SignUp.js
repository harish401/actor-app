import { Text, View, TextInput, ImageBackground, KeyboardAvoidingView, Platform,TouchableOpacity,Image,Alert } from 'react-native';
import AppStyles from '../styles/AppStyles';
import InlineTextButton from '../components/InlineTextButton';
import { Button,  } from "react-native-paper";
import React from  'react';
import { auth } from "../firebase";
import { Sae } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { createUserWithEmailAndPassword, sendEmailVerification ,updateProfile} from "firebase/auth";
import * as Animatable from "react-native-animatable";
import * as ImagePicker from "expo-image-picker";
export default function SignUp({ navigation }) {
  const background = require("../assets/background.jpg");
  const [Name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const[password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const[validationMessage, setValidationMessage] = React.useState("");
  const [image, setImage] = React.useState(null);

  const validateAndSet = (value, valueToCompare, setValue) => {
    if (value !== valueToCompare) {
      setValidationMessage("Passwords do not match.");
    } else {
      setValidationMessage("");
    }

    setValue(value);
  };

  const signUp = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // sendEmailVerification(auth.currentUser);
        const user = userCredential.user;
        updateProfile(user, {
          displayName: Name,
          photoURL: image ? image
          : "https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x",
         
        })
        navigation.replace("Login");
        // { user: userCredential.user }
      })
      .then(() => {
        alert("Registered, wait it will login.");
      })
      .catch((error) => {
      
        error.message;
        Alert.alert(
          "Warning",

          " Enter field"
        );
      });
    }
  }
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9,16],
      quality: 1,
      cancelled: false,
      width: 1080,
      type: "image",
      height: 810,
    });

    //console.log(JSON.stringify(_image));

    if (!_image.cancelled) {
      setImage(_image.uri);
      alert("image added")
    }
  };

  return (
   
    <ImageBackground style={{flex:1,justifyContent:'center',}} source={background}>
     <Animatable.View style={{padding:20}} animation="zoomInUp">
      <KeyboardAvoidingView 
        style={{  alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        opacity: 0.7,
        padding: 25}} 
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={60}>
        <Text style={{color:'orange',fontSize:25}}>Sign Up</Text>
        <Text style={[AppStyles.errorText]}>{validationMessage}</Text>
        
        <TextInput 
          style={[AppStyles.textInput, AppStyles.lightTextInput, AppStyles.lightText]} 
          placeholder='Name' 
          placeholderTextColor="#BEBEBE"
          value={Name}
          onChangeText={setName} />
      
        <TextInput 
          style={[AppStyles.textInput, AppStyles.lightTextInput, AppStyles.lightText]} 
          placeholder='Email' 
          placeholderTextColor="#BEBEBE"
          value={email}
          onChangeText={setEmail} />
        <TextInput 
          style={[AppStyles.textInput, AppStyles.lightTextInput, AppStyles.lightText]} 
          placeholder='Password' 
          placeholderTextColor="#BEBEBE" 
          secureTextEntry={true} 
          value={password} 
          onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)} />
        <TextInput 
          style={[AppStyles.textInput, AppStyles.lightTextInput, AppStyles.lightText]} 
          placeholder='Confirm Password' 
          placeholderTextColor="#BEBEBE" 
          secureTextEntry={true} 
          value={confirmPassword} 
          onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)} />
          <TouchableOpacity activeOpacity={0.9} onPress={() => addImage()}>
              <View style={{  width: 20, height: 20,}}>
                <Image
                  source={{
                    uri: image ? image : "asset:/dummy.png",
                  }}
                  style={{
                    width: 0,
                    height: 0,
                   
                  }}
                />
              </View>
             
              <Button
                color="#07b6ff"
                mode="contained"
                onPress={() => addImage()}
               
              >
                choose Image
              </Button>
              {(image ?
                 <Text style={{color:"#07b6ff"}}>image uploaded successfully</Text>:<Text>{' '}</Text>
              )
              }
           
            </TouchableOpacity>
        <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
          <Text style={AppStyles.lightText}>Already have an account? </Text>
          <InlineTextButton text="Login" onPress={() => navigation.popToTop()} />
        </View>
        <View style={{padding:20,}}>
        <Button  onPress={signUp} color="orange"  mode="contained" >SignUp</Button>
        </View>
      
      </KeyboardAvoidingView>
      </Animatable.View>
    </ImageBackground>
  
  );
}



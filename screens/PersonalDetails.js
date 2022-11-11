import React, { useEffect, useState, useRef } from "react";
import { Divider, TextInput } from 'react-native-paper';
import { View,Text,Button,StyleSheet } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
    import { Sae } from 'react-native-textinput-effects';
    import Checkbox from 'expo-checkbox';
    import { Ionicons } from "@expo/vector-icons";
    import * as Animatable from "react-native-animatable";
function PersonalDetails ()  {

  useEffect(() => {
   loadToDoList()
  }, [])
  
  const [text, setText] = React.useState("");
  const [text1, setText1] = React.useState("");
  const [text2, setText2] = React.useState("");
  const [text3, setText3] = React.useState("");
  const [toDos, setToDos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [agree, setAgree] =React.useState(false);
  const [isChecked, setChecked] = React.useState(false);
  const checkboxHandler = () => {
    
 
    setChecked(!isChecked)
    // Don't miss the exclamation mark
  }
  const btnHandler = () => {
    alert('hello');
  };

  const loadToDoList = async () => {
    const q = query(
      collection(db, "persondetails"),
      where("userId", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    const toDos = [];
    querySnapshot.forEach((doc) => {
      const toDo = doc.data();
      toDo.id = doc.id;
      toDos.push(toDo);
    });

    setToDos(toDos);
   
    
  };


  const addToDo = async (todo) => {
    const toDoToSave = {
      text: text,
      text1:text1,
      text2:text2,
      text3:text3,
      completed: false,
      userId: auth.currentUser.uid,
    };
    const docRef = await addDoc(collection(db, "persondetails"), toDoToSave);

    toDoToSave.id = docRef.id;

    const updatedToDos = [...toDos];
    updatedToDos.push(toDoToSave);

    setToDos(updatedToDos);
  };
  return (
    
     <Animatable.View
    animation="zoomInUp" style={{padding:40,backgroundColor:"black",flex:1}}>
        <View style={{ padding: 20,flexDirection:'row' }}>
       <Text style={{color:"orange",fontSize:25,fontWeight:"900"}}>Personal<Text style={{color:"white"}}>{' '}Info</Text></Text>
     
        <Ionicons style={{marginLeft:20}}
          size={30}
          color="orange"
          resizeMode="stretch"
          name="md-person-sharp"
        />
      </View>
      <View style={{padding:10}}>
     
      <Sae
    label={'Name as per passport'}
    labelStyle={{color:'white'}}
    iconClass={FontAwesomeIcon}
    iconName={'pencil'}
    iconColor={'orange'}
    inputPadding={16}
    labelHeight={24}
    onChangeText={setText}
    value={text}
    // active border height
    borderHeight={2}
    // TextInput props
    autoCapitalize={'none'}
    autoCorrect={false}
  />
  <Divider style={{backgroundColor:"black",marginTop:30}}/>
  <Sae
    label={'ICE number'}
    labelStyle={{color:'white'}}
    iconClass={FontAwesomeIcon}
    onChangeText={setText1}
    value={text1}
    iconName={'pencil'}
    iconColor={'orange'}
    inputPadding={16}
    labelHeight={24}
    // active border height
    borderHeight={2}
    // TextInput props
    autoCapitalize={'none'}
    autoCorrect={false}
  />
   <Divider style={{backgroundColor:"black",marginTop:30}}/>
  <Sae
    label={'Manager number'}
    labelStyle={{color:'white'}}
    iconClass={FontAwesomeIcon}
    onChangeText={setText2}
    value={text2}
    iconName={'pencil'}
    iconColor={'orange'}
    inputPadding={16}
    labelHeight={24}
    // active border height
    borderHeight={2}
    // TextInput props
    autoCapitalize={'none'}
    autoCorrect={false}
  />
  <Divider style={{backgroundColor:"black",marginTop:40}}/>
  <Sae
    label={'Manager Local number'}
    labelStyle={{color:'white'}}
    iconClass={FontAwesomeIcon}
    onChangeText={setText3}
    value={text3}
    iconName={'pencil'}
    iconColor={'orange'}
    inputPadding={16}
    labelHeight={24}
    // active border height
    borderHeight={2}
    // TextInput props
    autoCapitalize={'none'}
    autoCorrect={false}
  />
 
 <View style={{padding:10,flexDirection:"row",marginTop:40}}>
        <Checkbox  value={isChecked} onValueChange={checkboxHandler}  />
        <Text style={{color:"white",marginLeft:15,fontSize:18}}><Text style={{fontWeight:'900',color:"#07b6ff"}}>I Agree</Text> to terms and conditions</Text>
      </View>
     
        <View style={{marginTop:25}}>
          <Button disabled={!isChecked}  onPress={addToDo} title="continue"></Button>
          </View>
  </View>
  </Animatable.View>
          
    
    
  );
};


export default PersonalDetails;
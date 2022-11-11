import {
  View,
  Text,
 
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Animated
} from "react-native";
import InlineTextButton from "../components/InlineTextButton";

import { firebaseConfig } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { sendEmailVerification } from "firebase/auth";
import React ,{useState,useEffect}from "react";
import {db,auth} from "../firebase"
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Button, Divider, FAB, TextInput } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { initializeApp } from "firebase/app";

export default function ToDo({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toDos, setToDos] = useState([]);
  const [todo, setTodo] = useState("");

useEffect(() => {
  alert(JSON.stringify(auth))


}, [])


  const loadToDoList = async () => {
    const q = query(
      collection(db, "actors"),
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
    setIsLoading(false);
    setIsRefreshing(false);
  };

  if (isLoading) {
    loadToDoList();
  }

  const checkToDoItem = (item, isChecked) => {
    const toDoRef = doc(db, "actors", item.id);
    setDoc(toDoRef, { completed: isChecked }, { merge: true });
  };

  const deleteToDo = async (toDoId) => {
    await deleteDoc(doc(db, "actors", toDoId));
    const updatedToDos = [...toDos].filter((item) => item.id != toDoId);
    setToDos(updatedToDos);
  };

  const renderToDoItem = ({ item }) => {
    return (
      <Animatable.View animation="swing"  style={{flex:1,padding:10}}>
     
      <Animatable.View 
      style={{
        backgroundColor: "white",
     borderWidth:0.5,
       flexDirection:'row',
       justifyContent:"center",
       alignItems:'center',
        
       
        borderRadius: 10,
        padding: 2,
      
      }}
      >
        <View style={{ padding: 20 }}>
        <BouncyCheckbox
            isChecked={item.completed}
            size={25}
            fillColor="#258ea6"
            unfillColor="#FFFFFF"
            text={item.text}
            iconStyle={{ borderColor: "#258ea6" }}
            onPress={(isChecked) => { checkToDoItem(item, isChecked)}}
          />
         
        
        </View>
  
        <InlineTextButton
          text="Delete"
          color="orange"
          onPress={() => deleteToDo(item.id)}
        />
     
      </Animatable.View>
      </Animatable.View>
   
    );
  };
  const addToDo = async (todo) => {
    const toDoToSave = {
      text: todo,
      completed: false,
      userId: auth.currentUser.uid,
    };
    const docRef = await addDoc(collection(db, "actors"), toDoToSave);

    toDoToSave.id = docRef.id;

    const updatedToDos = [...toDos];
    updatedToDos.push(toDoToSave);

    setToDos(updatedToDos);
  };

  return (
    <Animatable.View 
    animation="lightSpeedIn"
    duration={1200}
   
    easing="ease-out"
     style={{ flex: 1,
      backgroundColor: "#E8EAED",
      paddingBottom: 5, }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",

            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              color: "black",
            }}
          >
            Task
          </Text>
        </View>
       
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Button
            onPress={() => {
              navigation.navigate("setting");
            }}
            activeOpacity={0.7}
            icon="tools"
            mode="outlined"
            color="orange"
          >
            Settings
          </Button>
        </View>
      </View>


       
        <FlatList
        data={toDos}
        refreshing={isRefreshing}
        onRefresh={() => {
          loadToDoList();
          setIsRefreshing(true);
        }}
        renderItem={renderToDoItem}
        keyExtractor={(item) => item.id}
      />

        <View
          style={{
            flexDirection: "row",
            flex: 1,
           
            justifyContent:'center',
            alignItems:'center' ,
            position: "absolute",
            bottom: 0,
            right: 5,
            paddingLeft:30
           
          }}
          
        >
          <View style={{ flex: 1, padding: 10,}}>
           
              <TextInput
                value={todo}
                placeholder="Enter your Task"
                placeholderTextColor="orange"
                onChangeText={(text) => setTodo(text)}
                mode="outlined"
                activeoutlineColor="blue"
                dense="true"
                theme={{
                  colors: {
                    primary: "orange",
                    underlineColor: "transparent",
                  },
                }}
              />
          
          </View>
          
          <TouchableOpacity
             style={{ marginTop: 5, }}
            activeOpacity={0.7}
            onPress={() => {
              addToDo(todo);
              setTodo("");
            }}
          >
            <FAB
              small
              style={{
                backgroundColor: "orange",
              }}
              icon="plus"
            />
          </TouchableOpacity>

         
        </View>
    </Animatable.View>
  );
}
// const [blogs,setBlogs]=useState([])
//   const fetchBlogs=async()=>{
    
   
//     }
//   useEffect(() => {
//     const myitems=firebase.database().ref("actors");
//     myitems.on("value",datasnap=>{
//       alert(JSON.stringify(datasnap))
//     })
//   }, [])
//   return (
//     <View style={{flex:1}}>
//       {
//         blogs && blogs.map(blog=>{
//           return(
//             <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//               <Text style={{color:'black',fontSize:40}}>{blog.actors.firstname}</Text>
             
//             </View>
//           )
//         })
//       }
//     </View>
//   );
// }


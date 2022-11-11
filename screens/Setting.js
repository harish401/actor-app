import React, {
    Component,
    useState,
    useEffect,
    useFocusEffect,
    useCallback,
  } from "react";
  import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    item,
    SafeAreaView,
    Image,
    Alert,
    Pressable,
    Modal,
    Button,
    ScrollView,
    TextInput,
    BackHandler,
  } from "react-native";
  import { Avatar, NativeBaseProvider } from "native-base";
  import * as Animatable from "react-native-animatable";
  import { Divider } from "react-native-paper";
  import { Card } from "react-native-paper";
  import { Ionicons } from "@expo/vector-icons";
  import AppStyles from '../styles/AppStyles';
import { auth, db } from "../firebase";
import { collection, query, where, getDocs, writeBatch } from "firebase/firestore"; 
import { signOut, updatePassword, signInWithEmailAndPassword, deleteUser } from 'firebase/auth';


  function Settings({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [VisibleDelete, setVisibleDelete] = useState(false);
    const [PrivacyVisible, setPrivacyVisible] = useState(false);
    const [pressed, setPressed] = useState(false);
    const[validationMessage, setValidationMessage] = React.useState("");
    const [UserName, setUsername] = useState({});
  
    useEffect(() => {
     
    }, []);
    const validateAndSet = (value, valueToCompare, setValue) => {
      if (value !== valueToCompare) {
        setValidationMessage("Passwords do not match.");
      } else {
        setValidationMessage("");
      }
  
      setValue(value);
    };
  
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
  
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, []);
    
    const onPress = () => {
      setPressed((prevPressed) => !prevPressed);
    };
    const [newPassword, setNewPassword] = React.useState("");
    const [currentPassword, setCurrentPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
  
    let logout = () => {
        signOut(auth).then(() => {
          navigation.popToTop();
        });
      }
    
      const updateUserPassword = () => {

    if(currentPassword.length == 0){
alert("Type your current password!")
    }
        signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
          .then((userCredential) => {
            const user = userCredential.user;
            updatePassword(user, newPassword).then(() => {
              setNewPassword("");
              setErrorMessage("");
              setCurrentPassword("");
            }).catch((error) => {
              setErrorMessage(error.message);
            });
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
      };
    
      const deleteUserAndToDos = () => {
        if (currentPassword === "") {
          setErrorMessage("Must enter current password to delete account");
        } else {
          signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
          .then((userCredential) => {
            const user = userCredential.user;
    
            // Get all todos for user and delete
            let batch = writeBatch(db);
            const q = query(collection(db, "todos"), where("userId", "==", user.uid));
            getDocs(q).then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                batch.delete(doc.ref);
              });
              batch.commit();
      
              deleteUser(user).then(() => {
                navigation.popToTop();
              }).catch((error) => {
                setErrorMessage(error.message);
              });
            });
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
        }
      };
    return (
      <Animatable.View
    
        style={{
          flex: 1,
          backgroundColor: "white",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "row",
            padding: 10,
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("ToDo")}>
            <Ionicons
              name="chevron-back-outline"
              size={30}
              color="orange"
              backBehavior="history"
            />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                color: "orange",
              }}
            >
              Settings
            </Text>
          </View>
          <Animatable.View style={{ marginTop: 5 }} animation="flipInY">
            <Ionicons
              name="ios-settings-outline"
              size={25}
              color="orange"
              backBehavior="history"
            />
          </Animatable.View>
        </View>
       
  
  
        <Divider style={{ backgroundColor: "grey" }} />
       
       
        <View style={{ padding: 15 }}>
        <View style={{padding:10,flexDirection:'row'}}>
          <Image style={{width:100,height:100,borderRadius:50}} source={{uri:auth?.currentUser?.photoURL}}></Image>
          <View style={{padding:20,justifyContent:'center',alignItems:'center'}}>
      <Animatable.Text animation="shake" style={{color:'orange',fontWeight:'900',fontSize:30,}}>{auth?.currentUser?.displayName}</Animatable.Text>
        </View>
        </View>
          
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => setModalVisible(true)}
          >
            
            
            <Card
              style={{
                backgroundColor: "white",
                borderRadius: 2,
                borderWidth: 1,
                flex: 1,
                padding: 10,
              }}
            >

              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{ width: 25, height: 25 }}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/807/807292.png",
                  }}
                ></Image>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    this.setModalVisible(!modalVisible);
                  }}
                >
                  <View
                    style={{
                      padding: 20,
  
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Card
                      style={{
                        borderWidth: 1,
                        padding: 20,
                        backgroundColor: "white",
                        flexDirection: "row",
                      }}
                    >
                     <Text style={{padding:10,fontSize:18,color:"orange",fontWeight:'900'}}>Update your password</Text>
                  
                      <TextInput 
          style={[AppStyles.textInput, AppStyles.darkTextInput]} 
          placeholder='Current Password'
          value={currentPassword}
          secureTextEntry={true}
          placeholderTextColor="orange"
          onChangeText={setCurrentPassword} />
      <TextInput 
          style={[AppStyles.textInput, AppStyles.darkTextInput]} 
          placeholder='New Password'
          placeholderTextColor="orange"
          value={newPassword}
          secureTextEntry={true}
          onChangeText={setNewPassword} />
      <Button title="Update Password"  color="orange" onPress={updateUserPassword} />
                 
                      <View style={{ marginTop: 20 }}>
                        <Button
                          title="closetabs"
                          color="orange"
                          onPress={() => setModalVisible(!modalVisible)}
                        ></Button>
                      </View>
                    </Card>
                  </View>
                </Modal>
                <Text style={{ fontSize: 20, marginLeft: 10 }}>Create new password</Text>
              </View>
            </Card>
          </TouchableOpacity>
        </View>
  
        <View style={{ padding: 15 }}>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
           
            onPress={() => setVisibleDelete(true)}
          >
            <Card
              style={{
                backgroundColor: "white",
                borderRadius: 2,
                borderWidth: 1,
                flex: 1,
                padding: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{ width: 25, height: 25 }}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
                  }}
                ></Image>
                 <Modal
                  animationType="slide"
                  transparent={true}
                  visible={VisibleDelete}
                  onRequestClose={() => {
                    this.setVisibleDelete(!VisibleDelete);
                  }}
                >
                  <View
                    style={{
                      padding: 20,
  
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Card
                      style={{
                        borderWidth: 1,
                        padding: 20,
                        backgroundColor: "white",
                        flexDirection: "row",
                      }}
                    >
                     <Text style={{padding:10,fontSize:18,color:"orange",fontWeight:'900'}}>Delete Account</Text>
                      <TextInput 
          style={[AppStyles.textInput, AppStyles.darkTextInput]} 
          placeholder='Current Password'
          value={currentPassword}
          secureTextEntry={true}
          placeholderTextColor="orange"
          onChangeText={setCurrentPassword} />
      <TextInput 
          style={[AppStyles.textInput, AppStyles.darkTextInput]} 
          placeholder='Re-type Password'
          placeholderTextColor="orange"
          value={newPassword}
          secureTextEntry={true}
          onChangeText={setNewPassword} />
      <Button title="Delete permanantly"  color="orange" onPress={deleteUserAndToDos} />
                 
                      <View style={{ marginTop: 20 }}>
                        <Button
                          title="closetabs"
                          color="orange"
                          
                          onPress={() => setVisibleDelete(!VisibleDelete)}
                        ></Button>
                      </View>
                    </Card>
                  </View>
                </Modal>
                <Text style={{ fontSize: 18, color: "black", marginLeft: 10 }}>
                 Delete User
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        </View>
        <Divider style={{ backgroundColor: "grey" }} />
        <View style={{ padding: 15 }}>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => setPrivacyVisible(true)}
          >
            <Card
              style={{
                backgroundColor: "white",
                borderRadius: 2,
                borderWidth: 1,
                flex: 1,
                padding: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{ width: 25, height: 25 }}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/128/3064/3064155.png",
                  }}
                ></Image>
                <Modal
                  animationType="slide"
                  transparent={false}
                  presentationStyle={"fullScreen"}
                  visible={PrivacyVisible}
                  onRequestClose={() => {
                    this.setPrivacyVisible(!PrivacyVisible);
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <SafeAreaView
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        backgroundColor: "white",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          padding: 5,
                          
                          backgroundColor: "white",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => setPrivacyVisible(!PrivacyVisible)}
                        >
                          <Ionicons
                            name="md-close-circle"
                            size={30}
                            color="orange"
                            backBehavior="history"
                          />
                        </TouchableOpacity>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                          }}
                        >
                          <Text
                            style={{
                              color: "orange",
                              fontSize: 20,
                            }}
                          >
                            Privacy & policy
                          </Text>
                        </View>
                      </View>
                      <ScrollView>
                        <View style={{ flexDirection: "column", padding: 10 }}>
                          <Card
                            style={{
                              backgroundColor: "silver",
                              borderRadius: 2,
                              borderWidth: 1,
                              flex: 1,
                              padding: 5,
                            }}
                          >
                            <Text style={{ fontSize: 15 }}>
                              Privacy is not a new concept. Humans have always
                              desired privacy in their social as well as private
                              lives. But the idea of privacy as a human right is a
                              relatively modern phenomenon. Around the world, laws
                              and regulations have been developed for the
                              protection of data related to government, education,
                              health, children, consumers, financial institutions,
                              etc. This data is critical to the person it belongs
                              to. From credit card numbers and social security
                              numbers to email addresses and phone numbers, our
                              sensitive, personally identifiable information is
                              important. This sort of information in unreliable
                              hands can potentially have far-reaching
                              consequences. Companies or websites that handle
                              customer information are required to publish their
                              Privacy Policies on their business websites.
                            </Text>
                          </Card>
  
                          <Card
                            style={{
                              backgroundColor: "silver",
                              borderRadius: 2,
                              borderWidth: 1,
                              marginTop: 20,
  
                              padding: 5,
                            }}
                          >
                            <Text style={{ fontSize: 15, marginTop: 10 }}>
                              If you own a website, web app, mobile app or desktop
                              app that collects or processes user data, you most
                              certainly will have to post a Privacy Policy on your
                              website (or give in-app access to the full Privacy
                              Policy agreement). There are several reasons for a
                              website to post its Privacy Policy agreement on its
                              website. Here are some of the main reasons: Required
                              by the law Required by third party services
                              Increases Transparency Let's take a look at each of
                              these reasons in more depth.
                            </Text>
                          </Card>
                          <Card style={{ marginTop: 10 }}>
                            <TextInput
                              style={{ padding: 20 }}
                              placeholder="Ask a Question..."
                            ></TextInput>
                            <Button
                              title="submit"
                              color="orange"
                              onPress={() => {
                                alert(
                                  "Submitted",
  
                                  [
                                    {
                                      onPress: () => {
                                        setPrivacyVisible(!PrivacyVisible);
                                      },
                                    },
                                  ]
                                );
                              }}
                            ></Button>
                          </Card>
                        </View>
                      </ScrollView>
                    </SafeAreaView>
                  </View>
                </Modal>
                <Text style={{ fontSize: 20, marginLeft: 10 }}>
                  Privacy policy
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        </View>
        <Divider style={{ backgroundColor: "grey" }} />
        <Divider style={{ backgroundColor: "grey" }} />
        
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "white",
  
            flexDirection: "row",
          }}
          onPress={() => {
           navigation.navigate("PersonalDetails")
          }}
        >
          <Card
            style={{
              borderRadius: 2,
              borderWidth: 1,
              flex: 1,
              padding: 10,
              backgroundColor: pressed ? "#07b6ff" : "white",
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image
                style={{ width: 25, height: 25 }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/1828/1828445.png",
                }}
              ></Image>
              <Text style={{ fontSize: 18, color: "black", marginLeft: 10 }}>
               PersonalDetails
              </Text>
            </View>
          </Card>
        </TouchableOpacity>

        <Divider style={{ backgroundColor: "grey" }} />
        
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "white",
  
            flexDirection: "row",
          }}
          onPress={() => {
           logout();
          }}
        >
          <Card
            style={{
              borderRadius: 2,
              borderWidth: 1,
              flex: 1,
              padding: 10,
              backgroundColor: pressed ? "#07b6ff" : "white",
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image
                style={{ width: 25, height: 25 }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/1828/1828445.png",
                }}
              ></Image>
              <Text style={{ fontSize: 18, color: "black", marginLeft: 10 }}>
                Logout
              </Text>
            </View>
          </Card>
        </TouchableOpacity>
      </Animatable.View >
    );
  }
  
  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
  
      padding: 20,
    },
  });
  export default Settings;
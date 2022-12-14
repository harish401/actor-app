import { Button, View, TextInput, Text } from 'react-native';
import React from 'react';
import AppStyles from '../styles/AppStyles';
import { auth, db } from "../firebase";
import { collection, query, where, getDocs, writeBatch } from "firebase/firestore"; 
import { signOut, updatePassword, signInWithEmailAndPassword, deleteUser } from 'firebase/auth';

export default function ManageAccount({ navigation }) {
  const [newPassword, setNewPassword] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  

  const logout = () => {
    signOut(auth).then(() => {
      navigation.popToTop();
    });
  }

  const updateUserPassword = () => {
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
        const batch = writeBatch(db);
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
   
    <View style={AppStyles.container}>
      <Text style={AppStyles.errorText}>{errorMessage}</Text>
      <TextInput 
          style={[AppStyles.textInput, AppStyles.darkTextInput]} 
          placeholder='Current Password'
          value={currentPassword}
          secureTextEntry={true}
          onChangeText={setCurrentPassword} />
      <TextInput 
          style={[AppStyles.textInput, AppStyles.darkTextInput]} 
          placeholder='New Password'
          value={newPassword}
          secureTextEntry={true}
          onChangeText={setNewPassword} />
      <Button title="Update Password" onPress={updateUserPassword} />
      <Button title="Delete User" onPress={deleteUserAndToDos} />
      <Button title="Logout" onPress={logout} />
      <Button title="Back to ToDos" onPress={() => navigation.pop()} />
    </View>
   
  );
}
import { Button, NativeBaseProvider } from "native-base";
import React, { useEffect, useRef } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Animated,
  StatusBar,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LogBox } from "react-native";
import { auth, db } from "../firebase";
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const img = { uri: auth?.currentUser?.photoURL };

function ImageAnimated({ navigation }) {
  return (
    <Animatable.View animation="lightSpeedIn" style={styles.container}>
      <StatusBar barStyle="transparent" />
      <NativeBaseProvider>
        <ImageBackground
          source={img}
          resizeMode="cover"
          style={styles.image}
          blurRadius={9}
        >
          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 42,
                marginTop: 20,
                fontWeight: "900",
              }}
            >
              Welcome{" "}
              <Animatable.Text
                style={{ color: "orange", fontSize: 35, opacity: 0.2 }}
              >
                {auth?.currentUser?.displayName}
              </Animatable.Text>
            </Text>
          </View>

          <Animatable.View
            animation="fadeInUp"
            iterationCount={1}
            direction="alternate"
            duration={2500}
            delay={100}
            style={{ padding: 30, flex: 1, marginTop: 120 }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,

                fontWeight: "500",
              }}
            >
              As part of our onboarding process, please verify your personal
              info
            </Text>
            <View style={{ marginTop: 20 }}>
              <Button
                mode="outlined"
                onPress={() => navigation.navigate("ToDo")}
              >
                Start
              </Button>
            </View>
          </Animatable.View>
        </ImageBackground>
      </NativeBaseProvider>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {},
});

export default ImageAnimated;

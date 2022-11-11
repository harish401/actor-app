import { NativeBaseProvider, Button } from "native-base";
import React, { useEffect, useState, useRef } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Animated,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

import { auth, db } from "../firebase";

function WelcomeImage({ navigation }) {
  const [hasOpacity, setHasOpacity] = React.useState(false);

  const [fontSize, setfontSize] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasOpacity(!hasOpacity);
      setfontSize(!fontSize);
    }, 3500);
  }, []);

  const img = {
    uri: auth?.currentUser?.photoURL,
  };

  return (
    <NativeBaseProvider>
    
        <View
        style={{
          flex: 1,
          flexDirection: "row",
      

          justifyContent: "center",
        }}>
          <ImageBackground
            source={img}
            resizeMode="stretch"
            style={{flex:1 }}
            blurRadius={!hasOpacity ? 0 : 50}
          >
            <Animatable.View
              style={{
                flexDirection: "column",
                flex: 1,

                justifyContent: "flex-end",
                alignItems: "center",
                padding: 50,
              }}
            >
              <Animatable.Text
                iterationCount={1}
                duration={3500}
                delay={1000}
                animation="fadeOutUpBig"
                easing="ease-out"
                style={{
                  color: "white",
                  fontSize: 35,

                  fontWeight: "900",
                }}
              >
                Welcome {""}
                <Animatable.Text
                  animation="slideInUp"
                  style={{ color: fontSize ? "orange" : "white", fontSize: 35 }}
                >
                  {auth?.currentUser?.displayName}
                </Animatable.Text>
              </Animatable.Text>
            </Animatable.View>

            <Animatable.View
              animation="zoomInUp"
              iterationCount={1}
              direction="alternate"
              duration={3000}
              delay={hasOpacity ? 0 : 3000}
              style={{
                padding: 40,
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <Animatable.View
                style={{
                  flexDirection: "column",
                  flex: 1,

                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  padding: 50,
                }}
              >
                <Animatable.Text
                  animation="slideInUp"
                  iterationCount={1}
                  duration={!hasOpacity ? 1500 : 0}
                  delay={!hasOpacity ? 200 : 0}
                  easing="ease-out"
                  style={{
                    color: "white",
                    fontSize: 35,
                    textAlign: "center",

                    fontWeight: "900",
                  }}
                >
                  Welcome {auth?.currentUser?.displayName}
                </Animatable.Text>
              </Animatable.View>
              <Text
                style={{
                  color: "white",
                  fontSize: 22,

                  fontWeight: "500",
                }}
              >
                As part of our onboarding process, please verify your personal
                info
              </Text>
            </Animatable.View>
            <Animatable.View
              animation="zoomInUp"
              iterationCount={1}
              direction="alternate"
              duration={3500}
              delay={hasOpacity ? 0 : 3000}
              style={{ padding: 40, borderRadius: 40 }}
            >
              <Button onPress={() => navigation.replace("ToDo")}>Start</Button>
            </Animatable.View>
          </ImageBackground>
        </View>

    </NativeBaseProvider>
  );
}

export default WelcomeImage;

{
  /* <View
 
style={{
 flex: 1,
 flexDirection:"row",
 backgroundColor: "grey",

 justifyContent: "center",
 
}}

>
 <ImageBackground
 source={img}
resizeMode="cover"
style={{ flex: 1, }}
blurRadius={!hasOpacity ? 0 : 50}
>
<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
<Animatable.Text  animation= {!hasOpacity ? "bounceInUp":"slideInUp"}   style={{ color: "white",
   fontSize:!hasOpacity ? 35:45,fontWeight:!hasOpacity ?'700':'900',}}>
Welcome {""}{auth?.currentUser?.displayName}

</Animatable.Text>

</View>
<Animatable.View style={{flex:1,justifyContent:"flex-end",alignItems:'center',}}  animation="zoomInUp"
iterationCount={1}
direction="alternate"
duration={2000}
delay={hasOpacity ? 0 : 1000}>
<Animatable.Text  animation= {!hasOpacity ? "bounceInUp":"slideInUp"}   style={{ color: "white",
   fontSize:25,fontWeight:'500',}}>
As part of our onboarding process, please verify your personal
  info

</Animatable.Text>


</Animatable.View>
<NativeBaseProvider>
<Animatable.View
animation="zoomInUp"
iterationCount={1}
direction="alternate"
duration={2000}
delay={hasOpacity ? 0 : 1000}
style={{ padding: 40, borderRadius: 40 }}
>
<Button

onPress={() => navigation.replace("ToDo")}
>
Start
</Button>
</Animatable.View>


</NativeBaseProvider>


</ImageBackground>



</View> */
}

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import ResetPassword from './screens/ResetPassword';
import ToDo from './screens/ToDo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageAccount from './screens/ManageAccount';
import WelcomeImage from './screens/WelcomeImage';
import ImageAnimated from './screens/ImageAnimated';
import Settings from './screens/Setting';
import SplashScreen from './screens/SplashScreen';
import PersonalDetails from './screens/PersonalDetails';


const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false,
          
          }} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false,animation:'fade_from_bottom'}} />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false, animationTypeForReplace:"push"}} />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{headerShown: false}} />
             <Stack.Screen
          name="ManageAccount"
          component={ManageAccount}
          options={{headerShown: false}} />
       
          
          <Stack.Screen
          name="WelcomeImage"
          component={WelcomeImage}
          options={{headerShown: false,animation:'slide_from_bottom'}} />
          <Stack.Screen name="Image" component={ImageAnimated} options={{
          backBehavior: "history",
            headerShown: false}} />
          
        <Stack.Screen
          name="ToDo"
          component={ToDo}
          options={{headerShown: false,animation:'slide_from_bottom'}} />
            <Stack.Screen
          name="setting"
          component={Settings}
          options={{headerShown: false,animation:'slide_from_bottom' }} />
           <Stack.Screen
          name="PersonalDetails"
          component={PersonalDetails}
          options={{headerShown: false, animation:'slide_from_bottom'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

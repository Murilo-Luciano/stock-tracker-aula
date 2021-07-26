import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {useDispatch, useSelector} from 'react-redux'

import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { ApplicationState } from "../store";

import SplashScreen from './SplashScreen'
import MainScreen from "./MainScreen";
import SignInScreen from "./SignInScreen";

const Stack = createStackNavigator();



export default function AppRoot(){
    const {authToken, isLoading} = useSelector((state:ApplicationState)=> state.authentication)

    const dispatch = useDispatch()
    

    React.useEffect(() => {
      const asyncEffect = async () => {
        let authToken:string|null;
  
        try {
          authToken = await AsyncStorage.getItem("@auth_token");
        } catch (e) {
          // error
        }
  
        // console.log("authToken", authToken);
        // await new Promise((r) => setTimeout(r, 1000));
  
        dispatch({ type: "LOAD_TOKEN", token: authToken });
      };
  
      asyncEffect();
    }, []);
  
    /* if (isLoading) {
      return <SplashScreen />;
    }
 */

    return(
        <Stack.Navigator>
            {authToken == null ? (
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  title: "Login"}}
              />
            ) : (
              <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{ header: () => null }}
              />
            )}
        </Stack.Navigator>
    )
}
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

import SplashScreen from "./src/screens/SplashScreen";
import MainScreen from "./src/screens/MainScreen";
import SignInScreen from "./src/screens/SignInScreen";

import AppRoot from "./src/screens/AppRoot";

import store from './src/store'
import { useDispatch, Provider } from "react-redux";

const state = store.getState().authentication

const Stack = createStackNavigator();

export default function App() {
  


  return (
    <>
      <StatusBar translucent={false} style="dark" />
      <Provider store={store}>
        <NavigationContainer>
          <AppRoot />
        </NavigationContainer>
      </Provider>
    </>
  );
}

import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";

import AppRoot from "./src/screens/AppRoot";

import store from './src/store'

import { Provider } from "react-redux";


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

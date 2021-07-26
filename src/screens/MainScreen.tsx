import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";

import AccountTabScreen from "./AccountTabScreen";
import EquityTabScreen from "./EquityTabScreen";
//import { NavigationStackScreenProps } from "react-navigation-stack";
import { RouteProp } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

type RouteParamList = {
  Main: { name: string };
  EquityTab: { name: string };
  Account: { name: string };
};

type MainRouteProp = RouteProp<
  RouteParamList,
  "Main" | "EquityTab" | "Account"
>;

type MainProp = {
  navigation: any;
  route: MainRouteProp;
};

interface GetTabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

export default function MainScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={({ route }: MainProp) => ({
        tabBarIcon: getTabBarIcon(route),
      })}
      tabBarOptions={{
        activeTintColor: "#00e676",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="EquityTab"
        component={EquityTabScreen}
        options={{ title: "Ativos" }}
      />
      <Tab.Screen
        name="Account"
        component={AccountTabScreen}
        options={{ title: "Conta" }}
      />
    </Tab.Navigator>
  );
}

function getTabBarIcon(route: MainRouteProp) {
  return ({ focused, color, size }: GetTabBarIconProps) => {
    let iconName;

    switch (route.name) {
      case "EquityTab":
        iconName = "stats-chart";
        break;
      case "Account":
        iconName = "person";
        break;
    }

    return (
      <Ionicons
        name={`${iconName}${focused ? "" : "-outline"}`}
        size={size}
        color={color}
      />
    );
  };
}

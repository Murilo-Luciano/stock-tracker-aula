import React from "react";

import { RouteProp } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import EquityListScreen from "./EquityListScreen";
import EquityDetailScreen from "./EquityDetailScreen";

const Stack = createStackNavigator();

type ParamsList ={
  EquityList: undefined;
  Equity: {symbol:string};
}

type EquityRouteProp = RouteProp<ParamsList, 'Equity'>

type EquityProps = {
  navigation: any
  route: EquityRouteProp
}

export default function EquityTabScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EquityList"
        component={EquityListScreen}
        options={{
          title: "Ativos",
        }}
      />
      <Stack.Screen
        name="Equity"
        component={EquityDetailScreen}
        options={({ route }:EquityProps) => ({ title: route.params?.symbol})}
      />
    </Stack.Navigator>
  );
}

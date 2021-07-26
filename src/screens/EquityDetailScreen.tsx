import React from "react";

import { Text, View } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";

interface RoutesProps extends StackNavigationProp<any,any>{
  route: RouteProp<{ params: { symbol: string, name?:string } }, 'params'>
  //route:{params: {symbol:string, name?:string}}
}

export default function EquityDetailScreen({ route }: RoutesProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Detalhes de {route.params.symbol}</Text>
    </View>
  );
}

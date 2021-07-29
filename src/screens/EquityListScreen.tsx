import React from "react";

import { View, StyleSheet, FlatList } from "react-native";
import { fetchCurrentMarketData, fetchPriceTrend } from "../server";

import companies from "../utils/companies";
import AddEquityButton from "./AddEquityButton";
import EquityItem from "./EquityItem";
import { StackNavigationProp } from "@react-navigation/stack";

import {Equity, equityListDuck} from "../ducks/EquityListDuck";

import { serverDuck } from "../ducks/ServerDuck";

import { ApplicationState } from "../store";


import { useDispatch, useSelector } from "react-redux";



const initialSymbols = ["BRML3", "PETR4", "IGTA3"];


interface EquityListScreenProps {
  navigation: StackNavigationProp<any, any>
  data:Equity[]
}


export default function EquityListContainer({ navigation }:EquityListScreenProps) {
  const {equities} = useSelector((state:ApplicationState)=> state.equityList)

  const dispatch = useDispatch()

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddEquityButton
          onAddEquity={(symbol:string) =>{
            console.log("on add equity", symbol)
            dispatch(equityListDuck.addEquity(symbol))}
          }
          
        />
      ),
    });
  }, [navigation]);

  // React.useEffect(() => {
  //   const asyncEffect = async () => {
  //     for (const symbol of symbols as string[]) {
  //       const name = companies[symbol?.substring(0, 4)] || "Empresa S/A";
  //       // const priceTrend = await fetchPriceTrend(symbol); //Dar um dispatch
  //       dispatch(serverDuck.fetchPriceTrend(symbol)); 
  //       // const { close, change } = await fetchCurrentMarketData(symbol); 
  //       dispatch(serverDuck.fetchCurrentMarketData(symbol))
  //       dispatch({
  //         type: "LOAD_EQUITY",
  //         payload: { symbol, name, marketData: { close, change, priceTrend } },
  //       })
  //     }
  //   };

  //   asyncEffect();
  // }, [symbols]);

  return (
    <EquityListScreen
      navigation={navigation}
      data={equities} //symbols.map((symbol:string) => equities[symbol])
    />
  );
}


function EquityListScreen({ navigation, data }:EquityListScreenProps) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <EquityItem
              symbol={item.symbol}
              name={item.name}
              marketData={item.marketData}
              isLoading={item.isLoading}
              onPress={() =>
                navigation.navigate("Equity", { symbol: item.symbol })
              }
            />
          )}
          keyExtractor={(item) => item.symbol}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import React from "react";

import { View, StyleSheet, FlatList } from "react-native";
import { fetchCurrentMarketData, fetchPriceTrend } from "../server";

import companies from "../utils/companies";
import AddEquityButton from "./AddEquityButton";
import EquityItem from "./EquityItem";
import { StackNavigationProp } from "@react-navigation/stack";

import store from '../store'
import EquityListDuck from "../ducks/EquityListDuck";


import { useDispatch } from "react-redux";


const state = store.getState().equityList
const initialSymbols = ["BRML3", "PETR4", "IGTA3"];

export interface EquityData{
  symbol:string
  name?:string 
  marketData?:{close:number, change:number, priceTrend:number[]}
  isLoading:boolean
}
  

interface EquityListScreenProps {
  navigation: StackNavigationProp<any, any>
  data:EquityData[]
}


export default function EquityListContainer({ navigation }:EquityListScreenProps) {
  const dispatch = useDispatch()

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddEquityButton
          onAddEquity={(symbol:string) =>
            dispatch({ type: "ADD_SYMBOL", payload: { symbol } })
          }
        />
      ),
    });
  }, [navigation]);

  React.useEffect(() => {
    const asyncEffect = async () => {
      for (const symbol of state.symbols as string[]) {
        const name = companies[symbol?.substring(0, 4)] || "Empresa S/A";
        const priceTrend = await fetchPriceTrend(symbol);
        const { close, change } = await fetchCurrentMarketData(symbol);
        dispatch({
          type: "LOAD_EQUITY",
          payload: { symbol, name, marketData: { close, change, priceTrend } },
        });
      }
    };

    asyncEffect();
  }, [state.symbols]);

  return (
    <EquityListScreen
      navigation={navigation}
      data={state.symbols.map((symbol:string) => state.equities[symbol])}
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

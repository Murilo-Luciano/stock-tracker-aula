import React from "react";

import {
  Text,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  TextStyle
} from "react-native";

import EquityLineChart from "../components/EquityLineChart";


interface EquityItemProps {
  symbol:string
  name:string
  marketData:{ close:number, change:number, priceTrend:number[] }
  isLoading:boolean
  onPress:()=>void
}

export default function EquityItem({
  symbol,
  name,
  marketData,
  isLoading,
  onPress,
}:EquityItemProps) {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#999" size="small" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View>
          <Text style={styles.symbolText}>{symbol}</Text>
          <Text style={styles.nameText}>{name}</Text>
        </View>
        <View style={styles.dataPanel}>
          <EquityLineChart data={marketData} />
          <View style={{ marginLeft: 20 }}>
            <View style={{ marginBottom: 5 }}>
              <Text style={styles.currentPriceText}>{marketData.close}</Text>
            </View>
            <View style={changeTextContainerStyles(marketData.change)}>
              <Text style={changeTextStyles(marketData.change)}>
                {marketData.change >= 0 ? "+" : ""}
                {marketData.change}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function changeTextContainerStyles(change:number) {
  return [
    styles.changeTextContainer,
    {
      backgroundColor: change >= 0 ? "#00E67655" : "#ff707055",
    },
  ];
}

function changeTextStyles(change:number): StyleProp<TextStyle> {
  return {
    textAlign: "center",
    color: change >= 0 ? "#00aa55" : "#ff3838",
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.125)",
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    marginHorizontal: 8,
  },
  symbolText: {
    fontSize: 18,
    fontWeight: "800",
  },
  nameText: {
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.5,
  },
  dataPanel: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  currentPriceText: {
    textAlign: "right",
    fontWeight: "800",
    opacity: 0.8,
  },
  changeTextContainer: {
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});

import React from "react";

import { LineChart } from "react-native-chart-kit";
import { EquityData } from "../screens/EquityListScreen";


interface GraphProp{
  data:{priceTrend:number[], change:number}
  
}

export default function EquityLineChart({ data }:GraphProp) {
  
  const { priceTrend,change } = data;
  return (
    <LineChart
      data={{ labels: [],datasets: [{ data: priceTrend || [] }] }}
      width={200}
      height={70}
      withDots={false}
      withShadow={false}
      withInnerLines={false}
      withOuterLines={false}
      withVerticalLines={false}
      withHorizontalLines={false}
      withVerticalLabels={false}
      withHorizontalLabels={false}
      chartConfig={{
        backgroundColor: "rgba(255,255,255,0.0)",
        backgroundGradientFrom: "rgba(255,255,255,0.0)",
        backgroundGradientTo: "rgba(255,255,255,0.0)",
        decimalPlaces: 2,
        strokeWidth: 2,
        color: () => (change >= 0 ? "#00E676" : "#ff7070"),
      }}
      bezier
      transparent={true}
      style={{
        marginTop: -10,
      }}
    />
  );
}

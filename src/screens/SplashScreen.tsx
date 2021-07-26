import React from "react";

import { ActivityIndicator, Text, View } from "react-native";

export default function SplashScreen() {
  return (
    <View
      style={{
        backgroundColor: "#00E67699",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#00aa55" />
    </View>
  );
}

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props{
  title:string
  onPress:()=>{}
}

export default function Button( {title, onPress}:Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00E676",
    borderRadius: 5,
    padding: 8,
  },
  title: {
    textAlign: "center",
  },
});

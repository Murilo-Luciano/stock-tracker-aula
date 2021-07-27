import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props{
  title:string
  isLoading?:boolean
  onPress:()=>{}
}

export default function Button( {title, onPress, isLoading}:Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {isLoading ? <ActivityIndicator color={"white"} />: <Text style={styles.title}>{title}</Text>
        }
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

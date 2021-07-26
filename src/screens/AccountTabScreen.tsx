import React from "react";

import { Text, View, StyleSheet } from "react-native";
import Button from "../components/Button";

import { useDispatch } from "react-redux";

export default function AccountTabScreen() {
  const dispatch = useDispatch();

  return (
    <View>
      <View style={styles.profileImage} />
      <Text style={styles.name}>Fulano</Text>
      <Text style={styles.email}>fulano@gmail.com</Text>
      <View style={styles.signOutButtonContainer}>
        <Button title="Sair" onPress={() => dispatch({ type: "SIGN_OUT" })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    alignSelf: "center",
    backgroundColor: "#ddd",
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#aaa",
    marginVertical: 20,
    width: 150,
    height: 150,
  },
  name: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
  },
  email: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
  },
  signOutButtonContainer: {
    width: "50%",
    alignSelf: "center",
    marginTop: 25,
  },
});

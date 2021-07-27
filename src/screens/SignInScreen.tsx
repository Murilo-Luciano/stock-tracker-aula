import React from "react";

import {authenticationDuck} from "../ducks/AuthenticationDuck";

import { StyleSheet, TextInput, View } from "react-native";
import Button from "../components/Button";

import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../store";


export default function SignInScreen() {

  const {isSigningIn} = useSelector((state:ApplicationState)=> state.authentication)


  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <TextInput
        value={email}
        onChangeText={(change) => setEmail(change)}
        placeholder="E-mail"
        style={styles.textInput}
      />
      <TextInput
        value={password}
        onChangeText={(change) => setPassword(change)}
        secureTextEntry={true}
        placeholder="Senha"
        style={styles.textInput}
      />
      <Button
        title="Login"
        onPress={() => dispatch(authenticationDuck.signIn())
        }
        isLoading={isSigningIn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    backgroundColor: "#fff",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.125)",
    borderRadius: 5,
  },
});

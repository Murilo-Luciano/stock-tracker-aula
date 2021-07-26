import React, {useState} from "react";



import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Dialog from "react-native-dialog";

interface AddEquityButtonProps{
    onAddEquity:(symbol?:string)=>void
}

export default function AddEquityButton({ onAddEquity }:AddEquityButtonProps) {
  const [dialogVisible, setDialogVisible] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setDialogVisible(true)}>
        <View style={styles.container}>
          <Text style={styles.icon}>+</Text>
        </View>
      </TouchableOpacity>
      <AddEquityDialog
        visible={dialogVisible}
        onAddEquity={(symbol:string) => {
          setDialogVisible(false);
          onAddEquity();
        }}
        onCancel={() => setDialogVisible(false)}
      />
    </>
  );
}

interface AddEquityDialogProps{
  visible:boolean
  onAddEquity:(symbol:string)=>void
  onCancel:()=>void
}

function AddEquityDialog({ visible, onAddEquity, onCancel }:AddEquityDialogProps) {
  const [symbol, setSymbol] = React.useState("");

  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>Adicionar ativo</Dialog.Title>
      <Dialog.Input
        label="Ticker"
        value={symbol}
        onChangeText={(change) => setSymbol(change)}
      />
      <Dialog.Button
        label="Cancelar"
        onPress={() => {
          setSymbol("");
          onCancel();
        }}
      />
      <Dialog.Button
        label="Adicionar"
        onPress={() => {
          onAddEquity(symbol);
        }}
      />
    </Dialog.Container>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  icon: {
    color: "#000",
    fontSize: 30,
    fontWeight: "400",
  },
});
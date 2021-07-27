import React from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";



interface ContextProp{
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}


const dispatch = useDispatch()


let context = React.createContext<ContextProp>({
    signIn: async () => {
        const dummyToken = "12345678910";
        await AsyncStorage.setItem("@auth_token", dummyToken);

          dispatch(function(dispatch:any){
            
            dispatch({type: "SIGN_IN", token: dummyToken});
          });
      },
      signOut: async () => {
        await AsyncStorage.removeItem("@auth_token");
        dispatch({ type: "SIGN_OUT" });
      },
});

export default context

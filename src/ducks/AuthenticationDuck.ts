import { Duck } from "./Duck";
import { Action } from "redux";

export interface AuthState {
  isLoading: boolean;
  authToken: string | null;
}

interface LoadTokenAction extends Action<string> {
  token: string | null;
}


type SignOutAction = Action<string>;


interface SignInAction extends Action<string> {
  token: string | null;
}

type AuthAction = LoadTokenAction | SignOutAction | SignInAction;

class AuthenticationDuck extends Duck<AuthState, AuthAction> {
  public readonly LOAD_TOKEN = this.type("LOAD_TOKEN");
  public readonly SIGN_OUT = this.type("SIGN_OUT");
  public readonly SIGN_IN = this.type("SIGN_IN");

  public reducer(state: AuthState, action: Action) {
    if(!state){
      return this.initialState()
    } 
   switch (action.type) {
      case "LOAD_TOKEN":
        return {
          ...state,
          authToken: (action as LoadTokenAction).token,
          isLoading: false,
        };
      case "SIGN_IN":
        return {
          ...state,
          authToken: (action as SignInAction).token,
          isSignout: false,
        };
      case "SIGN_OUT":
        return {
          ...state,
          authToken: null,
          isSignout: true,
        };
      default:
        return state;
    }
  }

  protected initialState(): AuthState {
    return {
      isLoading: true,
      authToken: null,
    };
  }
  protected namespace(): string {
    return "stock-tracker";
  }

  protected store(): string {
    return "authentication";
  }
}



export const authenticationDuck =  new AuthenticationDuck()


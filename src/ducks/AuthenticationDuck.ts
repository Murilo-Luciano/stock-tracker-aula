import { Duck } from "./Duck";
import { Action } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AuthState {
  isLoading: boolean;
  authToken: string | null;
  hasError: boolean;
  isSigningIn?: boolean;
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
  public readonly SIGN_IN_PENDING = this.type("SIGN_IN_PENDING");
  public readonly SIGN_IN_FULFILLED = this.type("SIGN_IN_FULFILLED");
  public readonly SIGN_IN_REJECTED = this.type("SIGN_IN_REJECTED");

  public reducer(state: AuthState, action: Action):AuthState {
    if (!state) {
      return this.initialState();
    }
    switch (action.type) {
      case this.LOAD_TOKEN:
        return {
          ...state,
          authToken: (action as LoadTokenAction).token,
          isLoading: false,
        };
      case this.SIGN_IN_PENDING:
        return {
          ...state,
          isSigningIn: true,
        };
      case this.SIGN_IN_FULFILLED:
        return {
          ...state,
          isSigningIn: false,
          authToken: (action as SignInAction).token,
        };
      case this.SIGN_IN_REJECTED:
        return {
          ...state,
          isSigningIn: false,
          hasError: true
        };
      case this.SIGN_OUT:
        return {
          ...state,
          authToken: null,
          // isSignout: true,
        };
      default:
        return state;
    }
  }

  public signIn() {
    return async (dispatch: any) => {
      {
        try {
          dispatch({ type: this.SIGN_IN_PENDING });

          const dummyToken = "12345678910";
          await AsyncStorage.setItem("@auth_token", dummyToken);
          setTimeout(
            () => dispatch({ type: this.SIGN_IN_FULFILLED, token: dummyToken }),
            3000
          );
        } catch (err) {
          dispatch({ type: this.SIGN_IN_REJECTED });
        }
      }
    };
  }

  public signOut() {
    return async (dispatch: any) => {
      await AsyncStorage.removeItem("@auth_token");
      dispatch({ type: this.SIGN_OUT });
    };
  }

  public loadToken() {
    return async (dispatch: any) => {
      let authToken: string | null;

      try {
        authToken = await AsyncStorage.getItem("@auth_token");
      } catch (e) {
        // error
      }

      setTimeout(() => {
        dispatch({ type: this.LOAD_TOKEN, token: authToken });
      }, 3000);
    };
  }

  protected initialState(): AuthState {
    return {
      isLoading: true,
      authToken: null,
      hasError: false,
      
    };
  }
  protected namespace(): string {
    return "stock-tracker";
  }

  protected store(): string {
    return "authentication";
  }
}

export const authenticationDuck = new AuthenticationDuck();

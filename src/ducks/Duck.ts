import { Action, Dispatch, Reducer } from "redux";
import { Omit } from "utility-types";

type JustActionCreators<T> = {
  [P in keyof T]: T[P] extends (
    ...args: any
  ) => Action<string> | ((d: Dispatch) => Action<string>)
    ? P
    : never;
}[keyof T];

export type DuckActions<T> = Pick<T, JustActionCreators<Omit<T, "creators">>>;
export interface PayloadAction<T> extends Action<string> {
  payload: T;
}

export type ContainerProps<
  S extends (...args: any[]) => any,
  D extends (...args: any[]) => any = () => {}
> = ReturnType<S> & ReturnType<D>;

export const NullAction: Action<string> = { type: "NULLACTION" };

export abstract class Duck<S, A extends Action<string>> {
  public REDUCER: Reducer<S, A>;
  constructor() {
    this.REDUCER = ((state: S, action: A) =>
      this.reducer(state, action)) as Reducer<S, A>;
  }

  public creators() {
    const methods = {} as { [k: string]: any };
    let obj = Reflect.getPrototypeOf(this);
    while (obj.constructor !== Duck) {
      const keys = Reflect.ownKeys(obj);
      keys.forEach(
        (k) => (methods[k as string] = Reflect.get(this, k).bind(this))
      );
      obj = Reflect.getPrototypeOf(obj);
    }
    return methods as DuckActions<this>;
  }

  public reducer(state: S, action: A) {
    return state || this.initialState();
  }
  
  protected abstract initialState(): S;
  protected abstract namespace(): string;
  protected abstract store(): string;
  protected type(name: string) {
    return `${this.namespace()}/${this.store()}/${name}`;
  }
}

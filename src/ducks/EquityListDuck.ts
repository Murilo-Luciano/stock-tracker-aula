import { Duck } from "./Duck";

import { StackNavigationProp } from "@react-navigation/stack";

export interface PrevState {
  symbols:string[]
  equities:{[name:string]:{symbol:string, isLoading:boolean}}
}
  
interface Action{
  type:string 
  payload:{symbol:string, name?:string, marketData?:{close:number, change:number, priceTrend:number[]}}
}
  


const initialSymbols = ["BRML3", "PETR4", "IGTA3"];

class EquityListDuck extends Duck<PrevState, Action>{
  
  public readonly ADD_SYMBOL = this.type('ADD_SYMBOL');
  public readonly LOAD_EQUITY = this.type('LOAD_EQUITY');

  
  public reducer(prevState: PrevState, action: Action){
      if(!prevState){
        return this.initialState();
      }
      switch (action.type) {
        case "ADD_SYMBOL": {
          const { symbol } = action.payload;
          return {
            ...prevState,
            symbols: [...prevState.symbols, symbol],
            equities: {
              ...prevState.equities,
              [symbol]: { symbol, isLoading: true },
            },
          };
        }
        case "LOAD_EQUITY": {
          const { symbol, name, marketData } = action.payload;
          return {
            ...prevState,
            equities: {
              ...prevState.equities,
              [symbol]: { symbol, name, marketData, isLoading: false },
            },
          };
        }
        default:
          return prevState;
      }
    }
    
    protected initialState(): PrevState {
      return {
        symbols: initialSymbols,
        equities: initialSymbols.reduce(
          (acc, symbol) => ({ ...acc, [symbol]: { symbol, isLoading: true } }),
          {}
        ),
      }
    }
    protected namespace(): string {
      return "stock-tracker";
    }
  
    protected store(): string {
      return "symbols";
    }
    
}

export const equityListDuck =  new EquityListDuck()
import { Duck } from "./Duck";

import { fetchCurrentMarketData, fetchPriceTrend } from "../server";

import { StackNavigationProp } from "@react-navigation/stack";

import companies from "../utils/companies"
import { Action } from "redux";
export interface EquityListState{
  equities:Equity[]
}

export interface Equity{
  name?:string,
  symbol:string,
  marketData?:MarketData,
  isLoading:boolean,
}

interface MarketData{
  close:number,
  change:number,
  priceTrend:number[]
}
interface AddEquityFulfilledAction extends Action<string>{
  payload:{symbol:string, name:string, marketData:MarketData}
}

interface AddEquityPendingAction extends Action<string>{
  payload:{symbol:string}
}

type EquityListAction = AddEquityFulfilledAction | AddEquityPendingAction

const initialSymbols = ["BRML3", "PETR4", "IGTA3"];

class EquityListDuck extends Duck<EquityListState, EquityListAction>{
  
  public readonly ADD_EQUITY_PENDING = this.type('ADD_EQUITY_PENDING');
  public readonly ADD_EQUITY_FULFILLED = this.type('ADD_EQUITY_FULFILLED');

  
  public reducer(state: EquityListState, action: EquityListAction){
      if(!state){
        return this.initialState();
      }
      switch (action.type) {
        case this.ADD_EQUITY_PENDING:{
          const symbol = action.payload.symbol
          return{
            ...state,
            equities:[
              ...state.equities,
              {symbol, isLoading: true}]
          }
        }

        case this.ADD_EQUITY_FULFILLED:{
          const {symbol, name, marketData} = (action as AddEquityFulfilledAction).payload
          
          return{
            ...state,
            equities:[
              ...state.equities.slice(0, -1),
              {name, symbol, marketData, isLoading:false}
            ]
          }
        }
        default:
          return state;
      }
    }
    
    public addEquity(symbol:string){
      return async (dispatch: any) => {
        dispatch({ type: this.ADD_EQUITY_PENDING, payload:{symbol}})

        const priceTrend = await fetchPriceTrend(symbol);
        const {close, change} = await fetchCurrentMarketData(symbol)
        const name = companies[symbol?.substring(0, 4)] || "Empresa S/A"

        dispatch({
          type: this.ADD_EQUITY_FULFILLED,
           payload:{
             symbol,
             name,
             marketData:{
                close,
                change,
                priceTrend
             }
            }})
          
      }
    }

    
    protected initialState(): EquityListState {
      return {
        equities: []
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
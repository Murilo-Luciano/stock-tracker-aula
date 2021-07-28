import { Duck } from "./Duck";
import { Action } from "redux";
import axios from "axios";



export interface ServerState{
    priceTrend:number[];
    currentMarketData:{
        close:number|null;
        change:number|null;
    };
}

type ServerAction = FetchPriceAction | FetchMarketDataAction

interface FetchPriceAction extends Action<string> {
    priceTrend:number[]| null;
}

interface FetchMarketDataAction extends Action<string> {
    currentMarketData:{
        close:number|null;
        change:number|null;
    };
}


class ServerDuck extends Duck<ServerState, ServerAction> {

    public server = axios.create({
        baseURL: "https://api.informativos.io/",
      });
    
    public readonly FETCH_PRICE_TREND = this.type("FETCH_PRICE_TREND");
    public readonly FETCH_MARKET_DATA = this.type("FETCH_MARKET_DATA");

    public reducer(state:ServerState, action:Action){
        if(!state){
            return this.initialState();
        }
        switch(action.type){
            case this.FETCH_PRICE_TREND:
                return{
                    ...state,
                    priceTrend: (action as FetchPriceAction).priceTrend
                }
            case this.FETCH_MARKET_DATA:
                return{
                    ...state,
                    currentMarketData: (action as FetchMarketDataAction).currentMarketData
                }
            default:
                return state;
        }
    }

    
    public fetchPriceTrend(symbol:string){
        return async (dispatch: any) => {
        const today = new Date();
        const endDate = today.toISOString().substring(0, 10);

        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(today.getMonth() == 0 ? 11 : today.getMonth() - 1);
        const startDate = oneMonthAgo.toISOString().substring(0, 10);

        const response = await this.server.get(
            `prices_matrix?symbols[]=${symbol}&start_date=${startDate}&end_date=${endDate}&property=close`
        );
        
        const priceTrend = response.data.slice(1).map((item:string[]) => Number(item[1]));

        dispatch({ type: this.FETCH_PRICE_TREND, priceTrend:priceTrend})

        }
    }

    public fetchCurrentMarketData(symbol:string){
        return async (dispatch: any) => {
            const currentDate = new Date();
        // o certo seria pegar o último dia útil, aqui está simplificado
        currentDate.setDate(currentDate.getDate()-1);
        const priceDate = currentDate.toISOString().substring(0, 10);

        console.log(priceDate)

        const response = await this.server.get(`prices/${priceDate}?symbols[]=${symbol}`);
        const data = response.data[0];
        dispatch({
            type: this.FETCH_MARKET_DATA, 
            currentMarketData:{
                close: Number(data.close),
                change: Number(data.change)
                }
            })
        }
    }



    protected initialState(): ServerState {
        return {
          priceTrend: [],
          currentMarketData:{
              close:null,
              change:null
          }
        };
      }
      protected namespace(): string {
        return "stock-tracker";
      }
    
      protected store(): string {
        return "api-requests";
      }
    

}

export const serverDuck = new ServerDuck();

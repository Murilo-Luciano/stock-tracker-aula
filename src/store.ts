import { createStore, combineReducers, applyMiddleware,MiddlewareAPI, Action, Dispatch} from 'redux';
import {authenticationDuck, AuthState} from './ducks/AuthenticationDuck'
import thunk from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension';

import { serverDuck, ServerState } from './ducks/ServerDuck';

import {equityListDuck, EquityListState} from './ducks/EquityListDuck'
// console.log(authenticationDuck.REDUCER)

export interface ApplicationState{
    authentication: AuthState,
    equityList: EquityListState,
    serverDuck: ServerState
}

interface Store extends MiddlewareAPI {
    store: AuthState | EquityListState;
}


const reducer = combineReducers<ApplicationState>({
    authentication: authenticationDuck.REDUCER,
    equityList: equityListDuck.REDUCER,
    serverDuck: serverDuck.REDUCER


})

const myLogger = (store:Store) => (next:Dispatch) => (action:Action) => {
    console.log("Logged Action -> ", action)
    
    next(action)
}

export default createStore(
    reducer,
    composeWithDevTools(applyMiddleware(myLogger, thunk))
)

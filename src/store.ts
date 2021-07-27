import { createStore, combineReducers, applyMiddleware,MiddlewareAPI, Action, Dispatch} from 'redux';
import {authenticationDuck, AuthState} from './ducks/AuthenticationDuck'

import { composeWithDevTools } from 'redux-devtools-extension';

import {equityListDuck, PrevState} from './ducks/EquityListDuck'
console.log(authenticationDuck.REDUCER)

export interface ApplicationState{
    authentication: AuthState,
    equityList: PrevState
}

interface Store extends MiddlewareAPI {
    store: AuthState | PrevState;
}


const reducer = combineReducers<ApplicationState>({
    authentication: authenticationDuck.REDUCER,
    equityList: equityListDuck.REDUCER
})

const myLogger = (store:Store) => (next:Dispatch) => (action:Action) => {
    console.log("Logged Action -> ", action)
    
    next(action)
}

export default createStore(
    reducer,
    //composeWithDevTools(),
    applyMiddleware(myLogger)
    )

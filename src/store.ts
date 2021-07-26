import { createStore, combineReducers } from 'redux';
import {authenticationDuck, AuthState} from './ducks/AuthenticationDuck'

import { composeWithDevTools } from 'redux-devtools-extension';

import {equityListDuck, PrevState} from './ducks/EquityListDuck'
console.log(authenticationDuck.REDUCER)

export interface ApplicationState{
    authentication: AuthState,
    equityList: PrevState
}


const reducer = combineReducers<ApplicationState>({
    authentication: authenticationDuck.REDUCER,
    equityList: equityListDuck.REDUCER
})


export default createStore(
    reducer,
    composeWithDevTools()
    )

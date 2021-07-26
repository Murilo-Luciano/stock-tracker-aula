import { createStore, combineReducers } from 'redux';
import {authenticationDuck, AuthState} from './ducks/AuthenticationDuck'

import equityListDuck from './ducks/EquityListDuck'
console.log(authenticationDuck.REDUCER)

export interface ApplicationState{
    authentication: AuthState
}


const reducer = combineReducers<ApplicationState>({
    authentication: authenticationDuck.REDUCER
    // equityList: equityListDuck.REDUCER
})


export default createStore(reducer)

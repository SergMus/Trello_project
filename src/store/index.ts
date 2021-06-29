import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import { AuthState } from "./auth";
import auth from './auth'
import boards from "./boards";
import lists, { ListsState } from "./lists";
import thunk from 'redux-thunk'
import cards, { CardsState } from "./cards";

export interface AppState {
   auth: AuthState,
   boards: any,
   lists: ListsState,
   cards: CardsState
}

export default function configureStore (){
    const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    
    const rootReducer = combineReducers<AppState>({auth, boards, lists, cards})
    
    return createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(thunk)))
}

export * from './auth';
export * from './boards';
export * from './lists';
export * from './cards';



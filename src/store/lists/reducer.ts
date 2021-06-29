import { Action } from "../types";
import { LISTS_TYPES } from "./types";

export interface ListsState {
    cardLists: any
}

const INITIAL_STATE = {
    cardLists: ''
}

const lists = (state:ListsState = INITIAL_STATE, action: Action<any>) =>{
   switch (action.type) {
       case LISTS_TYPES.SET_LISTS:
           return {
               ...state, cardLists: action.payload
           }  
        default: 
           return state;      
   }
}

export default lists;
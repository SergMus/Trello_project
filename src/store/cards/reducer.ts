import { Action } from "../types";
import { CARDS_TYPES } from "./types";

export interface CardsState {
    cardItems: any
}

const INITIAL_STATE = {
    cardItems: ''
}

const cards = (state:CardsState = INITIAL_STATE, action: Action<any>) =>{
   switch (action.type) {
       case CARDS_TYPES.SET_CARDS:
           return {
               ...state, cardItems: action.payload
           }  
        default: 
           return state;      
   }
}

export default cards;
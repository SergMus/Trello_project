import { AUTH_TYPES } from "./types";

export interface AuthState {
    token: string,
    userProfile: any
}

const INITIAL_STATE = {
    token: '',
    userProfile: undefined
}

const auth = (state: AuthState = INITIAL_STATE, action: any) => {
   switch (action.type) {
       case AUTH_TYPES.SET_TOKEN: 
           return {
              ...state, token: action.payload
           }
        case AUTH_TYPES.SET_PROFILE: 
           return {
            ...state, userProfile: [...action.payload]
           }  
        case AUTH_TYPES.RESET_STATE:
            return {
                ...state, state: INITIAL_STATE
            }
       default:
           return state;
   }
}

export default auth;


import { getToken } from './../auth/selectors';
import { LISTS_TYPES } from "./types"

export const setLists = (lists: any) =>{
   return {
       type: LISTS_TYPES.SET_LISTS,
       payload: lists
   }
}

export const fetchLists = (boardName: string)=>{
    const baseUrl = 'https://api.trello.com/1/';

    return async (dispatch: any, getState: any)=>{
        const AppState = getState();
        const token = getToken(AppState);

        const response = await fetch(
        `${baseUrl}boards/${boardName}/lists?key=${process.env.REACT_APP_API_KEY}&token=${token}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }
        )
        const data = await response.json();
        console.log(data);
        
        dispatch(setLists(data));
    }
}


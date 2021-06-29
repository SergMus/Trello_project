import { AUTH_TYPES } from "./types"

export const setToken = (token:string) => {
    return {
        type: AUTH_TYPES.SET_TOKEN,
        payload: token
    }
}
export const readToken = () => ({
    type: AUTH_TYPES.READ_TOKEN
  });


export const fetchProfile =  (token: string) => {
  const baseUrl = 'https://api.trello.com/1/members/me/';

  return async (dispatch: any) => {
   const response = await fetch(
    `${baseUrl}actions/?fields=avatarHash,fullName,initials,username&key=${process.env.REACT_APP_API_KEY}&token=${token}`
  )
   const data = await response.json();
   dispatch(setProfile(data))
  }
}
  
export const setProfile= (data: any) => ({
    type: AUTH_TYPES.SET_PROFILE,
    payload: data
})

export const resetState = () =>({
  type: AUTH_TYPES.RESET_STATE
})
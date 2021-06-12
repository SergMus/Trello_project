export const setToLocalStorage = <P>(key: string, data: P) => {
    window.localStorage.setItem(key, JSON.stringify(data));
  };
  
  export const getFromLocalStorage = <T>(key: string): T => {
    const tokentRaw =  window.localStorage.getItem(key)
    console.log(tokentRaw)
    return tokentRaw ? JSON.parse( tokentRaw) : '';
  };
  
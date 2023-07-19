import CallApi from "./https";

export const fetchData = (endpoint: string, page: number) => {
    return async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        const res = await CallApi(endpoint, page)
        dispatch(saveData(res))
    };
  };
  
  export const saveData = (data: object) => {
    return {
      type: 'SAVE_DATA',
      payload: data,
    };
  };
  
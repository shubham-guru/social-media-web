const initialState = {
    data: null,
  };
  
  const ApiReducer: any = (state = initialState, action: { type: string; payload: Array<{}> }) => {
    switch (action.type) {
      case 'SAVE_DATA':
        return {
          ...state,
          data: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default ApiReducer;
  
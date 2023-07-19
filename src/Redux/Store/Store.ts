import { configureStore } from "@reduxjs/toolkit";
import ApiReducer from "../Reducer/Reducer";

const store = configureStore({
  reducer: ApiReducer
});

export default store;
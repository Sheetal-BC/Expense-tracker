import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import expenseReducer from "./expenseReducer";
import themeReducer from './theme'


const store = configureStore({
  reducer: {
    user : authReducer,
    expence : expenseReducer,
    theme: themeReducer,
    
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  setPremium: false,
  expense: [],
};
const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpenseState,
  reducers: {
    userExpences: (state, action) => {
      state.expense = action.payload;
      let expenseTotal = 0;
      state.expense.forEach((item) => {
        let subtotal = 0;
        subtotal = Number(item.amount);
        expenseTotal = Number(expenseTotal + subtotal);
      });
if(expenseTotal > 10000){
  state.setPremium = true;
}
if (expenseTotal < 10000){
  state.setPremium = false;
} 



      
    },
  },
});

export const { userExpences } = expenseSlice.actions;
export default expenseSlice.reducer;

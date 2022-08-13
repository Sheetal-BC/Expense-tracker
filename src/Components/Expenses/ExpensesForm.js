import React, { Fragment, useRef, useState, useEffect} from "react";
import axios from "axios";

import "./ExpenseForm.css";
import ExpenseList from "./ExpenseList";

const ExpenseForm = () => {
  const [expense, setExpense] = useState([]);

  const amountInputRef= useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();

  const showExpensesOnScreen = async () => {
    const userId = localStorage.getItem("userID");
   try {
 const res = await axios.get(
        `https://expense-tracker-data-76538-default-rtdb.firebaseio.com/expenses/${userId}.json`
     );
       const data = res.data;
       let arr = [];
       for (const key in data) {
        arr.push({
          id: key,
          amount: data[key].amount,
          description: data[key].description,
          category: data[key].category,
     });
       }
       setExpense(arr);
     } catch (err) {
     console.log(`Some error ${err}`);
     }
   };


   useEffect(() => {
    showExpensesOnScreen();
   },[]);

  const addExpenseHandler = async (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;
  
  

    const newExpense = {
      amount: enteredAmount,
      description: enteredDescription,
      category: enteredCategory,
    };

   
     const userId = localStorage.getItem("userID");
    try {
      const res = axios.post(
        `https://expense-tracker-data-76538-default-rtdb.firebaseio.com/expenses/${userId}.json`,
        newExpense
      ).then(resp=>{
        console.log("after post",resp?.data)
        showExpensesOnScreen()
      })
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    amountInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    categoryInputRef.current.value = "";
  };




  return (
    <Fragment>
      <div className="container">
        <h3>Expense Tracker</h3>
        <form onSubmit={addExpenseHandler}>
          <div>
            <input type="number" 
            placeholder="Amount"
             ref={amountInputRef} 
             required/>
          </div>
          <div>
            <input
              type="text"
              placeholder="Discription"
              ref={descriptionInputRef}
              required
            />
          </div>
          <div>
            <select
              name="category"
              className="category"
              required
              ref={categoryInputRef}
            >
              <option value="selection" className="tosel">
                Choose category
              </option>
              <option>Electricity</option>
              <option>Movies</option>
              <option>On vacation</option>
              <option>Groceries</option>
              <option>Mobile Bills</option>
              <option>EMI</option>
              <option>Food</option>
              <option>Shoping</option>
              <option>Others</option>
            </select>
          </div>
          <div className="addItem">
            <button>Add Expense</button>
          </div>
        </form>
      </div>
      <div>
        <ExpenseList items={expense}
      
         />
      </div>
    </Fragment>
  );
};

export default ExpenseForm;

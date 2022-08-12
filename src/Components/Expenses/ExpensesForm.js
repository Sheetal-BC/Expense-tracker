import React, { Fragment, useRef, useState } from "react";

import './ExpenseForm.css';
import ExpenseList from "./ExpenseList";

const ExpenseForm = () =>{
    const [expense, setExpense] = useState([]);
    const amountInputRef = useRef();
    const descriptionInputRef = useRef();
    const categoryInputRef = useRef();

    const addExpenseHandler = (event) =>{
       event.preventDefault();
       const enteredAmount = amountInputRef.current.value;
       const enteredDescription = descriptionInputRef.current.value;
       const enteredCategory = categoryInputRef.current.value;
    

    setExpense((prevState) => {
        return [
          {
            amount: enteredAmount,
            description: enteredDescription,
            category: enteredCategory,
          },
          ...prevState,
        ];
      });
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
            <input type="number" placeholder="Amount" ref={amountInputRef} />
            </div>
            <div>
            <input type="text" placeholder="Discription" ref={descriptionInputRef} />
            </div>
            <div>
            <select name="category" className="category" required ref={categoryInputRef}>
            <option value="selection"  className ="tosel">Choose category</option>
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
        <div className="addItem" >
            <button>Add Expense</button>
        </div>    
        </form>
        </div>
        <div>
            <ExpenseList  items={expense}/>
        </div>
        </Fragment>
    );
}

export default ExpenseForm;
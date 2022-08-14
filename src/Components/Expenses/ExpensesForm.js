import React, { Fragment, useRef, useState, useEffect } from "react";
import axios from "axios";

import "./ExpenseForm.css";
import ExpenseList from "./ExpenseList";

const ExpenseForm = () => {
  const [expense, setExpense] = useState([]);

  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const [expenseData, setExpenseData] = useState({});

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
      console.log(err);
    }
  };

  useEffect(() => {
    showExpensesOnScreen();
  }, []);

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
    console.log(newExpense);

    const userId = localStorage.getItem("userID");
    if (expenseData?.id) {
      console.log('in update')
      expenseData.description=descriptionInputRef.current.value
      expenseData.amount=amountInputRef.current.value
      expenseData.category=categoryInputRef.current.value
      try {
        const res = await axios
          .put(
            `https://expense-tracker-data-76538-default-rtdb.firebaseio.com/expenses/${userId}/${expenseData?.id}.json`,
            expenseData
          )
          .then((resp) => {
            console.log("after update", resp?.data);
            setExpenseData({})
            showExpensesOnScreen();
          });
          console.log(res)
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = axios
          .post(
            `https://expense-tracker-data-76538-default-rtdb.firebaseio.com/expenses/${userId}.json`,
            newExpense
          )
          .then((resp) => {
            console.log("after post", resp?.data);
            showExpensesOnScreen();
          });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    amountInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    categoryInputRef.current.value = "";
  };

  const deleteHandler = (id) => {
    const userId = localStorage.getItem("userID");
    try {
      const res = axios.delete(
        `https://expense-tracker-data-76538-default-rtdb.firebaseio.com/expenses/${userId}/${id}.json`
      );

      setExpense(expense.filter((item) => item.id !== id));
      console.log("Sucessfully deleted");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const editHandler = async (id, item) => {
  
    amountInputRef.current.value = item?.amount;
    descriptionInputRef.current.value = item?.description;
    categoryInputRef.current.value = item?.category;
    setExpenseData(item);
    // const res = await axios.put(`https://expense-tracker-data-76538-default-rtdb.firebaseio.com/expenses/${userId}/${id}.json`,expense);
    console.log(id, item);
  };

  return (
    <Fragment>
      <div className="container">
        <h3>Expense Tracker</h3>
        <form onSubmit={addExpenseHandler}>
          <div>
            <input
              type="number"
              placeholder="Amount"
              ref={amountInputRef}
              required
            />
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
              <option>Kitchen-utensils</option>
              <option>Furniture</option>
              <option>Fuel</option>
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
        <ExpenseList
          items={expense}
          onDelete={deleteHandler}
          onEdit={editHandler}
        />
      </div>
    </Fragment>
  );
};

export default ExpenseForm;

import React, { Fragment, useRef, useState, useEffect } from "react";
import axios from "axios";
import "./ExpenseForm.css";
import ExpenseList from "./ExpenseList";
import { userExpences } from "../store/expenseReducer";
import { useDispatch, useSelector } from "react-redux";
import { set } from "../store/theme";
import Switch from "../Switch/Switch";


const ExpenseForm = () => {
  const [expense, setExpense] = useState([]);
  const [download, setDownload] = useState(false);
  const dispatch = useDispatch();
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const [expenseData, setExpenseData] = useState({});
  const showPremiumButton = useSelector((state) => state.expence.setPremium);
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    showExpensesOnScreen();
  }, []);

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
      dispatch(userExpences(arr));
    } catch (err) {
      console.log(err);
    }
  };

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
    if (expenseData.id) {
      console.log("Updated sucessfully");

      let obj = {
        description: descriptionInputRef.current.value,
        amount: amountInputRef.current.value,
        category: categoryInputRef.current.value,
      };
      try {
        const res = await axios
          .put(
            `https://expense-tracker-data-76538-default-rtdb.firebaseio.com/expenses/${userId}/${expenseData.id}.json`,
            obj
          )
          .then((resp) => {
            console.log("after update", resp?.data);
            setExpenseData({});
            showExpensesOnScreen();
          });
        console.log(res?.data);
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
    amountInputRef.current.value = item.amount;
    descriptionInputRef.current.value = item.description;
    categoryInputRef.current.value = item.category;
    setExpenseData(item);
    console.log(id, item);
  };


  const handleChange = () => {
    setDownload(true);
  };
 

  const handleToggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    dispatch(set(next));
  };

  const downloadHandler = () => {
    const data = JSON.stringify(expense);
    let blob = new Blob([data]);
    console.log("blob", blob);
    let file = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.download = "mydata.csv";
    a.href = file;
    a.click();
   
  };

 

  return (
    <Fragment>
      {showPremiumButton && <Switch onToggle={handleToggle} />}

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
              placeholder="Description"
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
      <div className="addPremium" data-theme={theme}>
        {showPremiumButton && (
          <button onClick={handleChange}>Activate Premium</button>
        )}
        {download && <button onClick={downloadHandler} >Download file</button>}
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

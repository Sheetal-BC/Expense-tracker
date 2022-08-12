import React from "react";

import './ExpenseList.css';


const ExpenseList = (props) => {
    let expenseTotal = 0;
    props.items.forEach((item) => {
      let subtotal = 0;
      subtotal = Number(item.amount);
      expenseTotal = expenseTotal + subtotal;
    });

 
    return (
      <>
      <div className="table-list">
        {props.items.map((item) => {
          return (      
             <ul key={item.id}>
                        <div className="amount">Description: {item.description}</div>
                        <div className="amount">Category: {item.category}</div>
                        <div className="amount">Amount: <span>&#8377;{item.amount}</span> </div>
            </ul>
          );
        })}
      </div>
      <div className="expensetotal">
        <h1> Total Amount spent: <span>&#8377;{expenseTotal}</span></h1>
      </div>
      </>
    );
  };
  

export default ExpenseList;
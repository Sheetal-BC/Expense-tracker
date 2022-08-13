import React from "react";

import './ExpenseList.css';



const ExpenseList = (props) => {


    let expenseTotal = 0;
    props.items.forEach((item) => {
      let subtotal = 0;
      subtotal = Number(item.amount);
      expenseTotal = Number(expenseTotal + subtotal);
    });


  
    return (
      <>
      <div className="table-list" >
        {props.items.map((item) => {
          return (     
             <ul key={item.id}>
                        <li className="amount">Description: {item.description}</li>
                        <li className="amount">Category: {item.category}</li>
                        <li className="amount">Amount: <span>&#8377;{item.amount}</span> </li>
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
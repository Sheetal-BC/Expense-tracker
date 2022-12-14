import React from "react";
import { faTrashCan, faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
                        <li className="item_description">Description: {item.description}</li>
                        <li className="item_category">Category: {item.category}</li>
                        <li className="item_amount">Amount: <span>&#8377;{item.amount}</span> </li>
                        <button className="delete-btn" 
                        onClick={()=>props.onDelete(item.id)} 
                        >
                          <FontAwesomeIcon icon={faTrashCan} className="highlight" size='2x'/></button>
                        <button className='edit-btn'
                        onClick={()=>props.onEdit(item.id,item)}>
                          <FontAwesomeIcon icon={faEdit} className="edit" size='2x'/>
                        </button>
              </ul>
              
          )
             
        
        })}
        
             
             
      </div>
      <div className="expensetotal">
        <h1> Total Amount spent: <span>&#8377;{expenseTotal}</span></h1>
      </div>
     
      </>
    );
  };
  

export default ExpenseList;
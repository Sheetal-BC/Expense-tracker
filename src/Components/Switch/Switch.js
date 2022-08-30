import React from "react";
import './Switch.css';

const Switch = (props) => {
   return (
    <div className='toggle'>
        <label className="switch">
        <input type='checkbox' onClick={props.onToggle}/>
        <span className="slider"/>
    </label> 
    </div>
   
    )
   
}

export default Switch;
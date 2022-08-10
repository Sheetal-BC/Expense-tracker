import React from "react";
import { Link } from "react-router-dom";
import './NavbarElement.css';




const Navbar = () => {
  
  return (
    <header className="header">
      <Link to="/home">
        <div className='logo'>Expense Tracker</div>
      </Link>
      <nav>
        <ul>
         <li>
          <Link to="/profile">Profile</Link>
         </li>

         <li>
          <Link to="/auth">SignUp</Link>
         </li>
         <li>
            <button>Logout</button>
          </li>
       
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

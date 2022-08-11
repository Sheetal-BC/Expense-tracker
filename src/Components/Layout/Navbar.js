import React, {useContext} from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../Store/AuthContext";
import './NavbarElement.css';




const Navbar = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <header className="header">
      <Link to="/home">
        <div className='logo'>Expense Tracker</div>
      </Link>
      <nav>
        <ul>
         <li>
         {isLoggedIn && (
          <Link to="/profile">Profile</Link>
          )} 
        </li>
         
         <li>
         {isLoggedIn && (
          <Link to="/auth">Login</Link>
         )}
         </li>
         
         <li>
         {isLoggedIn && (
            <button>Logout</button>
         )}
          </li>
       
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

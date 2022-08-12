import React, {useContext} from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../Store/AuthContext";
import './NavbarElement.css';




const Navbar = () => {
  const conCtx = useContext(AuthContext);
  const history = useHistory();

  const isLoggedIn = conCtx.isLoggedIn;

  const logoutHandler = (event) => {
    event.preventDefault();
    localStorage.setItem("Token", "");
    localStorage.setItem("userID", "");
    localStorage.setItem("Email", "");
    conCtx.logout()
    history.replace("/Auth");
  };

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
          <Link to="/expense">Expense</Link>
         )}
         </li>
         
         <li>
         {!isLoggedIn && (
          <Link to="/auth">Login</Link>
         )}
         </li>
         
         <li>
         {isLoggedIn && (
            <button onClick={logoutHandler}>Logout</button>
         )}
          </li>
       
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

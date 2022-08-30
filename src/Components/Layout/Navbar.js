import React from "react";
import { Link, useHistory } from "react-router-dom";
// import AuthContext from "../../Store/AuthContext";
import "./NavbarElement.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/auth";

const Navbar = () => {
  // const conCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  // const isLoggedIn = conCtx.isLoggedIn;

  const logoutHandler = (event) => {
    event.preventDefault();
    localStorage.removeItem("Token");
    dispatch(logout());
    history.replace("/");
  };

  return (
    <header className="header">
      <Link to="/home">
        <div className="logo">Expense Tracker</div>
      </Link>
      <nav>
        <ul>
          <li>{isLoggedIn && <Link to="/profile">Profile</Link>}</li>

          <li>{isLoggedIn && <Link to="/expense">Expense</Link>}</li>

          <li>{!isLoggedIn && <Link to="/">Login</Link>}</li>

          <li>
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

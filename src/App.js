import React, { Fragment } from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import ForgotPasswordForm from "./Components/Pages/ForgotPassword/ForgotPasswordForm";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Pages/HomePage/Home";
import ProfilePage from "./Components/Pages/ProfilePage/ProfilePage";
// import AuthContext from "./Store/AuthContext";
import ExpensePage from "./Components/Pages/Expense/ExpensePage";
import { useSelector } from "react-redux";
import "./App.css";
import AuthForm from "./Components/Pages/AuthPage/AuthForm";

function App() {
  // const conCtx= useContext(AuthContext);
  const state = useSelector((state) => state);
  return (
    <BrowserRouter>
      <Fragment>
        <Layout />
      
        <Switch>
          {state?.user?.isAuthenticated === true && (
            <Route exact path="/home">
              <Home />
            </Route>
          )}

          {state?.user?.isAuthenticated === false && (
            <Route exact path="/">
              <AuthForm />
            </Route>
          )}

          {state?.user?.isAuthenticated && (
            <Route exact path="/profile">
              <ProfilePage />
            </Route>
          )}
          {state?.user?.isAuthenticated && (
            <Route exact path="/expense">
              <ExpensePage />
            </Route>
          )}
          {state?.user?.isAuthenticated === false && (
            <Route exact path="/forgotpassword">
              <ForgotPasswordForm />
            </Route>
          )}
          {state?.user?.isAuthenticated === false &&<Route path="*">
            <Redirect to="/" />
          </Route>}
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
}
export default App;

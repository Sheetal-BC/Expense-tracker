import React, { Fragment,useContext } from "react";
import { Route,Switch, Redirect } from "react-router-dom";
import ForgotPasswordPage from "./Components/Pages/ForgotPasswordPage";
import Layout from "./Components/Layout/Layout";
import AuthPage from "./Components/Pages/AuthPage";
import Home from "./Components/Pages/Home";
import ProfilePage from "./Components/Pages/ProfilePage";
import AuthContext from "./Store/AuthContext";






function App() {
  const conCtx= useContext(AuthContext);

  return (
    <Fragment>
      <Layout/>
    <Switch>
    {conCtx.isLoggedIn && <Route path="/home" >
         <Home />
        </Route>}
        {!conCtx.isLoggedIn && <Route path="/auth" >
         <AuthPage />
        </Route>}
        {conCtx.isLoggedIn && <Route path='/profile'>
        <ProfilePage />
        </Route> }
        {!conCtx.isLoggedIn && <Route path='/forgotpassword'>
        <ForgotPasswordPage />
        </Route> }

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
   
    </Fragment>
    
    
  )
  
}

export default App;

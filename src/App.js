import React, { Fragment } from "react";
import { Route,Switch, Redirect } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Navbar from "./Components/Layout/Navbar";
import ProfilePage from "./Components/Pages/ProfilePage";
import AuthForm from "./Components/SignUp/AuthForm";





function App() {
  return (
    <Fragment>
      <Layout/>
    <Switch>
        <Route path="/auth" >
         <AuthForm />
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
   
    </Fragment>
    
    
  )
  
}

export default App;

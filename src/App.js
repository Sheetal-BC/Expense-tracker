import React, { Fragment,useContext } from "react";
import { Route,Switch, Redirect } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import AuthPage from "./Components/Pages/AuthPage";
import Home from "./Components/Pages/Home";
import ProfilePage from "./Components/Pages/ProfilePage";






function App() {
 

  return (
    <Fragment>
      <Layout/>
    <Switch>
   <Route path="/home" >
         <Home />
        </Route>
    <Route path="/auth" >
         <AuthPage />
        </Route>
     <Route path='/profile'>
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

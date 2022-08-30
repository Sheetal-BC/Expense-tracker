import React, { useEffect, useRef, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth";

import "./AuthForm.css";

const AuthForm = () => {
  // const conCtx = useContext(AuthContext);

  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
 
  useEffect(() => {
    checkUser();
  }, []);
  const switchHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const checkUser = () => {
    const token_id = localStorage.getItem("Token");
    if (token_id !== null) {
      AuthenticateAndRedirect({ idToken: token_id });
      history.replace('/expense')
    }
   
  };
  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;

    setIsLoading(true);
    if (isLogin) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHFjUKM-aGm5ZqkAwmU3jfMJK9vgEyBKE",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          console.log("User has successfully Logged in.");
          localStorage.setItem("Token", data.idToken);
          localStorage.setItem("userID", data.localId);
          inputEmailRef.current.value = "";
          inputPasswordRef.current.value = "";
          setIsLoading(false);
          AuthenticateAndRedirect(data);
        } else {
          const data = await response.json();
          alert(data.error.message);
        }
      } catch (err) {
        console.log("Logging Something went wrong!");
      }
    } else if (!isLogin) {
      if (inputPasswordRef.current.value === confirmPasswordRef.current.value) {
        try {
          const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBHFjUKM-aGm5ZqkAwmU3jfMJK9vgEyBKE",
            {
              method: "POST",
              body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            console.log("User has successfully signed up.");
            inputEmailRef.current.value = "";
            inputPasswordRef.current.value = "";
            confirmPasswordRef.current.value = "";
            setIsLogin(true);
            setIsLoading(false);
          } else {
            const data = await response.json();
            alert(data.error.message);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("Password doesnot match");
      }
    }
  };
  const AuthenticateAndRedirect = (data) => {
    dispatch(login(data.idToken));
    history.replace("/home");
  };


  return (
    <div className="signup">
      <form onSubmit={submitHandler}>
        <div className="heading">
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>

          <div className="useremail">
            <input
              className={isLogin ? "input-login" : "input-signup"}
              type="email"
              placeholder="Email"
              htmlFor="email"
              ref={inputEmailRef}
              required
            />
          </div>
          <div className="userpassword">
            <input
              className={isLogin ? "input-login" : "input-signup"}
              type="password"
              placeholder="Password"
              htmlFor="password"
              minLength="6"
              maxLength="16"
              ref={inputPasswordRef}
              required
            />
          </div>
          <div className="confirmpassword ">
            {!isLogin && (
              <input
                className="input-signup"
                type="password"
                placeholder="Confirm Password"
                htmlFor="password"
                minLength="6"
                maxLength="16"
                ref={confirmPasswordRef}
                required
              />
            )}
          </div>
          <div className="sign-btn">
            {!isLoading && <button>{isLogin ? "Login" : "Sign up"}</button>}
            {isLoading && <p>Sending request...</p>}
            {isLogin && <Link to="/forgotpassword">Forgot Password</Link>}
          </div>
        </div>
      </form>
      <div className="msg-box">
        <button onClick={switchHandler}>
          {isLogin ? "Dont have an acount? SignUp" : "Have an account? login"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;

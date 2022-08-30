import React, { Fragment, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import "./ForgotPasswordForm.css";

const ForgotPasswordForm = () => {
  const [isLoading, setLoading] = useState(false);
  const inputEmailRef = useRef();
  const history = useHistory();

  const changePasswordHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = inputEmailRef.current.value;

    setLoading(true);
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBHFjUKM-aGm5ZqkAwmU3jfMJK9vgEyBKE",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: enteredEmail,
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
        alert(`Successfully sent the link to ${enteredEmail}`);
        history.replace("/");
      } else {
        const data = await response.json();
        alert(data.error.message);
      }
      setLoading(false);
    } catch (err) {
      console.log("Something went wrong");
      console.log(err);
      setLoading(false);
    }
  };
  const navigateToHandler = (event) => {
    event.preventDefault();
    history.replace("/");
  };

  return (
    <Fragment>
      <div className="changePassword">
        <h1>Reset Password</h1>
        <form>
          <div className="enteremail"> Enter Your Registered Mail Id </div>
          <div className="enteremail">
            <input
              type="email"
              htmlFor="email"
              className="input"
              placeholder="Email"
              ref={inputEmailRef}
              required
            />
          </div>
          <div className="sign-btn">
            <button onClick={changePasswordHandler}>
              {isLoading ? "Sending..." : "Send Link"}
            </button>
          </div>
        </form>
      </div>
      <div className="msg-box">
        <button onClick={navigateToHandler}>
          Do you remember Password? Login
        </button>
      </div>
    </Fragment>
  );
};
export default ForgotPasswordForm;

import React, { useRef, useState} from "react";
import "./AuthForm.css";


const AuthForm = () => {
const inputEmailRef = useRef();
const inputPasswordRef = useRef();
const confirmPasswordRef = useRef();
const [isLoading, setIsLoading] = useState(false);


const submitHandler = (event) =>{
    event.preventDefault();

    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;

    setIsLoading(true);
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBwU1sMNAm0lD4QbSAAmDEDhr5ngGYI-Lk',{
        method: 'POST',
        body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            confirmPassword:enteredConfirmPassword,
            returnSecureToken: true,
          }), 
          headers: {
            'Content-Type': 'application/json',
          },
    })
    .then((res) => {
        setIsLoading(false);
        if (res.ok) {
            console.log('user succesfully registered');
          return res.json();
         
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            alert(errorMessage);
          });
        }
      })

}


  return (
    <div className="signup">
      <form onSubmit={submitHandler}>
        <div className="heading">
          <h2>SignUp</h2>

          <div className="useremail">
            <input type="email" placeholder="Email" htmlFor="email" ref={inputEmailRef} required />
          </div>
          <div className="userpassword">
            <input
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
            <input
              type="password"
              placeholder="Confirm Password"
              htmlFor="password"
              minLength="6"
              maxLength="16"
              ref={confirmPasswordRef}
              required
            />
          </div>
          <div className="sign-btn">
          {!isLoading && (
            <button>Sign Up</button>
            )}
            {isLoading && <p>Sending request...</p>}

          </div>
        </div>
      </form>
      <div className="msg-box">
        <button>Have an account? login</button>
      </div>
    </div>
  );
};

export default AuthForm;

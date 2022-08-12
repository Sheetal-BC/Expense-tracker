import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./VerifyForm.css";

const VerifyForm = () => {
  const [checkVerified, setverified] = useState(false);

  const autoVerifyEmailCheck = async () => {
    const token = localStorage.getItem("Token");

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBwU1sMNAm0lD4QbSAAmDEDhr5ngGYI-Lk",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            oobCode: "User Verified. Thank you!!",
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data.emailVerified);
        console.log("Send success");
        if (data.emailVerified) {
          setverified(true);
        }
      }
    } catch (err) {
      console.log(`Error = ${err}`);
    }
  };

  useEffect(() => {
    autoVerifyEmailCheck();
  }, []);

  const verifyHandler = async () => {
    const token = localStorage.getItem("Token");

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBwU1sMNAm0lD4QbSAAmDEDhr5ngGYI-Lk",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            requestType: "VERIFY_EMAIL",
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        console.log("Send success");
      }
    } catch (err) {
      console.log(`Error = ${err}`);
    }
  };
  return (
    <React.Fragment>
      <section className="verifation">
        <div>
          {!checkVerified && <h4> Please Verify Your Email</h4>}
          {!checkVerified && (
            <button onClick={verifyHandler}>Verify Email</button>
          )}

          {checkVerified && (
            <div className=" verified">
              <p>Verification successfully done!!</p>
              <img src={process.env.PUBLIC_URL+'checked.png'} alt="verification icon"/>
              <h4>
                Your Profile is incomplete please
                <Link to="/profile"> update Your Profile</Link>
              </h4>
            </div>
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

export default VerifyForm;

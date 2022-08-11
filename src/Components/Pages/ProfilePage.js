import { Fragment, useState, useRef, useEffect, useContext} from "react";
import AuthContext from "../../Store/AuthContext";

import "./ProfilePage.css";

const ProfilePage = () => {
  const [showUdate, setShowUpdate] = useState(false);
  const nameInputRef = useRef();
  const photoUrlRef = useRef();
  const conCtx = useContext(AuthContext);

  const showUpdatHandler = () => {
    setShowUpdate((prevState) => !prevState);
  };


  const autogetData = async () => {
        const token = localStorage.getItem("token");
    try {
     
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBwU1sMNAm0lD4QbSAAmDEDhr5ngGYI-Lk",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: conCtx.token,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        data.users.forEach((element) => {
          console.log(data.users);
          nameInputRef.current.value = element.displayName;
          photoUrlRef.current.value = element.photoUrl;
        });
      } else {
        const data = await res.json();
           console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    autogetData();
  });

  const updateHandler = async(event) => {
    event.preventDefault();
    const entertedName = nameInputRef.current.value;
    const entertedPhotoUrl = photoUrlRef.current.value;
    const token = localStorage.getItem("token");
    
    setShowUpdate(true);
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBwU1sMNAm0lD4QbSAAmDEDhr5ngGYI-Lk",
        {
          method:  "POST",
          body: JSON.stringify({
            idToken: conCtx.token,
            displayName: entertedName,
            photoUrl: entertedPhotoUrl,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log("Updated success");
        nameInputRef.current.value = "";
        photoUrlRef.current.value = "";
      } else {
        const data = await res.json();
        alert(data.error.message);
      }
    } catch (err) {
      console("Updaing went wrong!");
    }
  };
 
  return (
    <Fragment>
      <div className="welcome">
        <h1>Welcome to Expense Tracker</h1>
        <p>
          Your Profile is incomplete.
          <button onClick={showUpdatHandler}>Complete now</button>
        </p>
        <hr />
      </div>
      
     {showUdate && (
     <div className="contactDetail">
         <h2>Contact Details</h2>
        
          <form>
            
            <div className="profile">
                <img src={process.env.PUBLIC_URL+'profile.png'}  /> 
                <label>Full Name</label>
              <input type="text" ref={nameInputRef} required />
            </div>
            <div className="profile">
            <img src={process.env.PUBLIC_URL+'Globe.png'}  /> 
              <label>Photo url</label>
              <input type="text" ref={photoUrlRef} required />
            </div>
        
            <div className="update-btn">

            
            
              <button onClick={updateHandler} className="updatebtn">
                Update
              </button>
            </div>
          </form>
      
      </div>
       )}
    </Fragment>
  );
};

export default ProfilePage;

import { Fragment, useState, useRef, useEffect } from "react";


import "./ProfilePage.css";

const ProfilePage = () => {
  const [showUdate, setShowUpdate] = useState(false);
  const nameInputRef = useRef();
  const photoUrlRef = useRef();
  const token = localStorage.getItem('Token')

  const showUpdatHandler = () => {
    setShowUpdate((prevState) => !prevState);
  };

  const autogetData = async () => {
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBHFjUKM-aGm5ZqkAwmU3jfMJK9vgEyBKE",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
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
    } catch (err) {}
  };

  useEffect(() => {
    autogetData();
  });

  const updateHandler = async (event) => {
    event.preventDefault();
    const entertedName = nameInputRef.current.value;
    const entertedPhotoUrl = photoUrlRef.current.value;

    setShowUpdate(true);
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBHFjUKM-aGm5ZqkAwmU3jfMJK9vgEyBKE",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
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
        console.log(data);
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
              <img src={process.env.PUBLIC_URL + "profile.png"} alt="profile" />
              <label>Full Name</label>
              <input type="text" ref={nameInputRef} required />
            </div>
            <div className="profile">
              <img src={process.env.PUBLIC_URL + "Globe.png"} alt="[url" />
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

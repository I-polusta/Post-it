import React, { useEffect, useState } from "react";
import { useStateValue } from "../../../StateProvider";
import "./UserProfile.scss";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebase";
import useGeoLocation from "../../geolocation/GeoLocation";
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
function UserProfile() {
  const [{ user }, dispatch] = useStateValue();
  const [details, setDetails] = useState([]);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const email = user.email;
  const uid = collection(db, "users");
  const q = query(uid, where("email", "==", email));
  console.log(typeof email);
  const history = useHistory();
  const location = useGeoLocation();
  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      setDetails(
        querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    });
    console.log(details);
  }, []);
  const handleLogout = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="dash">
      {details.map((detail) => (
        <>
          <div className="dash__container__img">
            <div className="dash__label__img">
              <h3>Profile Picture</h3>
            </div>
            <div className="dash__entry__img">
              <img src={detail.data.image} />
            </div>
          </div>
          <div className="dash__container">
            <div className="dash__label">
              <h3>Email</h3>
            </div>
            <div className="dash__entry">
              <h4>{detail.data.email}</h4>
            </div>
          </div>

          <div className="dash__container">
            <div className="dash__label">
              <h3>Name</h3>
            </div>
            <div className="dash__entry">
              <h4>{detail.data.name}</h4>
            </div>
          </div>

          <div className="dash__container">
            <div className="dash__label">
              <h3>Contact No:</h3>
            </div>
            <div className="dash__entry">
              <h4>{detail.data.phone}</h4>
            </div>
          </div>

          <div className="dash__container">
            <div className="dash__label">
              <h3>Location coordinates</h3>
            </div>
            <div className="dash__entry">
              <h4>
                {" "}
                {location.loaded
                  ? JSON.stringify(location.coordinates)
                  : "Location data not available yet."}
              </h4>
            </div>
          </div>
        </>
      ))}
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default UserProfile;

import React, { useState } from "react";
import "./Profile.scss";
import { storage } from "../../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useStateValue } from "../../../StateProvider";
import {
  collection,
  addDoc,
  Firestore,
  getFirestore,
  FieldValue,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Profile() {
  const [{ user }, dispatch] = useStateValue();
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const history = useHistory();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFiles = (e) => {
    e.preventDefault();
    if (!file) return;
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(collection(db, "users"), {
      email: user.email,
      image: url,
      name: name,
      phone: phone,
    });
    history.push("/dashboard");
  };

  return (
    <div className="profile">
      <div className="profile__header">
        <div>
          <h3>Set Up Your Account</h3>
        </div>
      </div>

      <div className="form__profile">
        <form>
          <div className="input__fields">
            <div>
              <h4>Name</h4>
            </div>
            <div className="input__div">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="input__fields">
            <div>
              <h4>Contact Number</h4>
            </div>
            <div className="input__div">
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="input__fields">
            <div>
              <h4>Profile Picture</h4>
            </div>
            <div className="input__div">
              <input type="file" onChange={handleChange} />
            </div>
          </div>
          <div className="input__fields">
            <div>
              <p>Click to upload your Profile</p>
            </div>
            <div className="input__div">
              <button onClick={uploadFiles}>Upload</button>{" "}
            </div>
          </div>

          <div className="input__fields">
            <div className="progress__bar">
              <p>Uploading done {progress}%</p>
            </div>
          </div>
          <p>Click Create Profile once you see your image</p>
          <button type="submit" onClick={handleSubmit}>
            Create Profile
          </button>
        </form>
      </div>

      <div className="dp__upload">
        <img
          src={url || "http://via.placeholder.com/300"}
          alt="firebase-image"
        />
      </div>
    </div>
  );
}

export default Profile;

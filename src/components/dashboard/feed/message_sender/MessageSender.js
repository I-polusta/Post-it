import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import "./MessageSender.scss";
import { useStateValue } from "../../../../StateProvider";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  Firestore,
  getFirestore,
  FieldValue,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../../firebase";
function MessageSender() {
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [inputURL, setInputURL] = useState("");
  const [details, setDetails] = useState([]);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const email = user.email;
  const uid = collection(db, "users");
  const q = query(uid, where("email", "==", email));
  console.log(typeof email);
  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      setDetails(
        querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    });
    console.log(details);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    {
      details.map((detail) =>
        addDoc(collection(db, "posts"), {
          title: input,
          timestamp: new Date(),
          profilepic: detail.data.image,
          username: detail.data.name,
          email: detail.data.email,
          image: inputURL,
          likes: 0,
          Description: description,
        })
      );
    }
    setInput("");
    setDescription("");
    setInputURL("");
  };

  return (
    <div className="messageSender">
      <div className="messageSender__top">
        {details.map((detail) => (
          <>
            <div className="message__sender__head">
              <div>
                <Avatar src={detail.data.image} />
              </div>
              <div>
                <h4> Hi!! {detail.data.name} What's on your mind today?</h4>
              </div>
            </div>
          </>
        ))}
        <p>Create your Post</p>
        <hr></hr>
        <form>
          <div className="post__form__container">
            <div className="form__fields">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                className="messageSender__input"
                placeholder={`Title:`}
              />
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                className="messageSender__input"
                placeholder={`What are your Thoughts??`}
              />
              <input
                value={inputURL}
                onChange={(e) => setInputURL(e.target.value)}
                type="text"
                className="messageSender__input"
                placeholder={`input Image URl `}
              />
              <button onClick={handleSubmit} type="submit">
                POST
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MessageSender;

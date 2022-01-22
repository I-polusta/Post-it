import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Post.scss";
import { useStateValue } from "../../../../StateProvider";
import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  query,
  where,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { firebaseConfig } from "../../../../firebase";

function Post({
  profilepic,
  image,
  username,
  timestamp,
  title,
  Description,
  likes,
  email,
}) {
  const [{ user }, dispatch] = useStateValue();
  const [details, setDetails] = useState([]);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  let [counter, setCounter] = useState(0);
  const uid = collection(db, "posts");
  const q = query(uid, where("email", "==", email));
  const counterRef = doc(db, "posts", "likes");

  const [like, setLike] = useState(likes),
    [isLike, setIsLike] = useState(false),
    onLikeButtonClick = () => {
      setLike(like + (isLike ? -1 : 1));
      setIsLike(!isLike);
    };

  const handle__likes = (e) => {
    e.preventDefault();
    setCounter(counter++);
    console.log(counter);
    onSnapshot(q, (querySnapshot) => {
      setDetails(
        querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    });
    console.log(counter);
    // updateDoc(counterRef, {
    //   likes: true,
    // });
    // {
    //   details.map((detail) =>
    //     updateDoc(uid, where("email", "==", email), {
    //       likes: counter,
    //     })
    //   );
    // }
  };

  return (
    <div className="post">
      <div className="post__top">
        <Avatar src={profilepic} className="post__avatar" />
        <div className="post__topInfo">
          <h3>{username}</h3>
        </div>

        <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
      </div>
      <hr></hr>
      <div className="post__bottom">
        <div className="post__title">
          <h3>Title: </h3>
          <h5>{title}</h5>
        </div>
        <div className="post__description">
          <h4>Description:</h4>
          <p>{Description}</p>
        </div>
      </div>
      <hr></hr>
      <div className="post__image">
        <img src={image} alt="" />
      </div>

      <div className="post__options">
        <div className="post__option">
          <button
            className={"like-button " + (isLike ? "liked" : "")}
            onClick={onLikeButtonClick}
          >
            {"Like"} | {like}
          </button>
          <style>{`
.like-button {
    font-size: 1rem;
    padding: 5px 10px;
    color:  #585858;
}
.liked {
    font-weight: bold;
    color: #1565c0;
  }
`}</style>
        </div>
      </div>
    </div>
  );
}

export default Post;

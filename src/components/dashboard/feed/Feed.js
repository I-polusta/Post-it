import React, { useEffect, useState } from "react";
import MessageSender from "./message_sender/MessageSender";
import Post from "./posts/Post";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import db, { firebaseConfig } from "../../../firebase";
function Feed() {
  const [posts, setPosts] = useState([]);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    });
  }, []);
  return (
    <div className="feed">
      <MessageSender />
      {posts.map((post) => (
        <Post
          key={post.data.id}
          profilepic={post.data.profilepic}
          title={post.data.title}
          timestamp={post.data.timestamp}
          username={post.data.username}
          image={post.data.image}
          likes={post.data.likes}
          Description={post.data.Description}
          email={post.data.email}
        />
      ))}
    </div>
  );
}

export default Feed;

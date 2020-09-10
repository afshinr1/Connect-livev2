import React, { useState, useEffect } from "react";
import "./Home.css";
import Post from "../Post/Post";
import { db, auth } from "../../Firebase";

import ImageUpload from "../ImageUpload/ImageUpload";

const Home = ({user}) => {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    console.log('in home use eeffect')
    db.collection("Posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, [user]);

  return (
    <div className="home">
      {user? (
        <ImageUpload username={user.displayName} />
      ) : (

        <h3 className='login-apply' >Login to upload</h3>
      )}

      <div className="app-posts">
        {posts.map((post) => (
          <Post
            user={user}
            postId={post.id}
            key={post.id}
            username={post.post.username}
            caption={post.post.caption}
            imageUrl={post.post.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

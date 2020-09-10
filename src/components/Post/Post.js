import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../../Firebase";
import * as firebase from "firebase";

const Post = (props) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    let unsubscribe;
    if (props.postId) {
      unsubscribe = db
        .collection("Posts")
        .doc(props.postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setComments(
            snapshot.docs.map((doc) => {
              return doc.data();
            })
          )
        );
    }
    return () => {
      unsubscribe();
    };
  }, [props.postId]);

  const postComment = (e) => {
    e.preventDefault();
    if (comment.length === 0) {
      alert("Comment box empty");
    } else {
      db.collection("Posts").doc(props.postId).collection("comments").add({
        text: comment,
        username: props.user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setComment("");
  };

  return (
    <div className="post">
      <div className="post_header">
        <Avatar className="post_avatar" alt="Afshin" src="Afshi" />
        <h3>{props.username}</h3>
      </div>
      <img className="post_image" src={props.imageUrl} alt=""></img>
      <h4 className="post_text">
        <strong>{props.username}: </strong> {props.caption}
      </h4>
      <hr />

      <div className="post-comments">
        {comments.map((comm, index) => (
          <p key={index}>
            <strong className="comment_username">{comm.username}</strong>
            {comm.text}
          </p>
        ))}
      </div>
      {props.user? (
        <form className="post_commentBox">
          <input
            className="comment-input"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add comment"
          ></input>
          <button className="comment-button" onClick={postComment}>
            Send
          </button>
        </form>
      ) : (
        <h3 className="login-comment">Please login to leave a comment</h3>
      )}
    </div>
  );
};

export default Post;

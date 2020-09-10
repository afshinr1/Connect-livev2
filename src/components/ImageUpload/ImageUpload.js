import React, { useState } from "react";
import { Button, Modal, makeStyles } from "@material-ui/core";
import { db, storage } from "../../Firebase";
import * as firebase from "firebase";
import "./ImageUpload.css";

const ImageUpload = ({ username }) => {
  const [open, setOpen] = useState(false);

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const handleChange = (e) => {
    if (e.target.files[0]) setImage(e.target.files[0]);
  };

  const handleUpload = (e) => {
    if(image && caption){

      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //Progress stuff
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          //Error fnc
          console.log(error);
          alert(error.message);
        },
        () => {
          //completed
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("Posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: url,
                username: username,
              });
              setProgress(0);
              setImage(null);
              setCaption("");
              setOpen(false)
            });
        }
      )
    }
    else{
      alert("Missing one or more fields")
    }
  };

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  return (
    <div className="image-upload">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <div className='image-upload-modal'>
            <progress
              className="progress-bar"
              value={progress}
              max="100"
            ></progress>
            <input
              className='caption'
              type="text"
              placeholder="Enter caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></input>
            <input className='file' type="file" onChange={handleChange} />
            <Button variant="contained" color="default" onClick={handleUpload}>
              Upload
            </Button>{" "}
          </div>
         
        </div>
      </Modal>

      <Button color="primary" variant='contained' onClick={() => setOpen(true)}>
        Upload
      </Button>
    </div>
  );
};

export default ImageUpload;

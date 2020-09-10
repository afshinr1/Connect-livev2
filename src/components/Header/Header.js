import React, { useState } from "react";
import "./Header.css";
import {  NavLink } from "react-router-dom";
import { Input, Modal, makeStyles, Button } from "@material-ui/core";
import { auth } from "../../Firebase";
import "./Header.css";
const Header = ({ user, handleUser }) => {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault()
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        handleUser(authUser.user)
         authUser.user.updateProfile({
          displayName: username,
        });
        auth
        .signInWithEmailAndPassword(email, password)
      }
    
      )
      .catch((error) => alert(error.message));
      setOpen(false)
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
    setEmail("");
    setPassword("");
  };
  console.log('header rendering')
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
    <div className='header-div'>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img src="./images/icon.png" alt="logo"></img>
            <form className="signup-form">
              <Input
                placeholder="Enter email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="contained" onClick={handleSignIn}>
                Submit
              </Button>
            </form>
          </center>
        </div>
      </Modal>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img src="./images/icon.png" alt="logo"></img>
            <form className="signup-form">
              <Input
                placeholder="Enter username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="Enter email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="contained" onClick={handleSignUp}>
                Submit
              </Button>
            </form>
          </center>
        </div>
      </Modal>

      <div className="header">
        <div className="header-logo">
          <img src={"./images/icon.png"} alt="icon"></img>
          <h3>Connect Live</h3>
        </div>

        <div className="navigation">
          <ul className="list">
            <NavLink
              activeClassName="selected"
              activeStyle={{
                fontWeight: "bold",
                color: "red",
              }}
              style={{ textDecoration: "none" }}
              exact
              to="/"
            >
              <li className="list-item">Home</li>
            </NavLink>
            <NavLink
              activeClassName="selected"
              activeStyle={{
                fontWeight: "bold",
                color: "red",
              }}
              style={{ textDecoration: "none" }}
              to="/about"
            >
              <li className="list-item">About</li>
            </NavLink>

            <NavLink
              activeClassName="selected"
              activeStyle={{
                fontWeight: "bold",
                color: "red",
              }}
              style={{ textDecoration: "none" }}
              to="/contact"
            >
              <li className="list-item">Contact</li>
            </NavLink>
          </ul>
        </div>

        {!user ? (
          <div className="login">
            <Button color="primary" onClick={() => setOpen(true)}>
              Sign Up
            </Button>
            <Button color="primary" onClick={(e) => setOpenSignIn(true)}>
              Sign in
            </Button>
          </div>
        ) : (
          <div className="logout">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => auth.signOut()}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import * as firebase from "firebase";
import "./App.css";

import ToDoItems from "./ToDoItems";

import "./App.css";

import { Button, Input } from "@material-ui/core";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

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

function App(props) {
  const [items, setItems] = useState([]);
  const [content, setContent] = useState("");

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  const [openSignin, setOpenSignin] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      //perform some clenup

      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("items")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs.doc);
        setItems(
          snapshot.docs.map((doc) => ({ id: doc.id, content: doc.data() }))
        );
      });
  }, []);

  const addProduct = () => {
    firebase
      .firestore()
      .collection("items")
      .add({
        content: content,
      })
      .then((docRef) => {
        docRef.get().then((snapshot) => {
          console.log("Product has been added", snapshot.data());
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteProduct = (id) => {
    console.log("Reached to delete products");

    const docRef = firebase.firestore().collection("items").doc(id);

    docRef
      .delete()
      .then(() => {})
      .catch((error) => {
        console.log("Error in deteting the product from firebase", error);
      });
  };

  const handleSignup = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    setOpen(false);
  };

  const handleSignin = (event) => {
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignin(false);
  };


  

  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://en.instagram-brand.com/wp-content/themes/ig-branding/prj-ig-branding/assets/images/ig-logo-black.svg"
              />
            </center>

            <Input
              placeholder="UserName"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={handleSignup}>Log-in</Button>
          </form>
        </div>
      </Modal>

      {/* sign */}

      <Modal open={openSignin} onClose={() => setOpenSignin(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://en.instagram-brand.com/wp-content/themes/ig-branding/prj-ig-branding/assets/images/ig-logo-black.svg"
              />
            </center>

            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={handleSignin}>Sign In</Button>
          </form>
        </div>
      </Modal>

      <div className="nav">
        <div className="nav__logo">To-Do</div>

 
       

          <div>
          {user ? (

            <div className='au'>
              <Button variant="contained">{user.displayName}</Button>
            
            <Button variant="contained" onClick={() => firebase.auth().signOut()}>Log Out</Button>
            </div>
          ) : (
            <div className="app__loginContainer">
              <Button variant="contained" onClick={() => setOpenSignin(true)}>Sign In</Button>
              <Button variant="contained" onClick={() => setOpen(true)}>Sign UP</Button>
            </div>
          )}
          </div>
        
      </div>
      <div className="todo__container">
        <div className="todo__input">
          <Input
            type="text"
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Enter Todo"
          />

          <Button variant="contained" color="secondary" onClick={addProduct}>
            Add ToDo
          </Button>
        </div>
        <div className="todo__content">
          {user ? items.map((item) => (
            <ToDoItems item={item} handleDeleteProduct={handleDeleteProduct} />
          )) : <h2>Sign-In To See To-Do</h2> }
          
        </div>
      </div>
    </div>
  );
}

export default App;

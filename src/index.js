import React from "react";
import ReactDOM from "react-dom";

import * as firebase from "firebase";

import "firebase/firestore";

import "./index.css";
import App from "./components/App";

import { configureStore } from "./store";

const store = configureStore();

console.log("your current store is ", store.getState());

const firebaseConfig = {
  apiKey: "AIzaSyDw0-dOC3nzAFMTtjBh-yOorJKEvEXUxvs",
  authDomain: "todo-e480a.firebaseapp.com",
  databaseURL: "https://todo-e480a.firebaseio.com",
  projectId: "todo-e480a",
  storageBucket: "todo-e480a.appspot.com",
  messagingSenderId: "785101094852",
  appId: "1:785101094852:web:71daef9cbe1e8de0902e91",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  
    <App />
 ,

  document.getElementById("root")
);

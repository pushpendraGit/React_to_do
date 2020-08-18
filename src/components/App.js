import React, { Component } from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";
import "./App.css";

import toDo, { bySnap, remove } from "../actions/todo";
import { Button, Input } from "@material-ui/core";
import ToDoItems from "./ToDoItems";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      content: "",
    };

    this.db = firebase.firestore();
  }

  // This is For Firebase

  componentDidMount() {
    this.db.collection("items").onSnapshot((snapshot) => {
      const items = snapshot.docs.map((doc) => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });
      this.setState({ items: items });
    });
  }

  handleChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  addProduct = () => {
    const { content } = this.state;
    this.db
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

  // for delete

  handleDeleteProduct = (id) => {
    console.log("Reached to delete products");

    const docRef = this.db.collection("items").doc(id);

    docRef
      .delete()
      .then(() => {})
      .catch((error) => {
        console.log("Error in deteting the product from firebase", error);
      });
  };

  render() {
    const { items } = this.state;

    console.log("Your all props is ", items);

    return (
     
        
     
      <div className="app">
        <div className="todo__container">
          <div className="todo__input">
            <Input
              type="text"
              onChange={this.handleChange}
              required
              placeholder="Enter Todo"
            />

            <Button
              variant="contained"
              color="secondary"
              onClick={this.addProduct}
            >
              Add ToDo
            </Button>
          </div>
          <div className="todo__content">
            {items.map((item) => (
              <ToDoItems
                item={item}
                key={item.id}
                handleDeleteProduct={this.handleDeleteProduct}
              />
            ))}
          </div>
        </div>
      </div>
 
    );
  }
}

//Direct using es 6 method

function mapStateToProps({ toDo }) {
  return {
    toDo,
  };
}

export default connect(mapStateToProps)(App);

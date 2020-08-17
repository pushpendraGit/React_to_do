import React, { Component } from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";

import toDo, { bySnap } from "../actions/todo";
import { Button, Input } from "@material-ui/core";
import ToDoItems from "./ToDoItems";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };

    this.db = firebase.firestore();
  }

  // This is For Firebase

  componentDidMount() {
    this.db.collection("items").onSnapshot((snapshot) => {
      const items = snapshot.docs.map((doc) => {
        const content = doc.data().item;
        const id = doc.id;

        const data = {
          content,
          id
        }

        this.props.dispatch(toDo(data));
      });
    });
  }

  handleChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  handleToDo = () => {
    const { content } = this.state;

    this.props.dispatch(bySnap());

    this.db
      .collection("items")
      .add({
        item: content,
      })
      .then((docRef) => {
        docRef.get().then((snapshot) => {
          // console.log("Product has been added", snapshot.data());
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };


  handleDeleteProduct = (id) => {
   

   
    const docRef = this.db.collection("items").doc(id);

    console.log('Your docref to delete is', docRef);

    docRef
      .delete()
      .then(() => {})
      .catch((error) => {
        //console.log('Error in deteting the product from firebase', error);
      });
  };

  render() {
    const { items } = this.props.toDo;

    console.log("Your all props is ", toDo);

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
              onClick={this.handleToDo}
            >
              Add ToDo
            </Button>
          </div>

          {items.map((item) => (
            <ToDoItems item={item} key={item.id}   handleDeleteProduct={this.handleDeleteProduct}  />
          ))}
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

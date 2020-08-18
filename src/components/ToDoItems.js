import React, { Component } from "react";
import './App.css';


import { Button } from "@material-ui/core";

class ToDoItems extends Component {

    
  render() {
    const { item, handleDeleteProduct } = this.props;

    console.log('Your id is', item.id);
    console.log(item);
    return (
      <div className="content">
        <div className="text">{item.content}</div>
        <Button variant="contained" color="secondary" onClick={() => handleDeleteProduct(item.id)} >
          Delete
        </Button>
      </div>
    );
  }
}

export default ToDoItems;

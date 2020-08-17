import React, { Component } from "react";


import { Button } from "@material-ui/core";

class ToDoItems extends Component {

    
  render() {
    const { item, handleDeleteProduct } = this.props;

    console.log('Your id is', item.id);
    console.log(item);
    return (
      <div>
        <div>{item.content}</div>
        <Button variant="contained" color="secondary"  >
          Delete
        </Button>
      </div>
    );
  }
}

export default ToDoItems;

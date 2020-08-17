import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import toDo from "../actions/todo";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  handleToDo = () => {
    const { content } = this.state;

    this.props.dispatch(toDo(content));

    this.setState({
      content: "",
    });
  };
  render() {
    const { toDo } = this.props;

    const { items } = toDo;


    return (
      <div className="app">
        <input type="text" placeholder="todo" onChange={this.handleChange} />
        <button onClick={this.handleToDo}>Add ToDo</button>
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

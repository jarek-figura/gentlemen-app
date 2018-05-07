import React, { Component } from 'react';
import './TaskAddButton.css'

class TaskAddButton extends Component {

  handleClick = () => {};

  render() {
    return (
      <button onClick={this.handleClick}>Dodaj zadanie</button>
    )
  }
}

export default TaskAddButton;
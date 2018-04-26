import React, { Component } from 'react';
import './AddTaskPopup.css'
import TaskForm from "../TaskForm/TaskForm";
import TaskAddButton from "../TaskAddButton/TaskAddButton";

class AddTaskPopup extends Component {
  render() {
    return (
      <div>
        <TaskForm/>
        <TaskAddButton/>
      </div>
    )
  }
}

export default AddTaskPopup;
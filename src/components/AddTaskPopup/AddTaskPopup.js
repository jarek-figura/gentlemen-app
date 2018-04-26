import React, { Component } from 'react';
import './AddTaskPopup.css'
import TaskForm from "../TaskForm/TaskForm";
import TaskPriority from "../TaskPriority/TaskPriority";
import TaskAddButton from "../TaskAddButton/TaskAddButton";
import TaskDueDay from "../TaskDueDay/TaskDueDay";

class AddTaskPopup extends Component {
  state = {
    taskTitleText: '',
    taskDescription: '',
    tasks: [ ]
  };

  render() {
    return (
      <div>
        <TaskForm />
        <TaskPriority />
        <TaskDueDay/>
        <TaskAddButton/>
      </div>
    )
  }
}

export default AddTaskPopup;
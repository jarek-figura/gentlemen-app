import React, { Component } from 'react';
import './AddTaskPopup.css'
// import TaskPriority from "../TaskPriority/TaskPriority";
import TaskDueDay from "../TaskDueDay/TaskDueDay";

class AddTaskPopup extends Component {
  state = {
    taskTitleText: '',
    taskDescription: '',
    formError: null,
    tasks: [ ]
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.taskTitleText.trim() === '') {
      this.setState({
        formError: new Error('Musisz podać tytuł zadania')
      });
      return;
    }

    this.props.addTask(this.state.taskTitleText, this.state.taskDescription);

    this.setState({
      taskTitleText: '',
      taskDescription: ''
    }
      // ({ tasks, taskTitleText, taskDescription }) => ({
      //   taskTitleText: '',
      //   taskDescription: '',
      //   tasks: tasks.concat({
      //     id: tasks.length === 0 ? 1 : Math.max(...tasks.map(task => task.id)) + 1,
      //     name: taskTitleText,
      //     description: taskDescription
      //   })
      // })
    )
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      formError: null
    })
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} id="form1">
          { this.state.formError && <p>{this.state.formError.message}</p> }
          <input maxLength="50"
            name="taskTitleText"
            placeholder="Tytuł zadania"
            value={this.state.taskTitleText}
            onChange={this.handleChange}
          />
          <br/><br/>
          <textarea rows="4"
            cols="19"
            name="taskDescription"
            placeholder="Opis zadania"
            value={this.state.taskDescription}
            onChange={this.handleChange}
          />
        </form>

        {/*<TaskPriority /> <TaskPriority /> <TaskPriority />*/}

        <TaskDueDay/>
        <br/>
        <button form="form1">Dodaj zadanie</button>
      </div>
    )
  }
}

export default AddTaskPopup;
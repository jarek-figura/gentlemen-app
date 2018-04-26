import React, { Component } from 'react';
import './TaskForm.css';

class TaskForm extends Component {
  state = {
    taskTitleText: '',
    taskDescription: '',
    tasks: [ ]
  };

  removeTask = taskId => {
    this.setState(
      ({ tasks }) => ({
        tasks: tasks.filter(
          ({ id }) => id !== taskId
        )
      })
    )
  };

  handleSubmit = event => {
    event.preventDefault();

    this.setState(
      ({ tasks, taskName, taskDescription }) => ({
        taskTitleText: '',
        taskDescription: '',
        tasks: tasks.concat({
          id: tasks.length === 0 ? 1 : Math.max(...tasks.map(task => task.id)) + 1,
          name: taskName,
          description: taskDescription
        })
      })
    )
  };

  handleChange = event => {
    // event.target - it's our input; input has an attribute named 'value'
    this.setState({
      // dynamic attribute name
      [event.target.name]: event.target.value
    })
  };

  render() {
    return (
      <div>
        <h1>Tasks</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            name="taskName"
            value={this.state.taskTitleText}
            onChange={this.handleChange}
          />
          <input
            name="taskDescription"
            value={this.state.taskDescription}
            onChange={this.handleChange}
          />
          <button>Add</button>
        </form>

        <ul>
          {
            this.state.tasks.map(
              task => (
                <li key={task.id}>
                  {task.name} : {task.description}
                  <button
                    onClick={() => this.removeTask(task.id)}
                  >
                    delete
                  </button>
                </li>
              )
            )
          }
        </ul>
      </div>
    )
  }
}

export default TaskForm
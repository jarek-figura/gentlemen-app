import React, { Component } from 'react';
import './AddTaskPopup.css'
// import TaskPriority from "../TaskPriority/TaskPriority";
import TaskDueDay from "../TaskDueDay/TaskDueDay";

class AddTaskPopup extends Component {
  state = {
    taskTitleText: '',
    taskDescription: '',
    tasks: [ ]
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.taskTitleText === '') return;

    this.setState(
      ({ tasks, taskTitleText, taskDescription }) => ({
        taskTitleText: '',
        taskDescription: '',
        tasks: tasks.concat({
          id: tasks.length === 0 ? 1 : Math.max(...tasks.map(task => task.id)) + 1,
          name: taskTitleText,
          description: taskDescription
        })
      })
    )
  };

  handleChange = event => {
    this.setState({
      // [...] - dynamic attribute name
      [event.target.name]: event.target.value  // event.target - it's our input; input has an attribute named 'value'
    })
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} id="form1">
          <input
              maxLength="50"
              name="taskTitleText"
              placeholder="Tytuł zadania"
              value={this.state.taskTitleText}
              onChange={this.handleChange}
          />
          <br/>
          <textarea
              rows="4"
              cols="20"
              name="taskDescription"
              placeholder="Opis zadania"
              value={this.state.taskDescription}
              onChange={this.handleChange}
          />
          <br/>
        </form>

        <ul>
          {
            this.state.tasks.map(
                task => (
                    <li key={task.id}>
                      {task.name} : {task.description}
                      {/*<button onClick={() => this.removeTask(task.id)} >*/}
                      {/*delete*/}
                      {/*</button>*/}
                    </li>
                )
            )
          }
        </ul>

        {/*<TaskPriority />*/}
        <TaskDueDay/>
        <br />
        <button form="form1">Dodaj zadanie</button>
      </div>
    )
  }
}

export default AddTaskPopup;
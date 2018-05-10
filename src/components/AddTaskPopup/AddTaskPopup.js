import React, { Component } from 'react';
import './AddTaskPopup.css'
import TaskPriority from "../TaskPriority/TaskPriority";
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import TaskDueDay from "../TaskDueDay/TaskDueDay";

class AddTaskPopup extends Component {
  state = {
    isOpen: false,
    startDate: moment(),
    priority: 'medium',
    taskTitleText: '',
    taskDescription: '',
    formError: null
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.taskTitleText.trim() === '') {
      this.setState({
        formError: new Error('Musisz podać tytuł zadania')
      });
      return;
    }

    this.props.addTask(
      this.state.taskTitleText,
      this.state.taskDescription,
      this.state.startDate,
      this.state.priority
    );

    this.setState({
      taskTitleText: '',
      taskDescription: ''
    });

    this.props.toggleShowAddTaskPopup();
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      formError: null
    })
  };

  handleDate = date => {
    this.setState({startDate: date});
  };

  handlePriority = imp => {
    this.setState({priority: imp})
  };

  render() {
    return (
      <div className='add-task'>
        <h3>Dodaj zadanie</h3>
        <button className='cancel-button' title='zaniechaj' onClick={this.props.toggleShowAddTaskPopup}>&times;</button>
        <br/><br/>
        <form onSubmit={this.handleSubmit} id="form1">
          {this.state.formError && <p>{this.state.formError.message}</p>}
          <input className='task-title'
            name="taskTitleText"
            placeholder="Tytuł zadania"
            value={this.props.taskTitleText}
            onChange={this.handleChange}
          />
          <br/><br/>
          <textarea className='task-area'
            rows='6'
            name="taskDescription"
            placeholder="Opis zadania"
            value={this.props.taskDescription}
            onChange={this.handleChange}
          />
        </form><br/>

        <TaskDueDay
          startDate={this.state.startDate || moment()}
          handleDate={this.handleDate}
        /><br/>

        <TaskPriority
          priority={this.state.priority}
          handlePriority={this.handlePriority}
        /><br/>

        <button className='add-task-button' form="form1">Dodaj</button>
      </div>
    )
  }
}

export default AddTaskPopup;
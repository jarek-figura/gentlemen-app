import React, { Component } from 'react';
import './AddTaskPopup.css'
import TaskPriority from "../TaskPriority/TaskPriority";
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

    this.props.addTask(this.state.taskTitleText, this.state.taskDescription, this.state.startDate, this.state.priority);

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
      <div>
        <button onClick={this.props.toggleShowAddTaskPopup}>&times;</button>
        <br/><br/>
        <form onSubmit={this.handleSubmit} id="form1">
          {this.state.formError && <p>{this.state.formError.message}</p>}
          <input maxLength="50"
            name="taskTitleText"
            placeholder="Tytuł zadania"
            value={this.props.taskTitleText}
            onChange={this.handleChange}
          />
          <br/><br/>
          <textarea rows="4"
            cols="19"
            name="taskDescription"
            placeholder="Opis zadania"
            value={this.props.taskDescription}
            onChange={this.handleChange}
          />
        </form><br/>

        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleDate}
          withPortal
        /><br/>

        <TaskPriority
          handlePriority={this.handlePriority}
        /><br/>

        <button form="form1">Dodaj</button>
      </div>
    )
  }
}

export default AddTaskPopup;
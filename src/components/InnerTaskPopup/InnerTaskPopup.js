import React, { Component } from 'react';
import './InnerTaskPopup.css';
import moment from 'moment';
import TaskPriority from "../TaskPriority/TaskPriority";
import TaskDueDay from "../TaskDueDay/TaskDueDay";

class InnerTaskPopup extends Component {
  state = {
    name: '',
    formError: null
  };

  static getDerivedStateFromProps({ task }, prevState) {
    return {
      ...task
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.name.trim() === '') {
      this.setState({
        formError: new Error('Musisz podać tytuł zadania')
      });
      return;
    }

    if (this.props.buttonName === 'Dodaj') {
      this.props.addTask(
        this.state.name,
        this.state.description,
        this.state.dueDate,
        this.state.priority || 'medium'
      );
    } else {
      this.props.updateTask(
        this.state.id,
        this.state.name,
        this.state.description,
        this.state.dueDate,
        this.state.priority || 'medium'
      );
    }

    this.props.toggleShowAddTaskPopup();
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      formError: null
    })
  };

  handleDate = date => {
    this.setState({dueDate: date});
  };

  handlePriority = priority => {
    this.setState({priority: priority})
  };

  render() {
    return (
      <div className='add-task'>
        <button
          className='cancel-button'
          title='zaniechaj'
          onClick={this.props.toggleShowAddTaskPopup}
        >&times;</button>
        <br/><br/>

        <form onSubmit={this.handleSubmit} id="form1">
          {this.state.formError && <p>{this.state.formError.message}</p>}
          <input
            className='task-title'
            name="name"
            placeholder="Tytuł zadania"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <br/><br/>

          <textarea
            className='task-area'
            rows="6"
            name="description"
            placeholder="Opis zadania"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </form><br/>

        <TaskDueDay
          dueDate={this.state.dueDate || moment()}
          handleDate={this.handleDate}
        /><br/>

        <TaskPriority
          priority={this.state.priority || 'medium'}
          handlePriority={this.handlePriority}
        /><br/>

        <button className='add-task-button' form="form1">{this.props.buttonName}</button>
      </div>
    )
  }
}

export default InnerTaskPopup
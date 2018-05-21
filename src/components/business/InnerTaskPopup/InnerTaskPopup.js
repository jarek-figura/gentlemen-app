import React, { Component } from 'react';
import './InnerTaskPopup.css';
import moment from 'moment';
import TaskPriority from "../TaskPriority/TaskPriority";
import TaskDueDay from "../TaskDueDay/TaskDueDay";
import {withTasks} from "../../contexts/Tasks";

class InnerTaskPopup extends Component {
  state = {
    name: '',
    description: '',
    dueDate: moment(),
    priority: 'medium',
    formError: null,
    cycle: false
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
        this.state.priority
      );
      this.props.toggleShowAddTaskPopup();
    } else if (this.props.buttonName === 'Zmień') {
      this.props.updateTask(
        this.state.id,
        this.state.name,
        this.state.description,
        this.state.dueDate,
        this.state.priority
      );
      this.props.toggleShowEditTaskPopup(this.state.id);
    }
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

  handleCancel = () => {
    if (this.props.buttonName === 'Dodaj') {
      this.props.toggleShowAddTaskPopup();
    } else if (this.props.buttonName === 'Zmień') {
      this.props.toggleShowEditTaskPopup();
    }
  };

  handleChecked = () => {
    this.setState({cycle: !this.state.cycle})
  };

  render() {
    return (
      <div className='add-task'>
        <button
          className='cancel-button'
          title='zaniechaj'
          onClick={this.handleCancel}
        >&times;</button>
        <br/><br/>

        <div className="cycle-with-label">
          <input className="cycle cycle-checkbox"
            title="Ustaw zadanie cykliczne"
            id="cycleCheckbox"
            type="checkbox"
            value="cycle"
            // checked={this.state.cycle}
            onChange={this.handleChecked}
          />
          <label htmlFor="cycleCheckbox">Ustaw zadanie cylkiczne</label>
        </div>

        <form onSubmit={this.handleSubmit} id="form1">
          {this.state.formError && <p>{this.state.formError.message}</p>}
          <input
            className='task-title'
            name="name"
            placeholder="Tytuł zadania"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <br/>

          <textarea
            className='task-area'
            rows="6"
            name="description"
            placeholder="Opis zadania"
            value={this.state.description || ''}
            onChange={this.handleChange}
          />
        </form><br/>

        {this.state.cycle === true} ?
        {
        <form>
          <input className="cycle cycle-daily"
            id="cycle-daily"
            type="radio"
            value="cycle"
            // onChange={this.handleChecked}
          />
          <label htmlFor="cycle-daily">Codziennie</label>
          <input className="cycle cycle-weekly"
            id="cycle-weekly"
            type="radio"
            value="cycle"
            // onChange={this.handleChecked}
          />
          <label htmlFor="cycle-weekly">Co tydzień</label>
          <input className="cycle cycle-monthly"
            id="cycle-monthly"
            type="radio"
            value="cycle"
            // onChange={this.handleChecked}
          />
          <label htmlFor="cycle-monthly">Co miesiąc</label>
        </form>} : {''}

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

export default withTasks(InnerTaskPopup)
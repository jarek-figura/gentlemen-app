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
    isCycleMode: false,
    taskCycleMode: 'daily' // 'daily', 'weekly', 'monthly'
  };

/*
  TASKI CYKLICZNE: ZAŁOŻENIA
  # w bazie będzie trzymany jeden task
  # task będzie posiadał dwie daty:
    - datę cykliczności, np. co środę
    - datę zakończenia cykliczności (nieobowiązkowe)
  # na liście będzie pokazywany następny task, gdy poprzedni został zrobiony:
    - gdy task się przeterminuje nic się nie zmienia na liście
    - gdy zrobimy taska przeterminowanego, nowy pokaże się od daty aktualnej
  # taski zrobione zostają na liście i będą zapisane do bazy
  # kasowanie taska cyklicznego, usunie wpis z bazy, taski zrobione zostają w bazie
  # wyróżnienie graficzne dla taska cyklicznego
  # taski cykliczne można edytować, edycja zapisze się do bazy i wszystkie taski pochodne
    będą mieć tę samą informację (nawet wstecznie), z wyjątkiem tasków zrobionych,
    bo te będą już zapisane pod innymi id
 */

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
        this.state.priority,
        this.state.isCycleMode,
        this.state.taskCycleMode
      );
      this.props.toggleShowAddTaskPopup();
    } else if (this.props.buttonName === 'Zmień') {
      this.props.updateTask(
        this.state.id,
        this.state.name,
        this.state.description,
        this.state.dueDate,
        this.state.priority,
        this.state.isCycleMode,
        this.state.taskCycleMode
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

  handleIsCycleMode = () => this.setState({isCycleMode: !this.state.isCycleMode});

  handleTaskCycleMode = event => this.setState({taskCycleMode: event.target.value});

  render() {
    return (
      <div className='add-task'>
        <button
          className='cancel-button'
          title='zaniechaj'
          onClick={this.handleCancel}
        >&times;</button>
        <br/><br/>

        <div>
          <input className="cycle cycle-checkbox"
            title="Ustaw zadanie cykliczne"
            id="cycleCheckbox"
            type="checkbox"
            value="cycle"
            checked={this.state.isCycleMode || false}
            onChange={this.handleIsCycleMode}
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

        {this.state.isCycleMode === true ?
          <form className="cycle-with-label">
            <input className="cycle cycle-daily"
              id="cycle-daily"
              type="radio"
              name="radio-cycle"
              value="daily"
              checked={this.state.taskCycleMode === 'daily'}
              onChange={this.handleTaskCycleMode}
            />
            <label htmlFor="cycle-daily">Codziennie</label><br/>

            <input className="cycle cycle-weekly"
              id="cycle-weekly"
              type="radio"
              name="radio-cycle"
              value="weekly"
              checked={this.state.taskCycleMode === 'weekly'}
              onChange={this.handleTaskCycleMode}
            />
            <label htmlFor="cycle-weekly">Co tydzień</label><br/>

            <input className="cycle cycle-monthly"
              id="cycle-monthly"
              type="radio"
              name="radio-cycle"
              value="monthly"
              checked={this.state.taskCycleMode === 'monthly'}
              onChange={this.handleTaskCycleMode}
            />
            <label htmlFor="cycle-monthly">Co miesiąc</label><br/><br/>
          </form> : ''
        }

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
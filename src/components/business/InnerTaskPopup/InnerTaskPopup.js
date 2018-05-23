import React, {Component} from 'react';
import './InnerTaskPopup.css';
import moment from 'moment';
import TaskPriority from "../TaskPriority/TaskPriority";
import TaskDueDay from "../TaskDueDay/TaskDueDay";
import {withTasks} from "../../contexts/Tasks";
import {ThemeConsumer} from '../../contexts/Theme'
import TaskCycleDate from "../TaskCycleDate/TaskCycleDate";

class InnerTaskPopup extends Component {
  state = {
    name: '',
    description: '',
    dueDate: moment(),
    priority: 'medium',
    formError: null,
    isCycleMode: false,
    taskCycleMode: 'daily', // 'daily', 'weekly', 'monthly'
    cycleDate: moment()
  };

  /*
    TASKI CYKLICZNE: ZAŁOŻENIA
    OK  # w bazie będzie trzymany jeden task bazowy
    OK  # task będzie posiadał dwie daty:
    OK    - datę cykliczności, np. co środę, mniejszą od daty zakończenia
    OK    - datę zakończenia cykliczności (nieobowiązkowe)
        # taski zrobione zostają na liście i w bazie
        # na liście będzie pokazywany następny task, gdy poprzedni został zrobiony:
          - następny task jest zapisany do bazy, jako task bazowy
          - gdy task się przeterminuje nic się nie zmienia na liście
          - gdy zrobimy taska przeterminowanego, nowy pokaże się od daty aktualnej
        # kasowanie taska cyklicznego, usunie wpis z bazy taska bazowego, taski zrobione zostają w bazie
    OK  # wyróżnienie graficzne dla taska cyklicznego
        # taski cykliczne można edytować, edycja zapisze się w bazie do taska bazowego i wszystkie taski pochodne
          będą mieć tę samą informację (nawet wstecznie), z wyjątkiem tasków zrobionych,
          bo te będą już zapisane pod innymi id

        # CZY NA LIŚCIE TASKÓW POWINNO BYĆ WŁĄCZONE DOMYŚLNE SORTOWANIE PO DACIE (od najstarszej do najmłodszej)???
   */

  static getDerivedStateFromProps({task}, prevState) {
    return {
      ...task
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.name.trim() === '') {
      this.setState({ formError: new Error('Musisz podać tytuł zadania') });
      return;
    }

    if (this.state.isCycleMode === false) {
      this.setState({ cycleDate: moment() });
    }

    if (this.props.buttonName === 'Dodaj') {
      this.props.addTask(
        this.state.name,
        this.state.description,
        this.state.dueDate,
        this.state.priority,
        this.state.isCycleMode,
        this.state.taskCycleMode,
        this.state.cycleDate
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
        this.state.taskCycleMode,
        this.state.cycleDate
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

  handleDate = date => this.setState({dueDate: date});

  handlePriority = priority => this.setState({priority: priority});

  handleCancel = () => {
    if (this.props.buttonName === 'Dodaj') {
      this.props.toggleShowAddTaskPopup();
    } else if (this.props.buttonName === 'Zmień') {
      this.props.toggleShowEditTaskPopup();
    }
  };

  handleCycleDate = date => this.setState({cycleDate: date});

  handleIsCycleMode = () => this.setState({isCycleMode: !this.state.isCycleMode});

  handleTaskCycleMode = event => this.setState({taskCycleMode: event.target.value});

  render() {
    return (
      <ThemeConsumer>
        {
          ({theme}) => (
            <div style={theme.body} className='addTask'>
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
                  checked={this.state.isCycleMode}
                  onChange={this.handleIsCycleMode}
                />
                <label htmlFor="cycleCheckbox">Ustaw zadanie cylkiczne</label>
              </div>

              <form onSubmit={this.handleSubmit} id="form1">
                {this.state.formError && <p>{this.state.formError.message}</p>}
                <input
                  className='task-title'
                  name="name"
                  placeholder="Tytuł zadania - max 40 znaków"
                  value={this.state.name}
                  onChange={this.handleChange}
                  maxLength="40"
                />
                <br/>

                <textarea
                  className='task-area'
                  rows="6"
                  name="description"
                  placeholder="Opis zadania"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </form>
              <br/>

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
                  <label htmlFor="cycle-daily">Codziennie</label>
                  {this.state.taskCycleMode === 'daily' ?
                    <TaskCycleDate
                      dueDate={this.state.dueDate}
                      cycleDate={this.state.cycleDate}
                      handleCycleDate={this.handleCycleDate}
                    /> : ''
                  }
                  <br/>

                  <input className="cycle cycle-weekly"
                    id="cycle-weekly"
                    type="radio"
                    name="radio-cycle"
                    value="weekly"
                    checked={this.state.taskCycleMode === 'weekly'}
                    onChange={this.handleTaskCycleMode}
                  />
                  <label htmlFor="cycle-weekly">Co tydzień</label>
                  {this.state.taskCycleMode === 'weekly' ?
                    <TaskCycleDate
                      dueDate={this.state.dueDate}
                      cycleDate={this.state.cycleDate}
                      handleCycleDate={this.handleCycleDate}
                    /> : ''
                  }
                  <br/>

                  <input className="cycle cycle-monthly"
                    id="cycle-monthly"
                    type="radio"
                    name="radio-cycle"
                    value="monthly"
                    checked={this.state.taskCycleMode === 'monthly'}
                    onChange={this.handleTaskCycleMode}
                  />
                  <label htmlFor="cycle-monthly">Co miesiąc</label>
                  {this.state.taskCycleMode === 'monthly' ?
                    <TaskCycleDate
                      dueDate={this.state.dueDate}
                      cycleDate={this.state.cycleDate}
                      handleCycleDate={this.handleCycleDate}
                    /> : ''
                  }
                  <br/><br/>
                </form> : ''
              }

              <TaskDueDay
                dueDate={this.state.dueDate}
                handleDate={this.handleDate}
              /><br/>

              <TaskPriority
                priority={this.state.priority}
                handlePriority={this.handlePriority}
              /><br/>

              <button className='add-task-button' form="form1">{this.props.buttonName}</button>
            </div>
          )
        }
      </ThemeConsumer>
    )
  }
}

export default withTasks(InnerTaskPopup)
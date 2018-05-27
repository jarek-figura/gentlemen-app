import React, {Component} from 'react';
import './InnerTaskPopup.css';
import moment from 'moment';
import TaskPriority from "../TaskPriority/TaskPriority";
import TaskDueDay from "../TaskDueDay/TaskDueDay";
import {withTasks} from "../../contexts/Tasks";
import {ThemeConsumer} from '../../contexts/Theme'
import TaskCycleDate from "../TaskCycleDate/TaskCycleDate";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/fontawesome-free-solid';
import {faSquare, faCheckSquare, faCircle, faDotCircle} from '@fortawesome/fontawesome-free-regular';

class InnerTaskPopup extends Component {
  state = {
    name: '',
    description: '',
    dueDate: moment(),
    priority: 'medium',
    formError: null,
    isCycleMode: false,
    taskCycleMode: 'daily', // 'daily', 'weekly', 'monthly'
    cycleDate: moment(),
  };

  /*
    TASKI CYKLICZNE: ZAŁOŻENIA
    OK  # w bazie będzie trzymany jeden task bazowy
    OK  # task będzie posiadał dwie daty:
    OK    - datę cykliczności, np. co środę, mniejszą od daty zakończenia
    OK    - datę zakończenia cykliczności (nieobowiązkowe)
    OK  # taski zrobione zostają na liście i w bazie
    OK  # na liście będzie pokazywany następny task, gdy poprzedni został zrobiony:
    OK    - następny task jest zapisany do bazy, jako task bazowy
    OK    - gdy task się przeterminuje nic się nie zmienia na liście
    OK    - gdy zrobimy taska przeterminowanego, nowy pokaże się od daty aktualnej
    OK  # kasowanie taska cyklicznego, usunie wpis z bazy taska bazowego, taski zrobione zostają w bazie
    OK  # wyróżnienie graficzne dla taska cyklicznego
    OK  # taski cykliczne można edytować
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

  handleTaskCycleMode = event => {
    event.preventDefault();
    this.setState({taskCycleMode: event.currentTarget.name});
  };

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
              ><FontAwesomeIcon icon={faWindowClose}/></button>
              <br/><br/>

              <div>
                <button
                  className='cycle cycle-checkbox'
                  title='Ustaw zadanie cykliczne'
                  onClick={this.handleIsCycleMode}
                >{this.state.isCycleMode ?
                   <FontAwesomeIcon icon={faCheckSquare}/> :
                   <FontAwesomeIcon icon={faSquare}/>
                 }
                </button>
                <label className='cycle-text'>Ustaw zadanie cylkiczne</label>
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

              <TaskDueDay
                dueDate={this.state.dueDate}
                handleDate={this.handleDate}
              /><br/>

              {this.state.isCycleMode === true ?
                <form className="cycle-with-label">
                  <button
                    className="cycle cycle-daily"
                    title="Codziennie"
                    name="daily"
                    onClick={this.handleTaskCycleMode}
                  >{this.state.taskCycleMode === 'daily' ?
                     <FontAwesomeIcon icon={faDotCircle}/> :
                     <FontAwesomeIcon icon={faCircle}/>
                   }
                  </button>
                  <label className="cycle-text">Codziennie</label>
                  {this.state.taskCycleMode === 'daily' ?
                    <TaskCycleDate
                      dueDate={this.state.dueDate}
                      cycleDate={this.state.cycleDate}
                      handleCycleDate={this.handleCycleDate}
                    /> : ''
                  }<br/>

                  <button
                    className="cycle cycle-weekly"
                    title="Co tydzień"
                    name="weekly"
                    onClick={this.handleTaskCycleMode}
                  >{this.state.taskCycleMode === 'weekly' ?
                    <FontAwesomeIcon icon={faDotCircle}/> :
                    <FontAwesomeIcon icon={faCircle}/>
                  }
                  </button>
                  <label className="cycle-text">Co tydzień</label>
                  {this.state.taskCycleMode === 'weekly' ?
                    <TaskCycleDate
                      dueDate={this.state.dueDate}
                      cycleDate={this.state.cycleDate}
                      handleCycleDate={this.handleCycleDate}
                    /> : ''
                  }
                  <br/>

                  <button
                    className="cycle cycle-monthly"
                    title="Co miesiąc"
                    name="monthly"
                    onClick={this.handleTaskCycleMode}
                  >{this.state.taskCycleMode === 'monthly' ?
                    <FontAwesomeIcon icon={faDotCircle}/> :
                    <FontAwesomeIcon icon={faCircle}/>
                  }
                  </button>
                  <label className="cycle-text">Co miesiąc</label>
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
import React, {Component} from 'react';
import moment from 'moment';
import './TaskContent.css';
import {withTasks} from "../../contexts/Tasks";
import TaskPriorityBar from "../TaskProgressBar/TaskPriorityBar";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEllipsisH from '@fortawesome/fontawesome-free-solid/faEllipsisH'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'

const translate = {
  'daily': 'Codziennie do ',
  'weekly': 'Co tydzień do ',
  'monthly': 'Co miesiąc do '
};

class TaskContent extends Component {
  state = {
    showDesc: false
  };

  handleClick = () => this.setState({ showDesc: !this.state.showDesc });

  handleToggleTaskDone =(id) => {
    this.props.toggleTaskDone(id);
    // TODO: Usunąć obowiązek `dueDate` dla taska cyklicznego

    const task = this.props.task;
    let cycleDate = moment();

    if (task.isCycleMode && task.dueDate && !task.isDone) {
      switch(task.taskCycleMode) {
        case 'daily' :
          cycleDate = moment.max(moment(task.cycleDate), moment());
          break;
        case 'weekly' :
          cycleDate = Math.ceil((moment().valueOf() - task.cycleDate) / 1000 / 3600 / 24) % 7;
          cycleDate = moment().add(7 - cycleDate, 'days');
          break;
        case 'monthly' :
          // TODO: ustalić aktualne `cycleDate` dla taska starszego niż 1 miesiąc
          // zmiana w trybie miesięcznym
          cycleDate = moment(task.cycleDate).add(1, 'month');
          break;
        default:
          break;
      }
      if (!cycleDate.isAfter(moment(task.dueDate), 'day')) {
        this.props.addTask(
          task.name,
          task.description,
          task.dueDate,
          task.priority,
          task.isCycleMode,
          task.taskCycleMode,
          cycleDate
        );
      }
    }
  };

  render() {
    const task = this.props.task;

    // TODO: dla tasków cyklicznych porównywać `cycleDate` zamiast `dueDate`
    // TODO: porównywanie numeryczne chyba nie działa dobrze

    const taskDueDate = new Date(task.dueDate);
    const today = new Date(Date.now());
    const timeDiff = taskDueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const whatToRender = () => {
      if (diffDays <= -1) {
        return <p className="wrn">Po terminie</p>
      } else if (diffDays === 0) {
        return <p className="wrnToday">Na dzisiaj</p>
      } else {
        return <TaskPriorityBar dueDate={task.dueDate}/>
      }
    };

    return (
      <div className={task.priority + ' ' + task.isDone + ' ' + (task.isCycleMode ? 'cycled-mode' : '') + ' task'}>

        <div className="checkbox">
          <input className='done-checkbox'
            title="Oznacz jako zrobione"
            type="checkbox"
            checked={task.isDone}
            onChange={() => this.handleToggleTaskDone(task.id)}
          />
        </div>

        <div className="titles">
          <strong>{task.name}</strong>
          <br/>

          {
            task.isCycleMode
              ? translate[task.taskCycleMode]
              : ''
          }
          {moment(task.dueDate).format('DD-MM-YYYY')}<br/>

          {this.state.showDesc ? <p className="description">{task.description}</p> : ''}

          {whatToRender()}
        </div>

        <div className="buttons">
          <button
            className={"show-desc"}
            title={"Pokaż opis"}
            onClick={this.handleClick}
          ><FontAwesomeIcon icon={faEllipsisH}/></button>
          <button className='edit-button'
            title='Edytuj'
            onClick={() => this.props.toggleShowEditTaskPopup(task.id)}
          ><FontAwesomeIcon icon={faEdit}/>
          </button>
          <span>&nbsp;</span>
          <button className='delete-button'
            title="Usuń zadanie"
            onClick={() => this.props.removeTask(task.id)}
          ><FontAwesomeIcon icon={faTrashAlt}/></button>

        </div>

      </div>
    )
  }
}

export default withTasks(TaskContent);
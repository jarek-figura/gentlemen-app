import React, {Component} from 'react';
import moment from 'moment';
import './TaskContent.css';
import {withTasks} from "../../contexts/Tasks";
import TaskPriorityBar from "../TaskProgressBar/TaskPriorityBar";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faInfo, faTrashAlt, faEdit, faCircle, faCheckCircle} from '@fortawesome/fontawesome-free-solid';

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
    let momentDate = moment().startOf('day');
    let cycleDate = moment(task.cycleDate).startOf('day');

    if (task.isCycleMode && task.dueDate && !task.isDone) {
      switch(task.taskCycleMode) {
        case 'daily' :
          cycleDate = moment.max(cycleDate, momentDate);
          break;
        case 'weekly' :
          cycleDate = moment(momentDate).diff(cycleDate, 'days') % 7;
          cycleDate = moment().add(7 - cycleDate, 'days');
          break;
        case 'monthly' :
          const cycleDateLocal = moment(cycleDate).date();
          const momentDateLocal = moment().date();
          const momentYearLocal = moment().year();
          const momentMonthLocal = moment().month();
          cycleDate = moment().year(momentYearLocal).month(momentMonthLocal).date(cycleDateLocal);
          if (cycleDateLocal < momentDateLocal) {
            cycleDate = moment(cycleDate).add(1, 'month');
          }
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

    // const taskDueDate = new Date(task.dueDate);
    // const today = new Date(Date.now());
    // const timeDiff = taskDueDate.getTime() - today.getTime();
    // let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    let momentDate = moment().startOf('day');
    let dueDate = moment(task.dueDate).startOf('day');
    let cycleDate = moment(task.cycleDate).startOf('day');

    if (task.isCycleMode && task.dueDate) {
      dueDate = cycleDate;
    }

    let diffDays = moment(dueDate).diff(momentDate, 'days');

    const whatToRender = () => {
      if (diffDays <= -1) {
        return <p className="wrn">Po terminie</p>
      } else if (diffDays === 0) {
        return <p className="wrnToday">Na dzisiaj</p>
      } else {
        return <TaskPriorityBar taskDueDate={dueDate}/>
      }
    };

    return (
      <div className={task.priority + ' ' + task.isDone + ' ' + (task.isCycleMode ? 'cycled-mode' : '') + ' task'}>

        <div className="checkbox">
          <button className={`done-checkbox ${task.isDone}`}
            title='Oznacz jako zrobione'
            onClick={() => this.handleToggleTaskDone(task.id)}
          >{task.isDone ? <FontAwesomeIcon icon={faCheckCircle}/> : <FontAwesomeIcon icon={faCircle}/>}</button>
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

        <div className='buttons'>
          <button className='desc-button'
            title='Pokaż opis'
            onClick={this.handleClick}
          ><FontAwesomeIcon icon={faInfo}/></button>

          <button className='edit-button'
            title='Edytuj'
            onClick={() => this.props.toggleShowEditTaskPopup(task.id)}
          ><FontAwesomeIcon icon={faEdit}/></button>

          <button className='delete-button'
            title='Usuń zadanie'
            onClick={() => this.props.removeTask(task.id)}
          ><FontAwesomeIcon icon={faTrashAlt}/></button>
        </div>
      </div>
    )
  }
}

export default withTasks(TaskContent);
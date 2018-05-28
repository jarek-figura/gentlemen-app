import React, {Component} from 'react';
import moment from 'moment';
import './TaskContent.css';
import {withTasks} from "../../contexts/Tasks";
import TaskPriorityBar from "../TaskProgressBar/TaskPriorityBar";

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faStream, faTrashAlt, faEdit} from '@fortawesome/fontawesome-free-solid';
import {faCircle, faCheckCircle} from '@fortawesome/fontawesome-free-regular';

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
    const dueDate = moment(task.dueDate).startOf('day');

    if (task.isCycleMode && task.dueDate && !task.isDone) {
      switch(task.taskCycleMode) {
        case 'daily' :
          if (moment(cycleDate).isBefore(dueDate, 'day')) {
            if (moment(cycleDate).isBefore(momentDate, 'day')) {
              cycleDate = moment.max(cycleDate, momentDate);
            } else {
              cycleDate = moment(cycleDate).add(1, 'days');
            }
          } else {
            return;
          }
          break;
        case 'weekly' :
          if (moment(cycleDate).isBefore(dueDate, 'day')) {
            if (moment(cycleDate).isBefore(momentDate, 'day')) {
              cycleDate = moment(momentDate).diff(cycleDate, 'days') % 7;
              cycleDate = moment().add(7 - cycleDate, 'days');
            } else {
              cycleDate = moment(cycleDate).add(1, 'weeks');
            }
            if (moment(cycleDate).isAfter(dueDate, 'day')) {
              return;
            }
          } else {
            return;
          }
          break;
        case 'monthly' :
          if (moment(cycleDate).isBefore(dueDate, 'day')) {
            if (moment(cycleDate).isBefore(momentDate, 'month')) {
              const momentYearLocal = moment().year();
              const momentMonthLocal = moment().month();
              const momentDayLocal = moment().day();
              const cycleDateLocal = moment(cycleDate).date();
              cycleDate = moment().year(momentYearLocal).month(momentMonthLocal).date(cycleDateLocal);
              if (cycleDateLocal < momentDayLocal) {
                cycleDate = moment(cycleDate).add(1, 'months');
              }
            } else {
              cycleDate = moment(cycleDate).add(1, 'months');
            }
            if (moment(cycleDate).isAfter(dueDate, 'day')) {
              return;
            }
          } else {
            return;
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

    let momentDate = moment().startOf('day');
    let dueDate = moment(task.dueDate).startOf('day');
    let cycleDate = moment(task.cycleDate).startOf('day');

    if (task.isCycleMode && task.dueDate) {
      dueDate = cycleDate;
    }

    let diffDays = moment(dueDate).diff(momentDate, 'days');

    const whatToRender = () => {
      if (diffDays <= -1) {
        return <p className={`wrn ${task.isDone}`}>Po terminie</p>
      } else if (diffDays === 0) {
        return <p className={`wrnToday ${task.isDone}`}>Na dzisiaj</p>
      } else {
        return <TaskPriorityBar taskDueDate={dueDate} taskIsDone={task.isDone}/>
      }
    };

    return (
      <div className={`${task.priority} ` + (task.isCycleMode ? 'cycled-mode' : '') + ` ${task.isDone} task`}>

        <div className="checkbox">
          <button className={`done-checkbox ${task.isDone}`}
            title='Oznacz jako zrobione'
            onClick={() => this.handleToggleTaskDone(task.id)}
          >{task.isDone ? <FontAwesomeIcon icon={faCheckCircle}/> : <FontAwesomeIcon icon={faCircle}/>}</button>
        </div>

        <div className="titles">
          <strong>{task.name}</strong><br/>
          {task.isCycleMode ? translate[task.taskCycleMode] : ''}
          {moment(task.dueDate).format('DD-MM-YYYY')}<br/>
          {this.state.showDesc ? <p className="description">{task.description}</p> : ''}
          {task.isDone ? <p className="progress-bar"></p> : whatToRender()}
        </div>

        <div className='buttons'>
          <button className={`desc-button ${task.isDone}`}
            title='Pokaż opis'
            onClick={this.handleClick}
          ><FontAwesomeIcon icon={faStream}/></button>

          <button className={`edit-button ${task.isDone}`}
            title='Edytuj'
            onClick={() => this.props.toggleShowEditTaskPopup(task.id)}
          ><FontAwesomeIcon icon={faEdit}/></button>

          <button className={`delete-button ${task.isDone}`}
            title='Usuń zadanie'
            onClick={() => this.props.removeTask(task.id)}
          ><FontAwesomeIcon icon={faTrashAlt}/></button>
        </div>
      </div>
    )
  }
}

export default withTasks(TaskContent);
import React, { Component } from 'react';
import moment from 'moment';
import './TaskContent.css';
import {withTasks} from "../../contexts/Tasks";
import TaskPriorityBar from "../TaskProgressBar/TaskPriorityBar";


class TaskContent extends Component {
  render() {
    const task = this.props.task;
    const taskDueDate = new Date(task.dueDate);
    const today = new Date(Date.now());
    const timeDiff = taskDueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const whatToRender = () =>{
        if(diffDays <= -1 ){
              return <p className="wrn">Po terminie</p>
          } else if ( diffDays === 0) {
              return <p className="wrnToday">Na dzisiaj</p>
          } else {
              return <TaskPriorityBar dueDate={task.dueDate} />
          }
      }

    return (
      <div className={task.priority + ' ' + task.isDone + ' task'}>

        <div className="titles">
          <strong>{task.name}</strong><br/>
          {moment(task.dueDate).format('DD-MM-YYYY')}

            {whatToRender()}

        </div>

        <div className="buttons">
          <input className='done-checkbox'
            title="Oznacz jako zrobione"
            type="checkbox"
            checked={task.isDone}
            onChange={() => this.props.toggleTaskDone(task.id)}

          />

          <span>&nbsp;</span>
          <button className='edit-button'
            onClick={() => this.props.toggleShowEditTaskPopup(task.id)}
          >edytuj</button>

          <span>&nbsp;</span>
          <button className='delete-button'
            title="Usuń zadanie"
            onClick={() => this.props.removeTask(task.id)}
          >&times;</button>


        </div>
      </div>
    )
  }
}

export default withTasks(TaskContent);
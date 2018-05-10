import React, { Component } from 'react';
import moment from 'moment';
import './TaskContent.css';

class TaskContent extends Component {
  render() {
    const task = this.props.task;
    return (
      <div className={task.priority + ' ' + task.isDone + ' task'}>

        <div className="titles">
          <strong>{task.name}</strong><br/>
          {moment(task.dueDate).format('DD-MM-YYYY')}
        </div>

        <div className="buttons">
          <input className='done-checkbox'
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
            title="Skasuj zadanie"
            onClick={() => this.props.removeTask(task.id)}
          >&times;</button>
        </div>
      </div>
    )
  }
}

export default TaskContent
import React, { Component } from 'react';
import moment from 'moment';
import './TaskContent.css';

class TaskContent extends Component {
  render() {
    const task = this.props.task;
    return (
      <div className={task.priority + ' ' + task.isDone + ' task'}>

        <span className="titles">
          <strong>{task.name}</strong><br/>
          {moment(task.dueDate).format('DD-MM-YYYY')}
        </span>

        <span className="buttons">
          <button
            onClick={() => this.props.toggleShowEditTaskPopup(task.id)}
          >edytuj</button>

          <span>&nbsp;</span>
          <input
            type="checkbox"
            checked={task.isDone}
            onChange={() => this.props.toggleTaskDone(task.id)}
          />

          <span>&nbsp;</span>
          <button
            title="Skasuj zadanie"
            onClick={() => this.props.removeTask(task.id)}
          >&times;</button>
        </span>
      </div>
    )
  }
}

export default TaskContent
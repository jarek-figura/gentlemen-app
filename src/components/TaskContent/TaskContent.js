import React, { Component } from 'react';
import moment from 'moment';
import './TaskContent.css';

class TaskContent extends Component {
  render() {
    const task = this.props.task;
    return (
      <div className={task.priority + ' ' + task.isDone + ' task'}>

        {`${task.name} : ${moment(task.dueDate).format('DD-MM-YYYY')}`}

        <span>&nbsp;</span>
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
      </div>
    )
  }
}

export default TaskContent
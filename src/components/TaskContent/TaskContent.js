import React, { Component } from 'react';

class TaskContent extends Component {
  render() {
    const task = this.props.task;
    return (
      <div>
        <input
          type="checkbox"
          checked={task.isImportant}
          onChange={() => this.props.toggleTaskImportant(task.id)}
        />
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={() => this.props.toggleTaskDone(task.id)}
        />
        {task.isDone
          ? (<del>{task.name} : {task.priority}</del>)
          : (`${task.name} : ${task.dueDate}`)
        }

        <span>&nbsp;</span><button onClick={() => this.props.toggleShowEditTaskPopup(task.id)}>edit</button>
        <span>&nbsp;</span><button title="Skasuj zadanie" onClick={() => this.props.removeTask(task.id)}>&times;</button>
      </div>
    )
  }
}

export default TaskContent
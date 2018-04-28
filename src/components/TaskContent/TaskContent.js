import React, { Component } from 'react'

class TaskContent extends Component {
  render() {
    const task = this.props.task;
    return (
      <div>
        {task.isImportant && '*'}
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
          ? (<del>{task.name} : {task.description}</del>)
          : (`${task.name} : ${task.description}`)
        }

        <button onClick={() => this.props.enterEditMode(task.id)}>edit</button>
        <button onClick={() => this.props.removeTask(task.id)}>delete</button>
      </div>
    )
  }
}

export default TaskContent
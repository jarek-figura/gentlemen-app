import React, { Component } from 'react'
import './TaskList.css'
import TaskContent from "../TaskContent/TaskContent";
import TaskSearch from '../TaskSearch/TaskSearch';

class TaskList extends Component {
  state = {
    editTaskId: null,
    searchText: null
  };

  enterEditMode = taskId => {
    this.setState({ editTaskId: taskId })
  };
  exitEditMode = () => {
    this.setState({ editTaskId: null })
  };

  render() {
    return (
      <div>
        <p>!!! OK</p>
        <TaskSearch />
        <ul>
          {
            this.props.tasks.map(
              task => (
                <li key={task.id}>
                  {/*{*/}
                    {/*this.state.editTaskId === task.id*/}
                      {/*? (*/}
                        {/*<TaskEditForm*/}
                          {/*taskId={task.id}*/}
                          {/*taskName={task.name}*/}
                          {/*taskDescription={task.description}*/}
                          {/*updateTask={this.props.updateTask}*/}
                          {/*exitEditMode={this.exitEditMode}*/}
                        {/*/>*/}
                      {/*)*/}
                      {/*: (*/}
                        <TaskContent
                          task={task}
                          enterEditMode={this.enterEditMode}
                          removeTask={this.props.removeTask}
                          toggleTaskDone={this.props.toggleTaskDone}
                          toggleTaskImportant={this.props.toggleTaskImportant}
                        />
                      {/*)*/}
                  {/*}*/}
                </li>
              )
            )
          }
        </ul>
      </div>
    )
  }
}

export default TaskList
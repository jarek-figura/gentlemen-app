import React, {Component} from 'react'
import './TaskList.css'
import TaskContent from "../TaskContent/TaskContent";
import TaskSearch from "../TaskSearch/TaskSearch";
import {withTasks} from "../contexts/Tasks";

class TaskList extends Component {
  render() {
     return (
      <div>
        { this.props.tasksBeforeFilter().length !== 0 &&
          <span className='task-list'>
            <h3>Zadania do zrobienia</h3>
            <TaskSearch
              updateSearchPhrase={this.props.updateSearchPhrase}
            />
          </span>
        }
        {
          this.props.tasksBeforeFilter().length !== 0 ?
            // show TaskList and search
            this.props.tasks.length === 0 ?
            <p className='no-result'>Brak wyników</p> :
            <ul>
              {
                this.props.tasks.map(
                  task => (
                    <li key={task.id}>
                      <TaskContent
                        task={task}
                        removeTask={this.props.removeTask}
                        toggleTaskDone={this.props.toggleTaskDone}
                        toggleShowEditTaskPopup={this.props.toggleShowEditTaskPopup}
                      />
                    </li>
                  )
                )
              }
            </ul> :
            //show banner
            <h1 className='banner'>Taskmen baner</h1>
        }
        <br/>
        <br/>

      </div>
    )
  }
}

export default withTasks(TaskList)
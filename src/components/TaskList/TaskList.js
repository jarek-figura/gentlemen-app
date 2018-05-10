import React, {Component} from 'react'
import './TaskList.css'
import TaskContent from "../TaskContent/TaskContent";
import TaskSearch from "../TaskSearch/TaskSearch";

class TaskList extends Component {
  state = {
    editTaskId: null,

  };

  updateSearchPhrase = searchPhrase => this.setState({searchPhrase});

  enableSortingByPriority= () => {
    //TUTAJ ZACZNIJ :)
  };

  render() {
    const tasksFromProps = this.props.tasks;

   return (
      <div>
        {tasksFromProps.length !== 0 &&
        <span className='task-list'>
            <h3>Zadania do zrobienia</h3>
        <TaskSearch
            updateSearchPhrase={this.updateSearchPhrase}
          />
          </span> }
        {
          tasksFromProps.length !== 0 ?
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
        {/*button - task filter by sth */}
        <br/>
        <br/>

      </div>
    )
  }
}

export default TaskList
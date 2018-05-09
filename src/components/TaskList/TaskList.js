import React, {Component} from 'react'
import './TaskList.css'
import TaskContent from "../TaskContent/TaskContent";
import TaskSearch from "../TaskSearch/TaskSearch";

class TaskList extends Component {
  state = {
    searchPhrase: ''
  };

  updateSearchPhrase = searchPhrase => this.setState({searchPhrase});

  render() {
    const tasksFromProps = this.props.tasks;
    const tasks = tasksFromProps.filter(
      task => task.name.toLowerCase().includes(this.state.searchPhrase.toLowerCase())
    );
    return (
      <div>
        {tasksFromProps.length !== 0 &&
          <span>
            <h2>TaskList</h2>
            <TaskSearch
              updateSearchPhrase={this.updateSearchPhrase}
            />
          </span>
        }
        {tasksFromProps.length !== 0 ?
          // show TaskList and search
          tasks.length === 0 ?
          <p>Brak wyników</p> :
          <ul>
            {
              tasks.map(
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
          // show banner
          <div className='banner'>Taskmen baner</div>
        }
      </div>
    )
  }
}

export default TaskList
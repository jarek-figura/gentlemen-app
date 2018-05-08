import React, {Component} from 'react'
import './TaskList.css'
import TaskContent from "../TaskContent/TaskContent";
import TaskSearch from "../TaskSearch/TaskSearch";

// import TaskEditForm from './TaskEditForm';

class TaskList extends Component {
  state = {
    editTaskId: null,
    searchPhrase: ''
  };

  enterEditMode = taskId => {
    this.setState({editTaskId: taskId})
  };
  exitEditMode = () => {
    this.setState({editTaskId: null})
  };

  updateSearchPhrase = searchPhrase => this.setState({searchPhrase})

  render() {

    const tasks = this.props.tasks.filter(
      task => task.name.toLowerCase().includes(this.state.searchPhrase.toLowerCase())
    )
    return (
      <div>
        <p>!!! OK</p>
        <TaskSearch
          updateSearchPhrase={this.updateSearchPhrase}
        />
        {
          tasks.length === 0 ?
            <p>No results</p> :
            <ul>
              {
                tasks.map(
                  task => (
                    <li key={task.id}>
                        <TaskContent
                        task={task}
                        enterEditMode={this.enterEditMode}
                        removeTask={this.props.removeTask}
                        toggleTaskDone={this.props.toggleTaskDone}
                        toggleTaskImportant={this.props.toggleTaskImportant}
                        />
                    </li>
                  )
                )
              }
            </ul>
        }

      </div>
    )
  }
}

export default TaskList
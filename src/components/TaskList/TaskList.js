import React, {Component} from 'react'
import './TaskList.css'
import TaskContent from "../TaskContent/TaskContent";
import TaskSearch from "../TaskSearch/TaskSearch";

class TaskList extends Component {
  state = {
    editTaskId: null,
    searchPhrase: '',
    dueDateSortMode: true
  };

  updateSearchPhrase = searchPhrase => this.setState({searchPhrase});

  enableSortingByDueDate = () => {
    this.setState({dueDateSortMode: !this.state.dueDateSortMode})
  };

  enableSortingByPriority= () => {
    //TUTAJ ZACZNIJ :)
  };

  render() {

    const tasksFromProps = this.props.tasks;
    const tasks = this.props.tasks.filter(
      task => task.name.toLowerCase().includes(this.state.searchPhrase.toLowerCase())
    );

    {
      if(this.state.dueDateSortMode===true){
        tasks.sort((a, b) => a.dueDate.isBefore(b.dueDate) ? -1 : a.dueDate.isAfter(b.dueDate) ? 1 : 0)
      } else {
        tasks.sort((a, b) => a.dueDate.isBefore(b.dueDate) ? 1 : a.dueDate.isAfter(b.dueDate) ? -1 : 0)

      }
    }

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
            tasks.length === 0 ?
              <p className='no-result'>Brak wyników</p> :
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
            //show banner
            <h1 className='banner'>Taskmen baner</h1>
        }
        {/*button - task filter by sth */}
        <br/>
        <br/>
        <TaskFilter
          enableSortingByDueDate={this.enableSortingByDueDate}
          enableSortingByPriority={this.enableSortingByPriority}/>
      </div>
    )
  }
}

export default TaskList
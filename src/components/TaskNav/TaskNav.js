import React, {Component} from 'react';
import './TaskNav.css'
import {withTasks} from "../contexts/Tasks";
import TaskFilter from '../TaskFilter/TaskFilter';

class TaskNav extends Component {
  state = {
    hideNavMode: 'hide' // + 'show'
  };
  render () {
    return (
      <nav className='nav-bottom nav-bottom'>
        <button
          className="add-task-button"
          title="Dodaj zadanie"
          onClick={this.props.toggleShowAddTaskPopup}
        ><strong>{`Dodaj zadanie`}</strong></button>

        <button
          className="show-filters"
          title="Pokaż filtry"
        >
          {`Pokaż\nfiltry`}
        </button>

        {/* filter by isDone & sort by dueDate & sort by priority */}
        <TaskFilter/>
      </nav>
    )
  }
}

export default withTasks(TaskNav);
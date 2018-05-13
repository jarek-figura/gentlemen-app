import React, {Component} from 'react';
import './TaskNav.css';
import {withTasks} from "../contexts/Tasks";
import TaskFilter from '../TaskFilter/TaskFilter'

class TaskNav extends Component {
  render () {
    return (
      <nav className='nav-bottom'>
        {/* add task */}
        <button onClick={this.props.toggleShowAddTaskPopup}><strong>Dodaj<br/>zadanie</strong></button>

        {/* show done / not done */}
        {this.props.showOnlyDoneEnabled === false
          ? <button onClick={() => {
            this.props.showOnlyDone(true);
            this.props.showOnlyNotDone(false);
          }}>Pokaż<br/>zrobione</button>
          : <button onClick={() => {
            this.props.showOnlyDone(false);
            this.props.showOnlyNotDone(true);
          }}>Pokaż<br/>niezrobione</button>
        }

        {/* show all */}
        <button onClick={() => {
          this.props.showOnlyDone(false);
          this.props.showOnlyNotDone(false);
        }}>Pokaż<br/>wszystkie
        </button>

        {/* sort by dueDate / sort by priority */}
        <TaskFilter/>
      </nav>
    )
  }
}

export default withTasks(TaskNav);
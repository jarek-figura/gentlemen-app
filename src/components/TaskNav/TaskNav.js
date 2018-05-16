import React, {Component} from 'react';
import './TaskNav.css'
import {withTasks} from "../contexts/Tasks";
import TaskFilter from '../TaskFilter/TaskFilter';

const navModeTable = ['hide', ''];
let counter = 0;

class TaskNav extends Component {
  state = {
    hideNavMode: 'hide',
  };

  handleClick = () => {
    this.setState({
      hideNavMode: navModeTable[counter = (counter + 1) %2]
    });
  };

  render () {
    return (
      <nav className={`nav-bottom ${this.state.hideNavMode}`}>
        <button
          className="add-task-button"
          title="Dodaj zadanie"
          onClick={this.props.toggleShowAddTaskPopup}
        ><strong>{`Dodaj zadanie`}</strong></button>

        <button
          className="show-filters"
          title="Pokaż filtry"
          onClick={this.handleClick}
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
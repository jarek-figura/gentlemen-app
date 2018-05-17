import React, {Component} from 'react';
import './TaskNav.css'
import {withTasks} from "../../contexts/Tasks";
import TaskFilter from '../../business/TaskFilter/TaskFilter';

const navModeTable = ['hide', ''];
const filtersButtonName = [`Pokaż\nfiltry`, `Ukryj\nfiltry`];
// let navIndex = 0;

class TaskNav extends Component {
  state = {
    // hideNavMode: 'hide',
    navIndex: 0
  };

  handleClick = () => {
    this.setState({
      navIndex: (this.state.navIndex + 1) %2,
      // hideNavMode: navModeTable[this.state.navIndex = (this.state.navIndex + 1) %2]
    });
  };

  handleClearButton = () => {
    this.props.clearFilters()
  };

  render () {
    return (
      <nav className={`nav-bottom ${navModeTable[this.state.navIndex]}`}>
        <button
          className="clear-filters-button"
          title={`Wyczyść\nfiltry`}
          onClick={this.handleClearButton}
        >{`Wyczyść\nfiltry`}</button>

        <button
          className="add-task-button"
          title="Dodaj zadanie"
          onClick={this.props.toggleShowAddTaskPopup}
        ><strong>{`Dodaj zadanie`}</strong></button>

        <button
          className="show-filters"
          title={filtersButtonName[this.state.navIndex]}
          onClick={this.handleClick}
        >{filtersButtonName[this.state.navIndex]}</button>

        {/* filter by isDone & sort by dueDate & sort by priority */}
        <TaskFilter/>
      </nav>
    )
  }
}

export default withTasks(TaskNav);
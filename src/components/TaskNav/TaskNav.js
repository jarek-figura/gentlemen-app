import React, {Component} from 'react';
import './TaskNav.css'
import {withTasks} from "../contexts/Tasks";
import TaskFilter from '../TaskFilter/TaskFilter';

class TaskNav extends Component {
  handleClick = (event) => {
    this.props.toggleDoneButtonClicked(event.currentTarget.name)
  };

  render () {
    return (
      <nav className='nav-bottom'>
        <button
          className="add"
          title="Dodaj zadanie"
          onClick={this.props.toggleShowAddTaskPopup}
        ><strong>{`Dodaj zadanie`}</strong></button>

        <button
          name="0"
          title="Pokaż wszystkie"
          className={this.props.doneButtonClicked === '0' ? 'clicked' : ''}
          onClick={(event) => {
            this.props.showOnlyDone(false);
            this.props.showOnlyNotDone(false);
            this.handleClick(event);
        }}>{`PW`}</button>

        <button
          name="1"
          title="Pokaż zrobione"
          className={this.props.doneButtonClicked === '1' ? 'clicked' : ''}
          onClick={(event) => {
            this.props.showOnlyDone(true);
            this.props.showOnlyNotDone(false);
            this.handleClick(event);
          }}
        >{`PZ`}</button>

        <button
          name="2"
          title="Pokaż niezrobione"
          className={this.props.doneButtonClicked === '2' ? 'clicked' : ''}
          onClick={(event) => {
          this.props.showOnlyDone(false);
          this.props.showOnlyNotDone(true);
          this.handleClick(event);
        }}>{`PN`}</button>

        {/* sort by dueDate / sort by priority */}
        <TaskFilter/>
      </nav>
    )
  }
}

export default withTasks(TaskNav);
import React, {Component} from 'react';
import './TaskNav.css'
import {withTasks} from "../contexts/Tasks";
import TaskFilter from '../TaskFilter/TaskFilter';

class TaskNav extends Component {
  handleClick = event => {
    this.props.sortByIsDone(event.currentTarget.name)
  };

  render () {
    return (
      <nav className='nav-bottom'>
        <button
          className="add"
          title="Dodaj zadanie"
          onClick={this.props.toggleShowAddTaskPopup}
        ><strong>{`Dodaj zadanie`}</strong></button>

        <div>
          {`Filtruj zrobione`}
          <button
            name="0"
            title="Pokaż wszystkie"
            className={this.props.isDoneSortMode === '0' ? 'clicked' : ''}
            onClick={this.handleClick}
          >{`PW`}</button>
          <button
            name="1"
            title="Pokaż zrobione"
            className={this.props.isDoneSortMode === '1' ? 'clicked' : ''}
            onClick={this.handleClick}
          >{`PZ`}</button>
          <button
            name="2"
            title="Pokaż niezrobione"
            className={this.props.isDoneSortMode === '2' ? 'clicked' : ''}
            onClick={this.handleClick}
          >{`PN`}</button>
        </div>

        {/* sort by dueDate / sort by priority */}
        <TaskFilter/>
      </nav>
    )
  }
}

export default withTasks(TaskNav);
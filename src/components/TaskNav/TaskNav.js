import React, {Component} from 'react';
import {withTasks} from "../contexts/Tasks";
import TaskFilter from '../TaskFilter/TaskFilter';

class TaskNav extends Component {

  render () {

    return (
      <nav className='nav-bottom'>

        <button
          title="Dodaj zadanie"
          onClick={this.props.toggleShowAddTaskPopup}
        ><strong>{`\u271a`}</strong></button>

        <button
          value='1'
          title="Pokaż zrobione"
          onClick={() => {
            this.props.showOnlyDone(true);
            this.props.showOnlyNotDone(false);
          }}
        >{`PZ`}</button>

        <button
          value='1'
          title="Pokaż niezrobione"
          onClick={() => {
          this.props.showOnlyDone(false);
          this.props.showOnlyNotDone(true);
        }}>{`PN`}</button>

        <button
          value='3'
          title="Pokaż wszystkie"
          onClick={() => {
          this.props.showOnlyDone(false);
          this.props.showOnlyNotDone(false);
        }}>{`PW`}</button>

        {/* sort by dueDate / sort by priority */}
        <TaskFilter/>
      </nav>
    )
  }
}

export default withTasks(TaskNav);
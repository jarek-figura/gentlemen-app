import React, {Component} from 'react';
import {withTasks} from "../contexts/Tasks";
import TaskFilter from '../TaskFilter/TaskFilter'

class TaskNav extends Component {
  render () {
    return (
      <nav className='nav-bottom'>
        {/* add task */}
        <button onClick={this.props.toggleShowAddTaskPopup}><strong>{`Dodaj\nzadanie`}</strong></button>

        {/* show done / not done */}
        {this.props.showOnlyDoneEnabled === false
          ? <button onClick={() => {
            this.props.showOnlyDone(true);
            this.props.showOnlyNotDone(false);
          }}>{`Pokaż\nzrobione`}</button>
          : <button onClick={() => {
            this.props.showOnlyDone(false);
            this.props.showOnlyNotDone(true);
          }}>{`Pokaż\nniezrobione`}</button>
        }

        {/* show all */}
        <button onClick={() => {
          this.props.showOnlyDone(false);
          this.props.showOnlyNotDone(false);
        }}>{`Pokaż\nwszystkie`}</button>

        {/* sort by dueDate / sort by priority */}
        <TaskFilter/>
      </nav>
    )
  }
}

export default withTasks(TaskNav);
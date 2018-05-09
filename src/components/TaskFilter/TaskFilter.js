import React, {Component} from 'react';

class TaskFilter extends Component {
  render(){
    return (
      <div>

        <button  name="byDueDate" onClick={this.props.enableSortingByDueDate}>DUE DATE</button>
        <button  name="byPriorityLevel" onClick={this.props.enableSortingByPriority}>PRIORITY LEVEL</button>
      </div>
    )
  }
}

export default TaskFilter;
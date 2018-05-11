import React, {Component} from 'react';
import './TaskFIlter.css'

class TaskFilter extends Component {
  render(){
    return (
      <div className="task-sorting">
        <button  name="byDueDate" onClick={this.props.enableSortingByDueDate}>Sortuj po dacie</button><span>&nbsp;</span>
        <button  name="byPriorityLevel" onClick={this.props.enableSortingByPriority}>Sortuj po priorytecie</button>
      </div>
    )
  }
}

export default TaskFilter;
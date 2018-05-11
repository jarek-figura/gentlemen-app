import React, {Component} from 'react';

class TaskFilter extends Component {
  render(){
    return (
      <div>

        <button  name="byDueDate" onClick={this.props.enableSortingByDueDate}>Sortuj po dacie</button>
        <button  name="byPriorityLevel" onClick={this.props.enableSortingByPriority}>Sortuj po priorytecie</button>
      </div>
    )
  }
}

export default TaskFilter;
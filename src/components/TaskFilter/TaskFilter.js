import React, {Component} from 'react';

class TaskFilter extends Component {

  render(){
    return (
      <div>

        <button  name="byDueDate" onClick={this.handleClick}>DUE DATE</button>
        <button  name="byPriorityLevel" onClick={this.handleClick}>PRIORITY LEVEL</button>
      </div>
    )
  }
}

export default TaskFilter;
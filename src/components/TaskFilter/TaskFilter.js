import React, {Component} from 'react';

class TaskFilter extends Component {

  render(){
    return (
      <div>
        <button className="filterBtn" name="byDueDate" onClick={this.handleClick}>DUE DATE</button>
        <button className="filterBtn" name="byPriorityLevel" onClick={this.handleClick}>PRIORITY LEVEL</button>
      </div>
    )
  }
}

export default TaskFilter;
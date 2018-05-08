import React, {Component} from 'react';

const sorta = require('sorta');

class TaskFilter extends Component {

  render(){
    console.log(sorta)
    return (
      <div>

        <button  name="byDueDate" onClick={this.handleClick}>DUE DATE</button>
        <button  name="byPriorityLevel" onClick={this.handleClick}>PRIORITY LEVEL</button>
      </div>
    )
  }
}

export default TaskFilter;
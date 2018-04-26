import React, {Component} from 'react';
import './TaskFIlter.css';

class TaskFilter extends Component {



  render(){
    return (
      <div>
        <button class="filterBtn" name="byDueDate" onClick={this.handleClick}>DUE DATE</button>
        <button class="filterBtn" name="byPriorityLevel" onClick={this.handleClick}>PRIORITY LEVEL</button>
        <button class="filterBtn" name="byNoDate" onClick={this.handleClick}>NO DATE</button>
        <button class="filterBtn" name="by7DaysAndWaiting" onClick={this.handleClick}>7 DAYS & WAITING</button>
      </div>
    )
  }
}

export default TaskFilter;
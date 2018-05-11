import React, {Component} from 'react';
import './TaskFilter.css'

const dateSortMode = ['\u21e7', '\u21e9', '\u21d4'];
const prioritySortMode = ['\u21e9', '\u21d4'];

class TaskFilter extends Component {
  render(){
    return (
      <div className="task-sorting">
        <button name="byDueDate" onClick={this.props.enableSortingByDueDate}>Data {dateSortMode[this.props.dueDateSortMode]}</button>
        <button name="byPriorityLevel" onClick={this.props.enableSortingByPriority}>Priotytet {prioritySortMode[this.props.prioritySortMode]}</button>
      </div>
    )
  }
}

export default TaskFilter;
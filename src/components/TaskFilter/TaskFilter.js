import React, {Component} from 'react';
import './TaskFilter.css'
import {withTasks} from "../contexts/Tasks";

const dateSortMode = ['\u21e7', '\u21e9', '\u21d4'];
const dateTitles = ['sortuj rosnąco', 'sortuj malejąco', 'bez sortowania'];
const prioritySortMode = ['\u21e9', '\u21d4'];
const priorityTitles = ['sortuj malejąco', 'bez sortowania'];

class TaskFilter extends Component {
  render(){
    return (
      <div className="task-sorting">
        <button
          name="byDueDate"
          title={dateTitles[this.props.dueDateSortMode]}
          onClick={this.props.enableSortingByDueDate}
        >Data {dateSortMode[this.props.dueDateSortMode]}</button>
        <button
          name="byPriorityLevel"
          title={priorityTitles[this.props.prioritySortMode]}
          onClick={this.props.enableSortingByPriority}
        >Priorytet {prioritySortMode[this.props.prioritySortMode]}</button>
      </div>
    )
  }
}

export default withTasks(TaskFilter);
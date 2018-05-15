import React, {Component} from 'react';
import './TaskFilter.css'
import {withTasks} from "../contexts/Tasks";

const prioritySortMode = ['\u21e9', '\u21d4'];
const priorityTitles = ['sortuj malejąco', 'bez sortowania'];

class TaskFilter extends Component {
  handleClick = event => {
    this.props.sortByDueDate(event.currentTarget.name)
  };

  render(){
    return (
      <div className="task-sorting">
        <div className="dueday-sorting">
          <button
            name="0"
            title="Bez sortowania"
            className={this.props.dueDateSortMode === '0' ? 'clicked' : ''}
            onClick={this.handleClick}
          >Data {"\u21d4"}</button>

          <button
            name="1"
            title="Sortuj rosnąco"
            className={this.props.dueDateSortMode === '1' ? 'clicked' : ''}
            onClick={this.handleClick}
          >Data {"\u21e7"}</button>

          <button
            name="2"
            title="Sortuj malejąco"
            className={this.props.dueDateSortMode === '2' ? 'clicked' : ''}
            onClick={this.handleClick}
          >Data {"\u21e9"}</button>
        </div>

        <div className="priority-sorting">
          <button
            name="byPriorityLevel"
            title={priorityTitles[this.props.prioritySortMode]}
            onClick={this.props.sortByPriority}
          >Priorytet {prioritySortMode[this.props.prioritySortMode]}</button>
        </div>
      </div>
    )
  }
}
// TODO 1: Priority sorting buttons in `TaskFilter` (line 39) and new logic in `TaskList` (line 39)
// TODO 2: Hiding bottom nav panel in `TaskApp` or in `TaskNav`
export default withTasks(TaskFilter);
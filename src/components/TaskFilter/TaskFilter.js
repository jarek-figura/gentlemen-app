import React, {Component} from 'react';
import './TaskFilter.css'
import {withTasks} from "../contexts/Tasks";

class TaskFilter extends Component {
  handleIsDoneClick = event => {
    this.props.sortByIsDone(event.currentTarget.name)
  };
  handleDueDateClick = event => {
    this.props.sortByDueDate(event.currentTarget.name)
  };
  handlePriorityClick = event => {
    this.props.sortByPriority(event.currentTarget.name)
  };

  render(){
    return (
      <div className="task-sorting">
        <div className="done-sorting">
          {`Filtruj zrobione`}
          <button
            name="0"
            title="Pokaż wszystkie"
            className={this.props.isDoneSortMode === '0' ? 'clicked' : ''}
            onClick={this.handleIsDoneClick}
          >{`PW`}</button>
          <button
            name="1"
            title="Pokaż zrobione"
            className={this.props.isDoneSortMode === '1' ? 'clicked' : ''}
            onClick={this.handleIsDoneClick}
          >{`PZ`}</button>
          <button
            name="2"
            title="Pokaż niezrobione"
            className={this.props.isDoneSortMode === '2' ? 'clicked' : ''}
            onClick={this.handleIsDoneClick}
          >{`PN`}</button>
        </div>

        <div className="dueday-sorting">
          {`Sortuj wg dat`}
          <button
            name="0"
            title="Bez sortowania"
            className={this.props.dueDateSortMode === '0' ? 'clicked' : ''}
            onClick={this.handleDueDateClick}
          >Data {"\u21d4"}</button>
          <button
            name="1"
            title="Sortuj rosnąco"
            className={this.props.dueDateSortMode === '1' ? 'clicked' : ''}
            onClick={this.handleDueDateClick}
          >Data {"\u21e7"}</button>
          <button
            name="2"
            title="Sortuj malejąco"
            className={this.props.dueDateSortMode === '2' ? 'clicked' : ''}
            onClick={this.handleDueDateClick}
          >Data {"\u21e9"}</button>
        </div>

        <div className="priority-sorting">
          {`Sortuj wg priorytetów`}
          <button
            name="0"
            title="Bez sortowania"
            className={this.props.prioritySortMode === '0' ? 'clicked' : ''}
            onClick={this.handlePriorityClick}
          >Priorytet {"\u21d4"}</button>
          <button
            name="1"
            title="Sortuj rosnąco"
            className={this.props.prioritySortMode === '1' ? 'clicked' : ''}
            onClick={this.handlePriorityClick}
          >Priorytet {"\u21e7"}</button>
          <button
            name="2"
            title="Sortuj malejąco"
            className={this.props.prioritySortMode === '2' ? 'clicked' : ''}
            onClick={this.handlePriorityClick}
          >Priorytet {"\u21e9"}</button>
        </div>
      </div>
    )
  }
}
// TODO 1: Priority sorting buttons in `TaskFilter` (line 39) and new logic in `TaskList` (line 39)
// TODO 2: Hiding bottom nav panel in `TaskApp` or in `TaskNav`
export default withTasks(TaskFilter);
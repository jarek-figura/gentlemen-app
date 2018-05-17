import React, {Component} from 'react';
import './TaskFilter.css'
import {withTasks} from "../../contexts/Tasks";

const filters = [
  { title: 'Pokaż wszystkie',   label: 'PW' },
  { title: 'Pokaż zrobione',    label: 'PZ' },
  { title: 'Pokaż niezrobione', label: 'PN' }
];

const dueSorters = [
  { title: 'Bez sortowania',  label: `Data ${"\u21d4"}` },
  { title: 'Sortuj rosnąco',  label: `Data ${"\u21e7"}` },
  { title: 'Sortuj malejąco', label: `Data ${"\u21e9"}` }
];

const prioritySorters = [
  { title: 'Bez sortowania',  label: `Priorytet ${"\u21d4"}` },
  { title: 'Sortuj rosnąco',  label: `Priorytet ${"\u21e7"}` },
  { title: 'Sortuj malejąco', label: `Priorytet ${"\u21e9"}` }
];

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
          <span className="done-sorting-text">Filtruj zrobione</span>
          {
            filters.map(
              ({ title, label }, index) => (
                <button
                  key={index}
                  name={index.toString()}
                  title={title}
                  className={this.props.isDoneSortMode === index.toString() ? 'clicked' : ''}
                  onClick={this.handleIsDoneClick}
                >
                  {label}
                </button>
              )
            )
          }
        </div>

        <div className="dueday-sorting">
          <span className="dueday-sorting-text">Sortuj wg date</span>
          {
            dueSorters.map(
              ({ title, label }, index) => (
                <button
                  key={index}
                  name={index.toString()}
                  title={title}
                  className={this.props.dueDateSortMode === index.toString() ? 'clicked' : ''}
                  onClick={this.handleDueDateClick}
                >
                  {label}
                </button>
              )
            )
          }
        </div>

        <div className="priority-sorting">
          <span className="priority-sorting-text">Sortuj wg priorytetów</span>
          {
            prioritySorters.map(
              ({ title, label }, index) => (
                <button
                  key={index}
                  name={index.toString()}
                  title={title}
                  className={this.props.prioritySortMode === index.toString() ? 'clicked' : ''}
                  onClick={this.handlePriorityClick}
                >
                  {label}
                </button>
              )
            )
          }
        </div>
      </div>
    )
  }
}

export default withTasks(TaskFilter);
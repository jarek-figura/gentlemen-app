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
  { title: 'Bez sortowania',  label: `Prior ${"\u21d4"}` },
  { title: 'Sortuj rosnąco',  label: `Prior ${"\u21e7"}` },
  { title: 'Sortuj malejąco', label: `Prior ${"\u21e9"}` }
];

class TaskFilter extends Component {
  handleIsDoneClick = event => {
    this.props.filterByIsDone(event.currentTarget.name)
  };
  handleDueDateClick = event => {
    this.props.filterByDueDate(event.currentTarget.name)
  };
  handlePriorityClick = event => {
    this.props.filterByPriority(event.currentTarget.name)
  };
  handleDayClick = event => {
    let name = event.currentTarget.name;
    name = (name === '0') ? '1' :'0';
    this.props.showMyDay(name);
    this.props.showMyWeek('0');
  };
  handleWeekClick = event => {
    let name = event.currentTarget.name;
    name = (name === '0') ? '1' :'0';
    this.props.showMyWeek(name);
    this.props.showMyDay('0');
  };

  render(){
    return (
      <div className="task-sorting">

        <div className="day-week-filtering">
          <button
            name={this.props.showMyDayMode}
            className={`butt my-day ${this.props.showMyDayMode === '1' ? 'clicked' : ''}`}
            title="Mój dzień"
            onClick={this.handleDayClick}
          >Mój dzień</button>

          <button
            name={this.props.showMyWeekMode}
            className={`butt my-week ${this.props.showMyWeekMode === '1' ? 'clicked' : ''}`}
            title="Mój tydzień"
            onClick={this.handleWeekClick}
          >Mój tydzień</button>
        </div>

        <div className="done-filtering">
          <span className="done-filtering-text">Filtruj zrobione</span>
          {
            filters.map(
              ({ title, label }, index) => (
                <button
                  key={index}
                  name={index.toString()}
                  title={title}
                  className={this.props.isDoneSortMode === index.toString() ? 'clicked' : 'smallFilterButton'}
                  onClick={this.handleIsDoneClick}
                >
                  {label}
                </button>
              )
            )
          }
        </div>

        <div className="dueday-filtering">
          <span className="dueday-filtering-text">Sortuj wg daty</span>
          {
            dueSorters.map(
              ({ title, label }, index) => (
                <button
                  key={index}
                  name={index.toString()}
                  title={title}
                  className={this.props.dueDateSortMode === index.toString() ? 'clicked' : 'smallFilterButton'}
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
                  className={this.props.prioritySortMode === index.toString() ? 'clicked' : 'smallFilterButton'}
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
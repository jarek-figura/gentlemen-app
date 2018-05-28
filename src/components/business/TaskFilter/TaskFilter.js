import React, {Component} from 'react';
import './TaskFilter.css'
import {withTasks} from "../../contexts/Tasks";

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faSort, faCaretUp, faCaretDown, faExclamation} from '@fortawesome/fontawesome-free-solid';
import {faTimesCircle, faCheckCircle, faCircle} from '@fortawesome/fontawesome-free-regular';



const filters = [
  { title: 'Pokaż wszystkie',   label: <FontAwesomeIcon size='lg' icon={faCircle}/> },
  { title: 'Pokaż zrobione',   label: <FontAwesomeIcon size='lg' icon={faCheckCircle}/> },
  { title: 'Pokaż niezrobione', label: <FontAwesomeIcon size='lg' icon={faTimesCircle}/> }
];

const dueSorters = [
  { title: 'Bez sortowania',  label: <FontAwesomeIcon size='lg' transform={{rotate:90}} icon={faSort}/>},
  { title: 'Sortuj rosnąco',  label: <FontAwesomeIcon size='lg' icon={faCaretUp}/>},
  { title: 'Sortuj malejąco', label: <FontAwesomeIcon size='lg' icon={faCaretDown}/>}
];
const prioritySorters = [
  { title: 'Bez sortowania',  label: <FontAwesomeIcon size='lg' transform={{rotate:90}} icon={faSort}/>},
  { title: 'Sortuj rosnąco',  label: <FontAwesomeIcon size='lg' icon={faCaretUp}/> },
  { title: 'Sortuj malejąco', label: <FontAwesomeIcon size='lg' icon={faCaretDown}/> }
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
          >Mój dzień&nbsp;&nbsp;<FontAwesomeIcon size='lg' icon={faCalendarAlt}/></button>

          <button
            name={this.props.showMyWeekMode}
            className={`butt my-week ${this.props.showMyWeekMode === '1' ? 'clicked' : ''}`}
            title="Mój tydzień"
            onClick={this.handleWeekClick}
          >Mój tydzień&nbsp;&nbsp;<FontAwesomeIcon size='lg' icon={faCalendarAlt}/></button>
        </div>

        <div className="done-filtering">
          <span className="filtering-text">Filtruj zrobione</span>
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
          <span className="filtering-text">Sortuj wg daty</span>
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
                  <FontAwesomeIcon size='lg' icon={faCalendarAlt}/>&nbsp;&nbsp;{label}
                </button>
              )
            )
          }
        </div>

        <div className="priority-sorting">
          <span className="filtering-text">Sortuj wg priorytetów</span>
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
                  <FontAwesomeIcon size='lg' icon={faExclamation}/>&nbsp;&nbsp;{label}
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
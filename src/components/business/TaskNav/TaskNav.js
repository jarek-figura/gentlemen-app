import React, {Component} from 'react';
import './TaskNav.css';
import {withTasks} from "../../contexts/Tasks";
import TaskFilter from '../../business/TaskFilter/TaskFilter';
import {ThemeConsumer} from '../../contexts/Theme';

const navModeTable = ['hide', ''];
const filtersButtonName = [`Pokaż\nfiltry`,`Ukryj\nfiltry`];

class TaskNav extends Component {
  state = {
    navIndex: 0
  };

  handleClick = () => {
    this.setState({
      navIndex: (this.state.navIndex + 1) % 2,
    });
  };

  handleClearButton = () => {
    this.props.clearFilters()
  };

  render() {
    let disabled = true;
    if (this.props.isDoneSortMode !== '0' ||
      this.props.dueDateSortMode !== '0' ||
      this.props.prioritySortMode !== '0' ||
      this.props.showMyDayMode !== '0' ||
      this.props.showMyWeekMode !== '0') {
      disabled = false;
    }
    return (
      <ThemeConsumer>
        {
          ({theme}) => (
            <div style={theme.bodyBottom} className={`nav-bottom ${navModeTable[this.state.navIndex]}`}>
              <button
                disabled={disabled}
                className="clear-filters-button"
                title={`Wyczyść\nfiltry`}
                onClick={this.handleClearButton}
              >{`Wyczyść\nfiltry`}</button>

              <button
                className="add-task-button"
                title="Dodaj zadanie"
                onClick={this.props.toggleShowAddTaskPopup}
              ><strong>Dodaj zadanie</strong></button>

              <button
                className="show-filters"
                title={filtersButtonName[this.state.navIndex]}
                onClick={this.handleClick}
              >{filtersButtonName[this.state.navIndex]}</button>

              <TaskFilter/>
            </div>
          )
        }
      </ThemeConsumer>
    )
  }
}

export default withTasks(TaskNav);
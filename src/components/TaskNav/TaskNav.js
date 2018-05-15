import React, {Component} from 'react';
import './TaskNav.css'
import {withTasks} from "../contexts/Tasks";
import TaskFilter from '../TaskFilter/TaskFilter';

class TaskNav extends Component {
  state = {
    buttonClicked: 'PW'
  };

  handleClick = (event) => {
    this.setState({buttonClicked: event.currentTarget.name})
  };

  render () {
    return (
      <nav className='nav-bottom'>
        <button
          className="add"
          title="Dodaj zadanie"
          onClick={this.props.toggleShowAddTaskPopup}
        ><strong>{`Dodaj zadanie`}</strong></button>

        <button
          name='PZ'
          title="Pokaż zrobione"
          className={this.state.buttonClicked === 'PZ' ? 'clicked' : ''}
          onClick={(event) => {
            this.props.showOnlyDone(true);
            this.props.showOnlyNotDone(false);
            this.handleClick(event);
          }}
          // onClick={this.handleClick}
        >{`PZ`}</button>

        <button
          name='PN'
          title="Pokaż niezrobione"
          className={this.state.buttonClicked === 'PN' ? 'clicked' : ''}
          onClick={(event) => {
          this.props.showOnlyDone(false);
          this.props.showOnlyNotDone(true);
          this.handleClick(event);
        }}>{`PN`}</button>

        <button
          name='PW'
          title="Pokaż wszystkie"
          className={this.state.buttonClicked === 'PW' ? 'clicked' : ''}
          onClick={(event) => {
          this.props.showOnlyDone(false);
          this.props.showOnlyNotDone(false);
          this.handleClick(event);
        }}>{`PW`}</button>

        {/* sort by dueDate / sort by priority */}
        <TaskFilter/>
      </nav>
    )
  }
}

export default withTasks(TaskNav);
import React, {Component} from 'react'
import './TaskList.css'
import TaskContent from "../TaskContent/TaskContent";
import TaskSearch from "../TaskSearch/TaskSearch";
import {withTasks} from "../contexts/Tasks";
import {nameToValue} from "../_utils/priority";
import moment from "moment/moment";

class TaskList extends Component {
  render() {
    const tasks = this.props.tasks.filter(
      task => this.props.isDoneSortMode === '1'
        ? task.isDone === true
        : true
    ).filter(
      task => this.props.isDoneSortMode === '2'
        ? task.isDone === false
        : true
    ).filter(
      task => task.name.toLowerCase().includes(
        this.props.searchPhrase.toLowerCase()
      )
    );

    if (this.props.dueDateSortMode === '1') {
      tasks.sort(
        (a, b) => moment(a.dueDate).isBefore(b.dueDate)
          ? -1
          : moment(a.dueDate).isAfter(b.dueDate) ? 1 : 0
      )
    } else if (this.props.dueDateSortMode === '2') {
      tasks.sort(
        (a, b) => moment(a.dueDate).isBefore(b.dueDate)
          ? 1
          : moment(a.dueDate).isAfter(b.dueDate) ? -1 : 0
      )
    }

    if (this.props.prioritySortMode === 1) {
      tasks.sort(
        (a, b) => nameToValue(b.priority) - nameToValue(a.priority)
      )
    }

    return (
      <div>
        { this.props.tasksBeforeFilter().length !== 0 &&
          <span className='task-list'>
            <h3>Zadania do zrobienia</h3>
            <TaskSearch/>
          </span>
        }
        {
          this.props.tasksBeforeFilter().length !== 0
            ? // show TaskList and search
              tasks.length === 0
                ? <p className='no-result'>Brak wyników</p>
                : <ul>
                    {
                      tasks.map(
                        task => (
                          <li key={task.id}>
                            <TaskContent task={task}/>
                          </li>
                        )
                      )
                    }
                  </ul>
            : //show banner
              <h1 className='banner'>Taskmen banner</h1>
        }
        <br/>
        <br/>
      </div>
    )
  }
}

export default withTasks(TaskList)
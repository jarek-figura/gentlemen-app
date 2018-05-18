import React, {Component} from 'react'
import './TaskList.css'
import TaskContent from "../../business/TaskContent/TaskContent";
import TaskSearch from "../TaskSearch/TaskSearch";
import {nameToValue} from "../../_utils/priority";
import {withTasks} from "../../contexts/Tasks";
import {withUser} from "../../contexts/User";
import moment from "moment/moment";
import SignInForm from '../../core/auth/SignInForm';
import SignUpForm from '../../core/auth/SignUpForm';
import TaskPanelUser from '../TaskPanelUser/TaskPanelUser'


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

    if (this.props.prioritySortMode === '1') {
      tasks.sort(
        (a, b) => nameToValue(b.priority) - nameToValue(a.priority)
      )
    } else if (this.props.prioritySortMode === '2') {
      tasks.sort(
        (a, b) => nameToValue(a.priority) - nameToValue(b.priority)
      )
    }

    return (
      <div>
        {
          this.props.user !== null ?
          <TaskPanelUser/> : ""
        }
        {
          this.props.user !== null
            ? <div>
              {
                this.props.tasksBeforeFilter().length !== 0 &&
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
                  <div className='banner'>

                  </div>
              }
            </div>
            : <div className='banner'>
                <h1>Witaj w aplikacji Taskmen</h1>
                {
                  this.props.user === null ? (
                    <div>
                      <SignInForm/>
                      <SignUpForm/>
                    </div>
                  ) : ''
                }
              </div>
        }
      </div>
    )
  }
}

export default withUser(withTasks(TaskList));
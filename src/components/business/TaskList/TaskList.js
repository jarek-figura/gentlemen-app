import React, {Component} from 'react'
import './TaskList.css'
import TaskContent from "../../business/TaskContent/TaskContent";
import TaskSearch from "../TaskSearch/TaskSearch";
import {withTasks} from "../../contexts/Tasks";
import {withUser} from "../../contexts/User";
import SignInForm from '../../core/auth/SignInForm';
import SignUpForm from '../../core/auth/SignUpForm';
import TaskPanelUser from '../TaskPanelUser/TaskPanelUser'
import moment from 'moment'
import 'moment/locale/pl'

import organizeTasks from "./organizeTasks";
moment.locale('pl')

class TaskList extends Component {
  state = {
    dateFormatted: moment().format('llll')
}
tick = () => {
    this.setState({
      dateFormatted: moment().format('llll')
    })
}

componentDidMount() {
    setInterval(this.tick, 1000)
}

  render() {
    const tasks = organizeTasks.apply(this);
    // const tasks = organizeTasks(this.props);
    const date = this.state.dateFormatted

          return (
      <div>
        {
          this.props.user !== null ?
          <TaskPanelUser/> : ""
        }
        {
          this.props.user !== null
            ? <div>
              <div className="task-hero">
                <h1>TASKMEN</h1>
                <div className={"clock"}>{date}</div>
              </div>
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
import React, {Component} from 'react'
import './TaskList.css'
import TaskContent from "../../business/TaskContent/TaskContent";
import TaskSearch from "../TaskSearch/TaskSearch";
import {withTasks} from "../../contexts/Tasks";
import {withUser} from "../../contexts/User";
import SignInForm from '../../core/auth/SignInForm';
import SignUpForm from '../../core/auth/SignUpForm';
import {ThemeConsumer} from '../../contexts/Theme'
import TaskPanelUser from '../TaskPanelUser/TaskPanelUser'
import moment from 'moment'
import 'moment/locale/pl'
import organizeTasks from "./organizeTasks";

moment.locale('pl');
let intervalId = null;

class TaskList extends Component {
  state = {
    dateFormatted: moment().format('llll'),
    isDay: true
  };
  tick = () => {
    this.setState({
      dateFormatted: moment().format('llll')
    })
  };

  componentDidMount() {
    intervalId = setInterval(this.tick, 1000);
    const dataNow = new Date();
    if (7 < dataNow.getHours() && dataNow.getHours() < 22) {
      this.setState({
        isDay: this.state.isDay
      })
    } else {
      this.setState({
        isDay: !this.state.isDay
      })
    }
  }

  componentWillUnmount() {
    clearInterval(intervalId)
  }

  render() {

    const tasks = organizeTasks.apply(this);
    // const tasks = organizeTasks(this.props);
    const date = this.state.dateFormatted;

    return (
      <ThemeConsumer>
        {
          ({theme}) => (
            <div style={theme.taskListStyle}>
              {
                this.props.user !== null ? <TaskPanelUser/> : ''
              }
              {
                this.props.user !== null
                  ? <div>
                    {
                      <div className={this.state.isDay ? "hero task-day" : " hero task-night"}>
                        <h1 className="hero-title">TASKMEN</h1>
                        <div className="hero-data">{date}</div>
                        <br />
                        <br />
                        <div className="taskLoading">{this.props.isLoading && 'Trwa ładowanie....'}</div>
                      </div>
                    }
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
                        <div className='banner'></div>
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
      </ThemeConsumer>
    )
  }
}

export default withUser(withTasks(TaskList));
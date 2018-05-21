import React, {Component} from 'react';
import './TaskApp.css'
import {withTasks} from "../../contexts/Tasks";
import {withUser} from "../../contexts/User";
import TaskList from "../TaskList/TaskList";
import TaskNav from '../TaskNav/TaskNav';

class TaskApp extends Component {
  render() {
    return (
      <div className="task-app">
        {
          this.props.currentForm === null
            ?
            <div>
               <TaskList/>
                  {
                    this.props.user !== null ? <TaskNav/> : <div></div>
                  }
              </div>
            : this.props.displayForm(this.props.currentForm)
        }
      </div>
    )
  }
}

export default withUser(withTasks(TaskApp));
import React, { Component } from 'react';
import './TaskApp.css'
import {withTasks} from "../contexts/Tasks";
import TaskList from "../../components/TaskList/TaskList";
import TaskFilter from "../../components/TaskFilter/TaskFilter";

class TaskApp extends Component {
  state = {
    showOnlyNotDoneEnabled: false,
    showOnlyDoneEnabled: false
  };

  render () {
    return (
      <div className="App">

        {this.props.currentForm === null
          ? <div>
              <TaskList
                tasks={this.props.tasks.filter(
                  task => this.props.showOnlyNotDoneEnabled === false
                    ? true
                    : task.isDone === false
                ).filter(
                  task => this.props.showOnlyDoneEnabled === false
                    ? true
                    : task.isDone === true
                )}
              />

              <nav className='nav-bottom'>
                {/* add task */}
                <button onClick={this.props.toggleShowAddTaskPopup}><strong>Dodaj<br/>zadanie</strong></button>

                {/* show done / not done */}
                {this.state.showOnlyDoneEnabled === false
                  ? <button onClick={() => this.setState({
                    showOnlyDoneEnabled: true,
                    showOnlyNotDoneEnabled: false
                  })}>Pokaż<br/>zrobione</button>
                  : <button onClick={() => this.setState({
                    showOnlyDoneEnabled: false,
                    showOnlyNotDoneEnabled: true
                  })}>Pokaż<br/>niezrobione</button>
                }

                {/* show all */}
                <button onClick={() => this.setState({
                  showOnlyNotDoneEnabled: false,
                  showOnlyDoneEnabled: false
                })}>Pokaż<br/>wszystkie
                </button>

                <TaskFilter/>
              </nav>
            </div>
          : this.props.displayForm(this.props.currentForm)
        }
      </div>
    )
  }
}

export default withTasks(TaskApp);
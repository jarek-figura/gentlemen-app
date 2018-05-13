import React, {Component} from 'react';
import './TaskApp.css'
import {withTasks} from "../contexts/Tasks";
import TaskList from "../../components/TaskList/TaskList";
import TaskFilter from "../../components/TaskFilter/TaskFilter";

class TaskApp extends Component {
  render() {
    return (
      <div className="App">
        {
          this.props.currentForm === null
            ? <div>
                <TaskList/>

                <nav className='nav-bottom'>
                  {/* add task */}
                  <button onClick={this.props.toggleShowAddTaskPopup}><strong>Dodaj<br/>zadanie</strong></button>

                  {/* show done / not done */}
                  {this.props.showOnlyDoneEnabled === false
                    ? <button onClick={() => {
                      this.props.showOnlyDone(true);
                      this.props.showOnlyNotDone(false);
                    }}>Pokaż<br/>zrobione</button>
                    : <button onClick={() => {
                      this.props.showOnlyDone(false);
                      this.props.showOnlyNotDone(true);
                    }}>Pokaż<br/>niezrobione</button>
                  }

                  {/* show all */}
                  <button onClick={() => {
                    this.props.showOnlyDone(false);
                    this.props.showOnlyNotDone(false);
                  }}>Pokaż<br/>wszystkie
                  </button>

                  {/* sort by dueDate / sort by priority */}
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
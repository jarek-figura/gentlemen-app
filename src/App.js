import React, { Component } from 'react';
import './App.css';
import TaskDueDay from './components/TaskDueDay/TaskDueDay'
import TaskDone from "./components/TaskDone/TaskDone";
import AddTaskPopup from "./components/AddTaskPopup/AddTaskPopup";

class App extends Component {
  state = {
    tasks: [],
    showOnlyNotDoneEnabled: false,
    showOnlyDoneEnabled: false
  };

  addTask = (taskName, taskDescription) => {
    this.setState(
      ({ tasks }) => ({
        tasks: tasks.concat({
          id: tasks.length === 0 ? 1 : Math.max(...tasks.map(task => task.id)) + 1,
          name: taskName,
          description: taskDescription,
          isDone: false,
          isImportant: false
        })
      })
    )
  };

  removeTask = taskId => {
    this.setState(function (oldState) {
      return {
        tasks: oldState.tasks.filter(function (task) {
          return task.id !== taskId
        })
      }
    })
  };

  updateTask = (taskId, taskName, taskDescription) => {
    this.setState({
      tasks: this.state.tasks.map(
        task => task.id !== taskId ? task : {
          ...task,
          name: taskName,
          description: taskDescription
        }
      )
    })
  };

  toggleTaskAttribute = attributeName => taskId => {
    this.setState({
      tasks: this.state.tasks.map(
        task => task.id !== taskId ? task : {
          ...task,
          [attributeName]: !task[attributeName],
        }
      )
    })
  };

  toggleTaskDone = this.toggleTaskAttribute('isDone');

  toggleTaskImportant = this.toggleTaskAttribute('isImportant');

  render() {
    return (
      <div className="App">
        <h1>TaskBanner</h1>
        <h1>TaskTitleText</h1>
        <h1>TaskTile</h1>
        <h1>TaskName</h1>
        <h1>TaskDone</h1>
        <TaskDone done={() => alert('It is Done')} />
        <h1>TaskFilters</h1>
        <h1>AddTask</h1>
        <h1>TaskSort</h1>
        <h1>TaskFilter</h1>
        <h1>TaskPriority</h1>
        <h1>TaskDueDay</h1>
        <TaskDueDay/>
        <h1>TaskClosePopup</h1>
        <h1>EditTaskPopup</h1>
        <h1>TaskPostpone</h1>
        {' '}
        {' '}
        <h1>AddTaskPopup</h1>
        <AddTaskPopup addTask={this.addTask}/>
        <button
          onClick={() => this.setState({ showOnlyNotDoneEnabled: true })}
        >Show only not done
        </button>

        <button
          onClick={() => this.setState({
            showOnlyNotDoneEnabled: false,
            showOnlyDoneEnabled: false
          })}
        >Show all
        </button>

        <button
          onClick={() => this.setState({ showOnlyDoneEnabled: true })}
        >Show only done
        </button>

        <TaskList
          tasks={this.state.tasks.filter(
            task => this.state.showOnlyNotDoneEnabled === false
              ? true
              : task.isDone === false
          ).filter(
            task => this.state.showOnlyDoneEnabled === false
              ? true
              : task.isDone === true
          )}
          removeTask={this.removeTask}
          updateTask={this.updateTask}
          toggleTaskDone={this.toggleTaskDone}
          toggleTaskImportant={this.toggleTaskImportant}
        />
      </div>
    );
  }
}

export default App;

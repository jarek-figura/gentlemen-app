import React, {Component} from 'react';
import './App.css';
import TaskList from "./components/TaskList/TaskList";
import AddTaskPopup from "./components/AddTaskPopup/AddTaskPopup";
import EditTaskPopup from "./components/EditTaskPopup/EditTaskPopup";

class App extends Component {
  state = {
    tasks: [],
    isFormVisible: false,
    currentForm: null, // 'add', 'edit'
    currentEditTask: null,
    showOnlyNotDoneEnabled: false,
    showOnlyDoneEnabled: false
  };

  addTask = (taskName, taskDescription, taskDueDate, taskPriority) => {
    this.setState(
      ({tasks}) => ({
        tasks: tasks.concat({
          id: tasks.length === 0 ? 1 : Math.max(...tasks.map(task => task.id)) + 1,
          name: taskName,
          description: taskDescription,
          dueDate: taskDueDate,
          priority: taskPriority,
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

  toggleShowAddTaskPopup = () => {
    this.setState({
      currentForm: this.state.currentForm !== 'add' ? 'add' : null
    })
  };

  toggleShowEditTaskPopup = (taskId = null) => {
    this.setState({
      currentEditTask: taskId,
      currentForm: this.state.currentForm !== 'edit' ? 'edit' : null
    })
  };

  toggleTaskDone = this.toggleTaskAttribute('isDone');

  toggleTaskImportant = this.toggleTaskAttribute('isImportant');

  displayForm = formType => {
    const options = {
      add: () => (
        <div>
          <h2>AddTaskPopup</h2>
          <AddTaskPopup
            addTask={this.addTask}
            toggleShowAddTaskPopup={this.toggleShowAddTaskPopup}
          />
        </div>
      ),
      edit: () => (
        <div>
          <h2>EditTaskPopup {this.state.currentEditTask}</h2>
          <EditTaskPopup
            addTask={this.addTask}
            toggleShowAddTaskPopup={this.toggleShowEditTaskPopup}
          />
        </div>
      )
    };
    return options[formType]()
  };

  render() {
    return (
      <div className="App">
        {this.state.currentForm === null
          ?
          <div>
            <h2>TaskList</h2>
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
              toggleShowEditTaskPopup={this.toggleShowEditTaskPopup}
            />

            {/* filters - bottom left */}
            <h2>TaskFilter</h2>
            <button onClick={() => this.setState({showOnlyNotDoneEnabled: true})}>Pokaż<br/>niezrobione</button>
            <span>&nbsp;</span>
            <button onClick={() => this.setState({
              showOnlyNotDoneEnabled: false,
              showOnlyDoneEnabled: false
            })}>Pokaż<br/>wszystkie
            </button>
            <span>&nbsp;</span>
            <button onClick={() => this.setState({showOnlyDoneEnabled: true})}>Pokaż<br/>zrobione</button>

            {/* button - bottom right */}
            <h2>AddTask</h2>
            <button onClick={this.toggleShowAddTaskPopup}>Dodaj<br/>zadanie</button>
          </div>
          :
          this.displayForm(this.state.currentForm)
        }
      </div>
    );
  }

  componentDidMount() {
    const tasksAsText = localStorage.getItem('storedTasks');
    const tasksFromLocalStorage = JSON.parse(tasksAsText);
    this.setState({
      tasks: tasksFromLocalStorage || []
    })
  }

  componentDidUpdate() {
    const tasks = this.state.tasks;
    localStorage.setItem('storedTasks', JSON.stringify(tasks));
  }
}

export default App;

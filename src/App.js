import React, {Component} from 'react';
import './App.css';
import TaskList from "./components/TaskList/TaskList";
import AddTaskPopup from "./components/AddTaskPopup/AddTaskPopup";
import EditTaskPopup from "./components/EditTaskPopup/EditTaskPopup";
import TaskFilter from "./components/TaskFilter/TaskFilter";
import moment from "moment/moment";
import {nameToValue} from "./components/_utils/priority";

class App extends Component {
  state = {
    tasks: [],
    isFormVisible: false,
    currentForm: null, // 'add', 'edit'
    currentEditTask: null,
    showOnlyNotDoneEnabled: false,
    showOnlyDoneEnabled: false,
    dueDateSortMode: '',
    prioritySortMode: false,
    searchPhrase: ''
  };

  updateSearchPhrase = searchPhrase => this.setState({searchPhrase});

  addTask = (taskName, taskDescription, taskDueDate, taskPriority) => {
    this.setState(
      ({tasks}) => ({
        tasks: tasks.concat({
          id: tasks.length === 0 ? 1 : Math.max(...tasks.map(task => task.id)) + 1,
          name: taskName,
          description: taskDescription,
          dueDate: taskDueDate,
          priority: taskPriority,
          isDone: false
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

  updateTask = (taskId, taskTitleText, taskDescription, taskDueDate, taskPriority) => {
    this.setState({
      tasks: this.state.tasks.map(
        task => task.id !== taskId ? task : {
          ...task,
          name: taskTitleText,
          description: taskDescription,
          dueDate: taskDueDate,
          priority: taskPriority,
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

  enableSortingByDueDate = () => {
    this.setState(({ dueDateSortMode }) => ({ dueDateSortMode: (dueDateSortMode + 1) % 3 }))
  };

  enableSortingByPriority = () => {
    this.setState({prioritySortMode: !this.state.prioritySortMode})
  };

  displayForm = formType => {
    const options = {
      add: () => (
        <div>
          <AddTaskPopup
            addTask={this.addTask}
            toggleShowAddTaskPopup={this.toggleShowAddTaskPopup}
          />
        </div>
      ),
      edit: () => (
        <div>
          <h2>EditTaskPopup</h2>
          <EditTaskPopup
            task={this.state.tasks.find(task => task.id === this.state.currentEditTask)}
            updateTask={this.updateTask}
            toggleShowAddTaskPopup={this.toggleShowEditTaskPopup}
          />
        </div>
      )
    };
    return options[formType]()
  };

  tasksBeforeFilter = () => {
    return this.state.tasks;
  };

  render() {
    const tasks = this.state.tasks.filter(
      task => task.name.toLowerCase().includes(this.state.searchPhrase.toLowerCase())
    );

    if (this.state.dueDateSortMode === 1) {
      tasks.sort((a, b) => moment(a.dueDate).isBefore(b.dueDate) ? -1 : moment(a.dueDate).isAfter(b.dueDate) ? 1 : 0)
    } else if (this.state.dueDateSortMode === 2){
      tasks.sort((a, b) => moment(a.dueDate).isBefore(b.dueDate) ? 1 : moment(a.dueDate).isAfter(b.dueDate) ? -1 : 0)
    }

    if (this.state.prioritySortMode) {
      tasks.sort((a, b) => nameToValue(b.priority) - nameToValue(a.priority))
    }

    return (
      <div className="App">
        {this.state.currentForm === null
          ?
          <div>
            <TaskList
              tasks={tasks.filter(
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
              toggleShowEditTaskPopup={this.toggleShowEditTaskPopup}
              updateSearchPhrase={this.updateSearchPhrase}
              tasksBeforeFilter={this.tasksBeforeFilter}
            />

            <nav className='nav-bottom'>
              {/* filters - bottom left */}
              <h3>Filtry</h3>
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
              <span>&nbsp;</span>
              <button onClick={this.toggleShowAddTaskPopup}>Dodaj<br/>zadanie</button>
              <TaskFilter
                enableSortingByDueDate={this.enableSortingByDueDate}
                enableSortingByPriority={this.enableSortingByPriority}/>
            </nav>
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

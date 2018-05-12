import React, {Component} from 'react';
import TaskList from "./TaskList/TaskList";
import TaskFilter from "./TaskFilter/TaskFilter";
import moment from "moment/moment";
import {nameToValue} from "./_utils/priority";
import InnerTaskPopup from "./InnerTaskPopup/InnerTaskPopup";

class App extends Component {
  state = {
    tasks: [],
    isFormVisible: false,
    currentForm: null, // 'add', 'edit'
    currentEditTask: null,
    showOnlyNotDoneEnabled: false,
    showOnlyDoneEnabled: false,
    dueDateSortMode: 0, // 0 - no sorting, 1 - ascending, 2 - descending
    prioritySortMode: 0, // 0 - no sorting, 1 - from higher to lower
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

  removeTask = taskId => {
    this.setState(function (oldState) {
      return {
        tasks: oldState.tasks.filter(function (task) {
          return task.id !== taskId
        })
      }
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

  buttonName = (buttonName) => buttonName;

  displayForm = formType => {
    const options = {
      add: () => (
        <div>
          <h3>Dodaj zadanie</h3>
          <InnerTaskPopup
            buttonName={this.buttonName('Dodaj')}
            addTask={this.addTask}
            toggleShowAddTaskPopup={this.toggleShowAddTaskPopup}
          />
        </div>
      ),
      edit: () => (
        <div>
          <h3>Edytuj zadanie</h3>
          <InnerTaskPopup
            buttonName={this.buttonName('Zmień')}
            task={this.state.tasks.find(task => task.id === this.state.currentEditTask)}
            updateTask={this.updateTask}
            toggleShowAddTaskPopup={this.toggleShowEditTaskPopup}
          />
        </div>
      )
    };
    return options[formType]()
  };

  enableSortingByDueDate = () => {
    this.setState(({ dueDateSortMode }) => ({ dueDateSortMode: (dueDateSortMode + 1) % 3 }))
  };

  enableSortingByPriority = () => {
    this.setState(({ prioritySortMode }) => ({ prioritySortMode: (prioritySortMode + 1) % 2 }))
  };

  tasksBeforeFilter = () => {
    return this.state.tasks;
  };

  render() {
    const tasks = this.state.tasks.filter(
      task => task.name.toLowerCase().includes(
        this.state.searchPhrase.toLowerCase()
      )
    );

    if (this.state.dueDateSortMode === 1) {
      tasks.sort(
        (a, b) => moment(a.dueDate).isBefore(b.dueDate)
          ? -1
          : moment(a.dueDate).isAfter(b.dueDate) ? 1 : 0
      )
    } else if (this.state.dueDateSortMode === 2) {
      tasks.sort(
        (a, b) => moment(a.dueDate).isBefore(b.dueDate)
          ? 1
          : moment(a.dueDate).isAfter(b.dueDate) ? -1 : 0
      )
    }

    if (this.state.prioritySortMode === 1) {
      tasks.sort(
        (a, b) => nameToValue(b.priority) - nameToValue(a.priority)
      )
    }

    return (
      <div className="App">
        {this.state.currentForm === null
          ? <div>
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
                {/* add task */}
                <button onClick={this.toggleShowAddTaskPopup}><strong>Dodaj<br/>zadanie</strong></button>

                {/* filters */}
                {this.state.showOnlyDoneEnabled === false
                  ? <button onClick={() => this.setState({
                     showOnlyDoneEnabled: true,
                      showOnlyNotDoneEnabled: false
                    })}>Pokaż<br/>zrobione</button>
                  : <button onClick={() => this.setState({
                      showOnlyNotDoneEnabled: true,
                      showOnlyDoneEnabled: false
                    })}>Pokaż<br/>niezrobione</button>
                }

                <button onClick={() => this.setState({
                  showOnlyNotDoneEnabled: false,
                  showOnlyDoneEnabled: false
                })}>Pokaż<br/>wszystkie
                </button>

                <TaskFilter
                  enableSortingByDueDate={this.enableSortingByDueDate}
                  dueDateSortMode={this.state.dueDateSortMode}
                  enableSortingByPriority={this.enableSortingByPriority}
                  prioritySortMode={this.state.prioritySortMode}
                />
              </nav>
            </div>
          : this.displayForm(this.state.currentForm)
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

import React, {Component} from 'react';
import './App.css';
import TaskList from "./components/TaskList/TaskList";
import AddTaskPopup from "./components/AddTaskPopup/AddTaskPopup";

class App extends Component {
  state = {
    tasks: [],
    taskTitleText: '',
    taskDescription: '',
    isFormVisible: false,
    currentForm: null, // 'add', 'edit'
    currentEditTask: null,
    showOnlyNotDoneEnabled: false,
    showOnlyDoneEnabled: false
  };

  addTask = (taskName, taskDescription) => {
    this.setState(
      ({tasks}) => ({
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
      edit: () => (<div>
          <h2>EditTaskPopup {this.state.currentEditTask}</h2>
          <AddTaskPopup
            addTask={this.addTask}
            toggleShowAddTaskPopup={this.toggleShowEditTaskPopup}
          />
        </div>
      )
    }

    return options[formType]()
  }

  render() {
    return (
      <div className="App">
        {/*<h1>TaskBanner</h1>*/}
        {/*<h1>TaskTitleText</h1>*/}
        {/*<h1>TaskTile</h1>*/}
        {/*<h1>TaskName</h1>*/}
        {/*<h1>TaskDone</h1>*/}
        {/*<TaskDone done={() => alert('It is Done')} />*/}
        {/*<h1>TaskFilters</h1>*/}
        {/*<h1>TaskSort</h1>*/}
        {/*<h1>TaskPriority</h1>*/}
        {/*<h1>TaskDueDay</h1>*/}
        {/*<TaskDueDay/>*/}
        {/*<h1>TaskClosePopup</h1>*/}
        {/*<h1>EditTaskPopup</h1>*/}
        {/*<h1>TaskPostpone</h1>*/}
        {/*<hr/>*/}

        {this.state.currentForm === null
          ?
          <div>
            <h2>TaskList</h2>
            < TaskList
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
            <button onClick={() => this.setState({showOnlyNotDoneEnabled: true})}>Pokaż niezrobione</button>
            <span>&nbsp;</span>
            <button onClick={() => this.setState({
              showOnlyNotDoneEnabled: false,
              showOnlyDoneEnabled: false
            })}>Pokaż wszystkie
            </button>
            <span>&nbsp;</span>
            <button onClick={() => this.setState({showOnlyDoneEnabled: true})}>Pokaż zrobione</button>

            {/* button - bottom right */}
            <h2>AddTask</h2>
            <button onClick={this.toggleShowAddTaskPopup}>Dodaj zadanie</button>
          </div> :

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

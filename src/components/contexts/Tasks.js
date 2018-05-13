import React, { Component } from 'react';
import {nameToValue} from "../_utils/priority";
import moment from "moment/moment";
import InnerTaskPopup from "../../components/InnerTaskPopup/InnerTaskPopup";

const TasksContext = React.createContext();
export const TasksConsumer = TasksContext.Consumer;

export class TasksProvider extends Component {

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

  buttonName = buttonName => {
    return buttonName
  };

  state = {
    tasks: [],
    isFormVisible: false,
    currentForm: null, // 'add', 'edit'
    currentEditTask: null,
    showOnlyNotDoneEnabled: false,
    showOnlyDoneEnabled: false,
    dueDateSortMode: 0, // 0 - no sorting, 1 - ascending, 2 - descending
    prioritySortMode: 0, // 0 - no sorting, 1 - from higher to lower
    searchPhrase: '',

    updateSearchPhrase: searchPhrase => this.setState({searchPhrase}),

    addTask: (name, description, dueDate, priority) => {
      this.setState(
        ({ tasks }) => ({
          tasks: tasks.concat({
            id: tasks.length === 0 ? 1 : Math.max(...tasks.map(task => task.id)) + 1,
            name: name,
            description: description,
            dueDate: dueDate,
            priority: priority,
            isDone: false
          })
        })
      )
    },

    updateTask: (id, name, description, dueDate, priority) => {
      this.setState({
        tasks: this.state.tasks.map(
          task => task.id !== id ? task : {
            ...task,
            name: name,
            description: description,
            dueDate: dueDate,
            priority: priority
          }
        )
      })
    },

    removeTask: taskId => {
      this.setState(function (oldState) {
        return {
          tasks: oldState.tasks.filter(function (task) {
            return task.id !== taskId
          })
        }
      })
    },

    toggleTaskDone: this.toggleTaskAttribute('isDone'),

    toggleShowAddTaskPopup: () => {
      this.setState({
        currentForm: this.state.currentForm !== 'add' ? 'add' : null
      })
    },

    toggleShowEditTaskPopup: (taskId = null) => {
      this.setState({
        currentEditTask: taskId,
        currentForm: this.state.currentForm !== 'edit' ? 'edit' : null
      })
    },

    displayForm: formType => {
      const options = {
        add: () => (
          <div>
            <h3>Dodaj zadanie</h3>
            <InnerTaskPopup
              buttonName={this.buttonName('Dodaj')}
            />
          </div>
        ),
        edit: () => (
          <div>
            <h3>Edytuj zadanie</h3>
            <InnerTaskPopup
              buttonName={this.buttonName('Zmień')}
              task={this.state.tasks.find(task => task.id === this.state.currentEditTask)}
            />
          </div>
        )
      };
      return options[formType]()
    },

    showOnlyDone : (status) => {
      this.setState({showOnlyDoneEnabled: status})
    },

    showOnlyNotDone : (status) => {
      this.setState({showOnlyNotDoneEnabled: status})
    },

    enableSortingByDueDate: () => {
      this.setState(({ dueDateSortMode }) => ({ dueDateSortMode: (dueDateSortMode + 1) % 3 }))
    },

    enableSortingByPriority: () => {
      this.setState(({ prioritySortMode }) => ({ prioritySortMode: (prioritySortMode + 1) % 2 }))
    },

    tasksBeforeFilter: () => {
      return this.state.tasks;
    }
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
      <TasksContext.Provider value={this.state}>
        {this.props.children}
      </TasksContext.Provider>
    )
  }

  componentDidMount() {
    const tasksAsTextInJSONFormat = localStorage.getItem('storedTasks');
    const tasksFromLocalStorage = JSON.parse(tasksAsTextInJSONFormat);
    this.setState({
      tasks: tasksFromLocalStorage || []
    })
  }

  componentDidUpdate() {
    const tasks = this.state.tasks;
    localStorage.setItem('storedTasks', JSON.stringify(tasks))
  }
}

export function withTasks(Component) {
  function TasksAwareComponent(props) {
    return (
      <TasksConsumer>
        { propsFromContext => (<Component {...props} {...propsFromContext} />) }
      </TasksConsumer>
    )
  }

  TasksAwareComponent.displayName = `TasksAware(${Component.displayName || Component.name || 'Component'}`;

  return TasksAwareComponent
}
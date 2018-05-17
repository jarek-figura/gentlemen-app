import React, { Component } from 'react';
import './Tasks.css'
import InnerTaskPopup from "../business/InnerTaskPopup/InnerTaskPopup";
import firebase from 'firebase';
import moment from 'moment';

const TasksContext = React.createContext();

export const TasksConsumer = TasksContext.Consumer;

export class TasksProvider extends Component {

  toggleTaskAttribute = attributeName => id => {
    const taskRef = this.tasksRef.child(id);
    taskRef.once('value', snapshot => {
      const task = snapshot.val();
      taskRef.update({
        [attributeName]: !task[attributeName]
      })
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
    isDoneSortMode: '0', // 0 - no filtering, 1 - show done, 2 - show not done
    dueDateSortMode: '0', // 0 - no sorting,  1 - ascending, 2 - descending
    prioritySortMode: '0', // 0 - no sorting, 1 - ascending, 2 - descending
    searchPhrase: '',

    clearFilters: () => {
      this.setState({
        isDoneSortMode: '0',
        dueDateSortMode: '0',
        prioritySortMode: '0'
      })
    },

    sortByIsDone: status => { this.setState({ isDoneSortMode: status}) },

    sortByDueDate: status => { this.setState({ dueDateSortMode: status}) },

    sortByPriority: status => { this.setState({ prioritySortMode: status }) },

    updateSearchPhrase: searchPhrase => this.setState({ searchPhrase }),

    addTask: (name, description, dueDate, priority) => {
      this.tasksRef.push({
        name: name,
        description: description,
        dueDate: moment(dueDate).valueOf(),
        priority: priority,
        isDone: false
      })
    },

    updateTask: (id, name, description, dueDate, priority) => {
      this.tasksRef.child(id).update({
        name: name,
        description: description,
        dueDate: moment(dueDate).valueOf(),
        priority: priority
      })
    },

    removeTask: id => {
      this.tasksRef.child(id).remove()
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
            <h3 className="add-edit-title">Dodaj zadanie</h3>
            <InnerTaskPopup
              buttonName={this.buttonName('Dodaj')}
            />
          </div>
        ),
        edit: () => (
          <div>
            <h3 className="add-edit-title">Edytuj zadanie</h3>
            <InnerTaskPopup
              buttonName={this.buttonName('Zmień')}
              task={this.state.tasks.find(task => task.id === this.state.currentEditTask)}
            />
          </div>
        )
      };
      return options[formType]()
    },

    tasksBeforeFilter: () => {
      return this.state.tasks;
    }
  };

  render() {
    return (
      <TasksContext.Provider value={this.state}>
        {this.props.children}
      </TasksContext.Provider>
    )
  }

  handleSnapshot = snapshot => {
    this.setState({
      tasks: Object.entries(snapshot.val() || {}).map(([id, other]) => ({ id, ...other}))
    })
  };

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(
      user => {
        if (user !== null) {
          this.tasksRef = firebase.database().ref(`/tasks/${user.uid}`);
          this.tasksRef.on('value', this.handleSnapshot)
        } else {
          if (this.tasksRef) this.tasksRef.off('value', this.handleSnapshot)
        }
      }
    )
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
    if (this.tasksRef) {
      this.tasksRef.off('value', this.handleSnapshot)
    }
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
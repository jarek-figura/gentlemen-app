import React, { Component } from 'react';
import './App.css';
import TaskDueDay from './components/TaskDueDay/TaskDueDay.js'
import TaskDone from "./components/TaskDone/TaskDone";
import TaskPostpone from "./components/TaskPostpone/TaskPostpone";
import TaskPriority from "./components/TaskPriority/TaskPriority";
import TaskFilter from "./components/TaskFilter/TaskFilter";
import TaskName from "./components/TaskName/TaskName";
import {BrowserRouter, Route, Link} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>TaskBanner</h1>
        <h1>TaskTitleText</h1>
        <h1>TaskTile</h1>
        <h1>TaskName</h1>
        <TaskName/>
        <h1>TaskDone</h1>
        <TaskDone done={() => alert('It is Done')} />
        <h1>TaskFilters</h1>
        <h1>AddTask</h1>
        <h1>TaskSort</h1>
        <h1>TaskFilter</h1>
        <h1>AddTaskPopup</h1>
        <h1>TaskPriority</h1>
        <TaskPriority/>
        <h1>TaskDueDay</h1>
        <TaskDueDay/>
        <h1>TaskDescription</h1>
        <h1>TaskAddButton</h1>
        <h1>TaskClosePopup</h1>
        <h1>EditTaskPopup</h1>
        <h1>TaskPostpone</h1>
        <TaskPostpone postpone={() => alert('Test')} />
        <h1>TaskFilter</h1>
        <TaskFilter/>
      </div>

    );
  }
}

export default App;

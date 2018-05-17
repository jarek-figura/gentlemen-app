import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {TasksProvider} from './components/contexts/Tasks';
import {UserProvider} from "./components/contexts/User";
import TaskApp from './components/business/TaskApp/TaskApp';
import setupFirebase from './setupFirebase';

setupFirebase();

const composeProviders = (children, ...providers) => providers.reduce(
  (result, Next) => <Next>{result}</Next>,
  children
);

ReactDOM.render(
  composeProviders(
    <TaskApp/>,
    UserProvider,
    TasksProvider
  ),
  document.getElementById('root')
);

registerServiceWorker();

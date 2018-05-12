import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {TasksProvider} from './components/contexts/Tasks';
import TaskApp from './components/TaskApp/TaskApp'

const composeProviders = (children, ...providers) => providers.reduce(
  (result, Next) => <Next>{result}</Next>,
  children
);

ReactDOM.render(
  composeProviders(
    <TaskApp/>,
    TasksProvider
  ),
  document.getElementById('root')
);
registerServiceWorker();

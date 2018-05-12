import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { TasksProvider } from './components/contexts/Tasks';

const composeProviders = (children, ...providers) => providers.reduce(
  (result, Next) => <Next>{result}</Next>,
  children
);

ReactDOM.render(
  composeProviders(
    TasksProvider
  ),
  document.getElementById('root')
);
registerServiceWorker();

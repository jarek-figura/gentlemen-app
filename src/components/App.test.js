import React from 'react';
import ReactDOM from 'react-dom';
import TaskApp from './business/TaskApp/TaskApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TaskApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

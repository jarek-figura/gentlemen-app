import React, { Component } from 'react'
import TaskContent from '../TaskContent/TaskContent';

class TaskSearch extends Component {
  constructor(){
    super();

  render() {
    return (
      <div>
        <input type="search"></input>
      </div>
    )
  }
}

export default TaskSearch
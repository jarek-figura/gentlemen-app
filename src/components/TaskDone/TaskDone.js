import React, {Component} from 'react';
import './TaskDone.css';

class TaskDone extends Component {


  render() {
    return (

      <button onClick={this.props.done}>Done</button>

    );
  }
}

export default TaskDone;
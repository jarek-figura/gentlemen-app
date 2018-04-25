import React, {Component} from 'react';
import './TaskPostpone.css';

class TaskPostpone extends Component {


  render() {
    return (

      <button onClick={this.props.postpone}>Postpone</button>

    );
  }
}

export default TaskPostpone;

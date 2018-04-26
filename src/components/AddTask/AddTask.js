import React, {Component} from 'react';
import './AddTask.css';

class AddTask extends Component {


  render() {
    return (

      <button onClick={this.props.addtask}>addtask</button>

    );
  }
}

export default AddTask;
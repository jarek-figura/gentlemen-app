import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class TaskDueDay extends Component {
  state = {
    startDate: this.props.startDate
  };

  handleChange = date => {
    this.props.handleDate(date);
    this.setState({
      startDate: date
    });
  };

  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        withPortal
        dateFormat="DD-MM-YYYY"
      />
    )
  }
}

export default TaskDueDay
import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TaskDueDay.css';
import moment from 'moment'

class TaskDueDay extends Component {
  state = {
    dueDate: moment(this.props.dueDate)
  };

  handleChange = date => {
    this.props.handleDate(date);
    this.setState({
      dueDate: date
    });
  };

  render() {
    return (
      <DatePicker className='date-picker'
        selected={this.state.dueDate}
        onChange={this.handleChange}
        withPortal
        dateFormat="DD-MM-YYYY"
      />
    )
  }
}

export default TaskDueDay
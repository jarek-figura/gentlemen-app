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
      <div>
        <p className='date-picker-header'>Data zakończenia</p>
        <DatePicker className='date-picker'
          minDate={moment()}
          selected={this.state.dueDate}
          onChange={this.handleChange}
          withPortal
          dateFormat="DD-MM-YYYY"
        />
      </div>
    )
  }
}

export default TaskDueDay
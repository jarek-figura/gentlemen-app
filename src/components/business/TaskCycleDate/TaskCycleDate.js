import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TaskCycleDate.css';
import moment from 'moment'

class TaskCycleDate extends Component {
  state = {
    cycleDate: moment(this.props.cycleDate)
  };

  handleChange = date => {
    this.props.handleCycleDate(date);
    this.setState({ cycleDate: date });
  };

  render() {
    return (
      <div className='cycle-date'>
        <DatePicker className='cycle-date-picker'
          minDate={moment()}
          maxDate={moment(this.props.dueDate)}
          selected={this.state.cycleDate}
          onChange={this.handleChange}
          withPortal
          dateFormat="DD-MM-YYYY"
        />
      </div>
    )
  }
}

export default TaskCycleDate
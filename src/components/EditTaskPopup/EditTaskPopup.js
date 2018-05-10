import React, {Component} from 'react';
import './EditTaskPopup.css'
import TaskPriority from "../TaskPriority/TaskPriority";
import moment from 'moment';
import TaskDueDay from "../TaskDueDay/TaskDueDay";

class EditTaskPopup extends Component {
  state = {
    formError: null
  };

  static getDerivedStateFromProps({ task }, prevState) {
    return {
      ...task
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.name.trim() === '') {
      this.setState({
        formError: new Error('Musisz podać tytuł zadania')
      });
      return;
    }

    this.props.updateTask(
      this.state.id,
      this.state.name,
      this.state.description,
      this.state.dueDate,
      this.state.priority || 'medium'
    );

    this.props.toggleShowAddTaskPopup();
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      formError: null
    })
  };

  handleDate = date => {
    this.setState({dueDate: date});
  };

  handlePriority = imp => {
    this.setState({priority: imp})
  };

  render() {
    return (
      <div className='add-task'>
        <button onClick={this.props.toggleShowAddTaskPopup}>&times;</button>
        <br/><br/>
        <form onSubmit={this.handleSubmit} id="form1">
          {this.state.formError && <p>{this.state.formError.message}</p>}
          <input name="name"
                 placeholder="Tytuł zadania"
                 value={this.state.name}
                 onChange={this.handleChange}
          />
          <br/><br/>
          <textarea rows="4"
                    cols="19"
                    name="description"
                    placeholder="Opis zadania"
                    value={this.state.description}
                    onChange={this.handleChange}
          />
        </form><br/>

        <TaskDueDay
          dueDate={this.state.dueDate || moment()}
          handleDate={this.handleDate}
        /><br/>

        <TaskPriority
          priority={this.state.priority || 'medium'}
          handlePriority={this.handlePriority}
        /><br/>
        <button form="form1">Zmień</button>
      </div>
    )
  }
}

export default EditTaskPopup;
import React, {Component} from 'react';
import moment from 'moment';
import './TaskContent.css';
import {withTasks} from "../../contexts/Tasks";
import TaskPriorityBar from "../TaskProgressBar/TaskPriorityBar";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'

class TaskContent extends Component {
  state = {
    showDesc: false
  };

  handleClick = () => {
    this.setState({
      showDesc: !this.state.showDesc
    });
  };

  handleToggleTaskDone =(id) => {
    this.props.toggleTaskDone(id);
    /*
      TODO: Dla taska cyklicznego `isCycleMode = true` dodać kolejnego do bazy za pomocą `addTask`
      TODO: w zależności od `taskCycleMode` oraz `cycleDate` bez przekraczania `dueDate`.
      TODO: Dane wziąć z aktualnego `task.id`. Czy w aktualnym tasku ustawić `isCycleMode = false`?
    */
    const task = this.props.task;
    // const momentCycleDate = moment(task.cycleDate).format('DD-MM-YYYY');
    // const momentDueDate = moment(task.dueDate).format('DD-MM-YYYY');


    if (task.isCycleMode) {
      switch(task.taskCycleMode) {
        case 'daily' :
          break;
        case 'weekly' :
          break;
        case 'monthly' :
          break;
        default:
          break;
      }
    }
  };

  render() {
    const task = this.props.task;
    const taskDueDate = new Date(task.dueDate);
    const today = new Date(Date.now());
    const timeDiff = taskDueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const whatToRender = () => {
      if (diffDays <= -1) {
        return <p className="wrn">Po terminie</p>
      } else if (diffDays === 0) {
        return <p className="wrnToday">Na dzisiaj</p>
      } else {
        return <TaskPriorityBar dueDate={task.dueDate}/>
      }
    };

    return (
      <div className={task.priority + ' ' + task.isDone + ' ' + (task.isCycleMode ? 'cycled-mode' : '') + ' task'}>

        <div className="checkbox">
          <input className='done-checkbox'
            title="Oznacz jako zrobione"
            type="checkbox"
            checked={task.isDone}
            onChange={() => this.handleToggleTaskDone(task.id)}
          />
        </div>

        <div className="titles">
          <strong>{task.name}</strong>
          <button
            className={"show-desc"}
            title={"Pokaż opis"}
            onClick={this.handleClick}
          ><FontAwesomeIcon icon={faSearch}/></button>
          <br/>

          {moment(task.dueDate).format('DD-MM-YYYY')}<br/>

          {this.state.showDesc ? <p className="description">{task.description}</p> : ''}

          {whatToRender()}
        </div>

        <div className="buttons">
          <button className='edit-button'
            title='Edytuj'
            onClick={() => this.props.toggleShowEditTaskPopup(task.id)}
          ><FontAwesomeIcon icon={faEdit}/>
          </button>
          <span>&nbsp;</span>
          <button className='delete-button'
            title="Usuń zadanie"
            onClick={() => this.props.removeTask(task.id)}
          ><FontAwesomeIcon icon={faTrashAlt}/></button>

        </div>

      </div>
    )
  }
}

export default withTasks(TaskContent);
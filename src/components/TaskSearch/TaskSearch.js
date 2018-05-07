import React, {Component} from 'react';

class TaskSearch extends Component {
  constructor(props){
    super(props);

    this.state = {
      filteredTasks: {
        tasks: <TaskSearch tasks={this.state.tasks}/>
      }
    };
  }

  filterTasks(e){
    const text = e.currentTarget.value;
    const filteredTasks = this.getFilteredTasksForText(text)
    this.setState({
      filteredTasks
    })
  }

  getFilteredTasksForText(text){
    return this.tasks.filter(task => task.toLowerCase().includes(text.toLowerCase()))
  }

  render(){
    const TaskList = ({ tasks }) => {
      if(tasks.length > 0) {
        return (
          <ul>
            {tasks.map(task => <li key={task}>{task}</li>)}
          </ul>
        );
      }
      return (
        <p>No result!</p>
      );
    };

    return(
      <div>
        <input onInput={this.filterTasks.bind(this)}/>
        <TaskList tasks={this.state.filteredTasks} />
      </div>
    );
  }
}



export default TaskSearch
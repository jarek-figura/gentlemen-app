import React, {Component} from 'react';

class TaskPriorities extends Component {
  state = {
    tasks:
      [
        {
          name: 'low',
          priority: 0
        },
        {
          name: 'high',
          priority: 2
        }
        ]
  }
   render(){
     this.state.tasks.map(task => (<p>{task.name} : {priorities[task.priority]}</p>));
     return(
      <div>
      </div>
    )
  }
}
const priorities = ['low', 'medium', 'high'];
//export const nameToValue = name => priorities.indexOf(name);
export default TaskPriorities;

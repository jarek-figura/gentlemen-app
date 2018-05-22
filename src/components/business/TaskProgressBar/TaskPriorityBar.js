import React from 'react'
import './TaskProgressBar.css'
import {Line} from 'rc-progress'
import {withTasks} from "../../contexts/Tasks";

class TaskPriorityBar extends React.Component {
  render () {

    const taskDueDate = this.props.dueDate
    const taskMaxDate = Math.max.apply(Math, this.props.tasks.map(function(x){return x.dueDate}))
    const timestamp = Date.now()
    let taskPriorityFactor = ((taskDueDate - timestamp) / (taskMaxDate - timestamp)) * 100

     const barColor = () => {
        if(taskPriorityFactor < 0){
         return "black"
        }else if(taskPriorityFactor <= 10){
          return "#ce0000"
        }else if(taskPriorityFactor <= 25){
          return "orange"
        }else if(taskPriorityFactor <= 50){
            return "yellow"
        }else if(taskPriorityFactor <= 75){
            return "#bada55"
        }else if(taskPriorityFactor <= 100){
            return "green"
        }
      }

    return(
      <div className="container">{
          <Line percent={taskPriorityFactor}
                strokeColor={barColor()}
                height="8"
                width="100%"
                trailColor="#F8F9FA"
                />
          }
      </div>
    )
  }
}

export default withTasks(TaskPriorityBar);

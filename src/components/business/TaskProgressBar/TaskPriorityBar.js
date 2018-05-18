import React from 'react'
import './TaskProgressBar.css'
import {Line} from 'rc-progress'
import {withTasks} from "../../contexts/Tasks";

class TaskPriorityBar extends React.Component {
  render () {

    const taskDueDate = this.props.dueDate
    const taskMaxDate = Math.max.apply(Math, this.props.tasks.map(function(x){return x.dueDate}))
    const timestamp = Date.now()
    let taskPriorityFactor = ((taskDueDate - timestamp) - (taskMaxDate - timestamp)) * 100

    // console.log(taskPriorityFactor)
    //
    // if(taskPriorityFactor > 100){
    //   taskPriorityFactor = 100
    // }

    console.log(taskPriorityFactor)

    const barColor = () => {
        if(taskPriorityFactor <= 0){
         return "black"
        }else if(taskPriorityFactor <= 10){
          return "red"
        }else if(taskPriorityFactor <= 25){
          return "orange"
        }else if(taskPriorityFactor <= 50){
            return "yellow"
        }else if(taskPriorityFactor <= 75){
            return "#bada55"
        }else if(taskPriorityFactor = 100){
          return "green"
        }
      }

    return(
      <div className="container">{

          (taskPriorityFactor < -0.1 ? <p className="wrn">zadanie przeterminowane</p>
              :

          <Line percent={taskPriorityFactor}
                strokeWidth="2"
                strokeColor={barColor()}
                height="10"
                width="100%"
                trailColor="white"
          />
          )}
      </div>
    )
  }
}

export default withTasks(TaskPriorityBar);

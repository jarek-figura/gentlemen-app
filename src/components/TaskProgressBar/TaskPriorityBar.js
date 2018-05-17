import React from 'react'
import './TaskProgressBar.css'
import {Line} from 'rc-progress'
import {withTasks} from "../contexts/Tasks";

class TaskPriorityBar extends React.Component {
  render () {
     const progress = "3"

    const taskDueDate = this.props.dueDate
    console.log(taskDueDate)

    //console.log(this.props.tasks)
    //this.props.tasks
    const taskMaxDate = Math.max.apply(Math, this.props.tasks.map(function(x){return x.dueDate}))

    console.log(taskMaxDate)

    const taskDueDateDifference = (taskDueDate / taskMaxDate)

    console.log(taskDueDateDifference)

    //zrobić zmienna "Data dzisiejsza" i od niej bazuj
      const timestamp = Date.now()

      console.log(timestamp);
    return(
      <div className="container">
        <Line percent={taskDueDateDifference}
              strokeWidth="2"
              strokeColor="#bada55"
              height="10"
              width="100%"
              trailColor="white"
              />
      </div>
    )
  }
}

export default withTasks(TaskPriorityBar);

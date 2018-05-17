import React from 'react'
import './TaskProgressBar.css'
import {Line} from 'rc-progress'

class TaskProgressBar extends React.Component {
  render () {
     const progress = "3"

    console.log(this.props.dueDate)

    const today = new Date()

    return(

      <div className="container">
        {"Pozostao dni: "}
        <Line percent={progress}
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

export default TaskProgressBar;

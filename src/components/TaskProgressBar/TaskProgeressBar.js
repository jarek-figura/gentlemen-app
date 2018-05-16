import React from 'react'
import './TaskProgressBar.css'
import {Line} from 'rc-progress'

class TaskProgressBar extends React.Component {
  render () {
    return(
      <div className="container">
        <Line percent="50"
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

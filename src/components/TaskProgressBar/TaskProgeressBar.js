import React from 'react'

class TaskProgeressBar extends React.Component {
  render () {
    return(
      <div>

        <div class={"ldBar"}
             style={"width:100%;height:60px"}
        data-stroke={"data:ldbar/res,gradient(0,1,#9df,#9fd,#df9,#fd9)"}
        data-path={"M10 20Q20 15 30 20Q40 25 50 20Q60 15 70 20Q80 25 90 20"}
      ></div>


      </div>
    )
  }
}

export default TaskProgeressBar;

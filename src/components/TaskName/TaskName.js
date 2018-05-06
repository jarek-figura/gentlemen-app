import React, {Component} from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import './TaskName.css'
import EditPopup from "../EditPopup/EditPopup";


class TaskName extends Component {
  render () {

    return(
        <BrowserRouter>
        <div className="TaskName-border">
            <Link to="/editpopup"><h1>Jakiś tam Task Title</h1></Link>
          <Route path="/editpopup" component={EditPopup}/>
        </div>
        </BrowserRouter>
    )

  }
}

export default TaskName
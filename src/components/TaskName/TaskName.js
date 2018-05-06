import React, {Component} from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import './TaskName.css'
import EditPopup from "../EditPopup/EditPopup";


class TaskName extends Component {
    render() {

        return (
            <BrowserRouter>
                <Link to="/editpopup">
                    <div className="TaskName-border">
                        <h1>Jakiś tam Task Title</h1>
                        <Route path="/editpopup" component={EditPopup}/>
                    </div>
                </Link>
            </BrowserRouter>
        )

    }
}

export default TaskName
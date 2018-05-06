import React, {Component} from 'react'
import './EditPopup.css'
import TaskPriority from "../TaskPriority/TaskPriority";
import TaskDueDay from '../TaskDueDay/TaskDueDay'
import TaskDone from "../TaskDone/TaskDone";
import TaskPostpone from "../TaskPostpone/TaskPostpone";
import {BrowserRouter, Route, Link} from 'react-router-dom'

class EditPopup extends Component {
    render() {
        return (
            <div className='EditPopup'>
                <h1>Task Title</h1>
                <h1>Task Prior</h1>
                <TaskPriority/>
                <h1>TaskDue Day</h1>
                <TaskDueDay/>
                <h1>Task Description</h1>
                <h1>Task Done</h1>
                <TaskDone/>
                <h1>Task Postpone</h1>
                <TaskPostpone/>
                <p><Link to="/">Home</Link></p>
            </div>

                    )
                    }
                    }

                    export default EditPopup;
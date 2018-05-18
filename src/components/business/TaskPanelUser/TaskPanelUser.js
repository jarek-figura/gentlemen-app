import React, {Component} from 'react'

import {withTasks} from "../../contexts/Tasks";
import {withUser} from "../../contexts/User";

class TaskPanelUser extends Component {
  render() {
    return (

      this.props.user !== null ?
        <p className="logged-in">
          Użytkownik: {this.props.user.email}
          <button onClick={this.props.signOut}>Wyloguj</button>
        </p>: ""
    )
  }
}



export default withUser(withTasks(TaskPanelUser));
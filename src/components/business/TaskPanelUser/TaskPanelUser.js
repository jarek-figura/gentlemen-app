import React, {Component} from 'react'
import './TaskPanelUser.css'
import {withTasks} from "../../contexts/Tasks";
import {withUser} from "../../contexts/User";

const navUserModeTable = [' hideuser', ''];

class TaskPanelUser extends Component {

  state = {
    // hideNavMode: 'hide',
    navUserIndex: 0
  };

    handleClick = () => {
    this.setState({
      navUserIndex: (this.state.navUserIndex + 1) %2,
      // hideNavMode: navModeTable[this.state.navIndex = (this.state.navIndex + 1) %2]
          });
  };

  render() {
    return (
      <nav className={`nav-panel ${navUserModeTable[this.state.navUserIndex]}`}>
        <h1>Task User Panel</h1>
        <div className={'photo'}>photo</div>
        <p>
          Użytkownik: {this.props.user.email}
          <button
            className={"show-userpanel"}
            title={"Panel"}
            onClick={this.handleClick}
          >Panel</button>
          <button onClick={this.props.signOut}>Wyloguj</button>
        </p>

      </nav>
    )
  }
}



export default withUser(withTasks(TaskPanelUser));
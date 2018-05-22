import React, {Component} from 'react'
import './TaskPanelUser.css'
import {withTasks} from "../../contexts/Tasks";
import {withUser} from "../../contexts/User";
import { ThemeConsumer } from '../../contexts/Theme'


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
        <ThemeConsumer>
          {
            ({theme, toggle}) => (
                <div style={theme.body} className={`nav-panel ${navUserModeTable[this.state.navUserIndex]}`}>


                  <h1>Task User Panel</h1>
                  <button className="changeThemeBtn" onClick={toggle}>Zmień motyw</button>
                  <div className={'photo'}>photo</div>
                  <p>
                    Użytkownik: {this.props.user.email}
                    <button
                      className={"show-userpanel"}
                      title={"Panel"}
                      onClick={this.handleClick}
                    >Panel
                    </button>
                    <button className={"signOutButton"} onClick={this.props.signOut}>Wyloguj</button>
                  </p>

                </div>

            )
          }
        </ThemeConsumer>
    )
  }
}



export default withUser(withTasks(TaskPanelUser));
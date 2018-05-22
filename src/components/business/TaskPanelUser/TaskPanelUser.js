import React, {Component} from 'react'
import './TaskPanelUser.css'
import {withTasks} from "../../contexts/Tasks";
import {withUser} from "../../contexts/User";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCog from '@fortawesome/fontawesome-free-solid/faCog'
import faDoorOpen from "@fortawesome/fontawesome-free-solid/faDoorOpen";
import faAngleDoubleUp from "@fortawesome/fontawesome-free-solid/faAngleDoubleUp";

const navUserModeTable = [' hideuser', ''];
const filtersButtonUserName = [<FontAwesomeIcon icon={faCog}/>, <FontAwesomeIcon icon={faAngleDoubleUp}/>]
const filtersTitle = ['Pokaż UserPanel', 'Zamknij UserPanel']

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
        <div>
          <button
            className={"show-userpanel"}
            title={filtersTitle[this.state.navUserIndex]}
            onClick={this.handleClick}
          >{filtersButtonUserName[this.state.navUserIndex]}</button>
          <span>{this.props.user.email}</span>
          <button
            className={"exit"}
            title="Wyjdź"
            onClick={this.props.signOut}>
            <FontAwesomeIcon icon={faDoorOpen}/></button>
          </div>

      </nav>
    )
  }
}



export default withUser(withTasks(TaskPanelUser));
import React, {Component} from 'react';
import './TaskPanelUser.css';
import {withTasks} from "../../contexts/Tasks";
import {withUser} from "../../contexts/User";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faCog, faAngleDoubleUp, faPaintBrush, faSignOutAlt} from '@fortawesome/fontawesome-free-solid';
import {ThemeConsumer} from '../../contexts/Theme';

const navUserModeTable = [' hideuser', ''];
const filtersButtonUserName = [<FontAwesomeIcon icon={faCog}/>, <FontAwesomeIcon icon={faAngleDoubleUp}/>];
const filtersTitle = ['Pokaż Panel Użytkownika', 'Schowaj Panel Użytkownika'];

class TaskPanelUser extends Component {

  state = {
    navUserIndex: 0
  };

  handleClick = () => {
    this.setState({
      navUserIndex: (this.state.navUserIndex + 1) % 2,
    });
  };

  render() {
    return (
      <ThemeConsumer>
        {
          ({theme, toggle}) => {
            document.body.classList = theme.bodyClass;
            return (
              <div style={theme.body} className={`nav-panel ${navUserModeTable[this.state.navUserIndex]}`}>
                <h2>Ustawienia</h2>
                <button
                  className="changeThemeBtn"
                  onClick={toggle}
                ><strong className='change-button'>Zmień motyw&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faPaintBrush}/></strong></button>
                <div>
                  <button
                    className="show-userpanel"
                    title={filtersTitle[this.state.navUserIndex]}
                    onClick={this.handleClick}
                  >{filtersButtonUserName[this.state.navUserIndex]}</button>
                  <span className="email">{this.props.user.email}</span>
                  <button
                    className="exit"
                    title="Wyloguj się"
                    onClick={this.props.signOut}>
                    <FontAwesomeIcon icon={faSignOutAlt}/></button>
                </div>
              </div>
            )
          }
        }
      </ThemeConsumer>
    )
  }
}

export default withUser(withTasks(TaskPanelUser));
import React, {Component} from 'react';
import './TaskPanelUser.css';
import {withTasks} from "../../contexts/Tasks";
import {withUser} from "../../contexts/User";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faCog, faAngleDoubleUp, faPaintBrush, faSignOutAlt} from '@fortawesome/fontawesome-free-solid';
import {ThemeConsumer} from '../../contexts/Theme';

const navUserModeTable = [' hideuser', ''];
const filtersButtonUserName = [<FontAwesomeIcon icon={faCog}/>, <FontAwesomeIcon icon={faAngleDoubleUp}/>];
const filtersTitle = ['Pokaż UserPanel', 'Zamknij UserPanel'];

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
                <h1>Ustawienia</h1>
                <button
                  className="changeThemeBtn"
                  onClick={toggle}
                >Zmień motyw&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faPaintBrush}/></button>
                <div>
                  <button
                    className="show-userpanel"
                    title={filtersTitle[this.state.navUserIndex]}
                    onClick={this.handleClick}
                  >{filtersButtonUserName[this.state.navUserIndex]}</button>
                  <span>{this.props.user.email}</span>
                  <button
                    className="exit"
                    title="Wyjdź"
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
import React, { Component } from 'react'
import { withUser } from '../../contexts/User';
import './SignForm.css';

class SignUpForm extends Component {

  state = {
    username: '',
    password: '',
    error: null
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.signUp(this.state.username, this.state.password).catch(
      error => this.setState({ error })
    )
  };

  render() {
    return (
      <div>
        <h2>Zakładanie konta</h2>
        {this.state.error && <p>{this.state.error.message}</p>}
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.username}
            name="username"
            type="text"
            placeholder="e-mail"
            onChange={this.handleChange}

          />
          <input
            value={this.state.password}
            name="password"
            type="password"
            placeholder="hasło"
            onChange={this.handleChange}
          />
          <button className="sign-button">Załóż konto</button>
        </form>
      </div>
    )
  }
}

export default withUser(SignUpForm)
import React, { Component } from 'react'
import { withUser } from '../../contexts/User';
import './SignForm.css';

class SignInForm extends Component {

  state = {
    username: '',
    password: '',
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.signIn(this.state.username, this.state.password)
  };

  render() {
    return (
      <div>
        <h2>Logowanie</h2>
        {this.props.signInError && <p>{this.props.signInError.message}</p>}
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
          <button className="sign-button">Zaloguj się</button>
        </form>
      </div>
    )
  }
}

export default withUser(SignInForm)
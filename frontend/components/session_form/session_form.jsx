import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state)
      .then(this.props.closeModal);
  }

  handleInput(type) {
    return e => {
      this.setState({
        [type]: e.target.value
      });
    }
  }

  render() {

    // Errors
    let errors;
    if (this.props.errors) {
      errors = (
        <div className="modal__errors-container">
          {this.props.errors.map((error, idx) => {
              return (
                <p 
                  key={idx}
                  className="modal__errors-single">
                  {error}
                </p>
              )
            })
          }
        </div>
      );
    }

    // Sign up/Log in message
    let existingAccountMessage;
    if (this.props.formType === 'Log in') {
      existingAccountMessage = "Don't have an account?";
    } else {
      existingAccountMessage = "Already have an Airbnb account?";
    }

    return (
      <div className="modal__form-container">
        <h2 >{this.props.formType}</h2>
        <a 
          href="#" 
          className="modal__btn-close"
          onClick={this.props.closeModal} >
          x
        </a>
        <br/>
        {errors}
        <br/>
        <form 
          onSubmit={this.handleSubmit} 
          className="ui form modal__form">
          <input 
            type="text" 
            value={this.state.username} 
            placeholder="Username"
            onChange={this.handleInput('username')} 
            className="modal__input-text input__text"/>
          <br/>
          <input 
            type="text" 
            value={this.state.password}
            placeholder="Password"
            onChange={this.handleInput('password')} 
            className="modal__input-text input__text"/>
          <br /><br />
          <input 
            type="submit" 
            value={this.props.formType} 
            className="ui button basic modal__btn--submit modal__btn" />
        </form>
        {existingAccountMessage}
        {this.props.otherForm}
      </div>
    );
  }
}

export default SessionForm;
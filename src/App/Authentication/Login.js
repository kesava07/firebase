import React from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase/Firebase';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errors: [],
    loading: false,
    visible: true
  }
  handleOnchange = event => this.setState({ [event.target.name]: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true })
      let errors = [];
      let error;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              if (user && user.emailVerified) {
                this.props.history.push('/')
              } else {
                error = { message: "Please verify Account details" }
                this.setState({ errors: errors.concat(error) })
              }
            } else {
              this.props.history.push('/login')
            }
          })
        })
        .catch(err => {
          this.setState({ errors: this.state.errors.concat(err), loading: false })
        })
    }
  }

  isFormValid = ({ email, password }) => {
    let errors = [];
    let error
    if (email.length > 0 && password.length > 0) {
      return true
    } else {
      error = { message: "Please enter valid email and password" }
      this.setState({ errors: errors.concat(error) })
    }
  }

  displayErrors = errors => errors.map((error, i) => <p key={i} className="text-center">{error.message}</p>);

  handleInputErrors = (errors, InputType) => {
    return errors.some(error =>
      error.message.toLowerCase().includes(InputType)
    ) ?
      "input-error" : "";
  }
  passwordType = () => {
    this.setState({visible:!this.state.visible})
  }

  render() {
    const { email, password, errors, visible } = this.state;
    return (
      <div className="container register">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="card mt-8">
              <div className="card-header">
                <h1 className="text-center text-primary">Login</h1>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-2"></div>
                  <div className="col-md-8">
                    <form onSubmit={this.handleSubmit}>

                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className={`input-group-text ${this.handleInputErrors(errors, "email")}`}>
                            <i className="fa fa-envelope" aria-hidden="true"></i></span>
                        </div>
                        <input
                          type="email"
                          className={`form-control ${this.handleInputErrors(errors, "email")}`}
                          placeholder="Email"
                          name="email"
                          onChange={this.handleOnchange}
                          value={email}
                        />

                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend" onClick={this.passwordType}>
                          <span className={`input-group-text ${this.handleInputErrors(errors, "password")}`}>
                            <i className={`${visible ? "fa fa-eye-slash" : "fa fa-eye"}`} aria-hidden="true"></i></span>
                        </div>
                        <input
                          type={`${visible ? "password" : "text"}`}
                          className={`form-control ${this.handleInputErrors(errors, "password")}`}
                          placeholder="Password"
                          autoComplete="true"
                          name="password"
                          onChange={this.handleOnchange}
                          value={password}
                        />

                      </div>
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <Link to="forgetpassword">forgetpassword?</Link>
                  </div>
                </div>
              </div>
              {errors.length > 0 && (
                <div className="card card-body m-3 p-1 Error">
                  <h4 className="text-center">Error</h4>
                  {this.displayErrors(errors)}
                </div>
              )
              }

              <div className="card-footer">
                <p className="text-center">Not have an account.?<Link to="/register">Register</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
export default Login;
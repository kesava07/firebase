import React, { Component } from 'react';
import firebase from '../Firebase/Firebase';
import {Link} from 'react-router-dom'

export default class Forgetpassword extends Component {
    state = {
        email: '',
        errors: [],
    }
    forgetPassword = event => {
        event.preventDefault()
        this.setState({ errors: [] })
        if(this.isFormValid(this.state)){
            firebase
            .auth()
            .sendPasswordResetEmail(this.state.email)
            .then(() => {
                window.alert("An email has been sent to reset your password")
                setTimeout(() => {
                    this.props.history.push('/login')
                })
            })
            .catch(err => {
                this.setState({ errors: this.state.errors.concat(err), loading: false })
            })
        }
      
    }
    isFormValid = ({ email }) => {
        let errors = [];
        let error
        if (email.length > 0) {
          return true
        } else {
          error = { message: "Please enter valid user email" }
          this.setState({ errors: errors.concat(error) })
        }
      }
    handleOnchange = event => this.setState({ [event.target.name]: event.target.value });
    handleInputErrors = (errors, InputType) => {
        return errors.some(error =>
            error.message.toLowerCase().includes(InputType)
        ) ?
            "input-error" : "";
    }
    displayErrors = errors => errors.map((error, i) => <p key={i} className="text-center">{error.message}</p>);
    render() {
        const { errors } = this.state;
        return (
            <div className="container register">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="card mt-8">
                            <div className="card-header">
                                <h2 className="text-center text-primary">Forget password</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-8">
                                        <form onSubmit={this.forgetPassword}>

                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                <span className={`input-group-text ${this.handleInputErrors(errors, "user")}`}>
                                                        <i className="fa fa-envelope" aria-hidden="true"></i></span>
                                                </div>
                                                <input
                                                    type="email"
                                                    className={`form-control ${this.handleInputErrors(errors, "user")}`}
                                                    placeholder="Email"
                                                    name="email"
                                                    onChange={this.handleOnchange}
                                                    value={this.state.email}
                                                />

                                            </div>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>
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
                            <p className="text-center">Back to <Link to="/login">Login..?</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

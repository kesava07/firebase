import React from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase/Firebase';
import md5 from 'md5'

class Register extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        usersRef: firebase.database().ref("users"),
        errors: [],
        loading: false,
        visible: true,
    }
    handleOnchange = event => this.setState({ [event.target.name]: event.target.value });

    handleregister = event => {
        event.preventDefault()
        if (this.isFormVaild()) {
            this.setState({ errors: [], loading: true })
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    console.log(createdUser);
                    createdUser.user.updateProfile({
                        displayName: this.state.username,
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                    })
                        .then(() => {
                            this.saveUserData(createdUser).then(() => console.log("user saved sucsessfully"))
                        })
                })
                .then(() => {
                    firebase.auth().currentUser.sendEmailVerification()
                        .then(alt => {
                            window.alert("verification link has sent to your mail please verify the account")
                            this.props.history.push('/login')
                        })
                }).catch(err => {
                    this.setState({ errors: this.state.errors.concat(err), loading: false })
                })
        }

    }

    isFormVaild = () => {
        let errors = [];
        let error;
        if (this.isFormEmpty(this.state)) {
            error = { message: "Please fill all the details" }
            this.setState({ errors: errors.concat(error) })
            return false
        }
        else if (!this.passwordMatch(this.state)) {
            error = { message: "Password is Invalid" }
            this.setState({ errors: errors.concat(error) })
            return false
        }
        else {
            return true
        }
    }

    isFormEmpty = ({ username, email, password, confirmPassword }) => {
        return !username.length || !email.length || !password.length || !confirmPassword.length
    }
    passwordMatch = ({ password, confirmPassword }) => {
        if (password.length < 6 || confirmPassword.length < 6) {
            return false
        }
        else if (password !== confirmPassword) {
            return false
        }
        else {
            return true
        }
    }

    saveUserData = (createdUser) => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        })
    };
    displayErrors = errors => errors.map((error, i) => <p key={i} className="text-center">{error.message}</p>);

    handleInputErrors = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName)) ? "input-error" : "";
    }

    passwordType = () => {
        this.setState({visible:!this.state.visible})
      }
      passwordType2 = () => {
        this.setState({visible:!this.state.visible})
      }

    render() {
        const { username, email, password, confirmPassword, errors,visible } = this.state;
        return (
            <div className="container register">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="card mt-8">
                            <div className="card-header">
                                <h1 className="text-center text-primary">Register</h1>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-8">
                                        <form onSubmit={this.handleregister}>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text ">
                                                        <i className="fa fa-user-circle-o" aria-hidden="true"></i></span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Username"
                                                    name="username"
                                                    onChange={this.handleOnchange}
                                                    value={username}
                                                />

                                            </div>

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
                                                <div className="input-group-prepend"  onClick={this.passwordType}>
                                                    <span className={`input-group-text ${this.handleInputErrors(errors, "password")}`}>
                                                        <i className={`${visible ? "fa fa-eye-slash" : "fa fa-eye"}`}  aria-hidden="true"></i></span>
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
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend" onClick={this.passwordType2}>
                                                    <span className={`input-group-text ${this.handleInputErrors(errors, "password")}`}>
                                                        <i className={`${visible ? "fa fa-eye-slash" : "fa fa-eye"}`}  aria-hidden="true"></i></span>
                                                </div>
                                                <input
                                                    type={`${visible ? "password" : "text"}`}
                                                    className={`form-control ${this.handleInputErrors(errors, "password")}`}
                                                    autoComplete="true"
                                                    placeholder="Confirm password"
                                                    name="confirmPassword"
                                                    onChange={this.handleOnchange}
                                                    value={confirmPassword}
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
                                <p className="text-center">Already have an account.?<Link to="login">Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
export default Register;
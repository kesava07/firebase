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
        mobileNumber: '',
        usersRef: firebase.database().ref("users"),
        errors: []
    }
    handleOnchange = event => this.setState({ [event.target.name]: event.target.value });

    handleregister = event => {
        event.preventDefault();
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(createdUser => {
                createdUser.user.updateProfile({
                    displayName: this.state.username,
                    photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                })
                    .then(() => {
                        this.saveuser(createdUser).then(()=>{
                            console.log("user saved succesfully")
                        })
                    })
                    .catch(err => {
                        this.setState({ errors: this.state.errors.concat(err) })
                    })
            })
            .catch(err => {
                this.setState({ errors: this.state.errors.concat(err) })
            })
    }

    saveuser = userData => {
        return this.state.usersRef.child(userData.user.uid).set({
            name: userData.user.displayName,
            avatar: userData.user.photoURL,
            number: userData.user.phoneNumber
        })
    }

    render() {
        const { username, email, password, confirmPassword, mobileNumber } = this.state;
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
                                                    <span className="input-group-text"><i className="fa fa-user-circle-o" aria-hidden="true"></i></span>
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
                                                    <span className="input-group-text"><i className="fa fa-phone" aria-hidden="true"></i></span>
                                                </div>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="mobile number"
                                                    autoComplete="true"
                                                    name="mobileNumber"
                                                    onChange={this.handleOnchange}
                                                    value={mobileNumber}
                                                />

                                            </div>

                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                                                </div>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Email"
                                                    name="email"
                                                    onChange={this.handleOnchange}
                                                    value={email}
                                                />

                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-eye-slash" aria-hidden="true"></i></span>
                                                </div>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    autoComplete="true"
                                                    name="password"
                                                    onChange={this.handleOnchange}
                                                    value={password}
                                                />

                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-eye-slash" aria-hidden="true"></i></span>
                                                </div>
                                                <input
                                                    type="password"
                                                    className="form-control"
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
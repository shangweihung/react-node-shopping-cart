import React, { Component } from 'react';
import { login } from '../repository';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            password: ''
        }

    }

    submitLogin = event =>{
        event.preventDefault();
        login(this.state).then(token => window.location='/')
                         .catch(err => alert(err));
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render() {
        return (
            <div className="container mt-5">
                <div className="cols-sm-8 col-sm-offset-2">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h2>Login</h2>
                        </div>
                        <div className="panel-body">
                            <form onSubmit={this.submitLogin}>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input type="text" className="form-control" name="name" onChange={this.handleInputChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input type="password" className="form-control" name="password"  onChange={this.handleInputChange}/>
                                </div>
                                <button type="submit" className="btn btn-outline-dark">LogIn</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default Login;
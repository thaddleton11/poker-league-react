import React, {Component} from "react";
import {Grid, Row, Col} from "react-bootstrap"
import {Redirect} from "react-router";
import NotificationSystem from 'react-notification-system';
import Card from "../components/Card/Card";
import FormInputs from "../components/FormInputs/FormInputs";
import Button from '../components/CustomButton/CustomButton';
import {AddUserValidation} from '../validation/AddUserValidation';
import api from '../services/Api';
import Alert from "react-bootstrap/lib/Alert";
import pokerCookie from "../services/Cookies";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            pass: "",
            error: "",
            success: false
        }

    }

    addUserChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    };
    loginUserHandler = (async (event) => {
        event.preventDefault();

        let inputs = {
            username: this.state.username,
            pass: this.state.pass
        };

        try {
            let response = await api.post('auth', inputs);
            console.log(response);
            if (response.data === true) {
                console.log("login success");
                // window.location.pathname('/admin/dashboard');
                this.setState({success: true});
            } else {
                console.log('shit')
              throw "Deda";

            }
        } catch (e) {
            console.log('fail');
            this.setState({['error']: 'Your login attempt failed'});
            console.log(this.state.error)
            console.log(e)
        }



    });


    render() {
        if(this.state.success === true) {
            return (
                <Redirect to={'/admin/dashboard'}/>
            )
        }
        return (
            <div className="content">
                <h1>Login</h1>
                <Grid>
                    <Row>
                        <Col sm={12}>
                            {this.state.error &&
                                <Alert bsStyle='danger'>
                                    {this.state.error}ss
                                </Alert>
                            }


                            <Card
                                title="Welcome to the poker score keeper"
                                category="Login using the provided login details."
                                content={
                                    <form onSubmit={this.loginUserHandler}>
                                        <FormInputs
                                            ncols={["col-sm-6", "col-sm-6"]}
                                            properties={[
                                                {
                                                    label: "Username",
                                                    name: "username",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Username",
                                                    required: true,
                                                    onChange: this.addUserChangeHandler
                                                },
                                                {
                                                    label: "Password",
                                                    name: "pass",
                                                    type: "password",
                                                    bsClass: "form-control",
                                                    placeholder: "Password",
                                                    required: true,
                                                    onChange: this.addUserChangeHandler
                                                }
                                            ]}
                                        />
                                        <Button bsStyle="primary" pullRight type="submit">Come in</Button>
                                    </form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}


export default Login;
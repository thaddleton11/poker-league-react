import React, {Component} from "react";
import {Grid, Row, Col} from "react-bootstrap"
import NotificationSystem from 'react-notification-system';
import Card from "../../components/Card/Card";
import FormInputs from "../../components/FormInputs/FormInputs";
import Button from '../../components/CustomButton/CustomButton';
import {AddUserValidation} from '../../validation/AddUserValidation';
import api from '../../services/Api';
import Alert from "react-bootstrap/lib/Alert";


class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "",
            last: "",
            success: false,
            error: false
        }
    }

    addUserChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});

        // reset
        this.setState({
            success: false,
            error: false
        });
    };
    addUserSubmitHandler = async (event) => {
        event.preventDefault();

        let inputs = new AddUserValidation(
            this.state.first,
            this.state.last
        );

        //alert("You are submitting " + inputs.last);
        //this.setState({err: true});

        // input
        try {
            let response = await api.post('dashboard/add-player', inputs);
console.log(response);
            if(response.success) {
                this.setState({
                    success: `${this.state.first} ${this.state.last} has been added as a player`
                });
            } else {
                this.setState({
                    err: 'Unable to add player'
                })
            }
        } catch (e) {
            console.log(e);
        }
    };


    render() {
        return (
            <div className="content">
                <h1>Add new player</h1>
                <Grid>
                    <Row>
                        <Col sm={12}>
                            {this.state.err &&
                                <Alert bsStyle='danger' dismissable>
                                    {this.state.err}
                                </Alert>
                            }
                            {this.state.success &&
                                <Alert bsStyle='success' dismissable={true}>
                                    {this.state.success}
                                </Alert>
                            }

                            <Card
                                title="Add Player"
                                category="Add a new player to the system"
                                content={
                                    <form onSubmit={this.addUserSubmitHandler}>
                                        <FormInputs
                                            ncols={["col-sm-6", "col-sm-6"]}
                                            properties={[
                                                {
                                                    label: "First Name",
                                                    name: "first",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Bob",
                                                    required: true,
                                                    onChange: this.addUserChangeHandler
                                                },
                                                {
                                                    label: "Last Name",
                                                    name: "last",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Notsogood",
                                                    required: true,
                                                    onChange: this.addUserChangeHandler
                                                }
                                            ]}
                                        />
                                        <Button bsStyle="primary" pullRight type="submit">Add User</Button>
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


export default AddUser;
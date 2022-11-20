import React, {Component} from "react";

import {Grid, Row, Col, Table} from "react-bootstrap"
import Card from "../../components/Card/Card";
import {Button} from "react-bootstrap";
import api from "../../services/Api";
import FormInputs from "../../components/FormInputs/FormInputs";
import Alert from "react-bootstrap/lib/Alert";


class EditPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            playerID: props.match.params.id,
            first: '',
            last: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        // let players = await api.get('/dashboard/players');
        api.get('/dashboard/player/' + this.state.playerID).then(
            (result) => {
                this.setState({
                    first: result.first_name,
                    last: result.last_name
                });
            }
        )
        /*console.log(players);
        if( players instanceof Object ) {
            this.setState({
                players: players
            });
        } else {
            this.setState({
                error: "Players not found"
            });
        }*/
    }


    editUserSubmitHandler = (event) => {
        event.preventDefault();

        let inputs = {
            first: this.state.first,
            last: this.state.last
        };

        api.post('dashboard/player/update/' + this.state.playerID, inputs)
            .then((result) => {
                console.log('success');
                console.log(result);
                if (result.success) {
                    this.setState({
                        success: `${this.state.first} ${this.state.last} has been updated`
                    });
                } else {
                    this.setState({
                        error: result.error
                    });
                }
            },
                (error) => {
                console.log(error)
                    this.setState({
                        error: "There was a problem"
                    })
                });
    };


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
console.log(target.name);
        this.setState({
            [name]: value
        });
    }


    render() {
        const {error, players} = this.state;
        return (
            <div className={"content"}>
                <Grid>
                    <Row>
                        <Col sm={12}>
                            {this.state.error &&
                            <Alert bsStyle='danger'>
                                {this.state.error}
                            </Alert>
                            }
                            <Card
                                title={"Edit Player"}
                                category={"Change a players details"}
                                content={
                                    <form onSubmit={this.editUserSubmitHandler}>
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
                                                    value: this.state.first,
                                                    onChange: this.handleInputChange
                                                },
                                                {
                                                    label: "Last Name",
                                                    name: "last",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Notsogood",
                                                    required: true,
                                                    value: this.state.last,
                                                    onChange: this.handleInputChange
                                                }
                                            ]}
                                        />
                                        <Button bsStyle="primary" className={"float-right"} type="submit">Edit User</Button>
                                    </form>
                                }

                            />

                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default EditPlayer;
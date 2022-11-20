import React, {Component} from "react";

import {
    Grid, Row, Col, Table, Form, FormGroup, FormControl, Alert,
    Modal, ModalBody, ModalHeader, ModalDialog, ModalFooter, ModalTitle
} from "react-bootstrap"
import Card from "../../components/Card/Card";
import ButtonGroup from "react-bootstrap/lib/ButtonGroup";
import Button from "react-bootstrap/lib/Button";

import api from "../../services/Api";
import FormInputs from "../../components/FormInputs/FormInputs";
import {Games} from "../../components/Poker/Games";
import {AddNewResults} from "../../components/Poker/AddNewResults";


class ViewGames extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            games: [],
            result: false,
            showAddResults: false,
        }

        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleAddResultsModal = this.handleAddResultsModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    /*async componentDidMount() {
        api.get('dashboard/games')
            .then((result) => {
                    console.log('success');
                    console.log(result);
                    if (result instanceof Object) {
                        this.setState({
                            games: result
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
                        error: "There was a problem",
                    })
                })
    }*/


    handleSelectChange(event) {
        let val = event.target.value;
        console.log(val);

        api.get('dashboard/game/' + val)
            .then((result) => {
                    console.log(result);
                    if (result instanceof Object) {
                        this.setState({
                            result: result
                        });
                    } else {
                        throw "Not object";
                    }
                },
                (error) => {
                    this.setState({
                        error: "There was a problem"
                    });
                })
            .catch((reason) => {
                console.log(reason);
            });

        console.log(this.state.result)
    }


    handleAddResultsModal() {
        console.log('add results');
        this.setState({
            showAddResults: true
        });

    }

    modalAddResults() {
        const game = this.state.result;
        return (
            <Card
                title={'Add results to ' + game.display_name}
                content={
                    <AddNewResults gameTitle={game.display_name} gameUuid={game.uuid}/>
                }
            />
        )
    }


    handleClose() {
        this.setState({
            showAddResults: false
        });
    }


    render() {
        const {error, games, result, showAddResults} = this.state;

        let gameDisplay =
            <div>
                <Grid className={'mb-3'}>
                    <Row>
                        <Col>
                            <Button variant={'warning'} onClick={this.handleAddResultsModal}><i className={'fa fa-trophy'} /> Add results</Button>
                        </Col>
                    </Row>
                </Grid>
                <dl className={'row'}>
                    <dt className={'col-sm-3'}>Game title</dt>
                    <dd className={'col-sm-9'}>{result.display_name}</dd>
                    <dt className={'col-sm-3'}>Scheduled on/for</dt>
                    <dd className={'col-sm-9'}>{result.scheduled}</dd>
                    <dt className={'col-sm-3'}>Created On</dt>
                    <dd className={'col-sm-9'}>{result.created}</dd>
                </dl>
                {result.league ?
                    <div>
                        <h4>League - {result.league.title}</h4>
                        <dl className={'row'}>
                            <dt className={'col-sm-3'}>Start Date</dt>
                            <dd className={'col-sm-9'}>{result.league.start}</dd>
                            <dt className={'col-sm-3'}>End Date</dt>
                            <dd className={'col-sm-9'}>{result.league.end}</dd>
                            <dt className={'col-sm-3'}>Games Scheduled</dt>
                            <dd className={'col-sm-9'}>{result.league.games_count}</dd>
                        </dl>
                    </div>
                    :
                    <Alert bsStyle={'warning'}>Does not belong to a league</Alert>
                }


            </div>;

        return (
            <div className={"content"}>
                <Grid>
                    <Row className={'space'}>
                        <Col sm={12}>
                            <Button bsStyle={'primary'} href={'add-game'}>New</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>

                            {this.state.error &&
                            <Alert bsStyle={'danger'}>
                                {this.state.error}
                            </Alert>
                            }

                            <Card
                                title={"View Games"}
                                category={"View all games available"}
                                content={
                                    <Form>
                                        <Games changeHandler={this.handleSelectChange} />
                                    </Form>
                                }

                            />

                            {result &&
                            <Card
                                content={gameDisplay}
                            />
                            }

                            {showAddResults &&
                                this.modalAddResults()
                            }
                        </Col>
                    </Row>
                </Grid>
            </div>

        );
    }
}

export default ViewGames;
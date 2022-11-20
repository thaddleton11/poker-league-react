import React, {Component} from "react";

import {Grid, Row, Col, Table, Form, FormGroup, FormControl, Alert} from "react-bootstrap"
import Card from "../../components/Card/Card";
import ButtonGroup from "react-bootstrap/lib/ButtonGroup";
import Button from "react-bootstrap/lib/Button";

import api from "../../services/Api";
import FormInputs from "../../components/FormInputs/FormInputs";
import {Games} from "../../components/Poker/Games";
import {LeaguesDropdown} from "../../components/Poker/LeaguesDropdown";



class AddGames extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errors: {},
            success: null,
            name: '',
            date: '',
            league: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.autoFillDateTimeHandler = this.autoFillDateTimeHandler.bind(this);
    }


    handleChange(event) {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({
            [nam]: val,
            success: null
        });
    }


    autoFillDateTimeHandler = () => {
        if(!this.state.date) return;

        let d = new Date(this.state.date);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let now = `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;

        this.setState({
            name: now
        });
    };



    addGameSubmit = (event) => {
        event.preventDefault();

        this.setState({
            success: null,
            error: null,
            errors: null
        });

        let inputs = {
            name: this.state.name,
            date: this.state.date,
            league: this.state.league
        };

        api.post('dashboard/game/add', inputs)
            .then((result) => {
                    console.log('success');
                    console.log(result);
                    if (result.success) {
                        this.setState({
                            success: `Games has been added`,
                            name: null,
                            date: null,
                            league: null
                        });
                    } else {
                        this.setState({
                            error: result.error_message,
                            errors: result.errors ?? {}
                        });
                    }
                },
                (error) => {
                    console.log(error)
                    this.setState({
                        error: "There was a problem"
                    })
                })
    };



    render() {
        const {error, name, date, errors} = this.state;
        return (
          <div className={"content"}>
              <Grid>
                  <Row>
                      <Col sm={12}>

                          <Card
                              title={"Add Game"}
                              category={"Add a new game to the system"}
                              content={
                                  <Form onSubmit={this.addGameSubmit}>
                                      {this.state.success &&
                                      <Alert bsStyle={'success'}>
                                          {this.state.success}
                                      </Alert>
                                      }
                                      {error &&
                                      <Alert bsStyle={'danger'}>
                                          Some error(s) were found: {error}
                                      </Alert>
                                      }
                                      <LeaguesDropdown onChange={this.handleChange} required={true}/>
                                      <FormGroup>
                                          <label>Date of game</label>

                                          <FormControl type={'datetime-local'} name={'date'} required={true} value={date} onChange={this.handleChange}/>

                                          {/*{errors.date &&
                                            errors.date.map(e => (
                                                <ul>
                                                    <li>{e}</li>
                                                </ul>
                                            ))}*/}
                                      </FormGroup>
                                      <FormGroup>
                                          <Button bsStyle={"info"} size='sm' onClick={this.autoFillDateTimeHandler}>
                                              <i className={'fa fa-magic'}></i> Fill date as name?
                                          </Button>
                                      </FormGroup>
                                      <FormGroup>
                                          <label>Game name</label>
                                          <FormControl name={'name'} required={true} value={name} onChange={this.handleChange}/>
                                          {/*{errors.name &&
                                          errors.name.map(e => (
                                              <ul>
                                                  <li>{e}</li>
                                              </ul>
                                          ))}*/}
                                      </FormGroup>
                                      <FormGroup className={'float-right'}>
                                          <Button type={'submit'} bsStyle="primary">
                                              Submit
                                          </Button>
                                          <Button href={'games'} bsStyle="default">
                                              Back
                                          </Button>
                                      </FormGroup>
                                  </Form>
                              }

                          />

                      </Col>
                  </Row>
              </Grid>
          </div>
        );
    }
}

export default AddGames;
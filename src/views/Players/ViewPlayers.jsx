import React, {Component} from "react";

import {Grid, Row, Col, Table} from "react-bootstrap"
import Card from "../../components/Card/Card";
import ButtonGroup from "react-bootstrap/lib/ButtonGroup";
import Button from "react-bootstrap/lib/Button";
import api from "../../services/Api";



class ViewPlayers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            players: []
        }
    }

    async componentDidMount() {
        let players = await api.get('/dashboard/players');
        console.log(players);
        if( players instanceof Object ) {
            this.setState({
                players: players
            });
        } else {
            this.setState({
                error: "Players not found"
            });
        }
    }


    render() {
        const {error, players} = this.state;
        return (
          <div className={"content"}>
              <Grid>
                  <Row>
                      <Col sm={12}>

                          <Card
                              title={"View All Players"}
                              category={"View all players available"}
                              content={
                                  <Table striped>
                                      <thead>
                                      <tr>
                                          <th>Name</th>
                                          <th>Total Points</th>
                                          <th>Last Played</th>
                                          <th>Action</th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                      {players.map(player => (
                                          <tr key={player.uuid}>
                                              <td>{player.full_name}</td>
                                              <td>-</td>
                                              <td>-</td>
                                              <td>
                                                  <ButtonGroup>
                                                      <Button href={"/admin/player/edit/"+player.uuid} title={"Edit Player"}>
                                                          <i className={"fa fa-pencil"}/>
                                                      </Button>
                                                      <Button href={"/admin/player/stats/"+player.uuid} title={"Edit Player"}>
                                                          <i className={"fa fa-line-chart"}/>
                                                      </Button>
                                                  </ButtonGroup>
                                              </td>

                                          </tr>
                                      ))}
                                      </tbody>
                                  </Table>
                              }

                          />

                      </Col>
                  </Row>
              </Grid>
          </div>
        );
    }
}

export default ViewPlayers;
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
            player: [],
            playerID: props.match.params.id
        };
    }

    async componentDidMount() {
        let player = await api.get('/dashboard/player/'+this.state.playerID);
        console.log(player);
        if( player instanceof Object ) {
            this.setState({
                player: player
            });
        } else {
            this.setState({
                error: "Player not found"
            });
        }
    }


    render() {
        const {error, player} = this.state;
        return (
          <div className={"content"}>
              <Grid>
                  <Row>
                      <Col sm={12}>

                          <Card
                              title={"Information of " + player.full_name}
                              category={"Rundown of a player's stats"}
                              content={
                                  <div className={'row'}>
                                      <div className={'col'}><strong>First name: </strong>{player.first_name}</div>
                                      <div className={'col'}><strong>Last name: </strong>{player.last_name}</div>
                                  </div>
                              }
                          />

                      </Col>
                  </Row>
                  <Row>
                      <Col>

                      </Col>
                  </Row>
              </Grid>
          </div>
        );
    }
}

export default ViewPlayers;
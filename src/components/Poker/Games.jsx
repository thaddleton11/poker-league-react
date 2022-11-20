import React, {Component} from "react";
import {FormGroup} from "react-bootstrap";
import api from "../../services/Api";


export class Games extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: []
        }
    }

    componentDidMount() {
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

    }


    render() {
        const {games} = this.state;
        return (
            <FormGroup controlId="exampleForm.ControlSelect1">
                <label>Choose a game</label>
                <select className={'form-control'} name={'games'} onChange={this.props.changeHandler}>
                    <option selected={true} disabled={true}>-</option>
                    {games.map(game => (
                        <option key={game.uuid} value={game.uuid}>
                            {game.display_name} - {game.scheduled}
                        </option>
                    ))}
                </select>
            </FormGroup>
        )
    }
}
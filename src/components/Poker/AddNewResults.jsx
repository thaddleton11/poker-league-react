import React, {Component} from "react";
import {FormGroup, Form, Button} from "react-bootstrap";
import api from "../../services/Api";


export class AddNewResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            player: null,
            position: null,
            prize: null,
        }

        this.changeHandler = this.changeHandler.bind(this);
    }

    componentDidMount() {
        api.get('dashboard/players')
            .then((result) => {
                    console.log('success');
                    console.log(result);
                    if (result instanceof Object) {
                        this.setState({
                            players: result
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


    submitNewResults(event) {
        event.preventDefault();
        console.log('submitnewresult')
    }

    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    };


    render() {
        const {players} = this.state;
        return (
            <Form onSubmit={this.submitNewResults}>
                <FormGroup controlId="addNewResults">
                    <label>Choose a player</label>
                    <select className={'form-control'} name={'player'} onChange={this.changeHandler} required>
                        <option selected={true} disabled={true}>-</option>
                        {players.map(player => (
                            <option key={player.uuid} value={player.uuid}>
                                {player.full_name}
                            </option>
                        ))}
                    </select>


                </FormGroup>
                <FormGroup>
                    <label>Position <small>Points will be automatically calculated</small></label>
                    <input className={'form-control'} type={'number'} name={'position'} min={'1'} max={25} required={true} />
                </FormGroup>
                <FormGroup>
                    <label>Prize <small>Optional</small></label>
                    <input className={'form-control'} type={'tel'} name={'prize'} pattern={'^\\d{1,3}\\.?[0-9]?[0-9]?$'} placeholder={'100.00'}/>
                </FormGroup>
                <Button type={'submit'}>Add</Button>
            </Form>
        )
    }
}
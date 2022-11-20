import React, {Component} from "react";
import {FormGroup} from "react-bootstrap";
import api from "../../services/Api";


export class LeaguesDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leagues: []
        }
    }

    componentDidMount() {
        api.get('dashboard/leagues')
            .then((result) => {
                    console.log('success');
                    console.log(result);
                    if (result instanceof Object) {
                        this.setState({
                            leagues: result
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
        const {leagues} = this.state;
        return (
            <FormGroup controlId="exampleForm.ControlSelect1">
                <label>Choose a league</label>
                <select className={'form-control'} name={'league'} onChange={this.props.onChange} required={this.props.required}>
                    <option selected={true} disabled={true}>-</option>
                    {leagues.map(league => (
                        <option key={league.uuid} value={league.uuid}>
                            {league.title}
                        </option>
                    ))}
                </select>
            </FormGroup>
        )
    }
}
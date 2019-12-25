import React, { Component } from 'react';
import { Container, Button, Dropdown, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux';
import { getLift, updateLift } from '../actions/liftActions';
import { PropTypes } from 'prop-types';
import { Line } from 'react-chartjs-2';

class TrackLift extends Component {
    componentDidMount() {
        this.props.getLift(window.location.pathname.slice(7));
    }

    getLablesArray(lifts) {
        if (lifts.workout === undefined || lifts.workout.length === 0) {
        } else {
            var labelArray = [];
            lifts.workout.map((x, i) => {
                return labelArray = labelArray.concat("Lift " + (i + 1))
            })
            return labelArray
        }
    }

    getVolArray(lifts) {
        if (lifts.workout === undefined || lifts.workout.length === 0) {
        } else {
            var volArray = [];
            var volTotal = 0;
            lifts.workout.map((x, i) => {
                volTotal = 0;
                for (var j = 0; j < lifts.workout[i].lift.length; j++) {
                    volTotal += lifts.workout[i].lift[j][0] * lifts.workout[i].lift[j][1]
                }
                volArray = volArray.concat(volTotal)
                return volArray
            })
            return volArray
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onClick = (id, selectedLift, e) => {
        const updatedLift = {
            name: this.props.lift.lifts.name,
            goal: this.props.lift.lifts.goal,
            workout: { lift: [[this.state.reps, this.state.weight]] },
            liftID: { selectedLift }
        }
        //Update lift with updatelift action
        this.props.updateLift(id, updatedLift);
    }

    state = { selectedLift: 0 }
    selectLift = (e) => {
        this.setState({ selectedLift: e })
    }

    newLift = (id, e) => {
        this.selectLift(this.props.lift.lifts.workout.length)
        const updatedLift = {
            name: this.props.lift.lifts.name,
            goal: this.props.lift.lifts.goal,
            workout: { lift: [], date: Date.now }
        }

        //Update lift with updatelift action
        this.props.updateLift(id, updatedLift);

    }

    render() {
        const { lifts } = this.props.lift;

        if (!lifts.workout) {
            return <div />
        }
        return (
            <Container>
                <h1>{lifts.name}</h1>
                <div className="chart">
                    <Line
                        data={{
                            labels: this.getLablesArray(lifts),
                            datasets: [
                                {
                                    type: "line",
                                    label: 'Total Weight Moved',
                                    data: this.getVolArray(lifts),
                                    backgroundColor: '#cf6766'
                                }

                            ]
                        }}
                        options={{
                        }}
                    />
                </div>
                <Dropdown>
                    <Dropdown.Toggle className="dropdown-lift" id="dropdown-basic">{"Lift:  " + (this.state.selectedLift + 1)}</Dropdown.Toggle>
                    <Dropdown.Menu>

                        {lifts.workout.map(({ _id, date }, i) => (
                            <Dropdown.Item href={"#action-" + i} onClick={() => this.selectLift(i)}>{"Lift " + (i + 1)}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <table id="example" className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Set</th>
                            <th>Reps</th>
                            <th>Weight</th>
                            <th></th>
                        </tr>
                    </thead>
                    {(() => {
                        if (lifts.workout[this.state.selectedLift] === undefined) {
                            return (
                                <div></div>
                            )
                        } else {
                            return (
                                <tbody>
                                    {lifts.workout[this.state.selectedLift].lift.map((e, i) => (
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{lifts.workout[this.state.selectedLift].lift[i][0]}</td>
                                            <td>{lifts.workout[this.state.selectedLift].lift[i][1]}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td>{lifts.workout[this.state.selectedLift].lift.length + 1}</td>
                                        <td><FormControl type="text" name="reps" id="lift-name" placeholder="Reps" onChange={this.onChange} /></td>
                                        <td><FormControl type="text" name="weight" id="lift-goal" placeholder="Weight" onChange={this.onChange} /></td>
                                        <td><Button className="add-rw-btn"
                                            onClick={this.onClick.bind(this, window.location.pathname.slice(7), this.state.selectedLift)}>Add</Button></td>
                                    </tr>
                                </tbody>
                            )
                        }
                    })()}

                </table>

                <Button className="new-lift-btn"
                    href={window.location.href.split('#')[0] + "#action-" + lifts.workout.length}
                    onClick={this.newLift.bind(this, window.location.pathname.slice(7))}>New Lift</Button>
            </Container >
        )

    }

}

TrackLift.propTypes = {
    getLift: PropTypes.func.isRequired,
    lift: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    lift: state.lift
})


export default connect(mapStateToProps, { updateLift, getLift })(TrackLift);
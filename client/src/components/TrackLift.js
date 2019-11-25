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
        if (lifts.workout.lift === undefined || lifts.workout.lift.length == 0) {
        } else {
            var labelArray = [];
            lifts.workout.map((x, i) => {
                if (labelArray.includes(lifts.workout.lift[i][2].slice(5, 10))) {
                } else {
                    labelArray = labelArray.concat(lifts.workout[i][2].slice(5, 10))
                }
            })
            return labelArray
        }
    }

    getVolArray(lifts) {
        if (lifts.workout.lift === undefined || lifts.workout.lift.length == 0) {
        } else {
            var volArray = [];
            var date;
            var volTotal = 0;
            var prevDate = lifts.workout[0][2].slice(5, 10)
            lifts.workout.map((x, i) => {
                date = lifts.workout[i][2].slice(5, 10);
                if (date == prevDate || i == lifts.workout.length) {
                    volTotal += parseInt(lifts.workout[i][1] * lifts.workout[i][0])
                } else {
                    volArray = volArray.concat(volTotal)
                    prevDate = lifts.workout[i][2].slice(5, 10)
                    volTotal = parseInt(lifts.workout[i][0]);
                }
            })
            volArray = volArray.concat(volTotal)
            return volArray
        }
    }

    getRepsArray(lifts) {
        if (lifts.workout.lift === undefined || lifts.workout.lift.length == 0) {
        } else {
            var repArray = [];
            var date;
            var repsTotal = 0;
            var prevDate = lifts.workout[0][2].slice(5, 10)
            lifts.workout.map((x, i) => {
                date = lifts.workout[i][2].slice(5, 10);
                if (date == prevDate || i == lifts.workout.length) {
                    repsTotal += parseInt(lifts.workout[i][0])
                } else {
                    repArray = repArray.concat(repsTotal)
                    prevDate = lifts.workout[i][2].slice(5, 10)
                    repsTotal = parseInt(lifts.workout[i][0]);
                }
            })
            repArray = repArray.concat(repsTotal)
            return repArray
        }
    }

    getWeightArray(lifts) {
        if (lifts.workout.lift === undefined || lifts.workout.lift.length == 0) {
        } else {
            var weightArray = [];
            var date;
            var weightTotal = 0;
            var prevDate = lifts.workout[0][2].slice(5, 10)
            lifts.workout.map((x, i) => {
                date = lifts.workout[i][2].slice(5, 10);
                if (date == prevDate || i == lifts.workout.length) {
                    weightTotal += parseInt(lifts.workout[i][1])
                } else {
                    weightArray = weightArray.concat(weightTotal)
                    prevDate = lifts.workout[i][2].slice(5, 10)
                    weightTotal = parseInt(lifts.workout[i][1]);
                }
            })
            weightArray = weightArray.concat(weightTotal)
            return weightArray
        }
    }

    updateVolume() {
        var weightMoved = 0;
        var totalWeightMoved = 0
        this.props.lift.lifts.workout.map((x, i) => (
            weightMoved = parseInt(this.props.lift.lifts.workout[i][1]) * parseInt(this.props.lift.lifts.workout[i][0]),
            totalWeightMoved += weightMoved
        ))
        totalWeightMoved += this.state.reps * this.state.weight
        return totalWeightMoved
    }

    updateMax() {
        var weightArray = []
        this.props.lift.lifts.workout.map((x, i) => (
            weightArray = weightArray.concat(this.props.lift.lifts.workout[i][1])
        ))
        var prevMax = Math.max.apply(Math, weightArray)
        var posMax = this.state.weight

        if (posMax > prevMax) {
            return posMax
        } else {
            return prevMax
        }
    }

    updateReps() {
        var repArray = [];
        var repTotal = 0;
        this.props.lift.lifts.workout.map((x, i) => (
            repArray = repArray.concat(this.props.lift.lifts.workout[i][0])
        ))
        for (var i = 0; i < repArray.length; i++) {
            repTotal += parseInt(repArray[i])
        }
        repTotal += parseInt(this.state.reps)
        return (repTotal)
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onClick = (id, e) => {
        console.log('onclick')
        const updatedLift = {
            name: this.props.lift.lifts.name,
            goal: this.props.lift.lifts.goal,
            volume: this.updateVolume(),
            max: this.updateMax(),
            reps: this.updateReps(),
            workout: { lift: [[this.state.reps, this.state.weight]] }
        }

        //Update lift with updatelift action
        this.props.updateLift(id, updatedLift);
    }

    newLift = (id, e) => {
        console.log('newlift')
        const updatedLift = {
            name: this.props.lift.lifts.name,
            goal: this.props.lift.lifts.goal,
            // volume: this.updateVolume(),
            // max: this.updateMax(),
            // reps: this.updateReps(),
            workout: { lift: [], date: Date.now }
        }
        console.log(updatedLift)

        //Update lift with updatelift action
        this.props.updateLift(id, updatedLift);
    }

    render() {
        const { lifts } = this.props.lift;

        if (!lifts.workout) {
            return <div />
        }
        console.log(lifts)
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
                                    backgroundColor: 'rgba(153, 102, 255, 0.2)'
                                }

                            ]
                        }}
                        options={{
                        }}
                    />
                </div>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">Lifts</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {lifts.workout.map(({ _id, name, goal, date, reps, max }, i) => (
                            <Dropdown.Item href={"#/action-" + _id}>{"Lift " + (i + 1) + "  " + date}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <table id="example" class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Set</th>
                            <th>Reps</th>
                            <th>Weight</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>{lifts.workout.length + 1}</td>
                            <td><FormControl type="text" name="reps" id="lift-name" placeholder="Reps" style={{}} onChange={this.onChange} /></td>
                            <td><FormControl type="text" name="weight" id="lift-goal" placeholder="Weight" style={{}} onChange={this.onChange} /></td>
                            <td><Button color="danger" style={{}} onClick={this.onClick.bind(this, window.location.pathname.slice(7))}>Add</Button></td>
                        </tr>
                    </tbody>
                </table>
                <Button color="dark" style={{}} onClick={this.newLift.bind(this, window.location.pathname.slice(7))}>New Lift</Button>
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
import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getLift } from '../actions/liftActions';
import { PropTypes } from 'prop-types';
import { Line, Bar } from 'react-chartjs-2';

class TrackLift extends Component {
    componentDidMount() {
        this.props.getLift(window.location.pathname.slice(7));
    }

    getLablesArray(lifts) {
        if (lifts.workout === undefined || lifts.workout.length == 0) {
        } else {
            var labelArray = [];
            lifts.workout.map((x, i) => {
                if (labelArray.includes(lifts.workout[i][2].slice(5, 10))) {
                } else {
                    labelArray = labelArray.concat(lifts.workout[i][2].slice(5, 10))
                }
            })
            return labelArray
        }
    }

    getVolArray(lifts) {
        if (lifts.workout === undefined || lifts.workout.length == 0) {
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
        if (lifts.workout === undefined || lifts.workout.length == 0) {
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
        if (lifts.workout === undefined || lifts.workout.length == 0) {
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

    render() {
        const { lifts } = this.props.lift;

        if (!lifts.workout) {
            return <div />
        }
        return (
            <Container>
                <h1>Name: {lifts.name}</h1>
                <h4>Reps: {lifts.reps}</h4>
                <h4>Max: {lifts.max}</h4>
                <h4>Volume: {lifts.volume}</h4>
                <h4>Goal: {lifts.goal}</h4>
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

                <table id="example" class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Set</th>
                            <th>Reps</th>
                            <th>Weight</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lifts.workout.map((x, i) => (
                            <tr>
                                <td>Set {i + 1}</td>
                                <td>{lifts.workout[i][0]}</td>
                                <td>{lifts.workout[i][1]}</td>
                                <td>{lifts.workout[i][2].slice(5, 10)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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


export default connect(mapStateToProps, { getLift })(TrackLift);
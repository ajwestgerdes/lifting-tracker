import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { updateLift, getLift } from '../actions/liftActions';

class AppModal extends Component {
    state = {
        modal: false,
        name: ''
    }

    componentDidMount() {
        this.props.getLift(window.location.pathname.slice(7));
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

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (id, e) => {
        console.log(id)
        e.preventDefault();
        const updatedLift = {
            name: this.props.lift.lifts.name,
            goal: this.props.lift.lifts.goal,
            max: this.updateMax(),
            reps: this.updateReps(),
            workout: [[this.state.reps, this.state.weight, this.props.lift.lifts.date]]
        }

        //Update lift with updatelift action
        this.props.updateLift(id, updatedLift);

        //close modal
        this.toggle();
    }

    render() {
        return (
            <div>
                {/* <Button color="dark" style={{ marginBottom: '2rem' }} onClick={this.toggle}>Add Lift</Button> */}
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add A Lift</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit.bind(this, window.location.pathname.slice(7))}>
                            <FormGroup>
                                <Input type="text" name="reps" id="lift-name" placeholder="Reps" style={{ marginTop: '2rem' }} onChange={this.onChange} />
                                <Input type="text" name="weight" id="lift-goal" placeholder="Weight" style={{ marginTop: '2rem' }} onChange={this.onChange} />
                                <Button color="dark" style={{ marginTop: '2rem' }}>Add Lift</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    lift: state.lift
})

export default connect(mapStateToProps, { updateLift, getLift })(AppModal);
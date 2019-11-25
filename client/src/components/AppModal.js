import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addLift } from '../actions/liftActions';

class AppModal extends Component {
    state = {
        modal: false,
        name: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        var d = new Date();
        const newLift = {
            name: this.state.name,
            goal: this.state.goal,
            volume: 0,
            reps: 0,
            max: 0,
            workout: { lift: [], date: d }
        }

        // Add lift with addlift action
        this.props.addLift(newLift);

        //close modal
        this.toggle();
    }

    render() {
        return (
            <div className="modal-container">
                <Button className="add-btn" onClick={this.toggle}>Create Lift</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Create A Lift</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Input type="text" name="name" id="lift-name" placeholder="Lift Name" style={{ marginTop: '2rem' }} onChange={this.onChange} />
                                <Input type="text" name="goal" id="lift-goal" placeholder="Lift Goal Weight" style={{ marginTop: '2rem' }} onChange={this.onChange} />
                                <Button color="dark">Create Lift</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div >
        )
    }

}

const mapStateToProps = state => ({
    lift: state.lift
})

export default connect(mapStateToProps, { addLift })(AppModal);
import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, UncontrolledCollapse } from 'reactstrap';
import AppModal from './AppModal';
import { connect } from 'react-redux';
import { getLifts, deleteLift } from '../actions/liftActions';
import { PropTypes } from 'prop-types';

class AppList extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    onMouseEnter() {
        this.setState({ collapse: true });
    }

    onMouseLeave() {
        this.setState({ collapse: false });
    }


    componentDidMount() {
        this.props.getLifts();
    }

    onClickDelete = (id) => {
        this.props.deleteLift(id);

    }

    render() {
        const { lifts } = this.props.lift;
        return (
            <Container>
                <ListGroup>
                    <div class="row">
                        {lifts.map(({ _id, name, goal, date, reps, max }, i) => (
                            <div class="col-sm-4 lift-card">
                                <div class="card text-center">
                                    <a href={'lifts/' + _id} class="">
                                        <div class="card-header" id={"lift-info" + i} onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.toggle}>{name}

                                        </div>
                                        <UncontrolledCollapse toggler={"#lift-info" + i}>
                                            <div class="card-body">
                                                <p class="card-text">Max Weight: {max}</p>
                                                <p class="card-text">Total Reps: {reps}</p>
                                                <p class="card-text">Goal Weight: {goal}</p>
                                                <a href='/' onClick={this.onClickDelete.bind(this, _id)} class="btn btn-danger btn-sm float-right">X</a>
                                            </div>
                                            <div class="card-footer text-muted">Last Updated {date.slice(5, 10)}</div>
                                        </UncontrolledCollapse>
                                    </a>
                                </div>

                            </div>

                        ))}
                        <AppModal />
                    </div>
                </ListGroup>
            </Container >
        )
    }
}

AppList.propTypes = {
    getLifts: PropTypes.func.isRequired,
    lift: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    lift: state.lift
})


export default connect(mapStateToProps, { getLifts, deleteLift })(AppList);
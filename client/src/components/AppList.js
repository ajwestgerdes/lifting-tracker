import React, { Component } from 'react';
import { Container, ListGroup } from 'reactstrap';
import AppModal from './AppModal';
import { connect } from 'react-redux';
import { getLifts } from '../actions/liftActions';
import { PropTypes } from 'prop-types';

class AppList extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    componentDidMount() {
        this.props.getLifts();
    }

    render() {
        const { lifts } = this.props.lift;
        return (
            <Container>
                <ListGroup>
                    <div className="row">
                        {lifts.map(({ _id, name, goal, date, reps, max }, i) => (
                            <div className="col-sm-4 lift-card">
                                <div className="card text-center">
                                    <a href={'lifts/' + _id}>
                                        <div className="card-header" id={"lift-info" + i}>{name}
                                            <div className="text-muted">Last Updated {date.slice(5, 10)}</div>
                                        </div>
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


export default connect(mapStateToProps, { getLifts })(AppList);
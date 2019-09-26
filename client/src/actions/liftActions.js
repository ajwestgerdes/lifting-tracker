//Where the client talks to the server to get, add, and delete lifts based on the type and payload that is sent

import axios from 'axios';
import { GET_LIFTS, ADD_LIFT, DELETE_LIFT, LIFTS_LOADING, UPDATE_LIFT, GET_LIFT } from './types';

export const getLifts = () => dispatch => {
    dispatch(setLiftsLoading());
    axios.get('/lifts')
        .then(res => dispatch({
            type: GET_LIFTS,
            payload: res.data
        }))
};


export const getLift = (id) => dispatch => {
    dispatch(setLiftsLoading());
    axios.get(`/lifts/${id}`)
        .then(res => dispatch({
            type: GET_LIFT,
            payload: res.data
        }))
};

export const deleteLift = (id) => dispatch => {
    axios.delete(`/lifts/delete/${id}`)
        .then(res => dispatch({
            type: DELETE_LIFT,
            payload: id
        }))
};

export const updateLift = (id, lift) => dispatch => {
    axios.post(`/lifts/update/${id}`, lift)
        .then(res => dispatch({
            type: UPDATE_LIFT,
            payload: res.data
        }))
};

export const addLift = lift => dispatch => {
    axios.post('/lifts/add', lift)
        .then(res => dispatch({
            type: ADD_LIFT,
            payload: res.data
        })
        )
};



export const setLiftsLoading = () => {
    return {
        type: LIFTS_LOADING
    };
};
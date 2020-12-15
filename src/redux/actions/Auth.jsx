import Axios from 'axios'
import { popUp } from './PopUp';
import SetAuthToken from './setAuthToken'

const configJson = {
    headers: {
        "Content-type": "application/json",
    },
};
const configForm = (dispatch) => ({
    headers: {
        "Content-type": "multipart/form-data",
    },
    onUploadProgress: (ProgressEvent) => {
        let percentage = Math.round(
            (ProgressEvent.loaded * 100) / ProgressEvent.total
        );
        // dispatch(showProgress(percentage));
    },
});
const baseUrl = 'http://localhost:5000/api/v1'

export const loadData = () => async dispatch => {
    if (localStorage.getItem("token")) {
        SetAuthToken(localStorage.getItem("token"));
    }

    try {
        const result = await Axios.get(`${baseUrl}/load`, configJson);
        dispatch({
            type: "LOAD_DATA",
            payload: result.data.data.user,
        });
    } catch (error) {
        dispatch({
            type: "AUTH_ERROR",
        });
    }
}
export const userLogin = (data) => async dispatch => {
    try {
        const results = await Axios.post(`${baseUrl}/login`, data, configJson)
        dispatch({
            type: "LOGIN",
            payload: results.data.data.user
        })
        dispatch(loadData())
    } catch (error) {
        console.log(error);
    }
}
export const userRegister = (data) => async dispatch => {
    try {
        const results = await Axios.post(`${baseUrl}/register`, data, configJson)
        dispatch({
            type: "REGISTER",
            payload: results.data.data.user
        })
        dispatch(loadData())
    } catch (error) {
        console.log(error);
    }
}
export const editProfile = (data) => async dispatch => {
    try {
        const result = await Axios.patch(`${baseUrl}/user`, data, configForm(dispatch))
        dispatch(popUp(result.data.message))
        console.log(result.data.message);
    } catch (error) {
        console.log(error);
    }
}
export const getUser = (data) => async dispatch => {
    try {
        console.log(data);
        const result = await Axios.get(`${baseUrl}/user/${data}`, configJson)
        dispatch({
            type: "GET_USER",
            payload: result.data.data.user
        })
    } catch (error) {
        dispatch(popUp(JSON.stringify(error)))
    }
}
export const logout = () => dispatch => {
    dispatch({
        type: "AUTH_ERROR",
    })
}

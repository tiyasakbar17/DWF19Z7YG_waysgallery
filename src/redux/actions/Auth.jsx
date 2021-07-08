import Axios from 'axios'
import { closeLoading, showLoading, showPopUp, showProgress } from './PopUp';
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
        dispatch(showProgress(percentage));
    },
});
const baseUrl = 'https://tiyas-ways-gallery.herokuapp.com/api/v1'

export const loadData = () => async dispatch => {

    dispatch(showLoading())
    if (localStorage.getItem("token")) {
        SetAuthToken(localStorage.getItem("token"));
    }

    try {
        const result = await Axios.get(`${baseUrl}/load`, configJson);
        dispatch({
            type: "LOAD_DATA",
            payload: result.data.data.user,
        });
        dispatch(closeLoading())
    } catch (error) {
        dispatch(closeLoading())
        dispatch({
            type: "AUTH_ERROR",
        });
    }
}
export const userLogin = (data) => async dispatch => {
    try {
        dispatch(showLoading())
        const results = await Axios.post(`${baseUrl}/login`, data, configJson)
        dispatch({
            type: "LOGIN",
            payload: results.data.data.user
        })
        dispatch(loadData())
    } catch (error) {
        dispatch(closeLoading())
        dispatch(showPopUp(error.response.data.message))
    }
}
export const userRegister = (data) => async dispatch => {
    try {
        dispatch(showLoading())
        const results = await Axios.post(`${baseUrl}/register`, data, configJson)
        dispatch({
            type: "REGISTER",
            payload: results.data.data.user
        })
        dispatch(loadData())
    } catch (error) {
        dispatch(closeLoading())
        dispatch(showPopUp(error.response.data.message))
    }
}
export const editProfile = (data) => async dispatch => {
    try {
        const result = await Axios.patch(`${baseUrl}/user`, data, configForm(dispatch))
        dispatch(loadData())
        dispatch(showPopUp(result.data.message))
    } catch (error) {
        dispatch(showPopUp(error.response.data.message))
    }
}
export const addArts = (data) => async dispatch => {
    try {
        const result = await Axios.post(`${baseUrl}/art`, data, configForm(dispatch))
        dispatch(showPopUp(result.data.message))
    } catch (error) {
        dispatch(showPopUp(error.response.data.message))
    }
}
export const getUser = (data) => async dispatch => {
    try {
        dispatch(showLoading())
        const result = await Axios.get(`${baseUrl}/user/${data}`, configJson)
        if (result) {
            dispatch({
                type: "GET_USER",
                payload: result.data.data.user
            })
        }
        dispatch(closeLoading())
    } catch (error) {
        dispatch(closeLoading())
        dispatch(showPopUp(error.response.data.message))
    }
}
export const follow = (data) => async dispatch => {
    try {
        dispatch(showLoading())
        const result = await Axios.post(`${baseUrl}/follow/${data}`)
        dispatch(closeLoading())
        dispatch(loadData())
        dispatch(showPopUp(result.data.message))
    } catch (error) {
        dispatch(showPopUp(error.response.data.message))
    }
}
export const logout = () => dispatch => {
    dispatch({
        type: "LOGOUT",
    })
}

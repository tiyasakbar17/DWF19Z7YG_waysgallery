import Axios from 'axios'
import { showLoading, showPopUp, showProgress, closeLoading } from './PopUp';

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

const baseUrl = 'http://localhost:5000/api/v1'

export const getPosts = () => async dispatch => {
    try {
        dispatch(showLoading())
        const results = await Axios.get(`${baseUrl}/posts`)
        dispatch({
            type: "GET_POSTS",
            payload: results.data.data.posts
        })
        dispatch({
            type: "LOAD_PHOTOS",
        })
        dispatch(closeLoading())
    } catch (error) {
        dispatch(closeLoading())
        dispatch(showPopUp(error.response.message))
    }
}
export const getPost = (id) => async dispatch => {
    try {
        dispatch(showLoading())
        const result = await Axios.get(`${baseUrl}/post/${id}`)
        dispatch({
            type: "GET_POST",
            payload: result.data.data.post
        })
        dispatch(closeLoading())
    } catch (error) {
        dispatch(closeLoading())
        dispatch(showPopUp(error.response.message))
    }
}
export const addPost = (data) => async dispatch => {
    try {
        const result = await Axios.post(`${baseUrl}/post`, data, configForm(dispatch))
        dispatch(showPopUp(result.data.message))
    } catch (error) {
        dispatch(showPopUp(error.response.message))
    }
}
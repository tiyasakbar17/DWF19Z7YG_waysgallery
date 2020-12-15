import Axios from 'axios'
import { popUp } from './PopUp';

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

export const getPosts = () => async dispatch => {
    try {
        const results = await Axios.get(`${baseUrl}/posts`)
        dispatch({
            type: "GET_POSTS",
            payload: results.data.data.posts
        })
        dispatch({
            type: "LOAD_PHOTOS",
        })

    } catch (error) {
        console.log(error);
    }
}
export const getPost = (id) => async dispatch => {
    try {
        const result = await Axios.get(`${baseUrl}/post/${id}`)
        dispatch({
            type: "GET_POST",
            payload: result.data.data.post
        })
    } catch (error) {
        console.log(error);
    }
}
export const addPost = (data) => async dispatch => {
    try {
        const result = await Axios.post(`${baseUrl}/post`, data, configForm(dispatch))
        dispatch(popUp(result.data.message))
    } catch (error) {
        dispatch(popUp(JSON.stringify(error)))
    }
}
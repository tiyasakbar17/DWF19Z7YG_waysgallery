const { default: Axios } = require("axios");
const { showPopUp, showProgress, showLoading, closeLoading } = require("./PopUp")

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
const baseUrl = 'http://localhost:5000/api/v1'

export const loadAllOrders = (data) => async dispatch => {
    try {
        dispatch(showLoading())
        const result = await Axios.get(`${baseUrl}/hired`, configJson)
        dispatch({
            type: "LOAD_ALL_ORDER",
            payload: result.data.data.orders
        })
        dispatch({
            type: "LOAD_ORDER",
            payload: data
        })
        dispatch({
            type: "LOAD_HIRE",
            payload: data
        })
        dispatch(closeLoading())
    } catch (error) {
        dispatch(closeLoading())
        dispatch(showPopUp(error.response.message))
    }
}
export const addHired = (data) => async dispatch => {
    try {
        dispatch(showLoading())
        const result = await Axios.post(`${baseUrl}/hired`, data, configJson)
        dispatch(closeLoading())
        dispatch(showPopUp(result.data.message))
    } catch (error) {
        dispatch(closeLoading())
        dispatch(showPopUp(error.response.message))
    }
}
export const hiredAction = (data, id) => async dispatch => {
    try {
        dispatch(showLoading())
        const result = await Axios.patch(`${baseUrl}/hired`, data, configJson)
        dispatch(closeLoading())
        dispatch(showPopUp(result.data.message))
        dispatch(loadAllOrders(id))
    } catch (error) {
        dispatch(closeLoading())
        dispatch(showPopUp(error.response.message))
    }
}
export const submitProject = (data) => async dispatch => {
    try {
        const result = await Axios.post(`${baseUrl}/project`, data, configForm(dispatch))
        dispatch(showPopUp(result.data.message))
    } catch (error) {
        dispatch(showPopUp(error.response.message))
    }
}
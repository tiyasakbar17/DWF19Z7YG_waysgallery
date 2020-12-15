const { default: Axios } = require("axios");
const { loadData } = require("./Auth");
const { popUp } = require("./PopUp")

const configJson = {
    headers: {
        "Content-type": "application/json",
    },
};

const baseUrl = 'http://localhost:5000/api/v1'

module.exports = {
    addHired: (data) => async dispatch => {
        try {
            const result = await Axios.post(`${baseUrl}/hired`, data, configJson)
            dispatch(loadData())
            dispatch(popUp(result.data.message))
        } catch (error) {
            dispatch(popUp(JSON.stringify(error)))
        }
    },
    hiredAction: (data) => async dispatch => {
        try {
            const result = await Axios.patch(`${baseUrl}/hired`, data, configJson)
            dispatch(loadData())
            dispatch(popUp(result.data.message))
        } catch (error) {
            dispatch(popUp(JSON.stringify(error)))
        }
    }
}
const innitialState = {
    data: null,
    orders: null,
    hires: null,
    loading: true,
};

const Hired = (state = innitialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "LOAD_ALL_ORDER":
            return {
                ...state,
                data: payload
            }
        case "LOAD_ORDER":
            const orders = state.data.filter(order => (order.orderBy === payload))
            return {
                ...state,
                orders: orders,
            }
        case "LOAD_HIRE":
            const hires = state.data ? state.data.filter(hire => hire.orderTo === payload) : []
            return {
                ...state,
                hires,
                loading: false
            }
        default:
            return state;
    }
}

export default Hired;
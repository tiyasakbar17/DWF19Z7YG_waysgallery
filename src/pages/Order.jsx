import React, { useState } from 'react'
import { connect } from 'react-redux'
import Table from '../components/Order/Table'
import { loadAllOrders } from '../redux/actions/Hired'

export const Order = ({ Auth, Hired, loadAllOrders }) => {

    React.useEffect(() => {
        loadAllOrders(Auth.userData.id)
    }, [])

    const initialState = {
        status: true
    }

    const [state, setState] = useState(initialState)

    const clickHandler = (get) => {
        setState(prevstate => ({ status: get }))
    }

    if (Hired.loading) {
        return (
            <h1>LOADING.....</h1>
        )
    } else {
        return (
            <div style={{ margin: "121px 80px" }}>
                <div className="">
                    <button onClick={() => clickHandler(true)}>My Orders</button>
                    <button onClick={() => clickHandler(false)}>Offers</button>
                </div>
                <table className="">
                    <thead className="text-success">
                        <tr>
                            <th>No</th>
                            <th>Vendor</th>
                            <th>Order</th>
                            <th>Start Project</th>
                            <th>End Project</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.status ? (Hired.orders ? Hired.orders.map((user, i) => {
                            i += 1;
                            return (<Table user={user} userId={Auth.userData.id} counter={i} key={i} />)
                        }) : "") : (Hired.hires ? Hired.hires.map((user, i) => {
                            i += 1;
                            return (<Table user={user} userId={Auth.userData.id} counter={i} key={i} />)
                        }) : "")}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    Hired: state.Hired,
    Auth: state.Auth
})


export default connect(mapStateToProps, { loadAllOrders })(Order)

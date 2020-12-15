import React, { useState } from 'react'
import { connect } from 'react-redux'
import Table from '../components/Order/Table'

export const Order = ({ Auth }) => {

    const initialState = {
        status: true
    }

    const [state, setState] = useState(initialState)

    const clickHandler = (get) => {
        setState(get)
    }

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
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {state.status ? (Auth.userData.offers ? Auth.userData.offers.map((user, i) => {
                        i += 1;
                        return (<Table user={user} counter={i} key={i} />)
                    }) : "") : (Auth.userData.hires ? Auth.userData.hires.map((user, i) => {
                        i += 1;
                        return (<Table user={user} counter={i} key={i} />)
                    }) : "")}
                </tbody>
            </table>

        </div>
    )

}

const mapStateToProps = (state) => ({
    Auth: state.Auth
})


export default connect(mapStateToProps)(Order)

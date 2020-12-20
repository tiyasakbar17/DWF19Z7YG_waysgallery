import React, { useState } from 'react'
import { connect } from 'react-redux'
import Table from '../../components/Order/Table'
import { loadAllOrders } from '../../redux/actions/Hired'

export const Order = ({ Auth, Hired, loadAllOrders }) => {
    const compare = (key) => {
        return (a, b) => {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return 0;
            }
            let comparison = 0;
            if (a[key] < b[key]) {
                comparison = 1;
            }
            if (a[key] > b[key]) {
                comparison = -1;
            }
            return comparison;
        };
    };


    React.useEffect(() => {
        loadAllOrders(Auth.userData.id)
    }, [])

    const initialState = {
        options: true
    }

    const [state, setState] = useState(initialState)

    const changeHandler = (e) => {
        setState(prevState => ({
            ...prevState,
            options: e.target.value === "true" ? true : false,
        }))
    }

    if (Hired.loading) {
        return (
            <h1>LOADING.....</h1>
        )
    } else {
        return (
            <div className="container">
                <div className="flex">
                    <div className="headerPartLeft">
                        <select onChange={changeHandler} name="options" className="postSelector">
                            <option value={true}>My Orders</option>
                            <option value={false}>Offers</option>
                        </select>
                    </div>
                </div>
                <div className="orderContainer">
                    <table>
                        <thead className="tableHead">
                            <tr>
                                <th className="tableNumber">No</th>
                                <th>Vendor</th>
                                <th>Order</th>
                                <th>Start Project</th>
                                <th>End Project</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.options ?
                                    (Hired.orders ?
                                        Hired.orders.sort(compare("createdAt")).map((user, i) => {
                                            i += 1;
                                            return (<Table user={user} userId={Auth.userData.id} counter={i} key={i} />)
                                        }) :
                                        null) :
                                    (Hired.hires ?
                                        Hired.hires.sort(compare("createdAt")).map((user, i) => {
                                            i += 1;
                                            return (<Table user={user} userId={Auth.userData.id} counter={i} key={i} />)
                                        }) :
                                        null)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    Hired: state.Hired,
    Auth: state.Auth
})


export default connect(mapStateToProps, { loadAllOrders })(Order)

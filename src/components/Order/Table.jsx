import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { hiredAction } from '../../redux/actions/Hired'

function Table({ user, counter, hiredAction }) {

    const history = useHistory();

    const approveHandler = () => {
        const data = {
            id: user.id,
            status: true
        }
        hiredAction(data)
    }

    const cancelHandler = () => {
        const data = {
            id: user.id,
            status: false
        }
        hiredAction(data)
    }

    return (
        <tr className="">
            <th>{counter}</th>
            <td>{user.offers.fullName}</td>
            <td>{user.title}</td>
            <td>{user.startDate}</td>
            <td>{user.endDate}</td>
            <td>{user.status ? (<span className="text-success">Approved</span>) : (user.status === false ? <span className="text-danger">Cancel</span> : <span className="text-warning">Pending</span>)}</td>
            <td className="flex justify-content-around">{(user.status === null) ? <button onClick={approveHandler} className="button pointer success">Approve</button> : <button onClick={() => history.push(`/addProject/${user.offers.id}`)} className="button pointer success">Approve</button>} {(user.status !== false) ? <button onClick={cancelHandler} className="button pointer danger">Cancel</button> : <span className="text-light">none</span>}</td>
        </tr>
    )
}

export default connect(null, { hiredAction })(Table);

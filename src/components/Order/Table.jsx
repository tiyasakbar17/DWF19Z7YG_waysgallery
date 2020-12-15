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
            <td>{user.offers ? user.offers.fullName : user.hires.fullName}</td>
            <td>{user.title}</td>
            <td>{user.startDate}</td>
            <td>{user.endDate}</td>
            <td>{user.status ? (<span className="text-success">Approved</span>) : (user.status === false ? <span className="text-danger">Cancel</span> : <span className="text-warning">Pending</span>)}</td>
            {user.hires ? (<td className="flex justify-content-around">{(user.status === null) ? <div className="warning" style={{ borderRadius: "50%", width: "20px", height: "20px" }}></div> : <div className="success" style={{ borderRadius: "50%", width: "20px", height: "20px" }}></div>} {(user.status !== false) ? "" : <div className="danger" style={{ borderRadius: "50%", width: "20px", height: "20px" }}></div>}</td>)
                :
                (<td className="flex justify-content-around">{(user.status === null) ? <button onClick={approveHandler} className="button pointer success">Approve</button> : <button onClick={() => history.push(`/addProject/${user.offers.id}`)} className="button pointer success">Send Project</button>} {(user.status !== false) ? <button onClick={cancelHandler} className="button pointer danger">Cancel</button> : ""}</td>)}

        </tr>
    )
}

export default connect(null, { hiredAction })(Table);

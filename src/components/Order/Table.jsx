import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { hiredAction } from '../../redux/actions/Hired'

function Table({ userId, user, counter, hiredAction }) {

    const history = useHistory();

    const approveHandler = () => {
        const data = {
            id: user.id,
            status: true
        }
        hiredAction(data, userId)
    }

    const cancelHandler = () => {
        const data = {
            id: user.id,
            status: false
        }
        hiredAction(data, userId)
    }

    const Offers = () => {
        return (
            <td className="flex justify-content-around">
                {(user.status === null) ?
                    <button onClick={approveHandler} className="button pointer success">Approve</button> :
                    (user.status !== false && !user.project ?
                        <button onClick={() => history.push(`/addProject/${user.id}`)} className="button pointer success">Send Project</button> : <div className="success" style={{ borderRadius: "50%", width: "20px", height: "20px" }}></div>)}
                {(user.status !== false && user.project === null) ? <button onClick={cancelHandler} className="button pointer danger">Cancel</button> : ""}
            </td>

        )
    }
    const Orders = () => {
        return (
            <td className="flex justify-content-around">
                {(user.status === null) ?
                    (<div className="warning" style={{ borderRadius: "50%", width: "20px", height: "20px" }}></div>) :
                    (user.status === false ?
                        (<div className="danger" style={{ borderRadius: "50%", width: "20px", height: "20px" }}></div>) :
                        (user.project ?
                            (<button onClick={() => history.push(`/project/${user.id}`)} className="button pointer success">View Project</button>) :
                            (<div className="success" style={{ borderRadius: "50%", width: "20px", height: "20px" }}></div>)))}
            </td>
        )
    }


    return (
        <tr className="">
            <th>{counter}</th>
            <td>{userId === user.orderBy ? user.hires.fullName : user.offers.fullName}</td>
            <td>{user.title}</td>
            <td>{user.startDate}</td>
            <td>{user.endDate}</td>
            <td>
                {user.status ?
                    (!user.project ? <span className="text-success">Waiting for project to send</span> : <span className="text-success">Project Completed</span>) :
                    (user.status === false ? <span className="text-danger">Cancel</span> : <span className="text-warning">Waiting Accept</span>)}
            </td>
            { userId === user.orderBy ? <Orders /> : <Offers />}
        </tr>
    )
}

export default connect(null, { hiredAction })(Table);

import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { hiredAction } from '../../redux/actions/Hired'
import DetailOrder from './DetailOrder'

function Table({ userId, user, counter, hiredAction }) {

    const [state, setState] = React.useState(false)

    var options = { year: 'numeric', month: 'long', day: 'numeric' };

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
    const pushAddProject = () => {
        history.push(`/addProject/${user.id}`)
    }

    const Offers = () => {
        return (
            <td className="actionItems">
                {
                    user.status === null ?
                        <button onClick={approveHandler} className="button buttonTable pointer">
                            Approve
                    </button> :
                        user.status === true && !user.project ?
                            <button onClick={pushAddProject} className="button buttonTable pointer">
                                Send Project
                    </button> :
                            <div className="success rounded"></div>
                }
                {
                    user.status !== false && user.project === null ?
                        <button onClick={cancelHandler} className="button buttonTable2 pointer danger">
                            Cancel
                        </button> :
                        null
                }
            </td>
        )
    }
    const Orders = () => {
        return (
            <td className="actionItems">
                {(user.status === null) ?
                    (<span className="warning rounded"></span>) :
                    (user.status === false ?
                        (<span className="danger rounded"></span>) :
                        (user.project ?
                            (<button onClick={() => history.push(`/project/${user.id}`)} className="button pointer buttonTable">View Project</button>) :
                            (<span className="success rounded"></span>)))}
            </td>
        )
    }

    const showDetails = () => {
        setState(prevState => (!prevState))
    }

    const properties = {
        show: userId === user.orderBy ? true : false,
        title: user.title,
        description: user.description,
        price: user.price,
        approve: approveHandler,
        cancel: cancelHandler,
        closer: showDetails
    }

    return (
        <>
            {state ? <DetailOrder {...properties} /> : null}
            <tr>
                <th className="tableNumber">{counter}</th>
                <td>{userId === user.orderBy ? user.hires.fullName : user.offers.fullName}</td>
                <td><a className="pointer" onClick={showDetails}>{user.title}</a></td>
                <td>{new Date(user.startDate).toLocaleDateString("id-ID", options)}</td>
                <td>{new Date(user.endDate).toLocaleDateString("id-ID", options)}</td>
                <td>
                    {user.status ?
                        (!user.project ? <span className="text-success">Waiting for project to send</span> : <span className="text-success">Project Completed</span>) :
                        (user.status === false ? <span className="text-danger">Cancel</span> : <span className="text-warning">Waiting Accept</span>)}
                </td>
                {userId === user.orderBy ? <Orders /> : <Offers />}
            </tr>
        </>
    )
}

export default connect(null, { hiredAction })(Table);

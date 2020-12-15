import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logout } from '../redux/actions/Auth'
import Auth from '../redux/reducers/Auth'

function Dropdown({ Auth, logout }) {

    const history = useHistory()
    return (
        <div className="flex flex-column border warning" style={{ width: "200px", height: "auto", padding: "10px", position: "fixed", top: "20%", zIndex: "100", right: "10%" }}>
            <span className="border success pointer" onClick={() => history.push(`/profile/${Auth.userData.id}`)}>Profile</span>
            <span className="border success pointer" onClick={() => history.push("/order")}>Order</span>
            <span className="border success pointer" onClick={() => logout()}>Logout</span>
        </div>
    )

}

const mapStateToProps = state => {
    return ({ Auth: state.Auth })
}

export default connect(mapStateToProps, { logout })(Dropdown)

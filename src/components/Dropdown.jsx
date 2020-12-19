import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logout } from '../redux/actions/Auth'

function Dropdown({ Auth, logout, closeDD }) {

    const history = useHistory()

    const pushLogout = () => {
        closeDD()
        logout()
    };
    const pushOrders = () => {
        closeDD()
        history.push("/order")
    };
    const pushProfile = () => {
        closeDD()
        history.push(`/profile/${Auth.userData.id}`)
    };
    return (
        <div className="dropDown">
            <img src="/img/DropDown.svg" alt="triangle" className="triangle" />
            <div className="dropItem pointer" onClick={pushProfile} >
                <i className="far fa-user dropDownIcon" style={{ color: "skyblue" }}></i>
                <strong>Profile</strong> </div>
            <div className="dropItem pointer" onClick={pushOrders} >
                <i className="fas fa-file-invoice-dollar dropDownIcon" style={{ color: "#00E016" }}> </i>
                <strong>Orders</strong></div>
            <div className="dropLine"></div>
            <div className="dropItem pointer" onClick={pushLogout} >
                <i className="fas fa-sign-out-alt dropDownIcon" style={{ color: "red" }}></i>
                <strong>Logout</strong>
            </div>
        </div>
    )

}

const mapStateToProps = state => {
    return ({ Auth: state.Auth })
}

export default connect(mapStateToProps, { logout })(Dropdown)

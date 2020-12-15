import React, { Component } from 'react'
import { connect } from 'react-redux'
import { popUp } from '../redux/actions/PopUp'

export const PopUp = ({ popUp, PopUpState }) => {

    const onClick = () => {
        popUp("")
    }


    return (
        <div className="grid justify-content-center align-item-center absolute top bottom left right" style={{ position: "absolute", zIndex: "100" }}>
            <div className="userAuth border relative"><div className="closer absolute top right pointer" style={{ width: "500px", height: "300px" }} onClick={onClick}>X</div>
                <h1>{PopUpState.message}</h1>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    PopUpState: state.PopUp
})

const mapDispatchToProps = {
    popUp
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUp)

import React from 'react'
import { connect } from 'react-redux';
import { userRegister } from '../../redux/actions/Auth';

function Login({ onClick, userRegister }) {

    const innitialValue = {
        email: '',
        password: '',
        fullName: ''
    }

    const [state, setState] = React.useState(innitialValue)
    console.log(state);

    const changeHandler = (e) => {
        setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        userRegister(state);
        onClick()
    }

    return (
        <div className="grid justify-content-center align-item-center absolute z-3 top bottom left curtain right">
            <div className="userAuth border relative">
                <div className="closer absolute top right pointer" onClick={onClick}>X</div>
                <form onSubmit={submitHandler}>
                    <div className="" style={{ width: "396px", height: "20px" }}><input type="text" name="email" className="input" onChange={changeHandler} value={state.email} placeHolder="Email" />
                    </div>
                    <div className="" style={{ width: "396px", height: "20px", marginTop: "50px" }}><input type="password" name="password" className="input" onChange={changeHandler} value={state.password} placeHolder="Password" /></div>
                    <div className="" style={{ width: "396px", height: "20px", marginTop: "50px" }}><input type="text" name="fullName" className="input" onChange={changeHandler} value={state.fullName} placeHolder="Full Name" /></div>
                    <div className="" style={{ width: "396px", height: "50px", marginTop: "50px", marginLeft: "12px" }}><button type="submit" name="submit button" className="button success pointer">Register</button></div>
                </form>
            </div>
        </div>
    )
}

export default connect(null, { userRegister })(Login)

import React from 'react'
import { connect } from 'react-redux';
import { userRegister } from '../../redux/actions/Auth';

function Login({ onClick, userRegister, changeShow }) {

    const innitialValue = {
        email: '',
        password: '',
        fullName: ''
    }

    const [state, setState] = React.useState(innitialValue)

    const changeHandler = (e) => {
        setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        userRegister(state);
        onClick()
    }

    return (
        <div className="landingPop" >
            <div className="modalBackground" onClick={onClick}></div>
            <div className="modalContainer">
                <div className="modalCloser pointer" onClick={onClick}>
                    <i className="fas fa-times"></i>
                </div>
                <div className="modalTitle">
                    <span><strong>Register</strong></span>
                </div>
                <div className="formContainer">
                    <form onSubmit={submitHandler}>
                        <div className="modalInput">
                            <input type="email" className="input" name="email" value={state.email} placeholder="Email" onChange={changeHandler} required />
                        </div>
                        <div className="modalInput">
                            <input type="password" className="input" name="password" value={state.password} placeholder="Password" onChange={changeHandler} required />
                        </div>
                        <div className="modalInput">
                            <input type="text" className="input" name="fullName" value={state.fullName} placeholder="Full Name" onChange={changeHandler} required />
                        </div>
                        <div className="modalInput">
                            <button type="submit" className="white primary button pointer">Login</button>
                        </div>
                        <div className="modalInput">
                            <span>Already Have an account ? <a onClick={changeShow} className="pointer"><strong>Click Here</strong></a></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default connect(null, { userRegister })(Login)

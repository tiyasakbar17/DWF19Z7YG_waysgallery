import React from 'react'
import { connect } from 'react-redux';
import { userLogin } from '../../redux/actions/Auth';

function Login({ onClick, userLogin }) {

    const innitialValue = {
        email: '',
        password: ''
    }

    const [state, setState] = React.useState(innitialValue)
    console.log(state);

    const changeHandler = (e) => {
        setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(state);
        userLogin(state);
        onClick()
    }

    return (
        <div className="grid justify-content-center align-item-center absolute z-3 top bottom left right">
            <div className="userAuth border relative"><div className="closer absolute top right pointer" onClick={onClick}>X</div>
                <form onSubmit={submitHandler}>
                    <div className="" style={{ width: "396px", height: "20px" }}><input type="text" name="email" className="input" onChange={changeHandler} value={state.email} placeholder="Email" />
                    </div>
                    <div className="" style={{ width: "396px", height: "20px", marginTop: "50px" }}><input type="password" name="password" className="input" onChange={changeHandler} value={state.password} placeholder="Password" /></div>
                    <div className="" style={{ width: "396px", height: "50px", marginTop: "50px", marginLeft: "12px" }}><button type="submit" name="submit button" className="button success pointer">Login</button></div>

                </form>
            </div>
        </div>
    )
}

export default connect(null, { userLogin })(Login)

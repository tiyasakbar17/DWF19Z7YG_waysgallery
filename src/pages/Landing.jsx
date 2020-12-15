import React from 'react'
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom'
import Login from '../components/Landing/Login'
import Register from '../components/Landing/Register'

function Landing({ Auth }) {

    const history = useHistory();

    const innitialValue = {
        login: false,
        register: false
    }

    const [state, setState] = React.useState(innitialValue)

    const showLogin = () => {
        setState(prevState => ({ ...prevState, login: !prevState.login }))
    }
    const showRegister = () => {
        setState(prevState => ({ ...prevState, register: !prevState.register }))
    }

    return (
        <>
            {Auth.isLogin ? <Redirect to="/home" /> : ""}
            {state.login ? <Login onClick={showLogin} /> : ""}
            {state.register ? <Register onClick={showRegister} /> : ""}
            <div className="absolute top bottom left right">
                <img src="/img/LandingBackGround.png" alt="BackGround" className="image absolute z-1" />
                <div className="relative z-2" style={{ width: "462px", top: "18%", left: "10%" }}>
                    <div className="flex flex-column" style={{ fontSize: "85px", lineHeight: "102.02px" }}>
                        <span>Ways</span><span>Gallery</span>
                    </div>
                    <div className="flex flex-column" style={{ marginTop: "30px" }}>
                        <span style={{ fontSize: "24px" }}>
                            <strong>show your work to inspire everyone</strong>
                        </span>
                        <span style={{ marginTop: "10px", fontSize: "14px" }}>
                            Ways Exhibition is a website design creators gather to share their work with other creators
                    </span>
                    </div>
                    <div className="flex" style={{ marginTop: "20px", width: "350px", height: "30px" }}>
                        <button onClick={showRegister} className="success button text-white pointer" style={{ marginRight: "20px", fontSize: "14px" }}>Join Now</button>
                        <button onClick={showLogin} className="success button text-black pointer" style={{ backgroundColor: "#E7E7E7", fontSize: "14px" }}>Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        Auth: state.Auth
    }
}

export default connect(mapStateToProps)(Landing)

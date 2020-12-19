import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import Login from '../components/Landing/Login'
import Register from '../components/Landing/Register'

function Landing({ Auth }) {

    const innitialValue = {
        login: false,
        register: false
    }

    const [state, setState] = React.useState(innitialValue)

    const showLogin = () => {
        setState(prevState => ({ ...prevState, login: !prevState.login }))
    }
    const showRegister = () => {
        setState(prevState => ({ ...prevState, register: !prevState.register, }))
    }
    const changeShow = () => {
        setState(prevState => ({ login: !prevState.login, register: !prevState.register }))
    }

    return (
        <>
            {Auth.isLogin ? <Redirect to="/home" /> : null}
            {state.login ? <Login onClick={showLogin} changeShow={changeShow} /> : null}
            {state.register ? <Register onClick={showRegister} changeShow={changeShow} /> : null}
            <div className="absolute top bottom left right">
                <img src="/img/LandingBackGround.png" alt="BackGround" className="image absolute " />
                <div className="landingContainer" >
                    <div className="mainTitle">
                        <div className="mainLogo">
                            <img src="/img/Group 3.svg" alt="" />
                            <div className="secondaryLogo">
                                <img src="/img/Group 4.svg" alt="" />
                            </div>
                        </div>
                        <span><strong>Ways</strong></span>
                        <span className="text-primary"><strong>Gallery</strong></span>
                    </div>
                    <div className="mainWords" >
                        <span>
                            <strong>show your work to inspire everyone</strong>
                        </span>
                        <span className="secondaryWords">
                            Ways Exhibition is a website design creators gather to share their work with other creators
                    </span>
                    </div>
                    <div className="landingButtons">
                        <button onClick={showRegister} className="button text-white pointer"
                        >Join Now</button>
                        <button onClick={showLogin} className="success button text-black pointer" >Login</button>
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

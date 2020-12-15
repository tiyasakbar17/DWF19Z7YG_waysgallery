import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PopUp from './PopUp'

function Header({ Auth, PopUpState }) {

    const history = useHistory();


    return (// rgb(199, 199, 199)3, 22, 22) 
        <>
            {PopUpState.isPoped ? <PopUp /> : ""}
            <div className="fixed z-5 top grid justify-content-around align-content-center" style={{ height: "121px", width: "100%", backgroundColor: "white", [!Auth.isLogin ? "opacity" : ""]: "0" }}>
                <div className="" style={{ width: "80px", height: "50px" }}>
                    <img onClick={() => history.push("/home")} src={`/img/image 1.png`} alt="img" className="image" />
                </div>
                <button className="button success" onClick={() => history.push("/addPost")}> addPosts </button>
                <button className="button success" onClick={() => history.push("/order")}> Order </button>
                <button className="button success"> </button>
                <button className="button success"> </button>
                <div className="" style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "green", overflow: "hidden" }}>
                    <img src={`${Auth.userData ? `http://localhost:5000/uploads/${Auth.userData.avatar}` : ""}`} alt="" />
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        Auth: state.Auth,
        PopUpState: state.PopUp
    }
}

export default connect(mapStateToProps)(Header)
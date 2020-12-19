import React from 'react'
import { connect } from 'react-redux'
import { changePict } from '../../Redux/Actions/AuthActions';
import { closeProfile } from '../../Redux/Actions/PopUpActions';
import { loadUserTransactions } from '../../Redux/Actions/TransactionActions'

function UjiCoba({ Auth, closeProfile, loadUserTransactions, changePict }) {
    const today = Date.now();

    const accountActiveDay = new Date(Auth.userData.activeDay).getTime();

    const activeDays = Math.round(((accountActiveDay - today) / (24 * 60 * 60 * 1000)))

    const count = (key) => {
        const status = Auth.userTransactions ? Auth.userTransactions.filter(trans => trans.paymentStatus === key).length : 0

        return status;
    }

    React.useEffect(() => {
        loadUserTransactions()
    }, [])

    const closerProfile = () => {
        closeProfile()
    }

    const [state, setstate] = React.useState({
        file: null,
        count: 0
    })

    const textInput = React.createRef();
    const focusTextInput = () => { textInput.current.click() }

    const fileHandler = (e) => {
        setstate(prevstate => ({ file: e.target.files[0] ? e.target.files[0] : null, count: prevstate.count + 1 }))
    }

    const upload = () => {
        if (state.count > 0) {
            if (state.file) {
                const formData = new FormData()
                formData.append("thumbnail", state.file)
                changePict(formData)
            }
        }
    }

    React.useEffect(() => {
        upload()
    }, [state.count])

    return (
        <div className="userProfile">
            <div className="profilePictContainer">

                <div className="profilePict">
                    <img src={Auth.userData.thumbnail ? Auth.userData.thumbnail : "/Vector(2).png"} alt="Pict" className="CardIMG" />
                    <div onClick={focusTextInput} className="changePict">
                        <div className="d-flex justify-content-center" style={{ width: "100%" }}><i className="fas fa-camera"></i></div>
                        <span>Change Picture</span>
                    </div>
                    <form>
                        <input type="file" name="thumbnail" onChange={fileHandler} ref={textInput} className="fileUpload" />
                    </form>
                </div>
            </div>

            <div className="userDetails d-flex flex-column">
                <div className="flex-fill">
                    <span style={{ fontSize: "26px", color: "#03f387" }}> <strong>Name</strong></span>
                    <p className="white">{Auth.userData.fullName}</p>
                </div>
                <div className="flex-fill">
                    <span style={{ fontSize: "26px", color: "#03f387" }}> <strong>Remaining Active</strong></span>
                    <p className="white">{activeDays > 0 ? activeDays : 0} Day(s)</p>
                </div>
                <div className="flex-fill">
                    <span style={{ fontSize: "26px", color: "#03f387" }}> <strong>Payment(s) Made</strong></span>
                    <div className="container pl-5">
                        <div className="row pl-5">
                            <div className="col-5"><span className="white">Approved</span></div>
                            <div className="col-5"><span className="green">{count(true)}</span></div>
                        </div>
                        <div className="row pl-5">
                            <div className="col-5"><span className="white">Pending</span></div>
                            <div className="col-5"><span className="text-warning">{count(null)}</span></div>
                        </div>
                        <div className="row pl-5">
                            <div className="col-5"><span className="white">Declined</span></div>
                            <div className="col-5"><span className="text-danger">{count(false)}</span></div>
                        </div>
                    </div>
                    {/* <p className="white">{approve}</p> */}
                </div>
            </div>
            <div style={{ position: "absolute", top: "20px", left: "44%" }}><i onClick={closerProfile} className="fas fa-times fa-3x white bigClose"></i></div>
        </div>

    )
}
const mapStateToProps = (state) => {
    return ({
        Auth: state.Auth
    })
}

export default connect(mapStateToProps, { closeProfile, loadUserTransactions, changePict })(UjiCoba)

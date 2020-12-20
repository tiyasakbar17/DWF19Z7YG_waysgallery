import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logout } from '../redux/actions/Auth';
import Dropdown from './Dropdown';
import Loading from './PopUps/Loading';
import PopUps from './PopUps/PopUps'
import ProgressBar from './PopUps/ProgressBar';

function Header({ Posts, Auth, PopUpState }) {

    const history = useHistory();

    const [state, setState] = React.useState(false)

    const closer = () => {
        setState(!state)
    }

    const pushHome = () => history.push("/home");
    const pushAddPost = () => history.push("/addPost")


    return (
        <>
            {state ? <Dropdown closeDD={() => setState(false)} /> : null}
            {PopUpState.isPoped ? <PopUps /> : null}
            {PopUpState.progress.isShown ? <ProgressBar /> : null}
            {PopUpState.loadingComp ? <Loading /> : null}
            <div className={`header flex ${Auth.isLogin ? null : `hidden`}`}>
                <div className="headerPartLeft">
                    <div onClick={pushHome} className="headerLogo pointer">
                        <img src={`/img/image 1.png`} alt="img" className="image" />
                    </div>
                </div>
                <div className="headerPartRight">
                    <div onClick={closer} className="headerImage pointer">
                        <img src={Auth.userData ? Auth.userData.avatar ? `http://localhost:5000/uploads/${Auth.userData.avatar}` : "/logo512.png" : null} alt="avatar" className="image" />
                    </div>
                    <div className="uploadPost">
                        <button onClick={pushAddPost} className="button primary text-white pointer">Add Post</button>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        Auth: state.Auth,
        PopUpState: state.PopUp,
        Posts: state.Posts
    }
}

export default connect(mapStateToProps, { logout })(Header)

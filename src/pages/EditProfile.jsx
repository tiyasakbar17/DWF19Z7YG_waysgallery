import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addArts, editProfile } from '../redux/actions/Auth'

export const EditProfile = ({ Auth, editProfile, addArts }) => {

    const history = useHistory()


    const onDrop = useCallback(async acceptedFiles => {
        // Do something with the files
        try {
            const formData = new FormData();

            const addform = async () => {
                await acceptedFiles.map(file => {
                    formData.append("arts", file)
                })
            }
            addform().then(() => addArts(formData))
        } catch (error) {

        }
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' })

    const innitialState = {
        art: '',
        avatar: '',
        greeting: '',
        fullName: '',
        count: 0,
        preview: '',

    }
    const [state, setState] = React.useState(innitialState)

    const changeHandler = (e) => {

        setState(prevstate => ({ ...prevstate, [e.target.name]: e.target.value }))

    }
    const fileHandler = (e) => {

        setState(prevstate => ({
            ...prevstate,
            [e.target.name]: e.target.files[0] ? e.target.files[0] : '',
            preview: e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : ''
        }))

    }
    React.useEffect(() => {
        if (!Auth.userData) {
            setState(prevstate => ({ ...prevstate, fullName: Auth.userData ? Auth.userData.fullName : "", greeting: Auth.userData ? Auth.userData.greeting : "", count: prevstate.count + 1 }))
        } else {
            setState(prevstate => ({ ...prevstate, fullName: Auth.userData ? Auth.userData.fullName : "", greeting: Auth.userData ? Auth.userData.greeting : "" }))
        }
    }, [state.count])


    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("fullName", state.fullName)
        formData.append("greeting", state.greeting)
        formData.append("avatar", state.avatar)
        editProfile(formData).then(() => {
            history.goBack()
        })
    }

    const textInput = React.createRef();

    const focusTextInput = () => { textInput.current.click() }

    return (
        <div className="container">
            <div className="editProfileContainer">
                <div className="editLeftPart">

                    <div {...getRootProps()} className="fileDropper">
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                <span className="text-primary f-18">Drop File Here </span> :
                                <>
                                    <span className="text-primary f-18">Upload </span>
                                    <span className="text-black f-18 ml-5"> Your Best Art</span>
                                </>
                        }
                    </div>
                </div>
                <div className="editRightPart">
                    <form onSubmit={submitHandler}>
                        <div className="profileImage">
                            <img src={state.preview ? state.preview : Auth.userData.avatar ? `http://localhost:5000/uploads/${Auth.userData.avatar}` : '/logo512.png'} alt="Profile Pictuce" className="image" />
                            <input type="file" className="input hidden" ref={textInput} name="avatar" onChange={fileHandler} />
                            <div onClick={focusTextInput} className="changePict pointer">
                                <div className="flex justify-content-center" style={{ width: "100%" }}><i className="fas fa-camera fa-3x"></i></div>
                                <span >Change Picture</span>
                            </div>
                        </div>
                        <div className="">
                            <input type="text" name="greeting" className="input inputHired" onChange={changeHandler} value={state.greeting} placeholder="Greeting" />
                            <input type="text" name="fullName" className="input inputHired" onChange={changeHandler} value={state.fullName} placeholder="Full Name" />
                        </div>
                        <div className="editProfileButton">
                            <button type="submit" className="button primary text-White">Save</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    Auth: state.Auth
})

const mapDispatchToProps = {
    editProfile,
    addArts
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)

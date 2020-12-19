import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addArts, editProfile } from '../redux/actions/Auth'

export const EditProfile = ({ Auth, editProfile, addArts }) => {
    const innitialState = {
        art: '',
        avatar: '',
        greeting: '',
        fullName: '',
        count: 0

    }
    const [state, setState] = React.useState(innitialState)

    const changeHandler = (e) => {

        setState(prevstate => ({ ...prevstate, [e.target.name]: e.target.value }))

    }
    const fileHandler = (e) => {

        setState(prevstate => ({ ...prevstate, [e.target.name]: e.target.files[0] }))

    }
    React.useEffect(() => {
        console.log(Auth.userData);
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
        editProfile(formData)
    }
    const uploadArts = async (e) => {
        try {
            if (e.target.files) {
                console.log("FILE ADA");
                const formData = new FormData();
                formData.append("arts", e.target.files[0])
                addArts(formData)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ margin: "121px 80px" }}>

            <div className="" style={{ width: "500px", padding: "10px" }}>
                <label htmlFor="art">Upload Art</label>
                <input type="file" className="input" name="art" onChange={uploadArts} />
                <form action="" onSubmit={submitHandler}>
                    <label htmlFor="avatar">Avatar</label>
                    <input type="file" className="input" name="avatar" onChange={fileHandler} />
                    <input type="text" className="input" name="greeting" onChange={changeHandler} value={state.greeting} placeholder="Greeting" />
                    <input type="text" className="input" name="fullName" onChange={changeHandler} value={state.fullName} placeholder="Full Name" />
                    <button type="submit">SUBMIT</button>
                </form>
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

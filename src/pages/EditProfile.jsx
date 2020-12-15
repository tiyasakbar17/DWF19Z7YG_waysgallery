import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editProfile } from '../redux/actions/Auth'

export const EditProfile = ({ Auth, editProfile }) => {
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
    console.log(state);
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
        formData.append("photos", state.avatar)
        editProfile(formData)
    }

    return (
        <div style={{ margin: "121px 80px" }}>

            <div className="" style={{ width: "500px", padding: "10px" }}>
                <form action="" onSubmit={submitHandler}>
                    <label htmlFor="art">Art</label>
                    <input type="file" className="input" name="art" onChange={fileHandler} />
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
    editProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)

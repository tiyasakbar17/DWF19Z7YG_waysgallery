import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../redux/actions/Posts'

export const AddPost = ({ addPost }) => {

    const innitialState = {
        title: '',
        description: '',
        photos: []

    }
    const [state, setState] = React.useState(innitialState)

    const changeHandler = (e) => {

        setState(prevstate => ({ ...prevstate, [e.target.name]: e.target.value }))

    }
    const fileHandler = (e) => {

        setState(prevstate => ({ ...prevstate, [e.target.name]: [...prevstate.photos, e.target.files[0]] }))

    }
    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("title", state.title)
        formData.append("description", state.description)
        formData.append("photos", state.photos[0])
        formData.append("photos", state.photos[1])
        formData.append("photos", state.photos[2])
        formData.append("photos", state.photos[3])
        addPost(formData)

    }

    return (
        <div style={{ margin: "121px 80px" }}>
            <div className="" style={{ width: "500px", padding: "10px" }}>
                <form action="" onSubmit={submitHandler}>
                    <label htmlFor="art">photos</label>
                    <input type="file" className="input" name="photos" onChange={fileHandler} />
                    <input type="file" className="input" name="photos" onChange={fileHandler} />
                    <input type="file" className="input" name="photos" onChange={fileHandler} />
                    <input type="file" className="input" name="photos" onChange={fileHandler} />
                    <input type="text" className="input" name="title" onChange={changeHandler} value={state.title} placeholder="Title" />
                    <input type="text" className="input" name="description" onChange={changeHandler} value={state.description} placeholder="Description" />
                    <button type="submit">SUBMIT</button>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    addPost
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost)

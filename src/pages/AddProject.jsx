import React, { Component } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { submitProject } from '../redux/actions/Hired'

export const AddProject = ({ submitProject }) => {

    const { id } = useParams()

    const [state, setState] = React.useState({
        description: '',
        file: [],
    })

    const changeHanler = (e) => {

        setState(prevstate => ({ ...prevstate, [e.target.name]: e.target.files ? [...prevstate.file, e.target.files[0]] : e.target.value }))
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("description", state.description)
        formData.append("hiredId", id)
        await state.file.map(photos => formData.append("photos", photos))
        submitProject(formData)
    }


    return (
        <div style={{ margin: "121px 80px" }}>
            <form action="" onSubmit={submitHandler}>
                <input type="file" name="file" onChange={changeHanler} />
                <input type="text" name="description" onChange={changeHanler} placeholder="Description" value={state.description} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    submitProject
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProject)

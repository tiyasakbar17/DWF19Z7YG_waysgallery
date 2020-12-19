import React, { Component, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addPost } from '../redux/actions/Posts'

export const AddPost = ({ addPost }) => {

    const history = useHistory()


    const onDrop = useCallback(async acceptedFiles => {
        // Do something with the files
        try {
            await acceptedFiles.map(file => {
                setState(prevState => ({
                    ...prevState,
                    photos: [
                        ...prevState.photos,
                        {
                            file: file,
                            preview: URL.createObjectURL(file)
                        }
                    ]
                }))
            })
        } catch (error) {
            console.log(error);
        }
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' })

    const innitialState = {
        title: '',
        description: '',
        photos: [],

    }
    const [state, setState] = React.useState(innitialState)

    const changeHandler = (e) => {

        setState(prevstate => ({ ...prevstate, [e.target.name]: e.target.value }))

    }

    console.log(state)

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("title", state.title)
        formData.append("description", state.description)
        state.photos.map(photo => {
            formData.append("photos", photo.file)
        })
        await addPost(formData).then(() => {
            history.goBack()
        })

    }

    return (
        <div className="container">
            <form onSubmit={submitHandler}>
                <div className="editProfileContainer">
                    <div className="addPostLeft ">
                        <div className="leftContainer">
                            <div {...getRootProps()} className="mainUploadField">
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                        <span className="text-primary f-18">Drop File Here </span> :
                                        <>
                                            <i className="text-primary fas fa-cloud-upload-alt fa-4x"></i>
                                            <span className="text-primary f-18">Browse File</span>
                                        </>
                                }
                            </div>
                            <div className="filePreview">
                                {
                                    state.photos.map((photo, i = 0) => {
                                        i = i + 1;
                                        return (
                                            <div className="previewItems" key={i}>
                                                <img src={photo.preview} alt="preview" className="image" />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="addPostRight">
                        <input type="text" name="title" className="input inputHired" value={state.title} onChange={changeHandler} placeholder="Title" />
                        <textarea name="description" cols="30" className="input textArea" onChange={changeHandler} value={state.description} placeholder="Description" ></textarea>
                        <div className="flex justify-content-center">
                            <button type="submit" className="text-white button primary editProfileButton" >Post</button>
                        </div>
                    </div>
                </div>
            </form>
        </div >
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    addPost
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost)

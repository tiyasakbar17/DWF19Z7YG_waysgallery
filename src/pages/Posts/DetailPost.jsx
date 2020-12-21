import React from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { follow } from '../../redux/actions/Auth';
import { deletePost, editPost, getPost } from '../../redux/actions/Posts';

export const DetailPost = ({ Auth, Posts, getPost, follow, deletePost, editPost }) => {

    const following = async () => {
        if (!Posts.post) {
            return null
        }
        SetState(prevState => ({
            ...prevState,
            description: Posts.post.description,
            title: Posts.post.title,
        }));
        const check = await Auth.userData.following.find(follow => follow.followTo === Posts.post.userId)

        if (!check) {
            return SetState(prevState => ({
                ...prevState,
                followed: 0
            }))
        }
        SetState(prevState => ({
            ...prevState,
            followed: 1
        }))
    }

    const { id } = useParams()

    const history = useHistory()

    const innitialValue = {
        preview: '',
        count: 0,
        followed: 0,
        edit: false,
        description: '',
        title: ''
    }
    const [state, SetState] = React.useState(innitialValue)

    React.useEffect(() => {
        following()
    }, [Auth.userData.following, Posts.post])
    React.useEffect(() => {
        getPost(id)
        SetState(prevState => ({ ...prevState, count: prevState.count + 1 }))
    }, [])
    React.useEffect(() => {
        if (!Posts.loadingPost) {
            SetState((prevState) => ({ ...prevState, preview: Posts.post ? Posts.post.photos[0].image : null }))
        }
        else {
            SetState((prevState) => ({ ...prevState, count: prevState.count + 1 }))
        }
    }, [state.count])

    const changePreview = (index) => {
        const previewToBe = Posts.post.photos.findIndex(photo => photo.id === index)
        SetState(prevState => ({
            ...prevState,
            preview: Posts.post.photos[previewToBe].image
        }))
    }

    const editClick = () => {
        SetState(prevState => ({
            ...prevState,
            edit: !prevState.edit
        }))
    }
    const changeHandler = e => {
        SetState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const pushUser = () => {
        history.push(`/profile/${Posts.post.userId}`)
    }
    const pushHire = () => {
        history.push(`/hired/${Posts.post.userId}`)
    }

    const followHandler = () => {
        follow(Posts.post.userId)
    }

    const deleteHandler = () => {
        deletePost(id).then(() => {
            history.push("/")
        })
    }
    const submitHandler = () => {
        editPost({
            postId: id,
            description: state.description,
            title: state.title
        })
        SetState(prevState => ({
            ...prevState,
            edit: !prevState.edit
        }))
    }

    if (!Posts.post) {
        return (
            <div></div>
        )
    }
    return (
        <div className="container">
            <div className="detailPost">
                <div className="upperDetailPost">
                    <div className="upperDetailPostLeft">
                        <div className="headerImage pointer" onClick={pushUser}>
                            <img src={Posts.post.createdBy.avatar ? Posts.post.createdBy.avatar : '/logo512.png'} alt="avatar" className="image" />
                        </div>
                        <div className="postName">
                            {
                                state.edit ?
                                    <input type="text" name="title" value={state.title} className="input" style={{ width: "200px", height: "30px" }} onChange={changeHandler} /> :
                                    <span className="f-18"><strong>{Posts.post.title}</strong></span>
                            }
                            <span className="f-14">{Posts.post.createdBy.fullName}</span>
                        </div>
                    </div>
                    <div className="upperDetailPostRight">
                        <div className="buttonPlacer">
                            {Posts.post.userId === Auth.userData.id ?
                                <>
                                    <div className="editPost">
                                        <button onClick={deleteHandler} className="danger text-black button pointer" >Delete post</button>
                                        <button onClick={editClick} className="text-black button pointer" >Edit post</button>
                                    </div>
                                </> :
                                <>
                                    <button onClick={pushHire} className="text-white button pointer">Hire</button>
                                    {
                                        !state.followed ?
                                            <button className="text-black button pointer" onClick={followHandler} >Follow</button> :
                                            <button className="text-black button pointer" onClick={followHandler} >Unfollow</button>
                                    }
                                </>}

                        </div>
                    </div>
                </div>
                <div className="mainPostPict" >
                    <img src={state.preview} alt="picture" className="image" />
                </div>
                <div className="listPostPic">
                    {
                        Posts.post.photos.map((photo) => {
                            return (
                                <div className="postPictSlider pointer" onClick={() => changePreview(photo.id)} key={photo.id}>
                                    <img src={photo.image} alt="" className="image" />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="postDetails">
                    <span className="text-black"><i className="fas fa-hands-wash text-warning"></i><strong>Say Hello   </strong>
                        <a className="text-primary">{Posts.post.createdBy.email}</a></span>
                    {
                        state.edit ?
                            <div>
                                <textarea name="description" className="description" value={state.description} onChange={changeHandler}></textarea>
                                <button className="button editPost primary" onClick={submitHandler} >Save</button>
                            </div> :
                            <p>{Posts.post.description}</p>
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    Posts: state.Posts,
    Auth: state.Auth
})

const mapDispatchToProps = {
    getPost,
    follow,
    deletePost,
    editPost
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost)

import React from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { follow } from '../../redux/actions/Auth';
import { getPost } from '../../redux/actions/Posts';

export const DetailPost = ({ Auth, Posts, getPost, follow }) => {

    const following = async () => {
        if (!Posts.post) {
            return null
        }
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

    const pushUser = () => {
        history.push(`/profile/${Posts.post.userId}`)
    }
    const pushHire = () => {
        history.push(`/hired/${Posts.post.userId}`)
    }

    const followHandler = () => {
        follow(Posts.post.userId)
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
                            <img src={Posts.post.createdBy.avatar ? `http://localhost:5000/uploads/${Posts.post.createdBy.avatar}` : '/logo512.png'} alt="avatar" className="image" />
                        </div>
                        <div className="postName">
                            <span className="f-18"><strong>{Posts.post.title}</strong></span>
                            <span className="f-14">{Posts.post.createdBy.fullName}</span>
                        </div>
                    </div>
                    <div className="upperDetailPostRight">
                        <div className="buttonPlacer">
                            {Posts.post.userId === Auth.userData.id ?
                                <>
                                    <button className="text-black button editPost pointer" >Edit Post</button>
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
                    <img src={`http://localhost:5000/uploads/${state.preview}`} alt="picture" className="image" />
                </div>
                <div className="listPostPic">
                    {
                        Posts.post.photos.map((photo) => {
                            return (
                                <div className="postPictSlider pointer" onClick={() => changePreview(photo.id)} key={photo.id}>
                                    <img src={`http://localhost:5000/uploads/${photo.image}`} alt="" className="image" />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="postDetails">
                    <span className="text-black"><i className="fas fa-hands-wash text-warning"></i><strong>Say Hello   </strong>
                        <a className="text-primary">{Posts.post.createdBy.email}</a></span>
                    <p>{Posts.post.description}</p>
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
    follow
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost)

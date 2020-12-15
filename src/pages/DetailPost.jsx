import React from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { getPost } from '../redux/actions/Posts';

export const DetailPost = ({ Posts, getPost }) => {

    const { id } = useParams()

    const history = useHistory()

    React.useEffect(() => {
        getPost(id)
    }, [])

    if (!Posts.post) {
        return (
            <h1>Loading....</h1>
        )
    }
    return (
        <div style={{ margin: "121px 80px" }}>
            <div className="">
                <div className="border" style={{ width: "50px", height: "50px", borderRadius: "50%", overflow: "hidden" }}>
                    <img src={`http://localhost:5000/uploads/${Posts.post.createdBy.avatar}`} alt="" className="image" />
                </div>
                <h3>{Posts.post.title}</h3>
                <h4>{Posts.post.createdBy.fullName}</h4>
                <div className="">
                    <button className="success">Follow</button>
                    <button className="" onClick={() => history.push(`/hired/${Posts.post.userId}`)}>Hire</button>
                </div>
            </div>
            <div className="border flex" style={{ flexWrap: "wrap" }}>
                {Posts.post.photos.map(photo => {
                    return (
                        <div className="border" style={{ width: "200px", height: "100px" }} key={photo.id}>
                            <img src={`http://localhost:5000/uploads/${photo.image}`} alt="photo" className="image" />
                        </div>
                    )
                })}
            </div>
            <div className="">
                <h5><span style={{ color: "yellow" }}> <strong>Say Hi To:</strong> </span>{Posts.post.createdBy.email}</h5>
                <p>{Posts.post.description}</p>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    Posts: state.Posts
})

const mapDispatchToProps = {
    getPost
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Card from '../components/Home/Card'
import { getUser } from '../redux/actions/Auth'

export const Profile = ({ Auth, getUser }) => {

    const history = useHistory()

    const photos = [];
    const pusher = Auth.user ? Auth.user.posts.map((post) => post.photos.map(photo => {
        photos.push(photo)
    })) : "";

    const { id } = useParams()

    React.useEffect(() => {

        getUser(id);
    }, [])

    if (!Auth.user) {
        return (
            <h1>LOADING.......</h1>
        )
    } else {
        return (
            <div style={{ margin: "121px 80px" }}>
                <div className="border" style={{ width: "120px", height: "120px", borderRadius: "50%", overflow: "hidden" }}>
                    <img src={`http://localhost:5000/uploads/${Auth.user.avatar}`} alt="" className="image" />
                </div>
                <div className="border">
                    <h3>{Auth.user.fullName}</h3>
                    {Auth.user.id === Auth.userData.id ? (
                        <button onClick={() => history.push("/editProfile")}>Edit Profile</button>
                    ) : (
                            <><button>follow</button><button onClick={() => history.push(`/hired/${Auth.user.id}`)} >Hire</button></>
                        )}
                </div>
                <div className="border flex flexwrap">
                    {photos ? (
                        photos.map(photo => {
                            return (<Card image={photo.image} postId={photo.postId} />)
                        })
                    ) : ""}
                </div>
            </div>
        )
    }



}

const mapStateToProps = (state) => ({
    Auth: state.Auth
})

const mapDispatchToProps = {
    getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

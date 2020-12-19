import React, { Component } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Card from '../components/Home/Card'
import { getUser } from '../redux/actions/Auth'

export const Profile = ({ Auth, getUser }) => {

    const history = useHistory()

    const { id } = useParams()

    React.useEffect(() => {
        getUser(id);
    }, [id])

    const pushHired = () => {
        history.push(`/hired/${Auth.user.id}`)
    }
    const pushEdit = () => {
        history.push("/editProfile")
    }

    if (!Auth.user) {
        return (
            <div></div>
        )
    } else {
        return (
            <div className="container">
                <div className="bodyProfile">
                    <div className="profileBack"></div>
                    <div className="upperProfileBody flex">
                        <div className="upperProfieLeft">
                            <div className="profilePict">
                                <img src={Auth.user.avatar ? `http://localhost:5000/uploads/${Auth.user.avatar}` : "/logo512.png"} alt="avatar" className="image" />
                            </div>
                            <div className="userDetails">
                                <span className="f-18" >
                                    <strong>{Auth.user.fullName}</strong>
                                </span>
                            </div>
                            <div className="userDetails">
                                <span className="f-36"><strong>
                                    {
                                        Auth.user.greeting
                                    }
                                </strong></span>
                            </div>
                            <div className="ProfileButton flex">
                                {Auth.user.id !== Auth.userData.id ?
                                    <>
                                        <button className="text-black button pointer">Follow</button>
                                        <button onClick={pushHired} className="text-white button pointer" >Hire</button>
                                    </> :
                                    <button onClick={pushEdit} className="text-white button editProfile pointer" >Edit Profile</button>
                                }
                            </div>
                        </div>
                        <div className="upperprofileRight">
                            <div className="profilePostContainer">
                                {
                                    Auth.user.posts.length === 0 ?
                                        null :
                                        <img src={`http://localhost:5000/uploads/${Auth.user.posts[0].photos[0].image}`} alt="Last Post" className="image" />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="artPage">
                        <span><strong>
                            {
                                Auth.user.id !== Auth.userData.id ?
                                    "Geralt Works" : "My Works"
                            }
                        </strong></span>
                        <div className="artContainer">
                            {
                                Auth.user.arts ? Auth.user.arts.map(art => {
                                    return (
                                        <div className="photoContainer pointer" key={art.id} >
                                            <Card image={art.art} postId={art.id} />
                                        </div>
                                    )
                                }) :
                                    null
                            }
                        </div>
                    </div>
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

import React from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Card from '../../components/Home/Card'
import { follow, getUser } from '../../redux/actions/Auth'

export const Profile = ({ Auth, getUser, follow }) => {

    const history = useHistory()

    const { id } = useParams()

    const following = async () => {
        if (!Auth.user) {
            return null
        }
        const check = await Auth.userData.following.find(follow => follow.followTo === Number(id))
        console.log("CEK STATE", check);
        if (!check) {
            return setState(prevState => ({
                ...prevState,
                followed: 0
            }))
        }
        setState(prevState => ({
            ...prevState,
            followed: 1
        }))
    }

    const innitialValue = {
        followed: 0,
    }
    const [state, setState] = React.useState(innitialValue)


    React.useEffect(() => {
        getUser(id);
    }, [id])
    React.useEffect(() => {
        following()
    }, [Auth.userData.following, Auth.user])
    const pushHired = () => {
        history.push(`/hired/${Auth.user.id}`)
    }
    const pushEdit = () => {
        history.push("/editProfile")
    }
    const followHandler = () => {
        follow(id)
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
                                        {
                                            !state.followed ?
                                                <button className="text-black button pointer" onClick={followHandler} >Follow</button> :
                                                <button className="text-black button pointer" onClick={followHandler} >Unfollow</button>
                                        }
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
    getUser,
    follow
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

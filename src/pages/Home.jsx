import React, { useState } from 'react'
import { connect } from 'react-redux'
import Card from '../components/Home/Card'
import { getPosts } from '../redux/actions/Posts'

function Home({ Posts, getPosts }) {

    const innitialState = {
        options: true,
        search: '',
        message: "today's posts"
    }

    const [state, setState] = useState(innitialState)


    const changeHandler = (e) => {
        setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
            message: (e.target.name === "options") ? (e.target.value === "true" ? "today's posts" : "all posts") : ""
        }))
    }

    React.useEffect(() => {
        getPosts()
    }, [])

    const postsToday = Posts.posts ? Posts.posts.filter(post => (Date.now() - new Date(post.createdAt).getTime()) < (24 * 60 * 60 * 1000)) : "";
    const allPosts = Posts.posts ? Posts.posts.map(photo => photo) : ""

    const ShowToday = () => {
        return (
            <>
                {
                    postsToday.map(post => {
                        return (
                            <div className="photoContainer pointer">
                                <Card image={post.photos[0].image} postId={post.id} key={post.id} />
                            </div>
                        )
                    })
                }
            </>
        )
    }
    const ShowAll = () => {
        return (
            <>
                {
                    allPosts.map(post => {
                        return (
                            <div className="photoContainer pointer">
                                <Card image={post.photos[0].image} postId={post.id} key={post.id} />
                            </div>
                        )
                    })
                }
            </>
        )
    }

    if (!Posts.photos) {
        return (
            <div></div>
        )
    } else {
        return (
            <div className="container">
                <div className="flex">
                    <div className="headerPartLeft">
                        <select onChange={changeHandler} name="options" className="postSelector">
                            <option value={true}>Today</option>
                            <option value={false}>All Posts</option>
                        </select>
                    </div>
                    <div className="headerPartRight">
                        <div className="searchBar flex">
                            <i className="fas fa-search"></i>
                            <input type="text" name="search" placeholder="Search" onChange={changeHandler} value={state.search} className="searchInput" />
                        </div>
                    </div>
                </div>
                <div className="middleHome">
                    <span><strong>{state.message}</strong></span>
                </div>
                <div className="postContainer">
                    {
                        state.options ? <ShowToday /> : <ShowAll />
                    }
                </div>
            </div>



            // <div style={{ margin: "121px 80px" }}>
            //     <div className="border flex" style={{ flexWrap: "wrap" }}>
            //         <button onClick={today}>Today's Post</button>
            //         <button onClick={all}>All Posts</button>
            //         <h1>{state ? "All Posts" : "Today's Post"}</h1>
            //         {state ? photosToday.map(photo => {
            //             return (
            //                 <Card image={photo.image} postId={photo.postId} key={photo.id} />
            //             )
            //         }) : allPhotos.map(photo => {
            //             return (
            //                 <Card image={photo.image} postId={photo.postId} key={photo.id} />
            //             )
            //         })}
            //     </div>
            // </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        Posts: state.Posts
    }
}

export default connect(mapStateToProps, { getPosts })(Home)

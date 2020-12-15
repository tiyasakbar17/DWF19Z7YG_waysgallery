import React, { useState } from 'react'
import { connect } from 'react-redux'
import Card from '../components/Home/Card'
import { getPosts } from '../redux/actions/Posts'

function Home({ Posts, getPosts }) {

    const [state, setState] = useState(false)

    const today = () => {
        setState(false)
    }
    const all = () => {
        setState(true)
    }

    React.useEffect(() => {
        getPosts()
    }, [])

    // const created = Date.now() - new Date(.createdAt).getTime();

    const photosToday = Posts.photos ? Posts.photos.filter(photo => (Date.now() - new Date(photo.createdAt).getTime()) < (24 * 60 * 60 * 1000)) : "";
    const allPhotos = Posts.photos ? Posts.photos.map(photo => photo) : ""


    if (!Posts.photos) {
        return (<h1>Loading....</h1>)
    } else {

        return (
            <div style={{ margin: "121px 80px" }}>
                <div className="border flex" style={{ flexWrap: "wrap" }}>
                    <button onClick={today}>Today's Post</button>
                    <button onClick={all}>All Posts</button>
                    <h1>{state ? "All Posts" : "Today's Post"}</h1>
                    {state ? photosToday.map(photo => {
                        return (
                            <Card image={photo.image} postId={photo.postId} key={photo.id} />
                        )
                    }) : allPhotos.map(photo => {
                        return (
                            <Card image={photo.image} postId={photo.postId} key={photo.id} />
                        )
                    })}
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        Posts: state.Posts
    }
}

export default connect(mapStateToProps, { getPosts })(Home)

import React, { useState } from 'react'
import { connect } from 'react-redux'
import Card from '../../components/Home/Card'
import { getPosts } from '../../redux/actions/Posts'

function Home({ Posts, getPosts }) {
    const compare = (key) => {
        return (a, b) => {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return 0;
            }
            let comparison = 0;
            if (a[key] < b[key]) {
                comparison = 1;
            }
            if (a[key] > b[key]) {
                comparison = -1;
            }
            return comparison;
        };
    };

    const innitialState = {
        options: 'true',
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

    let postsToday = []
    const copyPost = Posts.posts ? Posts.posts.sort(compare("createdAt")).map(post => (Date.now() - new Date(post.createdAt).getTime()) < (24 * 60 * 60 * 1000) ? postsToday.push(post) : null) : null;
    const allPosts = Posts.posts

    const ShowToday = () => {
        return (
            <>
                {
                    postsToday.map(post => {
                        return (
                            <div className="photoContainer pointer" key={post.id}>
                                <Card image={post.photos[0].image} postId={post.id} />
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
                            <div className="photoContainer pointer" key={post.id} >
                                <Card image={post.photos[0].image} postId={post.id} />
                            </div>
                        )
                    })
                }
            </>
        )
    }

    if (!Posts.posts) {
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
                        state.options === 'true' ? <ShowToday /> : <ShowAll />
                    }
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

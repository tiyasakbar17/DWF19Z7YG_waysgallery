const innitialState = {
    loading: true,
    posts: null,
    photos: null,
    post: null,
};

const Posts = (state = innitialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "GET_POSTS":
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case "LOAD_PHOTOS":
            const photos = [];
            state.posts.map((post) => post.photos.map(photo => {
                photos.push(photo)
            })
            );
            return {
                ...state,
                photos: photos
            }
        case "GET_POST":
            return {
                ...state,
                post: payload
            }
        default:
            return state;
    }
}

export default Posts;
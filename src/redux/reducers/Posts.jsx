const innitialState = {
    loading: true,
    posts: null,
    photos: null,
    post: null,
    loadingPost: true
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
        case "LOADING_POST":
            return {
                ...state,
                loadingPost: true

            }
        case "GET_POST":
            return {
                ...state,
                post: payload,
                loadingPost: false
            }
        default:
            return state;
    }
}

export default Posts;
const iState = {
    posts: [],
    singlePost: [],
    loginData: [{ name: 'user', password: '123456', email: 'abc@gmail.com' }],
    isSignedIn: false,
    comments: []
};

const reducer = (state = iState, action) => {
    switch (action.type) {
        case "signIn":
            console.log('action.payload.isSignedIn', action.payload.isSignedIn)
            return {
                "loginData": state.loginData,
                "posts": state.posts,
                "isSignedIn": action.payload.isSignedIn,
                "singlePost": state.singlePost,
                "comments": state.comments
            }
        case "createUser":
            const data = { "name": action.payload.name, "password": action.payload.password, "email": action.payload.email }
            return {
                "loginData": [...state.loginData, data],
                "posts": state.posts,
                "isSignedIn": state.isSignedIn,
                "singlePost": state.singlePost,
                "comments": state.comments
            }
        case "getPosts":
            return {
                "loginData": state.loginData,
                "posts": action.payload.posts,
                "isSignedIn": state.isSignedIn,
                "singlePost": state.singlePost,
                "comments": state.comments
            }
        case "getSinglePost":
            return {
                "loginData": state.loginData,
                "posts": state.posts,
                "isSignedIn": state.isSignedIn,
                "singlePost": action.payload.singlePost,
                "comments": state.comments
            }
        case "getComments":
            return {
                "loginData": state.loginData,
                "posts": state.posts,
                "isSignedIn": state.isSignedIn,
                "singlePost": state.singlePost,
                "comments": action.payload.comments
            }
        default:
            return state;
    }
}

export default reducer;
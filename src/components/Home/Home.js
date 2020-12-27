import React, { useEffect } from 'react'
import './Home.css';
import { connect } from "react-redux";
import { Button } from '@material-ui/core';
import Axios from 'axios'

const Home = (props) => {

    useEffect(() => {
        Axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((res)=>{
                props.getPostsData(res.data)
            })
    }, [])

    const logout = () => {
        props.signIn(false);
        localStorage.removeItem("isLoggedIn");
        props.history.push('/');
    }

    const postDetails = (postId) => {
        Axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then((res)=>{
                props.getSinglePost([res.data])
            }).then(
                Axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                    .then((res)=>{
                        props.getComments(res.data)
                    })
            ).then(
                props.history.push('/posts')
            )
            
    }

    return (
        <div className="position" >
            <Button onClick={() => logout()}>Logout</Button>
            <table className="table-pos">
                <tbody>
                    <tr>
                        <th>PostID</th>
                        <th>Title</th>
                        <th>Body</th>
                    </tr>
                    {
                        props.posts && props.posts.length > 0 ?
                            props.posts.map(d => {
                                return (<tr key={d.id} onClick={() => postDetails(d.id)}>
                                    <td>{d.id}</td>
                                    <td>{d.title}</td>
                                    <td>{d.body}</td>
                                </tr>)
                            })
                        : null
                    }
                </tbody>
            </table>
        </div >
    );

}


const mapStateToProps = state => {
    return {
        posts: state.posts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPostsData: (posts) => {
            dispatch({ type: 'getPosts', payload: { "posts": posts } })
        },
        getSinglePost: (singlePost) => {
            dispatch({ type: 'getSinglePost', payload: { "singlePost": singlePost } })
        },
        signIn: (isSignedIn) => {
            dispatch({
                type: 'signIn',
                payload: {
                    "isSignedIn": isSignedIn
                }
            })
        },
        getComments: (comments) => {
            dispatch({ type: 'getComments', payload: { "comments": comments } })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

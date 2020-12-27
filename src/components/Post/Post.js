import React from 'react';
import { connect } from "react-redux";

const Post = (props) => {

    return (
        <div className="position">
            {
                        props.singlePost && props.singlePost.length > 0 ?
                            props.singlePost.map(d => {
                                return (<tr key={d.id} >
                                    <td>PostId: {d.id}</td>
                                    <td>Title: {d.title}</td>
                                    <td>Body: {d.body}</td>
                                </tr>)
                            })
                        : null
                    }
            <table className="table-pos">
                <tbody>
                    <tr>
                        <th>PostID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Body</th>
                    </tr>
                    {
                        props.comments && props.comments.length > 0 ?
                            props.comments.map(d => {
                                return (<tr key={d.id} >
                                    <td>{d.postId}</td>
                                    <td>{d.name}</td>
                                    <td>{d.email}</td>
                                    <td>{d.body}</td>
                                </tr>)
                            })
                        : null
                    }
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        singlePost: state.singlePost,
        comments: state.comments
    };
};

export default connect(mapStateToProps)(Post);

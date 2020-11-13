import React, { useState } from 'react'
import { Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';

const { TextArea } = Input;
function Comment(props) {


    const videoId = props.postId;
    const user = useSelector(state => state.user)
    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: Comment,
            writer: user.userData._id,
            postId: videoId
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    props.refreshFunction(response.data.result)
                    
                } else {
                    alert('Failed to save Comment')
                }
            })
    }



    return (
        <div>
            <br />
            <p> replies</p>
            <hr />
            {/* Comment Lists  */}
           

            {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                    )
                 
                ))}

          


            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="코멘트를 작성해 주세요."
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>

        </div>
    )
}

export default Comment

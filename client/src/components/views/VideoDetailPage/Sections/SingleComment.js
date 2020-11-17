import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes';

const { TextArea } = Input;
function SingleComment(props) {

    const videoId = props.postId;
    const user = useSelector(state => state.user)
    const [CommentValue, setCommentValue] = useState("")


    const handleChange = (e) => {
        
        setCommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: videoId,
            responseTo: props.comment._id
             
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("")
                    setOpenReply(false)
                    props.refreshFunction(response.data.result)
                    console.log(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    const [OpenReply, setOpenReply] = useState(false)

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply);
    }

    const actions = [
        <LikeDislikes userid={localStorage.getItem('user')} commentId={props.comment._id} />
        ,<span onClick={onClickReplyOpen} key="comment-basic-reply-to" >Reply to</span>
    ]
    
    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={
                    <Avatar
                        src={props.comment.writer.image}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>

            

            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="코멘트를 작성해주세요."
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
                </form>
            }

        </div>
    )
}

export default SingleComment

import { useState } from "react";
import moment from "moment";
import { Modal } from "react-bootstrap";
import axios from "axios";

const EditComment = ({ data, id, closeEditCommentModal }) => {
    const [editdata, setEditData] = useState({
        username: data.username,
        comments: {
            comment: data.comments,
            commentAt: moment().format('MMMM Do YYYY, h:mm:ss a')
        },
    })

    const [newcomment, setNewComment] = useState();
    const [isComment, setIsComment] = useState(false);

    const handleUser = (event) => {
        setEditData({
            ...editdata,
            [event.target.name]: event.target.value
        })
    }


    const handleUpdate = (event) => {
        event.preventDefault();
        if (isComment === true) {
            const newCommentObj = {
                comment: newcomment,
                commentAt: moment().format('MMMM Do YYYY, h:mm:ss a')
            }

            const previousComment = data.comments;
            previousComment.push(newCommentObj);
            console.log(previousComment);

            const payload = {
                ...editdata,
                comments: previousComment
            }

            axios.patch(`https://codersid-backend.vercel.app/api/comments/${id}`, payload)
                .then((response) => {
                    alert(response.data.msg);
                    closeEditCommentModal();
                    window.location.reload(false);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else {
            const previousComment = data.comments;
            const payload = {
                ...editdata,
                comments: previousComment
            }
            axios.patch(`https://codersid-backend.vercel.app/api/comments/${id}`, payload)
                .then((response) => {
                    alert(response.data.msg);
                    closeEditCommentModal();
                    window.location.reload(false);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="text-black">
                    <p className='view-expense-details-modal-heading'>
                        Edit Comment
                    </p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={(event) => {
                    handleUpdate(event)
                }}>
                    <label htmlFor="username">Username</label><br />
                    <input className='form-control' type="text" name='username' value={editdata.username}
                        onChange={handleUser} required /><br />
                    <label htmlFor="comment">Comments</label><br />
                    <textarea className='form-control' name="comment" id="comment"
                        defaultValue={data.comments[data.comments.length - 1].comment}
                        cols="30" rows="10" onChange={(event) => {
                            setNewComment(event.target.value)
                            setIsComment(true)
                        }} required /><br />
                    <button className='btn btn-primary' type='submit'>Submit</button>
                </form>
            </Modal.Body>
        </>
    );
}

export default EditComment;
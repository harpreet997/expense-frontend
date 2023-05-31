import { Modal } from "react-bootstrap";

const CommentDetails = ({ data }) => {
    console.log(data)
    console.log(data.comments);
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="text-black">
                    <p className='view-expense-details-modal-heading'>
                        Comment Details
                    </p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>UserName</th>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data.username}</td>
                                {data.comments.map((item) => {
                                    return (
                                        <div className="d-flex flex-column">
                                        <td>{item.comment} on {item.commentAt}</td><br/>
                                        </div>
                                    )
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Modal.Body>
        </>
    );
}

export default CommentDetails;
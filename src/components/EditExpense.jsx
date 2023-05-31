import { useState } from 'react';
import { Modal } from "react-bootstrap";

const EditExpense = () => {
    const [editexpensedata, setEditExpenseData] = useState({
        categoryName: "",
        expenseName: "",
        vendor: "",
        Amount: "",
        bill: ""
    })

    const handleChange = (event) => {
        setEditExpenseData({
            ...editexpensedata,
            [event.target.name]: event.target.value
        })
    }

    const handleImage = (event) => {
        const file = event.target.files[0];
        setEditExpenseData({
            ...editexpensedata,
            [event.target.name]: file
        })
    }

    const UpdateExpense = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="text-black">
                    <p className='view-expense-details-modal-heading'>
                        Edit Expense
                    </p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={UpdateExpense}>
                    <label htmlFor="categoryName">Category Name</label><br />
                    <input className='form-control' type="text" name='categoryName' onChange={handleChange} /><br />
                    <label htmlFor="expenseName">Expense Name</label><br />
                    <input className='form-control' type="text" name='expenseName' onChange={handleChange} /><br />
                    <label htmlFor="vendor">Vendor Email</label><br />
                    <input className='form-control' type="email" name='vendor' onChange={handleChange} /><br />
                    <label htmlFor="Amount">Amount</label><br />
                    <input className='form-control' type="number" name='Amount' onChange={handleChange} /><br />
                    <label htmlFor="bill">Upload Bill</label><br />
                    <input type="file" accept="application/pdf" name='bill' onChange={handleImage} /><br />
                    <button className='mt-3 btn btn-primary' type='submit'>Update Expense</button>

                </form>
            </Modal.Body>
        </>
    );
}

export default EditExpense;
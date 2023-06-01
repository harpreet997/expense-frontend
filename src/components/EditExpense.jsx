import { useState } from 'react';
import { Modal } from "react-bootstrap";
import { baseUrl } from '../baseurl';
import axios from 'axios';

const EditExpense = ({ data, id, closeEditExpenseModal }) => {
    const [editexpensedata, setEditExpenseData] = useState({
        categoryName: data.categoryName,
        expenseName: data.expenseName,
        vendor: data.vendor,
        Amount: data.Amount,
        bill: data.bill
    })
    const formdata = new FormData();

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
        formdata.append('categoryName', editexpensedata.categoryName)
        formdata.append('expenseName', editexpensedata.expenseName)
        formdata.append('vendor', editexpensedata.vendor)
        formdata.append('Amount', editexpensedata.Amount)
        formdata.append('bill', editexpensedata.bill)
        console.log(formdata);
        axios.patch(`http://localhost:4000/api/expenses/${id}`, formdata)
            .then((response) => {
                alert(response.data.msg);
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            })
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
                    <input className='form-control' type="text" name='categoryName' value={editexpensedata.categoryName}
                        onChange={handleChange} /><br />
                    <label htmlFor="expenseName">Expense Name</label><br />
                    <input className='form-control' type="text" name='expenseName' value={editexpensedata.expenseName}
                        onChange={handleChange} /><br />
                    <label htmlFor="vendor">Vendor Email</label><br />
                    <input className='form-control' type="email" name='vendor' value={editexpensedata.vendor}
                        onChange={handleChange} /><br />
                    <label htmlFor="Amount">Amount</label><br />
                    <input className='form-control' type="number" name='Amount' value={editexpensedata.Amount}
                        onChange={handleChange} /><br />
                    <label htmlFor="bill">Upload Bill</label><br />
                    <input type="file" accept="application/pdf" name='bill' onChange={handleImage} /><br />
                    <p><a className='text-decoration-none' href={`${baseUrl}${data.bill}`} download="Expense_Bill" target="_blank"
                        rel="noreferrer">{baseUrl}{data.bill}</a></p>
                    <button className='mt-3 btn btn-primary' type='submit'>Update Expense</button>

                </form>
            </Modal.Body>
        </>
    );
}

export default EditExpense;
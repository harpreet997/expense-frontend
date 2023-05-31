import { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import EditComment from './components/EditComment';
import moment from 'moment';
import axios from 'axios';
import './App.css';
import CommentDetails from './components/CommentDetails';
import { baseUrl } from './baseurl';

function App() {
  const [commentlist, setCommentList] = useState([]);
  const [data, setData] = useState({
    username: "",
    comments: {
      comment: "",
      commentAt: moment().format('MMMM Do YYYY, h:mm:ss a')
    },
  })
  const [editcommentmodal, setEditCommentModal] = useState(false);
  const [detailcommentmodal, setDetailCommentModal] = useState(false);


  const [expenselist, setExpenseList] = useState([]);
  const [expensedata, setExpenseData] = useState({
    categoryName: "",
    expenseName: "",
    vendor: "",
    Amount: "",
    bill: ""
  })

  const formdata = new FormData();

  useEffect(() => {
    axios.get(`${baseUrl}/api/expenses`)
      .then((response) => {
        setExpenseList(response.data.Expenses);
      })

    axios.get('https://codersid-backend.vercel.app/api/comments')
      .then((response) => {
        setCommentList(response.data.Comments);
      })
  }, [])

  const handleUser = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const handleComment = (event) => {
    setData({
      ...data,
      comments: {
        ...data.comments,
        [event.target.name]: event.target.value
      }
    })
  }

  const handleEditCommentModal = (id) => {
    setEditCommentModal(id)
  };

  const handleDetailCommentModal = (id) => {
    setDetailCommentModal(id)
  };

  const closeEditCommentModal = () => setEditCommentModal(false);
  const closeDetailCommentModal = () => setDetailCommentModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://codersid-backend.vercel.app/api/comments', data)
      .then((response) => {
        setData(response.data.Comments);
        alert(response.data.msg);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handleChange = (event) => {
    setExpenseData({
      ...expensedata,
      [event.target.name]: event.target.value
    })

  }

  const handleImage = (event) => {
    const file = event.target.files[0];
    setExpenseData({
      ...expensedata,
      [event.target.name]: file
    })
  }

  const AddExpense = (event) => {
    event.preventDefault();
    formdata.append('categoryName', expensedata.categoryName)
    formdata.append('expenseName', expensedata.expenseName)
    formdata.append('vendor', expensedata.vendor)
    formdata.append('Amount', expensedata.Amount)
    formdata.append('bill', expensedata.bill)
    axios.post(`${baseUrl}/api/expenses`, formdata)
      .then((response) => {
        alert(response.data.msg);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handleExpenseReceipt = (item) => {
    const newItem = `${baseUrl}${item.bill}`
    const url = window.URL.createObjectURL(new Blob([newItem]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'expense-receipt.pdf');
    document.body.appendChild(link);
    link.click();
  }


  return (
    <div className="App">

      <form onSubmit={AddExpense}>
        <label htmlFor="categoryName">Category Name</label><br />
        <input type="text" name='categoryName' onChange={handleChange} /><br />
        <label htmlFor="expenseName">Expense Name</label><br />
        <input type="text" name='expenseName' onChange={handleChange} /><br />
        <label htmlFor="vendor">Vendor Email</label><br />
        <input type="email" name='vendor' onChange={handleChange} /><br />
        <label htmlFor="Amount">Amount</label><br />
        <input type="number" name='Amount' onChange={handleChange} /><br />
        <label htmlFor="bill">Upload Bill</label><br />
        <input type="file" accept="application/pdf" name='bill' onChange={handleImage} /><br />
        <button className='mt-3 btn btn-primary' type='submit'>Add Expense</button>
      </form>

      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Expense Name</th>
            <th>Vendor Email</th>
            <th>Amount</th>
            <th>Bill</th>
          </tr>
        </thead>
        <tbody>
          {expenselist.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.categoryName}</td>
                <td>{item.expenseName}</td>
                <td>{item.vendor}</td>
                <td>{item.Amount}</td>
                <td><a href={`${baseUrl}${item.bill}`} download="Expense_Bill" target="_blank"
                  rel="noreferrer">{baseUrl}{item.bill}</a> </td>
                {/* <td><button onClick={() => handleExpenseReceipt(item)}>Dowload Receipt</button></td> */}
              </tr>

            )
          })}

        </tbody>
      </table>

      <hr />

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label><br />
        <input type="text" name='username' onChange={handleUser} /><br />
        <label htmlFor="comment">Comments</label><br />
        <textarea name="comment" id="comment" cols="30" rows="10" onChange={handleComment} /><br />
        <button type='submit'>Submit</button>
      </form>

      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Usename</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {commentlist.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.username}</td>
                <td><button onClick={() => {
                  handleEditCommentModal(item._id)
                }}>Update</button> | <button onClick={() => {
                  handleDetailCommentModal(item._id)
                }}>Details</button></td>
                <Modal show={editcommentmodal === item._id ? true : false} onHide={closeEditCommentModal}>
                  <EditComment data={item} id={item._id} closeEditCommentModal={closeEditCommentModal} />
                </Modal>
                <Modal show={detailcommentmodal === item._id ? true : false} onHide={closeDetailCommentModal}>
                  <CommentDetails data={item} id={item._id} closeDetailCommentModal={closeDetailCommentModal} />
                </Modal>
              </tr>

            )
          })}

        </tbody>
      </table>

    </div>
  );
}

export default App;

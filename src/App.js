import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

const App = () => {

  const [students, setStudents] = useState([])
  const [isEditing, setIsEditing] = useState(true)
  const [post, setPost] = useState({
    name: '',
    year: '',
    group: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    axios.get(`https://6299cac86f8c03a97849acc4.mockapi.io/students`)
        .then((res) => {
          setPost(res.data)
        })
  }, [])

  const deletePost = async (id) => {
    await axios.delete(`https://6299cac86f8c03a97849acc4.mockapi.io/students/${id}`)
    const studentList = students.filter(item => item.id !== id)
    setStudents(studentList)
  }

  const handleEdit = (id) => {
    setIsEditing(true)
  }

  const createForm = async (e) => {
    e.preventDefault()
    const upLoadUser = await axios.post(`https://6299cac86f8c03a97849acc4.mockapi.io/students`, post)
    setPost([...post, upLoadUser.data])
    setPost('')
  }

  const handleChange  = (e) => {
    setPost({...post, [e.target.name]: e.target.value})
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      console.log(post)
      setPost('')
    }
  }

  return (
    <div className="App">
      <div className="formBlock">
        <form  onSubmit={createForm} onKeyPress={handleEnter}>
          <div className="formBox">
            <label className="labelName">Name: </label>
            <input type="text"
                   name="name"
                   className="name"
                   required
                   value={post.name}
                   onChange={handleChange}/>
          </div>
          <div className="formBox">
            <label className="labelYear">Year: </label>
            <input type="number"
                   name="year"
                   className="year"
                   required
                   value={post.year}
                   onChange={handleChange}/>
          </div>
          <div className="formBox">
            <label className="labelGroup">Group: </label>
            <input type="text"
                   name="group"
                   className="group"
                   required
                   value={post.group}
                   onChange={handleChange}/>
          </div>
          <div className="formBox">
              <label className="labelEmail">Email: </label>
              <input type="email"
                     name="email"
                     className="email"
                     required
                     value={post.email}
                     onChange={handleChange}/>
          </div>
          <div className="formBox">
            <label className="labelPhone">Phone: </label>
            <input type="number"
                   name="phone"
                   className="phone"
                   required
                   value={post.phone}
                   onChange={handleChange}/>
          </div>
          <div>
            {
              <button type="submit" className="formBtn">
                {isEditing ? "Update" : "Create"}
              </button>
            }
          </div>
        </form>
      </div>
      <table className="table-auto w-full">
        <thead>
        <tr className="bg-blue-500 text-center">
          <th
              className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent">
            #
          </th>
          <th
              className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent">
            Name
          </th>
          <th
              className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent">
            Year
          </th>
          <th
              className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent">
            Group
          </th>
          <th
              className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent">
           E-mail
          </th>
          <th
              className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent">
            Phone Number
          </th>
          <th className="w-1/6 min-w-[160px] text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent">
            Delete
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
            {post.id}
          </td>
          <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
            {post.name}
          </td>
          <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
            {post.year}
          </td>
          <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
            {post.group}
          </td>
          <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
            {post.email}
          </td>
          <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
            {post.phone}
          </td>
          <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
            <button style={{backgroundColor: "#DBAF41FF", color: "wheat", border: "1px solid grey", padding: "8px", borderRadius: "8px", margin: "0px 2px 0"}}
                    onClick={() => handleEdit(students.id)}
            >Edit</button>
            <button style={{backgroundColor: "#DB4141FF", color: "wheat", border: "1px solid grey", padding: "8px", borderRadius: "8px"}}
                    onClick={() => deletePost(students.id)}
            >Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;

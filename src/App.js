import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import AddUserModel from "./AddUserModel";

const App = () => {

  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [isEditingUser, setIsEditingUser] = useState(null)

  const deletePost = async (id) => {
    await axios.delete(`https://6299cac86f8c03a97849acc4.mockapi.io/students/${id}`)
    const studentList = students.filter(item => item.id !== id)
    setStudents(studentList)
  }

  const handleEdit = (student) => {
    setIsEditingUser(student)
    setOpenModal(true)
  }

  useEffect(() => {
    axios.get('https://6299cac86f8c03a97849acc4.mockapi.io/students')
        .then((res) => {
          setStudents(res.data)
          setIsLoading(false)
        })
  }, [])

  if (isLoading) {
    return "Loading"
  }

  return (
      <div className="App">
        {
          openModal &&
          <AddUserModel setOpenModal = {setOpenModal}
                        students = {students}
                        setStudents = {setStudents}
                        isEditingUser = {isEditingUser}
                        setIsEditingUser = {setIsEditingUser}
          />
        }
        <button style={{
          backgroundColor: "#249e08",
          color: "wheat",
          border: "1px solid grey",
          padding: "8px",
          borderRadius: "8px",
          margin: "30px"
        }}
                onClick={() => setOpenModal(true)}

        >Add new user
        </button>
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
              Actions
            </th>
          </tr>
          </thead>
          <tbody>
          {
            students.map((student) => (
                <tr key={student.id}>
                  <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                    {student.id}
                  </td>
                  <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                    {student.name}
                  </td>
                  <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                    {student.year}
                  </td>
                  <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                    {student.group}
                  </td>
                  <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                    {student.email}
                  </td>
                  <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                    {student.phone}
                  </td>
                  <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                    <button style={{
                      backgroundColor: "#DBAF41FF",
                      color: "wheat",
                      border: "1px solid grey",
                      padding: "8px",
                      borderRadius: "8px",
                      margin: "0px 2px 0"
                    }}
                            onClick={() => handleEdit(student)}

                    >Edit
                    </button>
                    <button style={{
                      backgroundColor: "#DB4141FF",
                      color: "wheat",
                      border: "1px solid grey",
                      padding: "8px",
                      borderRadius: "8px"
                    }}
                            onClick={() => deletePost(student.id)}

                    >Delete
                    </button>
                  </td>
                </tr>
            ))
          }
          </tbody>
        </table>
      </div>
  );
}

export default App;

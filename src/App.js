import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

const App = () => {

  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [update, setUpdate] = useState(null)
  const [newStudent, setNewStudent] = useState({
    name: '',
    year: '',
    group: '',
    email: '',
    phone: '',
  })

  const handleChange  = (e) => {
    setNewStudent({...newStudent, [e.target.name]: e.target.value})
  }

  const handleEdit = (student) => {
    setIsEditing(true)
    setUpdate(student.id)
    setNewStudent({
      name: student.name,
      year: student.year,
      group: student.group,
      email: student.email,
      phone: student.phone,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const upLoadUser = await axios.post(`https://6299cac86f8c03a97849acc4.mockapi.io/students`, newStudent)
    setStudents([...students, upLoadUser.data])
    setNewStudent({
      name: '',
      year: '',
      group: '',
      email: '',
      phone: '',
    })
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setNewStudent('')
    }
  }

  const updateUser = async (e) => {
    e.preventDefault()
    const updateUser = await axios.put(`https://6299cac86f8c03a97849acc4.mockapi.io/students/${update}`, newStudent)
    const updateStudents = students.map(item => item.id === updateUser.data.id ? updateUser.data : item)
    setStudents(updateStudents)
    setIsEditing(false)
    setNewStudent({
      name: '',
      year: '',
      group: '',
      email: '',
      phone: '',
    })
  }

  const deletePost = async (id) => {
    await axios.delete(`https://6299cac86f8c03a97849acc4.mockapi.io/students/${id}`)
    const studentList = students.filter(item => item.id !== id)
    setStudents(studentList)
  }

  useEffect(() => {
    axios.get('https://6299cac86f8c03a97849acc4.mockapi.io/students')
        .then((res) => {
          setStudents(res.data)
          setNewStudent(res.data)
          setIsLoading(false)
        })
  }, [])

  if (isLoading) {
    return "Loading"
  }

  return (
    <div className="App">
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={isEditing ? updateUser : handleSubmit} onKeyPress={handleEnter}>
            <div className="mb-5">
              <label
                  htmlFor="name"
                  className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Name
              </label>
              <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  value={newStudent.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                  htmlFor="year"
                  className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Year
              </label>
              <input
                  type="date"
                  name="year"
                  id="year"
                  placeholder="Enter your year"
                  value={newStudent.year}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                  htmlFor="group"
                  className="mb-3 block text-base font-medium text-[#07074D]"
              >
               Group
              </label>
              <input
                  type="text"
                  name="group"
                  id="group"
                  placeholder="Enter your group"
                  value={newStudent.group}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                  htmlFor="email"
                  className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Email
              </label>
              <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@domain.com"
                  value={newStudent.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                  htmlFor="phone"
                  className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Phone
              </label>
              <input
                  type="string"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone"
                  value={newStudent.phone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div>
              <button
                  className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
              >
                {isEditing ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
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

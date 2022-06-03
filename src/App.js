import './App.css';
import {useState} from "react";

const App = () => {
  const [post, setPost] = useState({
    name: '',
    year: '',
    group: '',
    email: '',
    phone: '',
  })

  const createForm = (e) => {
    e.preventDefault()
    console.log(post)
    setPost('')
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
                   onChange={(e) => setPost({...post, name: e.target.value})}/>
          </div>
          <div className="formBox">
            <label className="labelYear">Year: </label>
            <input type="number"
                   name="year"
                   className="year"
                   required
                   value={post.year}
                   onChange={(e) => setPost({...post, year: e.target.value})}/>
          </div>
          <div className="formBox">
            <label className="labelGroup">Group: </label>
            <input type="text"
                   name="group"
                   className="group"
                   required
                   value={post.group}
                   onChange={(e) => setPost({...post, group: e.target.value})}/>
          </div>
          <div className="formBox">
              <label className="labelEmail">Email: </label>
              <input type="email"
                     name="email"
                     className="email"
                     required
                     value={post.email}
                     onChange={(e) => setPost({...post, email: e.target.value})}/>
          </div>
          <div className="formBox">
            <label className="labelPhone">Phone: </label>
            <input type="number"
                   name="phone"
                   className="phone"
                   required
                   value={post.phone}
                   onChange={(e) => setPost({...post, phone: e.target.value})}/>
          </div>
          <button type="submit" className="formBtn">Creat</button>
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
        </tr>
        </thead>
        <tbody>
        <tr>
          <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
            .com
          </td>
          <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
            .com
          </td>
          <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
            .com
          </td>
          <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
            .com
          </td>
          <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
            .com
          </td>
          <td className="text-center text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
            .com
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;

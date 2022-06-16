import React from 'react';
import axios from "axios";
import {useFormik} from "formik";
import * as Yup from 'yup';

const AddUserModel = ({students, setStudents, setOpenModal, isEditingUser, setIsEditingUser}) => {

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    const formik = useFormik({
        initialValues:{
            name: isEditingUser?.name || '',
            year: isEditingUser?.year || '',
            group: isEditingUser?.group || '',
            email: isEditingUser?.email || '',
            phone: isEditingUser?.phone || ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Must be 3 characters more')
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            year: Yup.string()
                .min(3, 'Must be 3 characters more')
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            group: Yup.string()
                .min(3, 'Must be 3 characters more')
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            phone: Yup.string()
                .min(6, 'Must be 3 characters more')
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
        }),
        onSubmit: async (values) => {
            if (isEditingUser.name) {
                const {data:updateUser} = await axios.put(`https://6299cac86f8c03a97849acc4.mockapi.io/students/${isEditingUser.id}`, values)
                const updateStudentsList = students.map(item => item.id === isEditingUser.id ? updateUser : item)
                setStudents(updateStudentsList)
            }else {
                const upLoadUser = await axios.post(`https://6299cac86f8c03a97849acc4.mockapi.io/students`, values)
                setStudents([...students, upLoadUser.data])
            }
            setOpenModal(false)
        }
    })

    return (
        <div>
            <div className="fixed justify-center flex w-full bg-white p-6">
                <div className="absolute right-9 top-9 cursor-pointer" onClick={()=> {
                    setOpenModal(false)
                    setIsEditingUser(null)
                }}>X</div>
                <form onSubmit={formik.handleSubmit} onKeyPress={handleEnter}>
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
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-red-500">{formik.errors.name}</div>
                        ) : null}
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
                            value={formik.values.year}
                            onChange={formik.handleChange}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                        {formik.touched.year && formik.errors.year ? (
                            <div className="text-red-500">{formik.errors.year}</div>
                        ) : null}
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
                            value={formik.values.group}
                            onChange={formik.handleChange}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                        {formik.touched.group && formik.errors.group ? (
                            <div className="text-red-500">{formik.errors.group}</div>
                        ) : null}
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
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500">{formik.errors.email}</div>
                        ) : null}
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
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <div className="text-red-500">{formik.errors.phone}</div>
                        ) : null}
                    </div>
                    <div>
                        <button type="submit"
                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                        >
                            {isEditingUser ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModel;
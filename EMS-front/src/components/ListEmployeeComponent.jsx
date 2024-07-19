// eslint-disable-next-line no-unused-vars
import React , { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {
    const [employee,setEmployee] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        getAllEmployee();
    },[])
    function getAllEmployee(){
        listEmployees().then((response)=>{
            setEmployee(response.data)
        }).catch(error=>{
            console.error(error);
        })
    }
function addNewEmployee(){
    navigate('/add-employee')
}
function updateEmployee(id){
    navigate(`/edit-employee/${id}`)
}
 function removeEmployee(id){
    console.log(id);
    // eslint-disable-next-line no-unused-vars
    deleteEmployee(id).then((response)=>{
        getAllEmployee();
    }).catch(error =>{
        console.log(error)
    })
 }
  return (
    <div className='container'>

        <h2 className='text-center'>List Of Employee</h2>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employee.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-info' onClick={()=>updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-danger' onClick={()=> removeEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                        )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent
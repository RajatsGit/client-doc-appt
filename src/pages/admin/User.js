import React ,{useState, useEffect}from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd';
const User = () => {
  const [users,setUsers] = useState();

  const getUsers = async()=>{
    try {
      const response = await axios.get('/api/v1/admin/getAllUsers',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        setUsers(response.data.data)
      } 
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getUsers();
  },[])
  
  // Table for Users Data
  const columns = [
    {
      title:'Name',
      dataIndex:'name'
    },
    {
      title:'Email',
      dataIndex:'email'
    },
    {
      title:'Doctor',
      dataIndex:'isDoctor',
      render:(text, record)=>(
        <span>{record.isDoctor ? 'Yes' : 'No'}</span>
      )
    },
    {
      title:'Actions',
      dataIndex:'actions',
      render: (text, record) => (
        <div className='d-flex'>
          <button className='btn btn-danger'>Block</button>
        </div>
      )
    }
  ]

  return (
    <Layout>
        <h1 className='text-center m-2'>UsersList</h1>
        <Table columns={columns} dataSource={users}></Table>
    </Layout>
  )
}

export default User
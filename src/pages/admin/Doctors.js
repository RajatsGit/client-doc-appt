import React , {useState, useEffect} from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { message, Table } from 'antd';
const Doctors = () => {
  const [doctors,setDoctors] = useState();

  const getDoctors = async()=>{
    try {
      const response = await axios.get('/api/v1/admin/getAllDoctors',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        setDoctors(response.data.data)
      } 
    } catch (error) {
      console.log(error);
    }
  }

  // handleaccount
  const handleAccountStatus = async(record, status)=>{
    try {
      const response = await axios.post('/api/v1/admin/changeAccountStatus',{doctorId: record._id,userID: record.userId, status: status},{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        message.success(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error('Something Went Wrong')
    }
  }

  useEffect(()=>{
    getDoctors();
  },[])
  
  // Table for Doctors Data
  const columns = [
    {
      title:'Name',
      dataIndex:'name',
      render:(text,record)=>(
        <span>{record.firstName} {record.lastName}</span>
      )
    },
    {
      title:'Status',
      dataIndex:'status'
    },
    {
      title:'Phone Number',
      dataIndex:'phone',
    },
    {
      title:'Actions',
      dataIndex:'actions',
      render: (text, record) => (
        <div className='d-flex'>
          {record.status === 'pending' ? 
          <button className='btn btn-success' onClick={()=> handleAccountStatus(record,'approved')}>Approve</button> 
          : 
          <button className='btn btn-danger'>Reject</button>}
          
        </div>
      )
    }
  ]

  return (
    <Layout>
        <h1 className='text-center m-2'>Doctors List</h1>
        <Table columns={columns} dataSource={doctors}></Table>
    </Layout>
  )
}

export default Doctors
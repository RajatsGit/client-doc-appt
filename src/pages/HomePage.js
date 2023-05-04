import React,{useEffect, useState} from 'react'
import axios from 'axios';
import Layout from '../components/Layout';
import { Row } from 'antd';
import DoctorsList from '../components/DoctorsList';

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  
  // const getUserData
  const getUserData =async () => {
    try {
      const response = await axios.get('/api/v1/user/getAllDoctors',{
        headers:{
          Authorization : "Bearer " + localStorage.getItem('token')
        }
      })
      if(response.data.success){
        setDoctors(response.data.data)
      }
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(()=>{
    getUserData();
  },[])
  return (
    <Layout>
    <h1 className='text-center'>HomePage</h1>
    <Row>
    {doctors && doctors.map(doctor=> (
          <DoctorsList doctor={doctor} />
    ))}
    </Row>
    </Layout>
  )
}

export default HomePage
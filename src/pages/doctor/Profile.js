import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Col, Form, Input, message, Row, TimePicker } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import moment from 'moment';


const Profile = () => {
    const {user} = useSelector(state => state.user);
    const [doctor, setDoctor] = useState();
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

//   updateDoctor  //   
    const handleFinish = async(values)=>{
        // console.log("new");
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/v1/doctor/updateProfile',
            {...values, userId:user._id,
                 timings:[
                moment(values.timings[0]).format('HH:mm'),
                moment(values.timings[1]).format('HH:mm')
            ]},
            {
              headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
              }
            })
            dispatch(hideLoading());
            if(response.data.success){
              message.success(response.data.message);
              navigate('/')
            }else{
              message.error(response.data.message)
            }
          } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('Something Went Worng');
          }
    }

     
    // getDocDetails
    const getDoctorInfo = async()=>{
        try {
            const response = await axios.post('/api/v1/doctor/getDoctorInfo',{userId: id},{
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){

                // eslint-disable-next-line
                setDoctor(response.data.data);
                // console.log(doctor);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getDoctorInfo();
    
    },[]);

   
  return (
    <Layout>
        <h1>Profile</h1>
        {doctor && (
            <Form layout="vertical" onFinish={handleFinish} className="m-3" 
            initialValues={{
                ...doctor,
                timings:[
                    moment(doctor.timings[0], 'HH:mm'),
                    moment(doctor.timings[1], 'HH:mm')
                ]
            }}>

            <h4 className="text-primary">Personal Details</h4>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your first name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your last name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Phone No."
                  name="phone"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your phone no." />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Email"
                  name="email"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="email" placeholder="your email" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Website"
                  name="website"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your website" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Address"
                  name="address"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your address" />
                </Form.Item>
              </Col>
            </Row>
            <h4 className="text-primary">Professional Details</h4>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Specialisation"
                  name="specialisation"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your specialization" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Experience"
                  name="experience"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your experience" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Fees per Consultation"
                  name="feesPerConsulation"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="number" placeholder="your phone no." />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Timings"
                  name="timings"
                  required
                  rules={[{ required: true }]}
                >
                  <TimePicker.RangePicker format="HH:mm" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}></Col>
              <Col xs={24} md={24} lg={8}>
                <button className="btn btn-primary form-btn">Update</button>
              </Col>
            </Row>
          </Form>
        )}
    </Layout>
  )
}

export default Profile
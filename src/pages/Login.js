import { Form, Input, message } from 'antd'
import React from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const submitHandler = async(values) =>{

    try {
      dispatch(showLoading());
      const response = await axios.post('/api/v1/user/login',values);
      // window.location.reload();
      dispatch(hideLoading());
      if(response.data.success){
        localStorage.setItem('token',response.data.token);
        message.success('Login Successfully');
        navigate('/')
      }else{
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('something went wrong');
    }
    
  }
  return (
    <>
      <div className='form-container'>
        <Form className='register-form' layout='vertical' onFinish={submitHandler}>
            <h3 className='text-center'>Login Form</h3>
            <Form.Item label='Email' name='email'>
                <Input type='email' required/>
            </Form.Item>
            <Form.Item label='Password' name='password'>
                <Input type='password' required/>
            </Form.Item>
            <Link to='/register' className='m-3'>Not Registered ? Click Here</Link>
            <button className='btn btn-primary' type='submit'>Login</button>
        </Form>
      </div>
    </>
  )
}

export default Login
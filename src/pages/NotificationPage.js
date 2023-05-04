import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { message, Tabs } from 'antd';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import {showLoading, hideLoading} from '../redux/features/alertSlice'
import { useNavigate } from 'react-router-dom';




const NotificationPage = () => {
  //  const {user} = useSelector(state=>state.user);
   const[user,setUser] = useState("");
   const navigate = useNavigate();
   const dispatch = useDispatch();

    const handleMarkAllRead =async()=>{
        try {
          dispatch(showLoading())
          const response = await axios.post('/api/v1/user/get-all-notification',{userId:user._id},
          {
            headers:{
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          console.log(response);
          dispatch(hideLoading());
          if(response.data.success){
            message.success(response.data.message);
          }else{
            message.error(response.data.message);
          }

        } catch (error) {
          dispatch(hideLoading());
          console.log(error);
          message.error('Something Went Wrong');
        }
    }



    const handleDeleteAll =async()=>{
      try {
        dispatch(showLoading());
        const response = await axios.post('/api/v1/user/delete-all-notification',{userId:user._id},{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log(response);
        dispatch(hideLoading());
        if(response.data.success){
          message.success(response.message);
        }else{
          message.error(response.message);
        }
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
        message.error('Something Went Wrong')
      }
  }

    // getUser
    const getUser = async()=>{
      const response = await axios.get('/api/v1/user/get-user',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(response.data.success){
        setUser(response.data.user);
        // console.log(user);
      }
    }
  useEffect(()=>{
    getUser();
      },[])

  return (
    <Layout>
    <h4 className='p-4 text-center'>NotificationPage</h4>
    <Tabs>
        <Tabs.TabPane tab="UnRead" key={0}>
            <div className='d-flex justify-content-end'>
              <h6 className='p-2 text-success' style={{cursor:'pointer'}} onClick={handleMarkAllRead}>Mark All As Read</h6></div>
              {user.notification && user.notification.map((msg)=>{
                return(
                  <div className='card' >
                    <div className='card-text' style={{cursor:'pointer'}} 
                    // onClick={() => navigate(msg.onClickPath)} 
                    >
                      {msg.message}
                    </div>
                  </div>
                )
              })}
        </Tabs.TabPane>
    
        <Tabs.TabPane tab="Read" key={1}>
            <div className='d-flex justify-content-end'>
              <h6 className='p-2 text-primary' style={{cursor:'pointer'}} onClick={handleDeleteAll}>Delete All</h6>
              </div>
              { user.seennotification && user.seennotification.map((messages)=>{
                return(
                  <div className='card' >
                    <div className='card-text' style={{cursor:'pointer'}} onClick={() => navigate(messages.onClickPath)} >
                      {messages.message}
                    </div>
                  </div>
                )
              })}
        </Tabs.TabPane>

    </Tabs>
    </Layout>
    
  )
}

export default NotificationPage
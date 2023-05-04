import React, { useEffect } from 'react'
import {Navigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';
const ProtedtedRoute = ({children}) => {

   const dispatch = useDispatch();

   const {user} = useSelector(state => state.user);

    // eslint-disable-next-line
   const getUser = async() => {
      try {
         dispatch(showLoading());
         const response = await axios.post('/api/v1/user/getUserData',
         {token: localStorage.getItem('token')},
         {
            headers:{
               Authorization: `Bearer ${localStorage.getItem('token')}`
            }
         })
         dispatch(hideLoading());
         if(response.data.success){
            dispatch(setUser(response.data.data))
         }else{
            <Navigate to='/login'/>
            localStorage.clear();
         }
      } catch (error) {
         dispatch(hideLoading());
         localStorage.clear();
         console.log(error);
      }

   }

   useEffect(() => {
     if(!user){
      getUser();
     }
   }, [user,getUser])
   

 if(localStorage.getItem('token')){
    return children
 }else{
    return <Navigate to='/login' />
 }
}

export default ProtedtedRoute
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  // const {user} = useSelector(state => state.user)
  const [user,setUser] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  // const [isAvailable, setIsAvailable] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  // const getSingleDoctorData
  const getSingleDoctorData = async () => {
    try {
      const response = await axios.post(
        "/api/v1/doctor/getDoctorById",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handleBooking

  const handleBooking = async () => {
    try {
      // setIsAvailable(true);
      if(!date && !time){
        return alert('Date & Time are required');
      }
      const response = await axios.post("/api/v1/user/book-appointment", {
        doctorId: params.doctorId,
        userId: user._id,
        doctorInfo: doctors,
        userInfo: user,
        date: date,
        time: time,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if(response.data.success){
        message.success(response.data.message)
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

//  Check Availability
const handleAvailability = async()=>{
  try {
    dispatch(showLoading());
    const response = await axios.post('/api/v1/user/booking-availability',
    {doctorId:params.doctorId,
      date,time
    },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    dispatch(hideLoading());
    if(response.data.success){
      // setIsAvailable(true)
      message.success(response.data.message)
    }else{
      message.error(response.data.message)
    }
  } catch (error) {
    dispatch(hideLoading());
    console.log(error);
    message.error('')
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
getSingleDoctorData();
  },[])

  // useEffect(() => {
    
  //   // eslint-disable-next-line
  // }, []);
  return (
    <Layout>
      <h1>Booking Page</h1>
      <div className="container m-2">
        {doctors && (
          <div>
            <h4>
              Dr. {doctors.firstName} {doctors.lastName}
            </h4>
            <h4>Fees : {doctors.feesPerConsulation}</h4>
            <h4>
              {/* Timings : {doctors && (doctors.timings[0] - doctors.timings[1])} */}
            </h4>
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) =>{
                  //  setIsAvailable(false);   
                  setDate(moment(value).format("DD-MM-YYYY"))

                }
                }
              />
              <TimePicker
                className="m-2"
                format="HH:mm"
                onChange={(value) => {
                  // setIsAvailable(false)
                  setTime(moment(value).format("HH:mm"))
                }}
              />
              <button className="btn btn-primary mt-2"
              onClick={handleAvailability}>
                Check Availability
              </button>
              {/* {!isAvailable &&  */}
               <button className="btn btn-dark mt-2" onClick={handleBooking}>
               Book Now
             </button>
             {/* } */}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;

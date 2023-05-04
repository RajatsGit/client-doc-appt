import React, { useEffect, useState } from "react";
import { Badge, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminMenu, userMenu } from "../data/data";
import "../styles/LayoutStyles.css";
import axios from "axios";


const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const[user,setUser] = useState("");


  // handlelogout
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully ");
    navigate("/login");
  };

  
  // Doctor Menu 
 const doctorMenu = [

  {
      name: 'Home',
      path:'/',
      icon: "fa-solid fa-house"
  },
  {
      name: 'Appointments',
      path:'/doctor-appointments',
      icon: "fa-solid fa-list"
  },
  {
      name: 'Profile',
      path:`/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user"
  }
]
// -----------------------

  // rendering menu list
  const SidebarMenu = user?.isAdmin 
  ? adminMenu 
  : user?.isDoctor 
  ? doctorMenu
  :userMenu;


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
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>DOC-APP</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && `active`}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className="menu-item" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" >
                <Badge count={user && user.notification.length} 
                onClick={()=>{navigate('/notification')}}
                style={{cursor:'pointer'}}
                >
                  <i className="fa-solid fa-bell"
                  style={{cursor:'pointer'}}></i>
                </Badge>
                <Link to="/profile">{user.isDoctor ? `Dr. ${user.name}` : user.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;

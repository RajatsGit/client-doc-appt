import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtedtedRoute from "./components/ProtedtedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import User from "./pages/admin/User";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              exact
              element={
                <ProtedtedRoute>
                  <HomePage />
                </ProtedtedRoute>
              }
            />
            <Route
              path="/apply-doctor"
              exact
              element={
                <ProtedtedRoute>
                  <ApplyDoctor />
                </ProtedtedRoute>
              }
            />
            <Route
              path="/admin/users"
              exact
              element={
                <ProtedtedRoute>
                  <User />
                </ProtedtedRoute>
              }
            />
            <Route
              path="/admin/doctors"
              exact
              element={
                <ProtedtedRoute>
                  <Doctors />
                </ProtedtedRoute>
              }
            />
            <Route
              path="/appointments"
              exact
              element={
                <ProtedtedRoute>
                  <Appointments />
                </ProtedtedRoute>
              }
            />
             <Route
              path="/doctor-appointments"
              exact
              element={
                <ProtedtedRoute>
                  <DoctorAppointments />
                </ProtedtedRoute>
              }
            />
            <Route
              path="/doctor/profile/:id"
              exact
              element={
                <ProtedtedRoute>
                  <Profile />
                </ProtedtedRoute>
              }
            />
            <Route
              path="/doctor/book-appointment/:doctorId"
              exact
              element={
                <ProtedtedRoute>
                  <BookingPage />
                </ProtedtedRoute>
              }
            />
            <Route
              path="/notification"
              exact
              element={
                <ProtedtedRoute>
                  <NotificationPage />
                </ProtedtedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;

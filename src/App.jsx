import './App.css';
import Register from './Components/Landing_Pages_Components/Register';
import Login from './Components/Landing_Pages_Components/Login'
import Home from './Components/Landing_Pages_Components/Home';
import Layout from './Components/Landing_Pages_Components/Layout';
import ContactUs from './Components/Landing_Pages_Components/ContactUs';
import ForgotPassword from './Components/Landing_Pages_Components/ForgotPassword';
import ResetPassword from './Components/Landing_Pages_Components/ResetPassword';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error404 from './Components/Landing_Pages_Components/Error404';
import AboutUs from './Components/Landing_Pages_Components/AboutUs';
import ServicesPage from './Components/Landing_Pages_Components/ServicesPage';
import AppointmentService from './Components/Landing_Pages_Components/AppointmentService';
import Demoform from './Components/Landing_Pages_Components/Demoform';

// Import Dashboard components (create these)
import PatientDashboard from './Components/DashBoards/PatientDashboard';
import DoctorDashboard from './Components/DashBoards/DoctorDashboard';
import AdminDashboard from './Components/DashBoards/AdminDashboard';
import Unathorized from './Components/Unathorized';
// Import ProtectedRoute component
import ProtectedRoute from './Components/DashBoards/ProtectedRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/home",
          element: <Home />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />
        },
        {
          path: "/reset-password/:token",
          element: <ResetPassword />
        },
        {
          path: "/contactUs",
          element: <ContactUs />
        },
        {
          path: "/about",
          element: <AboutUs />
        },
        {
          path: "/services",
          element: <ServicesPage />
        },
        {
          path: "/appointment",
          element: <AppointmentService />
        }
      ]
    },
    // Protected Dashboard Routes (outside Layout)
    {
      path: "/patient/*",
      element: (
        <ProtectedRoute allowedRoles={['ROLE_PATIENT']}>
          <PatientDashboard />
        </ProtectedRoute>
      )
    },
    {
      path: "/doctor/dashboard",
      element: (
        <ProtectedRoute allowedRoles={['ROLE_DOCTOR']}>
          <DoctorDashboard />
        </ProtectedRoute>
      )
    },
    {
      path: "/admin/dashboard",
      element: (
        <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
          <AdminDashboard />
        </ProtectedRoute>
      )
    },
    // Error routes
    {
      path: "/demoform",
      element: <Demoform />
    },
    {
      path:"/unauthorized",
      element: <Unathorized />
    },
    {
      path: "*",
      element: <Error404 />
    }
  ]);

  return (
    <div className="overflow-x-hidden bg-white-100 bg-cover bg-center bg-no-repeat w-screen h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
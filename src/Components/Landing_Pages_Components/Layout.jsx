// src/Components/Layout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Navbar from "./Navbar.jsx";
import Footer from './Footer.jsx';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Child routes will be rendered here */}
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
};

export default Layout;
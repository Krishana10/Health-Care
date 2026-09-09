import React from 'react';
import logoImg from "../../assets/OnlyLogo.png";
import { Link } from 'react-router-dom';

// SVG Icons for the Contact section
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);


const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200 mt-0">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    
                    {/* Column 1: Logo and Name */}
                    <div className='flex items-center gap-3'>
                        <img className='w-10 h-10' src={logoImg} alt="Ranja Hospital Logo" />
                        <span className='font-bold text-xl text-gray-800'>Healthcare Copilot</span>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h2 className="font-bold text-lg mb-4 text-gray-800">Quick Links</h2>
                        <ul className="space-y-2 text-gray-600">
                            <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
                            <li><Link to="/appointment" className="hover:text-blue-600 transition-colors">Appointment</Link></li>
                            <li><Link to="/services" className="hover:text-blue-600 transition-colors">Service</Link></li>
                            <li><Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
                            <li><Link to="/contactUs" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Hours */}
                    <div>
                        <h2 className="font-bold text-lg mb-4 text-gray-800">Hours</h2>
                        <ul className="space-y-2 text-gray-600">
                            <li>Monday: 9:00 - 18:00</li>
                            <li>Tuesday: 9:00 - 18:00</li>
                            <li>Wednesday: 9:00 - 18:00</li>
                            <li>Thursday: 9:00 - 18:00</li>
                            <li>Friday: 9:00 - 18:00</li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h2 className="font-bold text-lg mb-4 text-gray-800">Contact</h2>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-center gap-3">
                                <PhoneIcon />
                                <span>1800-2024-3360</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MailIcon />
                                <span>info@healthcare.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <LocationIcon />
                                <span>Chennai, Tamil Nadu</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-12 border-t border-gray-200 pt-6 text-center">
                    <p className="text-sm text-gray-500">
                        &copy; {currentYear} HealthCare Copilot. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
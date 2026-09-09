import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logoImg from "../../assets/OnlyLogo.png";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Using an array for nav links makes the code cleaner and easier to manage
    const navLinks = [
        { to: "/", text: "Home" },
        { to: "/appointment", text: "Appointment" },
        { to: "/services", text: "Services" },
        { to: "/about", text: "About Us" },
        { to: "/contactUs", text: "Contact Us" },
    ];

    const mobileMenuVariants = {
        hidden: { x: '100%', opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { type: 'tween', ease: 'easeInOut', duration: 0.3 } },
        exit: { x: '100%', opacity: 0, transition: { type: 'tween', ease: 'easeInOut', duration: 0.3 } }
    };

    const NavLinksComponent = ({ isMobile }) => (
        <ul className={`flex ${isMobile ? 'flex-col items-center gap-8' : 'items-center gap-1 font-semibold'}`}>
            {navLinks.map((link) => (
                <li key={link.to}>
                    <NavLink
                        to={link.to}
                        // This is the modern way to handle active link styling
                        className={({ isActive }) => 
                            `px-4 py-2 rounded-full transition-colors duration-300 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/70
                             ${isActive ? '!text-indigo-600 bg-indigo-100 font-bold' : ''}
                             ${isMobile ? 'text-2xl' : 'text-sm'}
                            `
                        }
                        onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                    >
                        {link.text}
                    </NavLink>
                </li>
            ))}
        </ul>
    );

    return (
        <>
            <nav className='bg-white/80 border-b border-gray-200/80 fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-2 backdrop-blur-lg shadow-sm'>
                
                {/* Left section: Logo */}
                <Link to="/" className='flex items-center gap-3' onClick={() => setIsMobileMenuOpen(false)}>
                    <img className='h-10 w-auto' src={logoImg} alt="HealthCare Copilot Logo" />
                    <span className='hidden sm:block text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500'>
                        HealthCare Copilot
                    </span>
                </Link>

                {/* Center section: Desktop Navigation */}
                <div className='hidden lg:flex'>
                    <NavLinksComponent isMobile={false} />
                </div>

                {/* Right section: Action Buttons */}
                <div className='hidden sm:flex items-center gap-3'>
                    <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 rounded-full hover:bg-gray-100 transition-colors duration-300">
                        Log In
                    </Link>
                    <Link to="/register" className="px-4 py-2 text-sm font-medium text-gray-700 rounded-full hover:bg-gray-100 transition-colors duration-300">
                        Register
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className='lg:hidden'>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-gray-700 hover:bg-gray-100">
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 z-40 bg-white pt-24 p-8 lg:hidden"
                    >
                        <div className="flex flex-col items-center h-full">
                            <NavLinksComponent isMobile={true} />
                            <div className='flex flex-col items-center gap-6 mt-12 w-full'>
                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 text-lg font-medium text-gray-700 rounded-full hover:bg-gray-100 transition-colors duration-300 border">
                                    Log In
                                </Link>
                                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 text-lg font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-sm">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Navbar;
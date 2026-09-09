import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { UserPlus, LogIn, CalendarCheck, Stethoscope, History, FileDown, FileUp, BellRing, MessageSquare } from 'lucide-react';
import BackgroundImage from "../../assets/BG4.jpg"; // Make sure this path is correct

const AppointmentsPage = () => {
    const features = [
        { icon: <Stethoscope />, name: 'Find Doctors', description: 'Search our network of verified specialists by name or specialty.' },
        { icon: <History />, name: 'View Your History', description: 'Access your complete appointment history and prescriptions anytime.' },
        { icon: <FileDown />, name: 'Download Documents', description: 'Securely download billing receipts and medical prescriptions as PDFs.' },
        { icon: <FileUp />, name: 'Upload Reports', description: 'Share lab results or medical reports directly with your doctor before your visit.' },
        { icon: <BellRing />, name: 'Appointment Reminders', description: 'Receive automated reminders so you never miss a visit.' },
        { icon: <MessageSquare />, name: 'Secure Messaging', description: 'Communicate securely with your doctor\'s office for follow-up questions.' },
    ];

    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] } }
    };

    return (
        <div className="bg-white text-gray-800">
            {/* 1. Hero Section */}
            <div className="relative bg-cover bg-center" style={{ backgroundImage: `url(${BackgroundImage})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30"></div>
                <div className="relative mx-auto max-w-4xl px-6 py-32 text-center sm:py-48 lg:py-56">
                    <motion.h1 
                        className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Your Health Journey, <span className="text-cyan-300">Simplified</span>.
                    </motion.h1>
                    <motion.p 
                        className="mt-6 text-lg leading-8 text-gray-200"
                        initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}
                    >
                        Follow our simple three-step process to take control of your medical appointments. Register as a patient, log in, and start managing your healthcare with ease.
                    </motion.p>
                </div>
            </div>

            {/* 2. Step-by-Step Guide Section */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <p className="text-base font-semibold leading-7 text-indigo-600">GETTING STARTED</p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to book and manage care</h2>
                </div>
                {/* Visual Timeline */}
                <div className="relative mx-auto mt-20 max-w-5xl">
                    <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gray-200 hidden md:block"></div>
                    <div className="space-y-16">
                        {/* Step 1 */}
                        <div className="md:flex md:items-center md:justify-start">
                            <div className="md:w-1/2 md:pr-8 text-center md:text-right">
                                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-600 text-white font-bold text-lg mb-4">1</div>
                                    <h3 className="text-2xl font-semibold text-gray-900">Create Your Account</h3>
                                    <p className="mt-2 text-gray-600">Click 'Register', fill out the form, and select the 'Patient' role to get instant access.</p>
                                    <Link to="/register" className="mt-4 inline-block text-sm font-semibold leading-6 text-indigo-600">Register Now <span aria-hidden="true">→</span></Link>
                                </motion.div>
                            </div>
                            <div className="absolute left-1/2 -ml-3 hidden md:block">
                                <div className="h-6 w-6 rounded-full bg-indigo-600 ring-8 ring-white"></div>
                            </div>
                        </div>
                        {/* Step 2 */}
                         <div className="md:flex md:items-center md:justify-end">
                             <div className="md:w-1/2 md:pl-8 text-center md:text-left">
                                 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                                     <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-600 text-white font-bold text-lg mb-4">2</div>
                                     <h3 className="text-2xl font-semibold text-gray-900">Log In Securely</h3>
                                     <p className="mt-2 text-gray-600">Use your new credentials to log in to your personal, secure dashboard.</p>
                                     <Link to="/login" className="mt-4 inline-block text-sm font-semibold leading-6 text-indigo-600">Log In Here <span aria-hidden="true">→</span></Link>
                                 </motion.div>
                            </div>
                             <div className="absolute left-1/2 -ml-3 hidden md:block">
                                 <div className="h-6 w-6 rounded-full bg-indigo-600 ring-8 ring-white"></div>
                             </div>
                         </div>
                        {/* Step 3 */}
                        <div className="md:flex md:items-center md:justify-start">
                            <div className="md:w-1/2 md:pr-8 text-center md:text-right">
                                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-600 text-white font-bold text-lg mb-4">3</div>
                                    <h3 className="text-2xl font-semibold text-gray-900">Book & Manage</h3>
                                    <p className="mt-2 text-gray-600">Search for doctors, view profiles, and book an appointment that fits your schedule.</p>
                                </motion.div>
                            </div>
                            <div className="absolute left-1/2 -ml-3 hidden md:block">
                                <div className="h-6 w-6 rounded-full bg-indigo-600 ring-8 ring-white"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Features Section */}
            <div className="bg-slate-50 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <p className="text-base font-semibold leading-7 text-indigo-600">YOUR PERSONAL HEALTH CO-PILOT</p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A Full Suite of Patient Tools</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">Our platform gives you the power to manage every aspect of your healthcare journey.</p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {features.map((feature) => (
                                <motion.div key={feature.name} className="relative pl-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                            {React.cloneElement(feature.icon, { color: 'white', size: 24 })}
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                                </motion.div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentsPage;
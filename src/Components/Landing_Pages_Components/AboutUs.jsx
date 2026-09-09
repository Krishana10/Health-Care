import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { HeartHandshake, Lightbulb, ShieldCheck, Github, Linkedin } from 'lucide-react';

import BackgroundImage from "../../assets/BG4.jpg"; 
// Import your images - ensure paths are correct
import missionImage from "../../assets/m1.jpg"; // An image for the mission section
import founderImage from '../../assets/founder.jpg'; // A professional headshot of yourself

// --- Reusable Component for Value Cards ---
const ValueCard = ({ icon, title, children }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-6">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600">{children}</p>
    </div>
);

const AboutUs = () => {
    // --- Animation Variants for Framer Motion ---
    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const staggerContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } }
    };

    return (
        <div className="bg-slate-50 text-gray-800">
            {/* 1. Hero Section: Modernized with background image */}
            <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white" style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black/50"></div>
                <motion.div 
                    className="relative z-10 px-6"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.h1 variants={fadeIn} className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
                        Reimagining Healthcare.
                    </motion.h1>
                    <motion.p variants={fadeIn} className="mt-6 max-w-2xl mx-auto text-lg text-gray-200">
                        We're on a mission to simplify the connection between patients and doctors through thoughtful technology.
                    </motion.p>
                </motion.div>
            </div>

            {/* 2. Our Mission Section */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
                <motion.div 
                    className="grid lg:grid-cols-2 lg:gap-24 lg:items-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerContainer}
                >
                    <motion.div variants={fadeIn}>
                        <h2 className="text-base font-semibold leading-7 text-indigo-600">OUR MISSION</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">To Simplify and Empower.</p>
                        <p className="mt-6 text-lg text-gray-600 leading-8">
                            We saw a world of frustrating phone calls and administrative burdens standing between people and their well-being. HealthCare Co-Pilot was built to eliminate these barriers, creating a direct and intuitive connection that empowers everyone to manage their health with confidence.
                        </p>
                    </motion.div>
                    <motion.div variants={fadeIn} className="mt-12 lg:mt-0">
                        <img className="rounded-2xl shadow-2xl w-full h-auto object-cover" src={missionImage} alt="Doctor and patient interacting" />
                    </motion.div>
                </motion.div>
            </div>

            {/* 3. Core Values Section (NEW - Recruiter Focus) */}
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-indigo-600">OUR VALUES</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">The Principles That Guide Us</p>
                    </div>
                    <motion.div 
                        className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeIn}>
                            <ValueCard icon={<HeartHandshake className="h-8 w-8 text-indigo-600" />}>
                                Patient-Centric Design
                                <p>Every feature is built with the patient's experience as the top priority, ensuring ease of use and accessibility.</p>
                            </ValueCard>
                        </motion.div>
                        <motion.div variants={fadeIn}>
                            <ValueCard icon={<Lightbulb className="h-8 w-8 text-indigo-600" />}>
                                Constant Innovation
                                <p>We are committed to leveraging modern technology to continuously improve and solve real-world healthcare challenges.</p>
                            </ValueCard>
                        </motion.div>
                        <motion.div variants={fadeIn}>
                            <ValueCard icon={<ShieldCheck className="h-8 w-8 text-indigo-600" />}>
                                Security & Trust
                                <p>Protecting sensitive health information is paramount. We build with a security-first mindset to ensure user data is always safe.</p>
                            </ValueCard>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* 4. Meet the Founder Section (NEW - Recruiter Focus) */}
            <div className="bg-slate-50 py-24 sm:py-32">
                <motion.div
                    className="container mx-auto max-w-5xl px-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={fadeIn}
                >
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 md:grid md:grid-cols-3 md:gap-12 md:items-center">
                        <div className="md:col-span-1">
                            <img className="h-48 w-48 rounded-full mx-auto object-cover ring-4 ring-indigo-100 shadow-lg" src={founderImage} alt="Krishna Kumar" />
                        </div>
                        <div className="mt-8 md:mt-0 md:col-span-2">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Built by Krishna Kumar</p>
                            <h3 className="mt-2 text-2xl font-bold text-gray-900">From the Developer</h3>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                "I built HealthCare Co-Pilot from a real frustration I experienced while trying to book a doctor appointment. As a full-stack developer, I created the kind of healthcare solution I wished existed — simple for patients, powerful for clinics, and designed to grow with AI-driven healthcare experiences. This project is made by me, and it reflects my vision to make healthcare more accessible, smarter, and more human."
                            </p>
                            <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600">
                                <span className="font-medium text-gray-700">Full Stack Developer | React.js | Java Developer | DSA</span>
                            </div>
                            <div className="mt-6 flex justify-center md:justify-start space-x-6">
                                <a href="https://github.com/Krishana10" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors" aria-label="GitHub">
                                    <Github size={28} />
                                </a>
                                <a href="https://www.linkedin.com/in/krishnakumar10k/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors" aria-label="LinkedIn">
                                    <Linkedin size={28} />
                                </a>
                                <a href="https://portfolio-krish34.netlify.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-colors">
                                    Portfolio
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
             {/* 5. Technology Stack Section (NEW - Recruiter Focus) is in Another COmponent named TechStack.jsx */}
        </div>
    );
};

export default AboutUs;
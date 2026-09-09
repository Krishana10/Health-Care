import React, { useState, useEffect, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
// Using lucide-react for a consistent icon style across the app
import { Phone, Mail, MapPin, Clock, User, MessageSquare, Send, RefreshCw } from 'lucide-react';

const ContactUs = () => {
    const inputClass = "w-full pl-10 p-3 bg-white text-gray-900 placeholder:text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm";

    // State to manage form inputs
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNo: '',
        email: '',
        message: '',
        captcha: ''
    });

    // State for the dynamic CAPTCHA
    const [captchaText, setCaptchaText] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');

    // Function to generate a random CAPTCHA string
    const generateCaptcha = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptchaText(result);
    };

    // Generate the first CAPTCHA when the component mounts
    useEffect(() => {
        generateCaptcha();
    }, []);

    // Memoize the SVG background to prevent re-rendering
    const SvgBackground = useMemo(() => (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="dot-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="2" fill="currentColor" className="text-indigo-600/50" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dot-pattern)" />
            </svg>
        </div>
    ), []);


    // eslint-disable-next-line no-unused-vars
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (captchaInput !== captchaText) {
            alert("CAPTCHA validation failed. Please try again.");
            generateCaptcha(); // Refresh CAPTCHA on failure
            setCaptchaInput('');
            return;
        }

        console.log("Form Submitted:", formData);
        alert("Thank you for your message! We will get back to you shortly.");

        // Reset form and CAPTCHA
        setFormData({ firstName: '', lastName: '', mobileNo: '', email: '', message: '' });
        setCaptchaInput('');
        generateCaptcha();
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 pt-24">
            <motion.div
                className="max-w-6xl w-full mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left Side: Contact Information */}
                    <div className="bg-indigo-700 text-white p-8 md:p-12 relative">
                        {SvgBackground}
                        <motion.div className="relative z-10" variants={containerVariants} initial="hidden" animate="visible">
                            <motion.div variants={itemVariants} className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-100">
                                Healthcare Co-Pilot
                            </motion.div>
                            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-extrabold mb-2">Get In Touch</motion.h2>
                            <motion.p variants={itemVariants} className="text-indigo-200 mb-8">We're here to help you. Reach out to us anytime.</motion.p>

                            <motion.div className="space-y-6" variants={containerVariants}>
                                <motion.div variants={itemVariants} className="flex items-start gap-4">
                                    <Phone className="text-indigo-300 text-xl mt-1" />
                                    <div>
                                        <h3 className="font-bold">Phone Number</h3>
                                        <p className="text-indigo-200">+91 80004 36640</p>
                                    </div>
                                </motion.div>
                                <motion.div variants={itemVariants} className="flex items-start gap-4">
                                    <Mail className="text-indigo-300 text-xl mt-1" />
                                    <div>
                                        <h3 className="font-bold">Email Address</h3>
                                        <p className="text-indigo-200">info@healthcarecopilot.com</p>
                                    </div>
                                </motion.div>
                                <motion.div variants={itemVariants} className="flex items-start gap-4">
                                    <MapPin className="text-indigo-300 text-xl mt-1" />
                                    <div>
                                        <h3 className="font-bold">Location</h3>
                                        <p className="text-indigo-200">Chennai, Tamil Nadu, India</p>
                                    </div>
                                </motion.div>
                                <motion.div variants={itemVariants} className="flex items-start gap-4">
                                    <Clock className="text-indigo-300 text-xl mt-1" />
                                    <div>
                                        <h3 className="font-bold">Working Hours</h3>
                                        <p className="text-indigo-200">24x7 Support Available</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="bg-white p-8 md:p-12">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="relative">
                                    <User className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name *" required className={inputClass} />
                                </div>
                                <div className="relative">
                                    <User className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className={inputClass} />
                                </div>
                            </div>
                            <div className="relative">
                                <Mail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email ID *" required className={inputClass} />
                            </div>
                            <div className="relative">
                                <MessageSquare className="absolute top-4 left-3 text-gray-500" />
                                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows="4" className={`${inputClass} pl-10`}></textarea>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Please solve the CAPTCHA *</label>
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="w-32 text-center bg-gray-200 p-3 rounded-lg select-none shadow-inner">
                                        <span className="text-2xl font-bold tracking-widest font-mono italic text-gray-700">{captchaText}</span>
                                    </div>
                                    <button type="button" onClick={generateCaptcha} className="p-3 text-gray-600 hover:text-indigo-600 transition-colors" aria-label="Refresh CAPTCHA">
                                        <RefreshCw size={20} />
                                    </button>
                                    <input type="text" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} required className="w-full p-3 bg-white text-gray-900 placeholder:text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm" placeholder="Enter CAPTCHA" />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 p-4 rounded-lg font-bold text-white
                                                     bg-gradient-to-br from-purple-600 to-blue-500
                                                     hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800
                                                     transition-all duration-300 ease-in-out transform hover:scale-105"
                            >
                                Submit Message <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactUs;
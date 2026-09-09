import React, { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { UserPlus, Search, CalendarCheck, Star, HeartPulse, Award } from 'lucide-react';

import BackgroundImage from "../../assets/BG4.jpg"; 
import cImg from "../../assets/Cartoon1.png";
import cImg2 from "../../assets/Cartoon2.jpg";

// Number Counter Component
const AnimatedStat = ({ to, icon }) => {
    const controls = useAnimation();
    const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

    useEffect(() => {
        if (inView) {
            animate(0, to, {
                duration: 2.5,
                ease: "easeOut",
                onUpdate(value) {
                    // A safe way to update the DOM element directly
                    const element = document.getElementById(`stat-number-${to}`);
                    if (element) {
                        element.textContent = Math.round(value).toLocaleString();
                    }
                }
            });
            controls.start("visible");
        }
    }, [inView, to, controls]);
    
    // Icon mapping
    const icons = {
        patients: <HeartPulse className="h-8 w-8 text-white" />,
        doctors: <Award className="h-8 w-8 text-white" />,
        ratings: <Star className="h-8 w-8 text-white" />
    };

    return (
        <div ref={ref} className="text-center">
            <div className="flex items-center justify-center h-16 w-16 mx-auto rounded-full bg-white/20 mb-4">
                {icons[icon]}
            </div>
            <p className="text-4xl md:text-5xl font-bold text-white">
                <span id={`stat-number-${to}`}>0</span>+
            </p>
        </div>
    );
};


const Home = () => {
    // --- Animation Variants ---
    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };
    
    const staggerContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } }
    };

    return (
        <div className="bg-slate-50">
            {/* --- HERO SECTION --- */}
            <section 
                className="relative w-full flex flex-col md:flex-row items-center justify-between pl-6 md:pl-16 py-10 min-h-screen overflow-hidden"
                style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2/3 h-[calc(100%+20rem)] bg-blue-50/80 rounded-l-[50%] blur-xl z-0"></div>
                <motion.div 
                    className="md:w-1/2 text-center md:text-left space-y-6 relative z-10"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                        Seamless Online <br />Appointments
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
                        We believe accessing healthcare should be simple and stress-free. Our platform connects you with top specialists, helping you manage your health on your schedule.
                    </p>
                </motion.div>
                <motion.div 
                    className="md:w-1/2 mt-10 md:mt-0 flex justify-end relative z-10"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <img src={cImg} alt="People getting appointment online" className="w-[400px] h-auto md:w-[500px] object-contain drop-shadow-xl" />
                </motion.div>
            </section>

            {/* --- HOW IT WORKS SECTION (NEW) --- */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">Get access to expert medical care in three simple steps.</p>
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-12"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {/* Step 1 */}
                        <motion.div variants={fadeIn} className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-indigo-100 text-indigo-600 mb-6">
                                <UserPlus size={36} />
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">Create Account</h3>
                            <p className="text-gray-600">Register in minutes and create your secure patient profile.</p>
                        </motion.div>
                        {/* Step 2 */}
                        <motion.div variants={fadeIn} className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-indigo-100 text-indigo-600 mb-6">
                                <Search size={36} />
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">Find a Doctor</h3>
                            <p className="text-gray-600">Search our network of verified specialists by expertise and location.</p>
                        </motion.div>
                        {/* Step 3 */}
                        <motion.div variants={fadeIn} className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-indigo-100 text-indigo-600 mb-6">
                                <CalendarCheck size={36} />
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">Book Appointment</h3>
                            <p className="text-gray-600">Select a time that works for you and confirm your visit instantly.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* --- WHO WE ARE SECTION --- */}
            <section className="py-24 px-6 md:px-16 bg-slate-50">
                <motion.div 
                    className="container mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerContainer}
                >
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <motion.div variants={fadeIn} className="md:w-1/2">
                            <img src={cImg2} alt="Illustration of user interface" className="w-full h-auto rounded-lg shadow-2xl"/>
                        </motion.div>
                        <motion.div variants={fadeIn} className="md:w-1/2">
                            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-3">BIOGRAPHY</p>
                            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent mb-8">
                                Who We Are
                            </h2>
                            <div className="space-y-6 text-gray-700 leading-relaxed">
                                <p>HealthCare Copilot was founded on a simple principle: to provide outstanding medical care that is both accessible and patient-focused. We are a team of dedicated professionals committed to setting a new standard for health services.</p>
                                <ul className="list-disc pl-5 space-y-4 text-gray-600">
                                    <li><strong>Patient-First Approach:</strong> We prioritize your needs and comfort, ensuring you feel heard, respected, and confident in your care.</li>
                                    <li><strong>Technology-Driven Convenience:</strong> Our secure online platform saves you time and effort.</li>
                                    <li><strong>Expert Medical Team:</strong> Our providers are leaders in their fields, dedicated to continuous learning.</li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>
            
            {/* --- STATS SECTION (NEW & HIGH-IMPACT) --- */}
            <section className="py-20 bg-indigo-600">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <AnimatedStat to={10000} icon="patients" />
                        <AnimatedStat to={200} icon="doctors" />
                        <AnimatedStat to={5000} icon="ratings" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
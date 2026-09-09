import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Stethoscope, Users, ShieldCheck, CheckCircle } from 'lucide-react';
import BackgroundImage from "../../assets/BG4.jpg"; // Ensure this path is correct

// A more visually polished Service Card component
const ServiceCard = ({ icon, title, features }) => (
  <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col h-full transform hover:-translate-y-2 transition-transform duration-300 border border-gray-100">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
    </div>
    <div className="flex-grow">
      <ul className="space-y-3 text-gray-600">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const ServicesPage = () => {
  const servicesData = [
    {
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      title: "For Patients",
      features: [
        "Find & Book Doctors: Easily search for specialists and book appointments online in minutes.",
        "Access Your Records: View your complete appointment history and prescriptions anytime, anywhere.",
        "Manage Your Health: Take control of your healthcare journey with a simple, secure dashboard."
      ]
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-indigo-600" />,
      title: "For Doctors",
      features: [
        "Streamline Your Schedule: Manage your incoming appointments with an intuitive calendar view.",
        "Instant Patient History: Access relevant patient records and history before each consultation.",
        "Digital Prescriptions: Create and manage prescriptions efficiently, reducing paperwork."
      ]
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-indigo-600" />,
      title: "For Administrators",
      features: [
        "Doctor Verification: Onboard new doctors securely with a robust approval workflow.",
        "Platform Oversight: Monitor all doctors and patients from a central management dashboard.",
        "Maintain Quality: Ensure a high standard of care by managing the network of trusted professionals."
      ]
    }
  ];

  // Animation variants for Framer Motion
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] } }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-white">
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
            A Simpler, Smarter <span className="text-cyan-300">Healthcare Experience</span>
          </motion.h1>
          <motion.p 
            className="mt-6 text-lg max-w-3xl mx-auto leading-8 text-gray-200"
            initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}
          >
            HealthCare Co-Pilot offers a suite of powerful, integrated tools designed to seamlessly connect patients, doctors, and administrators for better outcomes.
          </motion.p>
        </div>
      </div>

      {/* 2. Services Grid Section */}
      <div className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
             <p className="text-base font-semibold leading-7 text-indigo-600">TAILORED SOLUTIONS</p>
             <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A Platform Built for Everyone</h2>
             <p className="mt-6 text-lg leading-8 text-gray-600">
               Whether you're a patient seeking care, a doctor providing it, or an admin overseeing it, our platform is designed for you.
             </p>
          </div>
          <motion.div 
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {servicesData.map((service, index) => (
              <motion.div key={index} variants={fadeIn}>
                <ServiceCard 
                  icon={service.icon} 
                  title={service.title} 
                  features={service.features} 
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 3. Call to Action Section */}
      <div className="bg-indigo-700">
        <div className="mx-auto max-w-4xl text-center px-6 py-20 sm:py-24">
          <motion.h2 
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          >
            Join the Future of Healthcare.
          </motion.h2>
          <motion.p 
            className="mt-6 text-lg leading-8 text-indigo-200"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{delay: 0.2}}
          >
            Ready to experience a more efficient and connected way to manage healthcare? Get started today.
          </motion.p>
          <motion.div 
            className="mt-10"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{delay: 0.4}}
          >
            <Link to="/register">
              <button type="button" className="rounded-md bg-white px-5 py-3.5 text-base font-semibold text-indigo-600 shadow-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700 transition-all duration-300 transform hover:scale-105">
                Register Now
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
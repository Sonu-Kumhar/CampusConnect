"use client";

import { motion } from "framer-motion";
import { 
  Heart, 
  Users, 
  MapPin, 
  Mail, 
  Phone, 
  MessageSquare, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  ArrowRight,
  GraduationCap,
  BookOpen,
  Calendar,
  Sparkles
} from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      // Simulate API call
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    explore: [
      { name: "Club Directory", href: "#", icon: <Users className="h-4 w-4" /> },
      { name: "Event Calendar", href: "#", icon: <Calendar className="h-4 w-4" /> },
      { name: "Categories", href: "#", icon: <BookOpen className="h-4 w-4" /> },
      { name: "Featured Clubs", href: "#", icon: <Sparkles className="h-4 w-4" /> }
    ],
    resources: [
      { name: "Help Center", href: "#" },
      { name: "Club Guidelines", href: "#" },
      { name: "Event Planning", href: "#" },
      { name: "Leadership Resources", href: "#" }
    ],
    campus: [
      { name: "About University", href: "#" },
      { name: "Student Services", href: "#" },
      { name: "Campus Map", href: "#" },
      { name: "Academic Calendar", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-600" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-blue-400" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-600" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-700" },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-600" }
  ];

  return (
    <footer className="bg-white border-t border-gray-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400" />
      
      <div className="absolute top-20 right-10 opacity-5">
        <GraduationCap size={120} className="text-blue-400" />
      </div>
      
      <div className="absolute bottom-10 left-10 opacity-5">
        <BookOpen size={100} className="text-green-400" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-lg mr-3 shadow-sm">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  CampusConnect
                </h2>
              </div>
              <p className="text-gray-600 mb-6 max-w-md">
                Your gateway to campus life. Discover student organizations, 
                events, and opportunities to make the most of your university experience.
              </p>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center text-sm text-gray-500 bg-blue-50 px-3 py-1 rounded-full">
                  <Users className="h-4 w-4 mr-2 text-blue-600" />
                  200+ Clubs
                </div>
                <div className="flex items-center text-sm text-gray-500 bg-green-50 px-3 py-1 rounded-full">
                  <Calendar className="h-4 w-4 mr-2 text-green-600" />
                  50+ Events Weekly
                </div>
              </div>
            </motion.div>
          </div>

          {/* Explore links section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
              Explore
            </h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group"
                  >
                    <span className="mr-2 text-blue-500">{link.icon}</span>
                    {link.name}
                    <ArrowRight className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-600 hover:text-green-600 transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-green-500" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Campus Updates</h3>
            <p className="text-gray-600 mb-4">Get the latest club news and event updates</p>
            
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md"
              >
                Subscribe
                <ArrowRight className="h-4 w-4 ml-2" />
              </motion.button>
            </form>

            {subscribed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
              >
                🎉 Thank you for subscribing! You'll receive updates soon.
              </motion.div>
            )}
          </motion.div>
        </div>

        

        

      </div>
    </footer>
  );
};

export default Footer;

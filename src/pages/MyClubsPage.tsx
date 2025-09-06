"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart, Users, MapPin, Calendar, Tag, MessageSquare, Bell, Settings, Award, Star } from "lucide-react";

// 3D Card Components (since you don't have them in components/ui)
const CardContainer = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={`group/card ${className}`}>
      {children}
    </div>
  );
};

const CardBody = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
};

const CardItem = ({
  as: Tag = "div",
  className,
  children,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: any;
  className?: string;
  children: React.ReactNode;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: any;
}) => {
  return (
    <Tag
      className={className}
      style={{
        transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Mock data for user's clubs
const myClubs = [
  {
    id: "1",
    name: "AI & Machine Learning Club",
    description: "Explore the future of artificial intelligence through hands-on projects, workshops, and research opportunities.",
    category: "Technology",
    memberCount: 245,
    location: "Engineering Building",
    nextEvent: "Workshop on Deep Learning - Tomorrow",
    tags: ["AI", "Programming", "Research"],
    isFavorited: true,
    role: "Admin",
    joinedDate: "2023-08-15",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    announcements: 3,
    eventsThisWeek: 2,
    achievements: ["Active Member", "Project Lead"]
  },
  {
    id: "2",
    name: "Photography Club",
    description: "Capture moments, learn new techniques, and explore creative photography through workshops, photo walks, and exhibitions.",
    category: "Arts",
    memberCount: 156,
    location: "Arts Building",
    nextEvent: "Portrait Workshop - This Friday",
    tags: ["Photography", "Creative", "Visual Arts"],
    isFavorited: true,
    role: "Member",
    joinedDate: "2023-09-10",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    announcements: 1,
    eventsThisWeek: 1,
    achievements: ["Photo Contest Winner"]
  },
  {
    id: "3",
    name: "Entrepreneurship Society",
    description: "Foster innovation and business skills through startup competitions, mentorship programs, and networking events.",
    category: "Business",
    memberCount: 298,
    location: "Business School",
    nextEvent: "Networking Night - Next Week",
    tags: ["Business", "Innovation", "Networking"],
    isFavorited: false,
    role: "Core Member",
    joinedDate: "2023-07-22",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    announcements: 0,
    eventsThisWeek: 3,
    achievements: ["Pitch Competition Finalist"]
  }
];

// ClubCard Component for My Clubs
const ClubCard = ({ 
  id, 
  name, 
  description, 
  category, 
  memberCount, 
  location, 
  nextEvent, 
  tags, 
  isFavorited, 
  image,
  role,
  joinedDate,
  announcements,
  eventsThisWeek,
  achievements
}: any) => {
  const [favorited, setFavorited] = useState(isFavorited);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleFavorite = (e: any) => {
    e.stopPropagation();
    setFavorited(!favorited);
  };

  const toggleNotifications = (e: any) => {
    e.stopPropagation();
    setNotificationsEnabled(!notificationsEnabled);
  };

  // Format joined date
  const formatJoinedDate = new Date(joinedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <CardContainer className="inter-var h-full">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 border">
        {/* Role Badge */}
        <CardItem translateZ="30" className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 ${
          role === "Admin" 
            ? "bg-red-100 text-red-800" 
            : role === "Core Member" 
            ? "bg-purple-100 text-purple-800" 
            : "bg-blue-100 text-blue-800"
        }`}>
          {role}
        </CardItem>
        
        {/* Club Name */}
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-800 dark:text-white mb-2"
        >
          {name}
        </CardItem>
        
        {/* Description */}
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-2"
        >
          {description}
        </CardItem>
        
        {/* Image */}
        <CardItem 
          translateZ="100" 
          rotateX={5} 
          rotateZ={-2} 
          className="w-full mt-4"
        >
          <motion.div
            className="h-40 w-full relative overflow-hidden rounded-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={image}
              className="h-full w-full object-cover group-hover/card:shadow-xl"
              alt={name}
            />
            {/* Category overlay */}
            <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-bold py-1 px-2 rounded">
              {category}
            </div>
          </motion.div>
        </CardItem>
        
        {/* Club Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <CardItem translateZ="30" className="flex flex-col items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Users className="h-5 w-5 text-blue-600 mb-1" />
            <span className="text-xs text-neutral-600 dark:text-neutral-400">Members</span>
            <span className="font-bold text-sm">{memberCount}</span>
          </CardItem>
          
          <CardItem translateZ="30" className="flex flex-col items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Calendar className="h-5 w-5 text-green-600 mb-1" />
            <span className="text-xs text-neutral-600 dark:text-neutral-400">Events</span>
            <span className="font-bold text-sm">{eventsThisWeek} this week</span>
          </CardItem>
        </div>
        
        {/* Club Details */}
        <div className="mt-4 space-y-2">
          <CardItem translateZ="30" className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </CardItem>
          
          <CardItem translateZ="30" className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{nextEvent}</span>
          </CardItem>
          
          <CardItem translateZ="30" className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
            <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{announcements} new announcements</span>
          </CardItem>
        </div>
        
        {/* Achievements */}
        {achievements.length > 0 && (
          <CardItem translateZ="40" className="mt-4">
            <div className="flex items-center text-sm font-medium text-amber-700 dark:text-amber-400 mb-2">
              <Award className="h-4 w-4 mr-1" />
              Achievements
            </div>
            <div className="flex flex-wrap gap-2">
              {achievements.map((achievement: string, index: number) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                >
                  <Star className="h-3 w-3 mr-1" />
                  {achievement}
                </span>
              ))}
            </div>
          </CardItem>
        )}
        
        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex space-x-2">
            <CardItem
              translateZ={30}
              as="button"
              className="p-2 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={toggleNotifications}
            >
              <Bell className={`h-4 w-4 ${notificationsEnabled ? 'text-blue-600' : ''}`} />
            </CardItem>
            
            <CardItem
              translateZ={30}
              as="button"
              className="p-2 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Settings className="h-4 w-4" />
            </CardItem>
          </div>
          
          <CardItem
            translateZ={30}
            as="button"
            className="px-4 py-2 rounded-xl bg-blue-600 dark:bg-blue-500 dark:text-white text-white text-xs font-bold hover:bg-blue-700 transition-colors flex items-center"
          >
            View Club
          </CardItem>
        </div>
        
        {/* Favorite Button */}
        <CardItem translateZ="50" className="absolute top-4 right-4">
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full ${favorited ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'} transition-colors`}
          >
            <Heart className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
          </button>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

// Filter component for My Clubs
const MyClubsFilters = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filters = [
    { id: 'all', label: 'All Clubs' },
    { id: 'admin', label: 'I Manage' },
    { id: 'favorites', label: 'Favorites' },
    { id: 'recent', label: 'Recently Joined' },
  ];

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Stats component
const MyClubsStats = () => {
  const stats = [
    { label: 'Total Clubs', value: myClubs.length },
    { label: 'Admin Roles', value: myClubs.filter(club => club.role === 'Admin').length },
    { label: 'Events This Week', value: myClubs.reduce((acc, club) => acc + club.eventsThisWeek, 0) },
    { label: 'Unread Announcements', value: myClubs.reduce((acc, club) => acc + club.announcements, 0) },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div 
          key={index}
          className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
};

export const MyClubsPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <motion.section 
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        {/* Header */}
        <motion.div 
          className="mb-8"
          variants={headerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Clubs
          </h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Manage your club memberships and activities
          </motion.p>
        </motion.div>

        {/* Stats */}
        <MyClubsStats />

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <MyClubsFilters />
        </motion.div>

        {/* Results Summary */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-gray-600 dark:text-gray-400">
            You're a member of <span className="font-semibold text-gray-900 dark:text-white">{myClubs.length}</span> clubs
          </p>
        </motion.div>

        {/* Clubs Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {myClubs.map((club, index) => (
              <motion.div
                key={club.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="h-full"
              >
                <ClubCard {...club} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State (if no clubs) */}
        {myClubs.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">You haven't joined any clubs yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Discover and join clubs that match your interests</p>
              <motion.button 
                className="px-6 py-3 rounded-xl bg-blue-600 dark:bg-blue-500 text-white font-medium hover:bg-blue-700 transition-colors"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Clubs
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default MyClubsPage;
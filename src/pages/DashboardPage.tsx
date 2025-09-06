"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart, Users, MapPin, Calendar, Tag, MessageSquare, Bell, Settings, Award, Star, TrendingUp, Clock, Eye, BookOpen, ChevronRight, Search, Filter, BarChart3 } from "lucide-react";

// 3D Card Components
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

// Mock data for dashboard
const userStats = {
  clubsJoined: 5,
  eventsAttended: 12,
  hoursContributed: 28,
  achievements: 7
};

const upcomingEvents = [
  {
    id: "1",
    title: "AI & Machine Learning Workshop",
    club: "AI & Machine Learning Club",
    date: "2023-10-15",
    time: "14:00 - 16:00",
    location: "Engineering Building, Room 302",
    attendees: 78,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "2",
    title: "Portrait Photography Workshop",
    club: "Photography Club",
    date: "2023-10-18",
    time: "15:00 - 18:00",
    location: "Arts Building, Studio B",
    attendees: 25,
    image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const recentActivities = [
  {
    id: "1",
    type: "event",
    title: "Joined AI Workshop",
    club: "AI & Machine Learning Club",
    time: "2 hours ago",
    icon: <Calendar className="h-4 w-4" />
  },
  {
    id: "2",
    type: "achievement",
    title: "Earned Project Lead badge",
    club: "AI & Machine Learning Club",
    time: "1 day ago",
    icon: <Award className="h-4 w-4" />
  },
  {
    id: "3",
    type: "club",
    title: "Joined Photography Club",
    club: "Photography Club",
    time: "2 days ago",
    icon: <Users className="h-4 w-4" />
  }
];

const recommendedClubs = [
  {
    id: "1",
    name: "Web Development Society",
    category: "Technology",
    memberCount: 187,
    description: "Learn web development technologies and build projects together",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "2",
    name: "Environmental Action Group",
    category: "Volunteer",
    memberCount: 142,
    description: "Promote sustainability and environmental awareness on campus",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2113&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

// Stats Cards Component
const StatsCard = ({ title, value, icon, color }: any) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

// Event Card Component
const EventCard = ({ event }: any) => {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-white dark:bg-gray-800 relative group/card border border-gray-200 dark:border-gray-700 w-full rounded-xl p-4">
        <div className="flex">
          <div className="flex-shrink-0 mr-4">
            <img
              src={event.image}
              className="h-16 w-16 object-cover rounded-lg"
              alt={event.title}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {event.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {event.club}
            </p>
            <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formattedDate}</span>
              <Clock className="h-4 w-4 ml-3 mr-1" />
              <span>{event.time}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="truncate">{event.location}</span>
          </div>
          <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full font-medium">
            Register
          </button>
        </div>
      </CardBody>
    </CardContainer>
  );
};

// Activity Item Component
const ActivityItem = ({ activity }: any) => {
  return (
    <motion.div 
      className="flex items-start py-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex-shrink-0 mt-1">
        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
          {activity.icon}
        </div>
      </div>
      <div className="ml-3 flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {activity.title}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {activity.club}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {activity.time}
        </p>
      </div>
    </motion.div>
  );
};

// Club Card Component
const ClubCard = ({ club }: any) => {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-white dark:bg-gray-800 relative group/card border border-gray-200 dark:border-gray-700 w-full rounded-xl p-4">
        <div className="flex">
          <div className="flex-shrink-0 mr-4">
            <img
              src={club.image}
              className="h-16 w-16 object-cover rounded-lg"
              alt={club.name}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {club.name}
            </h3>
            <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full mt-1">
              {club.category}
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
              {club.description}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Users className="h-4 w-4 mr-1" />
            <span>{club.memberCount} members</span>
          </div>
          <button className="px-3 py-1 text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full font-medium">
            Join Club
          </button>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export const DashboardPage = () => {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          variants={headerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <div className="flex justify-between items-center mt-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Dashboard
              </h2>
              <motion.p 
                className="text-gray-600 dark:text-gray-400 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Welcome back! Here's what's happening with your clubs.
              </motion.p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                <Filter className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <StatsCard
            title="Clubs Joined"
            value={userStats.clubsJoined}
            icon={<Users className="h-6 w-6 text-blue-600" />}
            color="bg-blue-100 dark:bg-blue-900/30"
          />
          <StatsCard
            title="Events Attended"
            value={userStats.eventsAttended}
            icon={<Calendar className="h-6 w-6 text-green-600" />}
            color="bg-green-100 dark:bg-green-900/30"
          />
          <StatsCard
            title="Hours Contributed"
            value={userStats.hoursContributed}
            icon={<Clock className="h-6 w-6 text-amber-600" />}
            color="bg-amber-100 dark:bg-amber-900/30"
          />
          <StatsCard
            title="Achievements"
            value={userStats.achievements}
            icon={<Award className="h-6 w-6 text-purple-600" />}
            color="bg-purple-100 dark:bg-purple-900/30"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Events */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Upcoming Events</h3>
                <button className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
                  View all <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                <button className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
                  View all <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              <div className="space-y-1">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <ActivityItem activity={activity} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recommended Clubs */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recommended Clubs</h3>
              <button className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedClubs.map((club, index) => (
                <motion.div
                  key={club.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  <ClubCard club={club} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DashboardPage;
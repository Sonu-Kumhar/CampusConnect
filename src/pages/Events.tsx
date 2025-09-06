import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Heart, Users, MapPin, Calendar, Tag, Clock, ArrowRight, Ticket } from "lucide-react";
import { cn } from "@/lib/utils"; // You might need to install clsx or class-variance-authority

// 3D Card Components (since you don't have them in your components/ui)
export const CardContainer = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("group/card", className)}>
      {children}
    </div>
  );
};

export const CardBody = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("relative", className)}>
      {children}
    </div>
  );
};

export const CardItem = ({
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
      className={cn("", className)}
      style={{
        transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// Animation variants (same as clubs page for consistency)
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

// Mock data for events
const mockEvents = [
  {
    id: "1",
    title: "AI & Machine Learning Workshop",
    description: "Hands-on workshop on deep learning techniques and applications. Bring your laptop and get ready to code!",
    club: "AI & Machine Learning Club",
    date: "2023-10-15",
    time: "14:00 - 16:00",
    location: "Engineering Building, Room 302",
    attendees: 78,
    capacity: 100,
    category: "Workshop",
    tags: ["AI", "Deep Learning", "Python", "Hands-on"],
    isFavorited: true,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "Free"
  },
  {
    id: "2",
    title: "Campus Clean-up Drive",
    description: "Join us in making our campus greener and cleaner! Gloves and bags will be provided. All volunteers get free t-shirts!",
    club: "Environmental Action Society",
    date: "2023-10-18",
    time: "10:00 - 13:00",
    location: "Main Quad",
    attendees: 45,
    capacity: 60,
    category: "Volunteer",
    tags: ["Environment", "Community", "Sustainability"],
    isFavorited: false,
    image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "Free"
  },
  {
    id: "3",
    title: "Inter-college Debate Championship",
    description: "Witness the best debaters from across the region compete in this exciting tournament. Open to all spectators!",
    club: "Debate & Public Speaking",
    date: "2023-10-22",
    time: "09:00 - 17:00",
    location: "Liberal Arts Auditorium",
    attendees: 120,
    capacity: 200,
    category: "Competition",
    tags: ["Debate", "Public Speaking", "Tournament"],
    isFavorited: false,
    image: "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "Free"
  },
  {
    id: "4",
    title: "Portrait Photography Workshop",
    description: "Learn professional portrait techniques from award-winning photographer Jane Smith. All skill levels welcome.",
    club: "Photography Club",
    date: "2023-10-25",
    time: "15:00 - 18:00",
    location: "Arts Building, Studio B",
    attendees: 25,
    capacity: 30,
    category: "Workshop",
    tags: ["Photography", "Portraits", "Creative"],
    isFavorited: true,
    image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$10"
  },
  {
    id: "5",
    title: "Startup Pitch Competition",
    description: "Watch student entrepreneurs pitch their innovative ideas to a panel of investors. Great networking opportunity!",
    club: "Entrepreneurship Society",
    date: "2023-10-28",
    time: "13:00 - 16:00",
    location: "Business School Auditorium",
    attendees: 180,
    capacity: 250,
    category: "Competition",
    tags: ["Startups", "Business", "Networking", "Innovation"],
    isFavorited: false,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "Free"
  },
  {
    id: "6",
    title: "League of Legends Tournament",
    description: "Compete in our annual gaming tournament! Sign up as a team or individual. Great prizes for winners!",
    club: "Gaming & Esports",
    date: "2023-11-05",
    time: "12:00 - 20:00",
    location: "Student Union Game Room",
    attendees: 95,
    capacity: 128,
    category: "Tournament",
    tags: ["Gaming", "Esports", "Competition", "League of Legends"],
    isFavorited: false,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$5 per player"
  },
];

// EventCard Component using 3D Card
const EventCard = ({ 
  id, 
  title, 
  description, 
  club, 
  date, 
  time, 
  location, 
  attendees, 
  capacity, 
  category, 
  tags, 
  isFavorited, 
  image,
  price
}) => {
  const [favorited, setFavorited] = useState(isFavorited);
  const [isHovered, setIsHovered] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setFavorited(!favorited);
    // Here you would typically update the backend
  };

  // Format date to be more readable
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  // Calculate attendance percentage for progress bar
  const attendancePercentage = (attendees / capacity) * 100;

  return (
    <CardContainer className="inter-var h-full">
      <CardBody 
        className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 border"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Favorite Button */}
        <CardItem translateZ="50" className="absolute top-4 right-4">
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full ${favorited ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'} transition-colors`}
          >
            <Heart className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
          </button>
        </CardItem>
        
        {/* Category Badge */}
        <CardItem translateZ="30" className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
          {category}
        </CardItem>
        
        {/* Event Title */}
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-800 dark:text-white mb-2"
        >
          {title}
        </CardItem>
        
        {/* Organizing Club */}
        <CardItem
          translateZ="40"
          className="text-sm text-neutral-600 dark:text-neutral-400 mb-3"
        >
          Hosted by <span className="font-medium text-primary">{club}</span>
        </CardItem>
        
        {/* Description */}
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-3"
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
              alt={title}
            />
            {/* Date overlay */}
            <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-bold py-1 px-2 rounded">
              {formattedDate}
            </div>
            {/* Price tag */}
            <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 text-foreground text-xs font-bold py-1 px-2 rounded">
              {price}
            </div>
          </motion.div>
        </CardItem>
        
        {/* Event Details */}
        <div className="mt-6 space-y-3">
          <CardItem translateZ="30" className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{formattedDate}</span>
          </CardItem>
          
          <CardItem translateZ="30" className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{time}</span>
          </CardItem>
          
          <CardItem translateZ="30" className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </CardItem>
          
          {/* Attendance progress bar */}
          <CardItem translateZ="30" className="pt-2">
            <div className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-1">
              <span><Users className="h-3 w-3 inline mr-1" /> {attendees}/{capacity}</span>
              <span>{Math.round(attendancePercentage)}% full</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${attendancePercentage}%` }}
              ></div>
            </div>
          </CardItem>
        </div>
        
        {/* Tags */}
        <CardItem translateZ="40" className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </CardItem>
        
        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8">
          <CardItem
            translateZ={30}
            translateX={-10}
            as="button"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center"
          >
            Details <ArrowRight className="h-3 w-3 ml-1" />
          </CardItem>
          <CardItem
            translateZ={30}
            translateX={10}
            as="button"
            className="px-4 py-2 rounded-xl bg-primary dark:bg-primary-glow dark:text-white text-white text-xs font-bold hover:bg-primary/90 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={attendees >= capacity}
          >
            <Ticket className="h-4 w-4 mr-1" />
            {attendees >= capacity ? 'Sold Out' : 'Register'}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

// Filter component for events
const EventFilters = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filters = [
    { id: 'all', label: 'All Events' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'free', label: 'Free Events' },
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
                ? 'bg-primary text-white'
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

export const EventsPage = () => {
  const [visibleEvents, setVisibleEvents] = useState(6);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const loadMore = () => {
    // Simulate loading more events
    setVisibleEvents(prev => Math.min(prev + 3, mockEvents.length));
  };

  return (
    <motion.section 
      className="min-h-screen bg-background"
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
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Upcoming Events
          </h2>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Discover and register for exciting events happening on campus
          </motion.p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <EventFilters />
        </motion.div>

        {/* Results Summary */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{mockEvents.length}</span> events
          </p>
        </motion.div>

        {/* Events Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {mockEvents.slice(0, visibleEvents).map((event, index) => (
              <motion.div
                key={event.id}
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
                <EventCard {...event} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More */}
        {visibleEvents < mockEvents.length && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.button 
              className="text-primary hover:text-primary-glow font-medium transition-smooth px-6 py-3 rounded-lg bg-primary/10 hover:bg-primary/20"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={loadMore}
            >
              Load More Events
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

// Simple utility function for classNames if you don't have cn
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default EventsPage;
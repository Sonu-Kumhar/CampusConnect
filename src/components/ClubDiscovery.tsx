"use client";

import { FilterSection } from "./FilterSection";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { Heart, Users, MapPin, Calendar, Tag } from "lucide-react";

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

// Mock data for clubs
const mockClubs = [
  {
    id: "1",
    name: "AI & Machine Learning Club",
    description: "Explore the future of artificial intelligence through hands-on projects, workshops, and research opportunities. Connect with like-minded students and faculty.",
    category: "Technology",
    memberCount: 245,
    location: "Engineering Building",
    nextEvent: "Workshop on Deep Learning",
    tags: ["AI", "Programming", "Research", "Python", "Machine Vision"],
    isFavorited: true,
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "2",
    name: "Environmental Action Society",
    description: "Dedicated to promoting sustainability and environmental awareness on campus through initiatives, clean-up drives, and educational programs.",
    category: "Volunteer",
    memberCount: 189,
    location: "Student Center",
    nextEvent: "Campus Clean-up Drive",
    tags: ["Environment", "Sustainability", "Community Service"],
    isFavorited: false,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2113&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "3",
    name: "Debate & Public Speaking",
    description: "Develop your oratory skills, participate in competitive debates, and build confidence in public speaking through regular practice sessions.",
    category: "Academic",
    memberCount: 78,
    location: "Liberal Arts Building",
    nextEvent: "Inter-college Debate",
    tags: ["Public Speaking", "Communication", "Competition"],
    isFavorited: false,
    image: "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "4",
    name: "Photography Club",
    description: "Capture moments, learn new techniques, and explore creative photography through workshops, photo walks, and exhibitions.",
    category: "Arts",
    memberCount: 156,
    location: "Arts Building",
    nextEvent: "Portrait Photography Workshop",
    tags: ["Photography", "Creative", "Visual Arts", "Artist"],
    isFavorited: true,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "5",
    name: "Entrepreneurship Society",
    description: "Foster innovation and business skills through startup competitions, mentorship programs, and networking events with successful entrepreneurs.",
    category: "Business",
    memberCount: 298,
    location: "Business School",
    nextEvent: "Startup Pitch Competition",
    tags: ["Business", "Innovation", "Networking", "Leadership"],
    isFavorited: false,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "6",
    name: "Gaming & Esports",
    description: "Competitive gaming, tournaments, and casual gaming sessions. Join our teams for various esports competitions and gaming events.",
    category: "Sports",
    memberCount: 412,
    location: "Student Union",
    nextEvent: "League of Legends Tournament",
    tags: ["Gaming", "Esports", "Competition", "Team Play"],
    isFavorited: false,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
];

// ClubCard Component using 3D Card
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
  image 
}) => {
  const [favorited, setFavorited] = useState(isFavorited);

  const toggleFavorite = () => {
    setFavorited(!favorited);
    // Here you would typically update the backend
  };

  return (
    <CardContainer className="inter-var h-full">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 border">
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
          <motion.img
            src={image}
            height="1000"
            width="1000"
            className="h-40 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={name}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </CardItem>
        
        {/* Club Details */}
        <div className="mt-6 space-y-3">
          <CardItem translateZ="30" className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
            <Users className="h-4 w-4 mr-2" />
            <span>{memberCount} members</span>
          </CardItem>
          
          <CardItem translateZ="30" className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{location}</span>
          </CardItem>
          
          <CardItem translateZ="30" className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{nextEvent}</span>
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
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Learn more →
          </CardItem>
          <CardItem
            translateZ={30}
            translateX={10}
            as="button"
            className="px-4 py-2 rounded-xl bg-primary dark:bg-primary-glow dark:text-white text-white text-xs font-bold hover:bg-primary/90 transition-colors"
          >
            Join Now
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export const ClubDiscovery = () => {
  const [visibleClubs, setVisibleClubs] = useState(6);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const loadMore = () => {
    // Simulate loading more clubs
    setVisibleClubs(prev => Math.min(prev + 3, mockClubs.length));
  };

  return (
    <motion.section 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <FilterSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          variants={headerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Discover Your Perfect Club
          </h2>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Find clubs and organizations that match your interests and goals
          </motion.p>
        </motion.div>

        {/* Results Summary */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{mockClubs.length}</span> clubs
          </p>
        </motion.div>

        {/* Club Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {mockClubs.slice(0, visibleClubs).map((club, index) => (
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

        {/* Load More */}
        {visibleClubs < mockClubs.length && (
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
              Load More Clubs
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};
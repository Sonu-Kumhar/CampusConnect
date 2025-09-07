import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Calendar, Trophy, ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-campus.jpg";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const floatingAnimation = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const pulseGlow = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Counter component for animated numbers
const Counter = ({ value, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const targetValue = parseInt(value.replace(/,/g, '').replace('+', ''));

  useEffect(() => {
    let start = 0;
    const duration = 3000; // 3 seconds
    const increment = targetValue / (duration / 20); // Calculate increment per frame
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [targetValue]);

  return (
    <>{count.toLocaleString()}{suffix}</>
  );
};

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);

  // Mouse tracking for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations for the mouse movement
  const springConfig = { stiffness: 300, damping: 30 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Transform mouse position to background movement (reduced intensity)
  const backgroundX = useTransform(x, [-1, 1], [-30, 30]);
  const backgroundY = useTransform(y, [-1, 1], [-20, 20]);
  const backgroundScale = useTransform(y, [-1, 1], [1.05, 1.15]);

  // Handle mouse movement
  const handleMouseMove = (event) => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize mouse position to -1 to 1 range
    const normalizedX = (event.clientX - centerX) / (rect.width / 2);
    const normalizedY = (event.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(Math.max(-1, Math.min(1, normalizedX)));
    mouseY.set(Math.max(-1, Math.min(1, normalizedY)));
  };

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    setIsVisible(true);
    
    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Enhanced Background with Mouse Parallax Effect */}
      <motion.div 
        ref={backgroundRef}
        className="absolute inset-0 z-0 will-change-transform"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          x: backgroundX,
          y: backgroundY,
          scale: backgroundScale,
        }}
      >
        <motion.img
          src={heroImage}
          alt="Campus community scene"
          className="w-full h-full object-cover"
          animate={{
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-primary/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.2 }}
        ></motion.div>
      </motion.div>

      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 z-1 bg-gradient-to-b from-primary/30 via-transparent to-primary/40"
        animate={{
          backgroundPosition: ['0% 0%', '0% 100%', '0% 0%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Content - Static positioning */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Discover Your
            <motion.span 
              className="block bg-gradient-accent bg-clip-text text-transparent"
              initial={{ backgroundPosition: "0% 0%" }}
              animate={{ backgroundPosition: "100% 100%" }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            >
              Campus Community
            </motion.span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
          >
            Connect with clubs, project teams, and faculty initiatives that match your interests, 
            skills, and academic goals. Build your perfect campus experience.
          </motion.p>

          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="hero" size="lg" className="group">
                Explore Clubs
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Join Our Community
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats with enhanced animations */}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { icon: Users, value: "150", label: "Active Clubs" },
              { icon: Calendar, value: "500", label: "Monthly Events" },
              { icon: Trophy, value: "2500", label: "Active Members" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-glow overflow-hidden relative"
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Animated background element */}
                <motion.div 
                  className="absolute -inset-4 bg-accent-glow/10 rounded-full"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="flex items-center justify-center mb-3"
                    variants={floatingAnimation}
                  >
                    <stat.icon className="h-8 w-8 text-accent-glow" />
                  </motion.div>
                  <motion.div 
                    className="text-3xl font-bold text-white mb-1"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.8, duration: 0.5 }}
                  >
                    <Counter value={stat.value} />
                  </motion.div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Floating Elements with trails - with subtle parallax */}
      {[
        { top: "20%", left: "10%", size: "w-20 h-20", color: "bg-accent/20", delay: 0 },
        { top: "70%", left: "85%", size: "w-16 h-16", color: "bg-primary-glow/20", delay: 1 },
        { top: "40%", left: "5%", size: "w-12 h-12", color: "bg-accent-glow/20", delay: 2 },
        { top: "15%", left: "80%", size: "w-14 h-14", color: "bg-primary/30", delay: 0.5 },
        { top: "80%", left: "15%", size: "w-10 h-10", color: "bg-accent-glow/30", delay: 1.5 }
      ].map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.size} ${element.color} rounded-full`}
          style={{ 
            top: element.top, 
            left: element.left,
            x: useTransform(x, [-1, 1], [-5, 5]),
            y: useTransform(y, [-1, 1], [-3, 3]),
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 15, 0],
            rotate: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 6 + index,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Animated scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8 text-white" />
        </motion.div>
      </motion.div>

      {/* Particle animation effect - with subtle parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              x: useTransform(x, [-1, 1], [-2, 2]),
              y: useTransform(y, [-1, 1], [-1, 1]),
            }}
            animate={{
              y: [0, -20, -40, -60, -80],
              x: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 1, 1, 0],
              scale: [0, 1, 1, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Custom cursor for better UX */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-white/20 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: useTransform(mouseX, [-1, 1], [-12, 12]),
          y: useTransform(mouseY, [-1, 1], [-12, 12]),
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      />
    </section>
  );
};

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, User, Bell, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Discover", href: "/" },
    { label: "My Clubs", href: "/my-clubs" },
    { label: "Events", href: "/events" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center cursor-pointer"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xl font-extrabold bg-gradient-hero bg-clip-text text-transparent tracking-wide hover:scale-105 transition-transform">
              CampusConnect
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </div>

          {/* Search and Actions */}
          <motion.div
            className="hidden md:flex items-center space-x-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search clubs, events..."
                className="pl-10 pr-4 py-2 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm w-64 transition-all focus:shadow-md"
              />
            </div>
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
              <User className="h-4 w-4" />
            </Button>
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:rotate-90 transition-transform"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation with Animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-card"
            >
              <div className="px-4 py-4 space-y-4">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="block text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.3 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <div className="pt-4 border-t border-border">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search clubs, events..."
                      className="pl-10 pr-4 py-2 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm w-full"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                      <Bell className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                      <User className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

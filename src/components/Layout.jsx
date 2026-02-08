import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Languages, 
  Globe2, 
  MessageSquare, 
  FolderOpen,
  Menu,
  X,
  Home,
  User,
  Wine,
  FileText,
  ClipboardList
} from 'lucide-react';
import { cn } from '../lib/utils';

// Navigation items with icons and colors - based on E-Portfolio Checklist
const navItems = [
  { path: '/intro', label: 'Introduction', icon: User, color: '#C6796F' },
  { path: '/contract', label: 'My Learning Contract', icon: ClipboardList, color: '#CD9D6A' },
  { path: '/culture', label: 'Content/Culture', icon: Globe2, color: '#83B764' },
  { path: '/reflection', label: 'Reflection', icon: MessageSquare, color: '#77C099' },
];

// Simple Nav Link for desktop
function NavLink({ item, isActive }) {
  const Icon = item.icon;
  
  return (
    <Link
      to={item.path}
      className={cn(
        "relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
        isActive 
          ? "text-white" 
          : "text-gray-400 hover:text-white hover:bg-white/5"
      )}
    >
      <Icon 
        className="w-4 h-4" 
        style={{ color: isActive ? item.color : undefined }}
      />
      <span className="text-sm font-medium">{item.label}</span>
      
      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 rounded-full"
          style={{ background: item.color }}
          layoutId="activeNav"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </Link>
  );
}

// Mobile Nav Link
function MobileNavLink({ item, isActive, onClick }) {
  const Icon = item.icon;
  
  return (
    <Link
      to={item.path}
      onClick={onClick}
      className="block"
    >
      <motion.div
        className={cn(
          "relative rounded-xl p-3 flex items-center gap-4 transition-all",
          isActive 
            ? "bg-white/10 border border-white/20" 
            : "hover:bg-white/5"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: isActive ? item.color : `${item.color}40` }}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className={cn(
          "font-medium",
          isActive ? "text-white" : "text-gray-300"
        )}>
          {item.label}
        </span>
        
        {isActive && (
          <div 
            className="absolute right-3 w-2 h-2 rounded-full"
            style={{ background: item.color }}
          />
        )}
      </motion.div>
    </Link>
  );
}

export default function Layout({ children }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-['Inter',sans-serif] bg-gray-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        {/* Background bar */}
        <div className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo - links to landing page */}
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-shadow">
                  <Wine className="w-5 h-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <span className="font-bold text-base text-white block leading-tight">
                    Jarrod Oh
                  </span>
                  <span className="text-xs text-amber-500/70">
                    GL E-Portfolio
                  </span>
                </div>
              </Link>

              {/* Right side buttons */}
              <div className="flex items-center gap-3">
                {/* Home button */}
                <Link
                  to="/"
                  className="p-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-amber-500/30 transition-all"
                  title="Back to landing"
                >
                  <Home className="w-5 h-5 text-amber-500" />
                </Link>

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5 text-gray-300" />
                  ) : (
                    <Menu className="w-5 h-5 text-gray-300" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links - simple inline style */}
        <div className="hidden lg:block bg-gray-900/80 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-2">
            <div className="flex items-center justify-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  item={item}
                  isActive={location.pathname === item.path}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden bg-gray-900/98 backdrop-blur-xl border-b border-gray-800"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <MobileNavLink
                    key={item.path}
                    item={item}
                    isActive={location.pathname === item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-28 lg:pt-32">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © 2026 Jarrod Oh | Guided Learning E-Portfolio | Temasek Polytechnic
          </p>
          <p className="text-xs text-amber-500/50 mt-1">
            Japanese Language & Nightlife Culture Research
          </p>
        </div>
      </footer>
    </div>
  );
}

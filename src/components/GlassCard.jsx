import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export default function GlassCard({ 
  children, 
  className = '', 
  hover = true,
  padding = 'p-6',
  ...props 
}) {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-gray-900/80 backdrop-blur-md',
        'border border-gray-800/50',
        'shadow-xl shadow-black/20',
        padding,
        className
      )}
      whileHover={hover ? { 
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        borderColor: 'rgba(251,146,60,0.3)'
      } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

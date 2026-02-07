import { motion } from 'framer-motion';

export default function SectionHeader({ 
  eyebrow, 
  title, 
  subtitle,
  align = 'left' 
}) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <motion.div 
      className={`mb-8 ${alignClass[align]}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {eyebrow && (
        <motion.span 
          className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-amber-400 uppercase bg-amber-500/10 border border-amber-500/20 rounded-full mb-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          {eyebrow}
        </motion.span>
      )}
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
        {title}
      </h1>
      
      {subtitle && (
        <p className="text-lg text-gray-400 max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { Image, Video, FileText, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

const typeIcons = {
  image: Image,
  video: Video,
  doc: FileText,
  link: LinkIcon,
};

const sectionColors = {
  intro: 'border-l-amber-500 bg-amber-900/20',
  language: 'border-l-orange-500 bg-orange-900/20',
  culture: 'border-l-red-500 bg-red-900/20',
  reflection: 'border-l-purple-500 bg-purple-900/20',
  deliverable: 'border-l-amber-400 bg-amber-900/20',
};

export default function MediaCard({ 
  title, 
  description, 
  section, 
  type, 
  week,
  src, 
  tags = [],
  isYouTube = false,
  onClick 
}) {
  const Icon = typeIcons[type] || FileText;
  const colorClass = sectionColors[section] || sectionColors.deliverable;

  // Extract YouTube video ID for thumbnail
  const getYouTubeThumbnail = (url) => {
    const match = url.match(/embed\/([^?]+)/);
    if (match) {
      return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    }
    return null;
  };

  const youtubeThumbnail = isYouTube ? getYouTubeThumbnail(src) : null;

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-xl cursor-pointer',
        'bg-gray-900/80',
        'backdrop-blur-sm',
        'border-l-4',
        colorClass,
        'shadow-md hover:shadow-xl hover:shadow-amber-500/10',
        'transition-all duration-300'
      )}
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Thumbnail preview for images/videos */}
      {(type === 'image' || type === 'video') && (src || youtubeThumbnail) && (
        <div className="relative h-40 overflow-hidden">
          <img 
            src={youtubeThumbnail || src} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          {type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 bg-red-600/90 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-1" />
              </div>
            </div>
          )}
          {isYouTube && (
            <div className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">
              YouTube
            </div>
          )}
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-medium text-gray-400 uppercase">
              Week {week}
            </span>
          </div>
          <ExternalLink className="w-4 h-4 text-gray-500 hover:text-amber-400" />
        </div>

        <h3 className="font-semibold text-white mb-1 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-sm text-gray-400 line-clamp-2 mb-3">
          {description}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-0.5 text-xs font-medium bg-gray-800 text-amber-400 rounded-full"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-0.5 text-xs text-gray-500">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

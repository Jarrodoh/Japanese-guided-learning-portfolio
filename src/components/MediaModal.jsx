import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink } from 'lucide-react';

export default function MediaModal({ isOpen, onClose, item }) {
  if (!item) return null;

  const renderContent = () => {
    switch (item.type) {
      case 'image':
        return (
          <img 
            src={item.src} 
            alt={item.title}
            className="max-w-full max-h-[70vh] object-contain rounded-lg"
          />
        );
      case 'video':
        // Check if it's a YouTube embed
        if (item.isYouTube || item.src.includes('youtube.com/embed')) {
          return (
            <div className="w-full aspect-video max-w-3xl">
              <iframe
                src={item.src}
                title={item.title}
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          );
        }
        return (
          <video 
            src={item.src} 
            controls 
            className="max-w-full max-h-[70vh] rounded-lg"
          >
            Your browser does not support the video tag.
          </video>
        );
      case 'doc':
        return (
          <div className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-800 rounded-xl flex items-center justify-center">
              <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <a 
              href={item.src} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Document
            </a>
          </div>
        );
      case 'link':
        return (
          <div className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-800 rounded-xl flex items-center justify-center">
              <ExternalLink className="w-10 h-10 text-amber-400" />
            </div>
            <a 
              href={item.src} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Open Link
            </a>
          </div>
        );
      default:
        return <p className="text-gray-400">Content type not supported</p>;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div>
                <h3 className="font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Week {item.week} · {item.section}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-amber-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 flex items-center justify-center min-h-[300px]">
              {renderContent()}
            </div>

            {/* Description */}
            {item.description && (
              <div className="p-4 border-t border-gray-800">
                <p className="text-gray-400">
                  {item.description}
                </p>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs font-medium bg-gray-800 text-amber-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

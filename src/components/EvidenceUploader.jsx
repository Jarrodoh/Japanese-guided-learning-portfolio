import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, FileText, Image, Video, Link as LinkIcon, Plus } from 'lucide-react';
import GlassCard from './GlassCard';
import { cn } from '../lib/utils';

const sectionOptions = [
  { value: 'intro', label: 'Introduction' },
  { value: 'language', label: 'Language' },
  { value: 'culture', label: 'Culture' },
  { value: 'reflection', label: 'Reflection' },
  { value: 'deliverable', label: 'Deliverable' },
];

const typeOptions = [
  { value: 'image', label: 'Image', icon: Image },
  { value: 'video', label: 'Video', icon: Video },
  { value: 'doc', label: 'Document', icon: FileText },
  { value: 'link', label: 'Link', icon: LinkIcon },
];

export default function EvidenceUploader({ onUpload, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    section: 'language',
    type: 'image',
    week: 1,
    tags: '',
    src: '',
  });
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const evidence = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        src: formData.type === 'link' ? formData.src : (file ? URL.createObjectURL(file) : ''),
      };
      
      onUpload(evidence);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const TypeIcon = typeOptions.find(t => t.value === formData.type)?.icon || FileText;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel}
    >
      <GlassCard 
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto"
        hover={false}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            Upload Evidence
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-amber-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Enter title..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              placeholder="Enter description..."
            />
          </div>

          {/* Section & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Section
              </label>
              <select
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                {sectionOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                {typeOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Week */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Week
            </label>
            <input
              type="number"
              min={1}
              max={17}
              value={formData.week}
              onChange={(e) => setFormData({ ...formData, week: parseInt(e.target.value) || 1 })}
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* File Upload or Link */}
          {formData.type === 'link' ? (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                URL
              </label>
              <input
                type="url"
                value={formData.src}
                onChange={(e) => setFormData({ ...formData, src: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="https://..."
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                File
              </label>
              <div
                className={cn(
                  'relative border-2 border-dashed rounded-lg p-6 text-center transition-colors',
                  dragActive 
                    ? 'border-amber-500 bg-amber-900/20' 
                    : 'border-gray-700 hover:border-amber-500/50'
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept={formData.type === 'image' ? 'image/*' : formData.type === 'video' ? 'video/*' : '*'}
                />
                
                {file ? (
                  <div className="flex items-center justify-center gap-2">
                    <TypeIcon className="w-6 h-6 text-amber-400" />
                    <span className="text-gray-300">{file.name}</span>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setFile(null); }}
                      className="p-1 hover:bg-gray-800 rounded"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-8 h-8 mx-auto text-gray-500 mb-2" />
                    <p className="text-sm text-gray-400">
                      Drag & drop or click to upload
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="hiragana, notes, week1..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.title}
              className="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-800 disabled:text-gray-400 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Evidence
                </>
              )}
            </button>
          </div>
        </form>
      </GlassCard>
    </motion.div>
  );
}

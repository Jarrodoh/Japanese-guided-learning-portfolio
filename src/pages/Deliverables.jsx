import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderOpen, 
  Search, 
  Filter,
  Plus,
  Grid3X3,
  List
} from 'lucide-react';
import PageBackground from '../components/PageBackground';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import MediaCard from '../components/MediaCard';
import MediaModal from '../components/MediaModal';
import EvidenceUploader from '../components/EvidenceUploader';

// All deliverables - UPDATE THESE with your actual content
const staticDeliverables = [
  // Meeting Recordings - YouTube Embeds
  {
    id: 'meeting1',
    title: 'Meeting 1 - Project Kickoff',
    description: 'First team meeting discussing project scope, objectives, and initial planning',
    section: 'intro',
    week: 1,
    type: 'video',
    src: 'https://www.youtube.com/embed/LC82fHXtiD0',
    isYouTube: true,
    tags: ['meeting', 'planning', 'kickoff', 'video']
  },
  {
    id: 'meeting2',
    title: 'Meeting 2 - Progress Review',
    description: 'Second team meeting reviewing progress and discussing next steps',
    section: 'reflection',
    week: 8,
    type: 'video',
    src: 'https://www.youtube.com/embed/rKZ6kvqf3-M',
    isYouTube: true,
    tags: ['meeting', 'progress', 'review', 'video']
  },
  {
    id: 'meeting3',
    title: 'Meeting 3 - Final Wrap-up',
    description: 'Final team meeting wrapping up the project and reflecting on learnings',
    section: 'reflection',
    week: 16,
    type: 'video',
    src: 'https://www.youtube.com/embed/oDPmZRUyHGA',
    isYouTube: true,
    tags: ['meeting', 'final', 'wrap-up', 'video']
  },
  // Admin/Intro Documents
  {
    id: 's1',
    title: 'Learning Contract',
    description: 'My signed GL learning contract outlining objectives and commitments',
    section: 'intro',
    week: 2,
    type: 'doc',
    src: '/docs/learning-contract.pdf',
    tags: ['contract', 'official', 'agreement']
  },
  // Language Deliverables
  {
    id: 's3',
    title: 'Hiragana Practice Sheets',
    description: 'Complete hiragana writing practice with stroke order',
    section: 'language',
    week: 3,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1564566714611-7bf5a9a8b8e0?w=600&auto=format&fit=crop&q=80',
    tags: ['hiragana', 'writing', 'practice']
  },
  {
    id: 's4',
    title: 'Katakana Quiz Results',
    description: 'Quiz showing 95% mastery of katakana characters',
    section: 'language',
    week: 4,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80',
    tags: ['katakana', 'quiz', 'assessment']
  },
  {
    id: 's5',
    title: 'Grammar Notes Collection',
    description: 'Comprehensive notes on N5-level grammar patterns',
    section: 'language',
    week: 6,
    type: 'doc',
    src: '/docs/grammar-notes.pdf',
    tags: ['grammar', 'notes', 'N5']
  },
  {
    id: 's6',
    title: 'Speaking Session 1',
    description: 'First speaking practice - self introduction',
    section: 'language',
    week: 11,
    type: 'video',
    src: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=600&auto=format&fit=crop&q=80',
    tags: ['speaking', 'video', 'practice']
  },
  {
    id: 's7',
    title: 'Kanji Progress Chart',
    description: '50+ kanji characters learned with readings',
    section: 'language',
    week: 9,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=600&auto=format&fit=crop&q=80',
    tags: ['kanji', 'progress', 'chart']
  },
  // Culture Deliverables
  {
    id: 's8',
    title: 'Izakaya Research Document',
    description: 'Comprehensive study of izakaya culture and customs',
    section: 'culture',
    week: 7,
    type: 'doc',
    src: '/docs/izakaya-research.pdf',
    tags: ['izakaya', 'research', 'culture']
  },
  {
    id: 's9',
    title: 'Nightlife District Analysis',
    description: 'Visual guide to Tokyo entertainment districts',
    section: 'culture',
    week: 10,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&auto=format&fit=crop&q=80',
    tags: ['tokyo', 'nightlife', 'districts']
  },
  {
    id: 's10',
    title: 'Karaoke Culture Analysis',
    description: 'Social significance of karaoke in Japanese society',
    section: 'culture',
    week: 10,
    type: 'doc',
    src: '/docs/karaoke-analysis.pdf',
    tags: ['karaoke', 'culture', 'social']
  },
  // Reflection
  {
    id: 's11',
    title: 'Mid-Semester Reflection',
    description: 'Week 8 progress assessment and goal adjustment',
    section: 'reflection',
    week: 8,
    type: 'doc',
    src: '/docs/mid-semester-reflection.pdf',
    tags: ['reflection', 'progress', 'assessment']
  },
  {
    id: 's12',
    title: 'Final Reflection Essay',
    description: 'Comprehensive reflection on the entire GL journey',
    section: 'reflection',
    week: 16,
    type: 'doc',
    src: '/docs/final-reflection.pdf',
    tags: ['reflection', 'final', 'essay']
  },
];

const sectionOptions = [
  { value: 'all', label: 'All Sections' },
  { value: 'intro', label: 'Introduction' },
  { value: 'language', label: 'Language' },
  { value: 'culture', label: 'Culture' },
  { value: 'reflection', label: 'Reflection' },
];

const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'image', label: 'Images' },
  { value: 'video', label: 'Videos' },
  { value: 'doc', label: 'Documents' },
  { value: 'link', label: 'Links' },
];

export default function Deliverables() {
  const [search, setSearch] = useState('');
  const [sectionFilter, setSectionFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [uploadedEvidence, setUploadedEvidence] = useState([]);

  // Combine static and uploaded evidence
  const allDeliverables = useMemo(() => {
    return [...staticDeliverables, ...uploadedEvidence];
  }, [uploadedEvidence]);

  // Filter deliverables
  const filteredDeliverables = useMemo(() => {
    return allDeliverables.filter((item) => {
      const matchesSearch = search === '' || 
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
      
      const matchesSection = sectionFilter === 'all' || item.section === sectionFilter;
      const matchesType = typeFilter === 'all' || item.type === typeFilter;

      return matchesSearch && matchesSection && matchesType;
    });
  }, [allDeliverables, search, sectionFilter, typeFilter]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleUpload = (newEvidence) => {
    const evidenceWithId = {
      ...newEvidence,
      id: `u${Date.now()}`,
    };
    setUploadedEvidence([...uploadedEvidence, evidenceWithId]);
    setIsUploaderOpen(false);
  };

  // Statistics
  const stats = {
    total: allDeliverables.length,
    images: allDeliverables.filter(d => d.type === 'image').length,
    videos: allDeliverables.filter(d => d.type === 'video').length,
    docs: allDeliverables.filter(d => d.type === 'doc').length,
  };

  return (
    <>
      <PageBackground variant="deliverables" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden mb-12">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&auto=format&fit=crop&q=80"
              alt="Library"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/80 to-transparent" />
          </div>

          <div className="relative z-10 px-8 py-16 md:py-20">
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FolderOpen className="w-8 h-8 text-amber-400" />
              <span className="text-amber-400 font-medium">Evidence Library</span>
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              All Deliverables
            </motion.h1>
            <motion.p 
              className="text-amber-200/80 text-lg max-w-2xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Complete collection of evidence from my GL journey
            </motion.p>

            {/* Stats */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-lg px-4 py-2">
                <span className="text-2xl font-bold text-white">{stats.total}</span>
                <span className="text-amber-400 ml-2">Total</span>
              </div>
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-lg px-4 py-2">
                <span className="text-2xl font-bold text-white">{stats.images}</span>
                <span className="text-amber-400 ml-2">Images</span>
              </div>
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-lg px-4 py-2">
                <span className="text-2xl font-bold text-white">{stats.videos}</span>
                <span className="text-amber-400 ml-2">Videos</span>
              </div>
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-lg px-4 py-2">
                <span className="text-2xl font-bold text-white">{stats.docs}</span>
                <span className="text-amber-400 ml-2">Docs</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Controls */}
        <section className="mb-8">
          <GlassCard hover={false} padding="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search deliverables..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <select
                    value={sectionFilter}
                    onChange={(e) => setSectionFilter(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    {sectionOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    {typeOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-gray-700 shadow' : ''
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4 text-gray-300" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-gray-700 shadow' : ''
                    }`}
                  >
                    <List className="w-4 h-4 text-gray-300" />
                  </button>
                </div>

                {/* Upload Button */}
                <button
                  onClick={() => setIsUploaderOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Upload Evidence
                </button>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-400">
            Showing {filteredDeliverables.length} of {allDeliverables.length} items
          </p>
        </div>

        {/* Deliverables Grid/List */}
        <section>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDeliverables.map((item) => (
                <MediaCard
                  key={item.id}
                  {...item}
                  onClick={() => handleItemClick(item)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDeliverables.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => handleItemClick(item)}
                  className="cursor-pointer"
                >
                  <GlassCard className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.type === 'image' && item.src && (
                        <img src={item.src} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-400 truncate">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-gray-800 text-amber-400 rounded-full">
                          Week {item.week}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded-full capitalize">
                          {item.section}
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredDeliverables.length === 0 && (
            <GlassCard hover={false} className="text-center py-12">
              <FolderOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">
                No deliverables found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or filters
              </p>
            </GlassCard>
          )}
        </section>
      </div>

      {/* Media Modal */}
      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
      />

      {/* Evidence Uploader */}
      <AnimatePresence>
        {isUploaderOpen && (
          <EvidenceUploader
            onUpload={handleUpload}
            onCancel={() => setIsUploaderOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

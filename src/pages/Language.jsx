import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Languages, 
  BookOpen, 
  Mic, 
  PenTool,
  Filter,
  BarChart3
} from 'lucide-react';
import PageBackground from '../components/PageBackground';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import MediaCard from '../components/MediaCard';
import MediaModal from '../components/MediaModal';

// Language learning evidence - UPDATE THESE with your actual content
const languageDeliverables = [
  {
    id: 1,
    title: 'Hiragana Practice Sheet',
    description: 'Complete hiragana chart with stroke order practice',
    section: 'language',
    week: 3,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1564566714611-7bf5a9a8b8e0?w=600&auto=format&fit=crop&q=80',
    tags: ['hiragana', 'writing', 'practice']
  },
  {
    id: 2,
    title: 'Katakana Quiz Results',
    description: 'Screenshot of completed katakana quiz with 95% score',
    section: 'language',
    week: 4,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80',
    tags: ['katakana', 'quiz', 'assessment']
  },
  {
    id: 3,
    title: 'Grammar Notes - Particles',
    description: 'Detailed notes on は, が, を, に, で particles',
    section: 'language',
    week: 6,
    type: 'doc',
    src: '/docs/grammar-notes.pdf',
    tags: ['grammar', 'particles', 'notes']
  },
  {
    id: 4,
    title: 'Speaking Session Recording',
    description: 'Self-introduction and basic conversation practice',
    section: 'language',
    week: 11,
    type: 'video',
    src: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=600&auto=format&fit=crop&q=80',
    tags: ['speaking', 'conversation', 'practice']
  },
  {
    id: 5,
    title: 'Kanji Progress Chart',
    description: 'First 30 kanji characters learned with readings',
    section: 'language',
    week: 9,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=600&auto=format&fit=crop&q=80',
    tags: ['kanji', 'progress', 'chart']
  },
  {
    id: 6,
    title: 'Renshu App Screenshots',
    description: 'Daily streak and vocabulary mastery progress',
    section: 'language',
    week: 8,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&auto=format&fit=crop&q=80',
    tags: ['app', 'vocabulary', 'progress']
  },
];

// Learning statistics - UPDATE THESE
const stats = [
  { label: 'Kanji Learned', value: '50+', icon: PenTool, color: 'text-amber-400' },
  { label: 'Vocabulary Words', value: '200+', icon: BookOpen, color: 'text-orange-400' },
  { label: 'Speaking Sessions', value: '8', icon: Mic, color: 'text-red-400' },
  { label: 'Study Hours', value: '60+', icon: BarChart3, color: 'text-purple-400' },
];

// Reflection prompts
const reflectionPrompts = [
  {
    question: "What was the most challenging aspect of learning Japanese?",
    answer: "Memorizing kanji was initially overwhelming, but using spaced repetition helped tremendously."
  },
  {
    question: "How has your learning approach evolved?",
    answer: "I shifted from passive study to active practice, incorporating speaking exercises earlier."
  },
  {
    question: "What surprised you about the Japanese language?",
    answer: "The contextual nature of communication - so much meaning comes from context rather than explicit words."
  },
];

const typeFilters = [
  { value: 'all', label: 'All Types' },
  { value: 'image', label: 'Images' },
  { value: 'video', label: 'Videos' },
  { value: 'doc', label: 'Documents' },
];

export default function Language() {
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredDeliverables = useMemo(() => {
    if (filter === 'all') return languageDeliverables;
    return languageDeliverables.filter(d => d.type === filter);
  }, [filter]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <PageBackground variant="language" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden mb-12">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&auto=format&fit=crop&q=80"
              alt="Japanese calligraphy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/80 to-transparent" />
          </div>

          <div className="relative z-10 px-8 py-16 md:py-24">
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Languages className="w-8 h-8 text-amber-400" />
              <span className="text-amber-400 font-medium">Language Learning</span>
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              日本語の旅
            </motion.h1>
            <motion.p 
              className="text-amber-200/80 text-lg max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              My Japanese Language Journey - From hiragana basics to conversational skills
            </motion.p>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="text-center">
                    <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                    <p className="text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-400">
                      {stat.label}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Filter */}
        <section className="mb-8">
          <GlassCard hover={false} padding="p-4">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {typeFilters.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setFilter(t.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === t.value
                        ? 'bg-amber-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Evidence Grid */}
        <section className="mb-12">
          <SectionHeader 
            eyebrow="Evidence"
            title="Language Learning Materials"
            subtitle="Documentation of my Japanese language learning progress"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeliverables.map((item) => (
              <MediaCard
                key={item.id}
                {...item}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div>
        </section>

        {/* Reflections */}
        <section>
          <SectionHeader 
            eyebrow="Insights"
            title="Learning Reflections"
            subtitle="Thoughts on my language learning journey"
          />

          <div className="space-y-4">
            {reflectionPrompts.map((prompt, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard hover={false}>
                  <h3 className="font-semibold text-white mb-2">
                    {prompt.question}
                  </h3>
                  <p className="text-gray-400 italic">
                    "{prompt.answer}"
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Media Modal */}
      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
      />
    </>
  );
}

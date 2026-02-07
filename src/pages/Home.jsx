import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Languages, 
  Globe2, 
  BookOpen, 
  Calendar,
  ArrowRight,
  Sparkles,
  Play,
  Download,
  Plus
} from 'lucide-react';
import PageBackground from '../components/PageBackground';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';

// Featured learning items - UPDATE THESE with your actual content
const featuredItems = [
  {
    id: 1,
    title: 'Kanji Progress',
    desc: 'Mastered 50+ basic kanji characters',
    icon: Languages,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-100 dark:bg-pink-900/30'
  },
  {
    id: 2,
    title: 'Grammar Notes',
    desc: 'N5-level grammar patterns documented',
    icon: BookOpen,
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    id: 3,
    title: 'Speaking Practice',
    desc: 'Weekly speaking sessions recorded',
    icon: Play,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    id: 4,
    title: 'Nightlife Research',
    desc: 'Cultural insights on Japanese nightlife',
    icon: Globe2,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30'
  },
];

// Quick links to other sections
const quickLinks = [
  { path: '/intro', label: 'Introduction', icon: BookOpen, color: 'text-blue-500' },
  { path: '/plan', label: 'Learning Plan', icon: Calendar, color: 'text-green-500' },
  { path: '/language', label: 'Language', icon: Languages, color: 'text-pink-500' },
  { path: '/culture', label: 'Culture', icon: Globe2, color: 'text-amber-500' },
];

export default function Home() {
  // Current progress - UPDATE THIS
  const currentWeek = 16;
  const totalWeeks = 17;
  const progressPercent = Math.round((currentWeek / totalWeeks) * 100);

  return (
    <>
      <PageBackground variant="default" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden mb-12">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&auto=format&fit=crop&q=80"
              alt="Japanese temple"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 py-16 md:py-24">
            <motion.span 
              className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 backdrop-blur-sm text-purple-200 text-sm font-medium rounded-full mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Sparkles className="w-4 h-4" />
              FEATURED
            </motion.span>

            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Speaking Practice Highlight
            </motion.h1>

            <motion.p 
              className="text-gray-300 text-lg mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Watch the latest speaking session clip, then explore evidence organized by week.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/language"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-colors"
              >
                <Play className="w-4 h-4" />
                Watch
              </Link>
              <Link
                to="/deliverables"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800/50 backdrop-blur-sm text-white font-medium rounded-full hover:bg-gray-700/50 transition-colors border border-gray-600"
              >
                <Download className="w-4 h-4" />
                Download Contract
              </Link>
              <button
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800/50 backdrop-blur-sm text-white font-medium rounded-full hover:bg-gray-700/50 transition-colors border border-gray-600"
              >
                <Plus className="w-4 h-4" />
                Add to List
              </button>
            </motion.div>
          </div>
        </section>

        {/* Progress Overview */}
        <section className="mb-12">
          <GlassCard hover={false} className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Learning Progress
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Week {currentWeek} of {totalWeeks}
                </p>
              </div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {progressPercent}%
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </GlassCard>
        </section>

        {/* Featured Items Grid */}
        <section className="mb-12">
          <SectionHeader 
            eyebrow="Featured"
            title="Learning Highlights"
            subtitle="Key achievements and ongoing progress in my GL journey"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <GlassCard key={item.id}>
                  <div className={`w-12 h-12 ${item.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`} style={{ color: item.color.includes('pink') ? '#ec4899' : item.color.includes('blue') ? '#3b82f6' : item.color.includes('green') ? '#22c55e' : '#f59e0b' }} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.desc}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* Quick Links */}
        <section>
          <SectionHeader 
            eyebrow="Explore"
            title="Portfolio Sections"
            subtitle="Navigate through different aspects of my learning journey"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.path} to={link.path}>
                  <GlassCard className="flex items-center gap-4">
                    <div className={`w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${link.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {link.label}
                      </h3>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, Calendar } from 'lucide-react';
import PageBackground from '../components/PageBackground';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import Timeline from '../components/Timeline';

// Current week - UPDATE THIS as you progress
const currentWeek = 16;

// Timeline data - UPDATE THIS with your actual weekly activities
const weeks = [
  {
    week: 1,
    label: 'Project Kickoff',
    bucket: 'admin',
    actions: [
      'Submitted GL application form',
      'Initial meeting with supervisor',
      'Drafted project proposal'
    ],
    deliverable: 'Project Proposal Draft'
  },
  {
    week: 2,
    label: 'Learning Contract',
    bucket: 'admin',
    actions: [
      'Finalized learning objectives',
      'Signed learning contract',
      'Set up study schedule'
    ],
    deliverable: 'Signed Learning Contract'
  },
  {
    week: 3,
    label: 'Hiragana Foundation',
    bucket: 'language',
    actions: [
      'Started Minna no Nihongo Chapter 1',
      'Learned all 46 hiragana characters',
      'Daily writing practice (30 min)'
    ],
    deliverable: 'Hiragana Practice Sheets'
  },
  {
    week: 4,
    label: 'Katakana & Basic Vocab',
    bucket: 'language',
    actions: [
      'Mastered 46 katakana characters',
      'Learned 50 basic vocabulary words',
      'Started using Renshu app daily'
    ],
    deliverable: 'Katakana Quiz Results'
  },
  {
    week: 5,
    label: 'Introduction to Nightlife Research',
    bucket: 'culture',
    actions: [
      'Defined research scope and questions',
      'Gathered initial sources',
      'Created research outline'
    ],
    deliverable: 'Research Outline'
  },
  {
    week: 6,
    label: 'Basic Grammar Patterns',
    bucket: 'language',
    actions: [
      'Learned は/が particle usage',
      'Practiced です/ます forms',
      'Completed Chapter 2-3'
    ],
    deliverable: 'Grammar Notes'
  },
  {
    week: 7,
    label: 'Izakaya Culture Research',
    bucket: 'culture',
    actions: [
      'Researched izakaya history and customs',
      'Analyzed social etiquette',
      'Compared with Singapore dining culture'
    ],
    deliverable: 'Izakaya Research Notes'
  },
  {
    week: 8,
    label: 'Mid-Semester Review',
    bucket: 'milestone',
    actions: [
      'Mid-point reflection with supervisor',
      'Progress assessment',
      'Adjusted learning goals'
    ],
    deliverable: 'Mid-Semester Reflection'
  },
  {
    week: 9,
    label: 'Kanji Basics',
    bucket: 'language',
    actions: [
      'Started learning first 20 kanji',
      'Practiced stroke order',
      'Vocabulary building with kanji'
    ],
    deliverable: 'Kanji Practice Sheets'
  },
  {
    week: 10,
    label: 'Karaoke & Nomikai Research',
    bucket: 'culture',
    actions: [
      'Studied karaoke culture significance',
      'Researched nomikai work drinking customs',
      'Analyzed social bonding aspects'
    ],
    deliverable: 'Culture Research Document'
  },
  {
    week: 11,
    label: 'Listening & Speaking Practice',
    bucket: 'language',
    actions: [
      'JapanesePod101 lessons daily',
      'Shadowing exercises',
      'First speaking session'
    ],
    deliverable: 'Speaking Session Recording'
  },
  {
    week: 12,
    label: 'Advanced Grammar',
    bucket: 'language',
    actions: [
      'Te-form conjugations',
      'Request and permission expressions',
      'Completed Chapter 4-5'
    ],
    deliverable: 'Grammar Exercise Sheets'
  },
  {
    week: 13,
    label: 'Modern Nightlife Trends',
    bucket: 'culture',
    actions: [
      'Researched changing trends post-pandemic',
      'Analyzed youth vs traditional customs',
      'Social media influence on nightlife'
    ],
    deliverable: 'Trend Analysis Report'
  },
  {
    week: 14,
    label: 'Conversation Practice',
    bucket: 'language',
    actions: [
      'Role-play scenarios',
      'Restaurant ordering practice',
      'Self-introduction in Japanese'
    ],
    deliverable: 'Conversation Video'
  },
  {
    week: 15,
    label: 'Research Synthesis',
    bucket: 'culture',
    actions: [
      'Compiled all research findings',
      'Created presentation draft',
      'Prepared visual materials'
    ],
    deliverable: 'Research Presentation Draft'
  },
  {
    week: 16,
    label: 'Portfolio Compilation',
    bucket: 'admin',
    actions: [
      'Organizing all evidence',
      'Writing reflections',
      'Finalizing e-portfolio'
    ],
    deliverable: 'Complete E-Portfolio'
  },
  {
    week: 17,
    label: 'Final Presentation',
    bucket: 'milestone',
    actions: [
      'Final presentation to supervisor',
      'Peer feedback session',
      'Submit all deliverables'
    ],
    deliverable: 'Final Presentation & Report'
  },
];

// Milestones
const milestones = [
  { week: 2, label: 'Contract Signed', color: 'bg-amber-500' },
  { week: 8, label: 'Mid-Semester Review', color: 'bg-orange-500' },
  { week: 17, label: 'Final Presentation', color: 'bg-red-500' },
];

const categoryFilters = [
  { value: 'all', label: 'All Categories' },
  { value: 'language', label: 'Language' },
  { value: 'culture', label: 'Culture' },
  { value: 'admin', label: 'Admin' },
  { value: 'milestone', label: 'Milestone' },
];

export default function Plan() {
  const [filter, setFilter] = useState('all');

  const filteredWeeks = useMemo(() => {
    if (filter === 'all') return weeks;
    return weeks.filter(w => w.bucket === filter);
  }, [filter]);

  const progress = Math.round((currentWeek / 17) * 100);

  return (
    <>
      <PageBackground variant="plan" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden mb-12">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1200&auto=format&fit=crop&q=80"
              alt="Planning and timeline"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/80 to-transparent" />
          </div>

          <div className="relative z-10 px-8 py-16 md:py-20">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Learning Journey
            </motion.h1>
            <motion.p 
              className="text-amber-200/80 text-lg max-w-2xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              17 weeks of structured learning, from foundation to fluency.
            </motion.p>

            {/* Progress Stats */}
            <motion.div 
              className="flex flex-wrap gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl px-6 py-4">
                <p className="text-amber-400 text-sm">Current Week</p>
                <p className="text-3xl font-bold text-white">{currentWeek}</p>
              </div>
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl px-6 py-4">
                <p className="text-amber-400 text-sm">Progress</p>
                <p className="text-3xl font-bold text-white">{progress}%</p>
              </div>
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl px-6 py-4">
                <p className="text-amber-400 text-sm">Weeks Left</p>
                <p className="text-3xl font-bold text-white">{17 - currentWeek}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Milestones */}
        <section className="mb-8">
          <GlassCard hover={false} padding="p-4">
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              <span className="text-sm font-medium text-gray-400 whitespace-nowrap">
                Milestones:
              </span>
              {milestones.map((milestone) => (
                <div 
                  key={milestone.week}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full whitespace-nowrap ${
                    milestone.week <= currentWeek 
                      ? 'bg-amber-900/30 text-amber-400' 
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${milestone.color}`} />
                  <span className="text-sm font-medium">Week {milestone.week}: {milestone.label}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* Filter Controls */}
        <section className="mb-8">
          <GlassCard hover={false} padding="p-4">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {categoryFilters.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setFilter(cat.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === cat.value
                        ? 'bg-amber-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Timeline */}
        <section>
          <SectionHeader 
            eyebrow="Timeline"
            title="Weekly Activities"
            subtitle="Track progress through each week of the learning journey"
          />

          <Timeline weeks={filteredWeeks} currentWeek={currentWeek} />
        </section>
      </div>
    </>
  );
}

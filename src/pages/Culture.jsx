import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe2, 
  Building2, 
  Users, 
  TrendingUp,
  MapPin,
  Utensils,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  ExternalLink,
  Image as ImageIcon,
  Calendar,
  BookOpen,
  Video,
  FileText,
  BarChart3,
  Target,
  X,
  Smartphone,
  Headphones
} from 'lucide-react';
import PageBackground from '../components/PageBackground';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';

// Progress/Milestone data
const milestones = [
  { week: 'Week 1-2', title: 'Project Setup', status: 'completed', description: 'Learning contract, initial research' },
  { week: 'Week 3-5', title: 'Language Basics', status: 'completed', description: 'Hiragana, Katakana, basic phrases' },
  { week: 'Week 6-8', title: 'Culture Research', status: 'completed', description: 'Nightlife culture deep dive' },
  { week: 'Week 9-11', title: 'PPMR 1', status: 'completed', description: 'First progress monitoring' },
  { week: 'Week 12-14', title: 'Content Creation', status: 'in-progress', description: 'Poster, presentations' },
  { week: 'Week 15-17', title: 'Final Submission', status: 'upcoming', description: 'E-Portfolio completion' },
];

// Deliverables based on Learning Contract
const deliverables = [
  { title: 'Research Poster', type: 'image', status: 'completed', description: 'Visual summary of Japanese nightlife culture' },
  { title: 'Meeting Recordings', type: 'video', status: 'completed', description: 'Video evidence of team discussions' },
  { title: 'Language Practice Logs', type: 'doc', status: 'completed', description: 'Daily language learning records' },
  { title: 'Cultural Analysis', type: 'doc', status: 'in-progress', description: 'Written research on nightlife customs' },
];

// Resources consulted - with detailed modal content
const resources = [
  { 
    name: 'Duolingo', 
    type: 'App', 
    description: 'Daily Japanese practice', 
    icon: '📱',
    hasModal: true,
    modalImages: ['/images/duolingo.jpeg', '/images/duolingo%281%29.jpeg', '/images/duolingo%282%29.jpeg'],
    modalContent: `Duolingo has been the backbone of my daily Japanese practice throughout this Guided Learning journey. I committed to maintaining a streak from Day 1, and as of now, I've built up a consistent habit of practicing for at least 15-20 minutes every single day. The gamified approach really works for me — earning XP, maintaining streaks, and competing on leaderboards kept me motivated even on days when I felt tired or unmotivated.

What I found most valuable about Duolingo was its focus on practical vocabulary and sentence structures. The app introduced me to essential phrases like greetings, asking for directions, ordering food, and basic conversational Japanese that would be useful in real-life nightlife settings. The spaced repetition system helped reinforce words I struggled with, and I noticed significant improvement in my reading speed for hiragana and katakana over the weeks.

However, I also learned the limitations of app-based learning. While Duolingo is excellent for vocabulary and basic grammar, it doesn't fully prepare you for natural conversation flow or the nuances of keigo (polite language). That's why I supplemented it with other resources. Still, Duolingo remains my go-to for consistent daily practice and I highly recommend it as a foundation for anyone starting their Japanese learning journey.`
  },
  { 
    name: 'Minna no Nihongo', 
    type: 'Textbook', 
    description: 'Structured grammar learning', 
    icon: '📚',
    hasModal: true,
    modalImages: ['/images/mina-nihongo%20%282%29.jpeg', '/images/mina-nihongo%20%283%29.jpeg', '/images/mina-nihongo%20%284%29.jpeg', '/images/mina-nihongo%20%285%29.jpeg'],
    modalContent: `Minna no Nihongo is widely regarded as one of the most comprehensive Japanese textbooks for beginners, and it became my primary resource for structured grammar learning. Unlike apps that introduce concepts in bite-sized pieces, Minna no Nihongo provides a systematic, chapter-by-chapter progression through essential grammar patterns, vocabulary, and sentence structures.

The textbook is written entirely in Japanese (with a separate translation and grammar notes book available), which initially felt intimidating but turned out to be incredibly effective. Being immersed in Japanese text from the start forced me to engage with the language directly rather than relying on English translations. Each chapter introduces new grammar points with clear examples, followed by practice exercises, conversation drills, and reading comprehension passages.

What I found most valuable about Minna no Nihongo was how it taught grammar in context. Rather than just memorizing rules, I learned how particles like は, が, を, に, and で function in actual sentences. The textbook's progression is logical and builds upon previous lessons, which gave me a strong foundation in Japanese sentence structure. The exercises included writing practice, fill-in-the-blanks, and translation practice that reinforced what I learned.

I typically dedicated longer study sessions on weekends to work through Minna no Nihongo chapters, taking detailed notes and completing all the exercises. The images you see here are from my actual study sessions — my notes, textbook pages, and practice exercises. While it requires more time and focus compared to apps, the depth of understanding I gained from this textbook was invaluable. For anyone serious about learning Japanese properly, Minna no Nihongo is an essential resource that provides the grammatical foundation needed for true fluency.`
  },
  { 
    name: 'JapanesePod101', 
    type: 'Podcast', 
    description: 'Listening & pronunciation', 
    icon: '🎧',
    hasModal: true,
    modalImages: ['/images/japanesepod101.jpeg', '/images/hiragana-prac.jpeg', '/images/hiragana-prac-2.jpeg', '/images/katakana-prac.jpeg'],
    modalContent: `JapanesePod101 is one of the most popular Japanese learning podcasts among English speakers, and I discovered it through recommendations on Reddit's r/LearnJapanese community. The podcast offers lessons at various levels from Absolute Beginner to Advanced, and I primarily worked through their Beginner and Lower Intermediate content.

What makes JapanesePod101 stand out is the quality of their audio content. Each episode features native Japanese speakers having natural conversations, followed by detailed explanations in English. The hosts, Peter and his co-hosts, break down grammar points, vocabulary, and cultural context in an engaging and easy-to-understand way. I especially appreciated their "Culture Class" episodes which explored topics like Japanese drinking etiquette and izakaya customs — directly relevant to my nightlife culture research!

One thing JapanesePod101 really emphasizes is the importance of writing practice alongside listening. They recommend practicing hiragana and katakana by hand to build muscle memory. I found a really helpful Word document online that had all the hiragana and katakana characters with stroke order guides and practice grids. I printed it out and spent time each day tracing and writing the characters repeatedly. This hands-on practice made a huge difference — I went from struggling to recognize characters to being able to write them from memory within a few weeks. The images you see here are from my actual practice sessions using that worksheet.

I typically listened to the podcast during my commute to school, turning otherwise wasted time into productive learning sessions. The podcast significantly improved my listening comprehension and helped me recognize natural speech patterns that textbooks don't capture. I learned to identify particles, verb conjugations, and common phrases in real-time. The premium subscription also gives access to lesson notes and transcripts, which I used for review sessions. For anyone serious about Japanese, JapanesePod101 is an invaluable resource that makes learning feel less like studying and more like entertainment.`
  },
  { 
    name: 'Renshu App', 
    type: 'App', 
    description: 'Kanji & vocabulary drills', 
    icon: '📱',
    hasModal: true,
    modalImages: ['/images/renshu.jpeg', '/images/renshu%282%29.jpeg', '/images/renshu%283%29.jpeg'],
    modalContent: `Renshu became my secret weapon for conquering kanji and building vocabulary systematically. Unlike Duolingo which focuses on gamification, Renshu is designed specifically for serious Japanese learners preparing for JLPT exams. The app uses an SRS (Spaced Repetition System) algorithm similar to Anki, but with a much cleaner and more intuitive interface.

What I love about Renshu is its comprehensive approach to kanji learning. Each kanji card shows the character, its readings (on'yomi and kun'yomi), stroke order animation, and example vocabulary. The app tracks your mastery level for each item and automatically schedules reviews at optimal intervals for long-term retention. I focused on JLPT N5 kanji, which gave me the foundation to read basic signs, menus, and text that I encountered during my nightlife culture research.

The vocabulary section was equally valuable. I created custom study lists for nightlife-related terms like 居酒屋 (izakaya), 乾杯 (kanpai - cheers), 飲み放題 (nomihoudai - all-you-can-drink), and other words essential for understanding Japanese drinking culture. Being able to customize my learning to match my GL project goals made Renshu incredibly effective. I spent about 20-30 minutes daily on Renshu, usually in the evening as a wind-down activity, and saw tangible improvements in my kanji recognition within just a few weeks.`
  },
];

// References data
const references = [
  { id: 1, name: 'Go Tokyo — "Nightlife in Tokyo"', url: 'https://www.gotokyo.org/en/see-and-do/nightlife/index.html' },
  { id: 2, name: 'Japan Guide — "Shinjuku (Golden Gai)"', url: 'https://www.japan-guide.com/e/e3011.html' },
  { id: 3, name: 'Live Japan — Otoshi explanation', url: 'https://livejapan.com/en/in-tokyo/in-pref-tokyo/in-tokyo_train_station/article-a0003257/' },
  { id: 4, name: 'The Japan Times — Izakaya profitability', url: 'https://www.japantimes.co.jp/business/2024/12/09/economy/izakaya-bankruptcies-teikoku/' },
  { id: 5, name: 'Mainichi — Izakaya business conditions', url: 'https://mainichi.jp/english/articles/20241221/p2a/00m/0bu/021000c' },
  { id: 6, name: 'Nippon.com — Host club issues', url: 'https://www.nippon.com/en/japan-topics/g02499/' },
  { id: 7, name: 'Tokyo Weekender — New host club restrictions', url: 'https://www.tokyoweekender.com/japan-life/news-and-opinion/japan-host-club-predatory-practices-new-law/' },
  { id: 8, name: 'Wikipedia — Kabukichō history', url: 'https://en.wikipedia.org/wiki/Kabukich%C5%8D' },
];

// Districts data
const districts = [
  {
    name: 'Shinjuku',
    description: 'Golden Gai (tiny bars), Kabukichō (bright entertainment streets)',
    vibe: 'Eclectic mix',
    crowd: 'Diverse - salarymen to tourists',
    bestFor: 'Tiny bars, late-night energy'
  },
  {
    name: 'Shibuya',
    description: 'Youth-oriented, trend-driven nightlife hub',
    vibe: 'Young & hip',
    crowd: 'Youth, trendsetters',
    bestFor: 'Clubs, trendy bars'
  },
  {
    name: 'Roppongi',
    description: 'International crowd and club-heavy options',
    vibe: 'International',
    crowd: 'Expats, tourists',
    bestFor: 'Clubs, international scene'
  },
];

// Establishments data
const establishments = [
  { name: 'Izakaya (居酒屋)', description: 'Casual food + drinks; social, group-friendly atmosphere', icon: Utensils },
  { name: 'Tiny Bars / Alley Bars', description: 'Very small capacity, strong "regulars" culture', icon: Building2 },
  { name: 'Clubs', description: 'Concentrated in specific districts; cover charges, ID checks', icon: Users },
];

export default function Culture() {
  const [showPoster, setShowPoster] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when resource changes
  const handleSelectResource = (resource) => {
    setCurrentImageIndex(0);
    setSelectedResource(resource);
  };

  const nextImage = () => {
    if (selectedResource) {
      setCurrentImageIndex((prev) => 
        prev === selectedResource.modalImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedResource) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedResource.modalImages.length - 1 : prev - 1
      );
    }
  };

  return (
    <>
      <PageBackground variant="culture" />
      
      {/* Resource Detail Modal */}
      <AnimatePresence>
        {selectedResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedResource(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedResource.icon}</span>
                  <div>
                    <h3 className="font-semibold text-white text-lg">{selectedResource.name}</h3>
                    <span className="text-amber-400 text-sm">{selectedResource.type}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              {/* Modal Content - Side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-h-[calc(90vh-80px)] overflow-y-auto items-start">
                {/* Image Carousel */}
                <div className="flex flex-col h-full">
                  <div className="relative bg-gray-800 rounded-xl overflow-hidden aspect-[4/3]">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={currentImageIndex}
                        src={selectedResource.modalImages[currentImageIndex]}
                        alt={`${selectedResource.name} evidence ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain"
                        style={{
                          transform: selectedResource.name === 'Minna no Nihongo' && (currentImageIndex === 1 || currentImageIndex === 3) 
                            ? 'rotate(90deg)' 
                            : 'none'
                        }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                      />
                    </AnimatePresence>
                    
                    {/* Navigation Arrows */}
                    {selectedResource.modalImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                        >
                          <span className="text-white text-xl">‹</span>
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                        >
                          <span className="text-white text-xl">›</span>
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Dots Indicator */}
                  {selectedResource.modalImages.length > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                      {selectedResource.modalImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${
                            idx === currentImageIndex 
                              ? 'bg-amber-500' 
                              : 'bg-gray-600 hover:bg-gray-500'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  
                  <p className="text-gray-500 text-sm text-center mt-3">
                    Evidence of my {selectedResource.name} practice sessions ({currentImageIndex + 1}/{selectedResource.modalImages.length})
                  </p>
                </div>
                
                {/* Text Side */}
                <div className="prose prose-invert max-w-none">
                  <h4 className="text-amber-400 font-semibold mb-4">My Experience</h4>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm">
                    {selectedResource.modalContent}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden mb-12">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200&auto=format&fit=crop&q=80"
              alt="Tokyo nightlife"
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
              <Globe2 className="w-8 h-8 text-amber-300" />
              <span className="text-amber-400 font-medium">夜の文化</span>
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Japanese Nightlife Culture
            </motion.h1>
            <motion.p 
              className="text-amber-200/80 text-lg max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Tokyo's nightlife isn't just "partying" — it's a mix of <strong>after-work social rituals, tiny bars, food culture, tourism, and neighborhood identities</strong>.
            </motion.p>
          </div>
        </section>

        {/* Progress Timeline */}
        <section className="mb-12">
          <SectionHeader 
            eyebrow="Progress"
            title="Project Timeline"
            subtitle="Milestones and progress tracking"
          />
          
          <GlassCard hover={false} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.week}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl border ${
                    milestone.status === 'completed' 
                      ? 'bg-green-900/20 border-green-800/50' 
                      : milestone.status === 'in-progress'
                      ? 'bg-amber-900/20 border-amber-800/50'
                      : 'bg-gray-900/20 border-gray-700/50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {milestone.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : milestone.status === 'in-progress' ? (
                      <Target className="w-5 h-5 text-amber-400 animate-pulse" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-500" />
                    )}
                    <span className={`text-xs font-mono ${
                      milestone.status === 'completed' ? 'text-green-400' 
                      : milestone.status === 'in-progress' ? 'text-amber-400'
                      : 'text-gray-500'
                    }`}>{milestone.week}</span>
                  </div>
                  <h4 className="font-semibold text-white text-sm mb-1">{milestone.title}</h4>
                  <p className="text-gray-400 text-xs">{milestone.description}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* Deliverables */}
        <section className="mb-12">
          <SectionHeader 
            eyebrow="Deliverables"
            title="Project Outputs"
            subtitle="Artifacts created as part of the learning contract"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deliverables.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="h-full">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      item.status === 'completed' ? 'bg-green-900/30' : 'bg-amber-900/30'
                    }`}>
                      {item.type === 'image' ? <ImageIcon className="w-6 h-6 text-amber-400" /> :
                       item.type === 'video' ? <Video className="w-6 h-6 text-amber-400" /> :
                       <FileText className="w-6 h-6 text-amber-400" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-white">{item.title}</h4>
                        {item.status === 'completed' ? (
                          <span className="px-2 py-0.5 bg-green-900/30 text-green-400 text-xs rounded-full">Completed</span>
                        ) : (
                          <span className="px-2 py-0.5 bg-amber-900/30 text-amber-400 text-xs rounded-full">In Progress</span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Resources Consulted */}
        <section className="mb-12">
          <SectionHeader 
            eyebrow="Resources"
            title="Learning Resources"
            subtitle="Click on highlighted resources to see my experience and evidence"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => resource.hasModal && handleSelectResource(resource)}
                className={resource.hasModal ? 'cursor-pointer' : ''}
              >
                <GlassCard className={`text-center h-full ${resource.hasModal ? 'ring-2 ring-amber-500/50 hover:ring-amber-400' : ''}`}>
                  <div className="text-4xl mb-3">{resource.icon}</div>
                  <h4 className="font-semibold text-white mb-1">{resource.name}</h4>
                  <span className="text-amber-400 text-xs font-mono block mb-2">{resource.type}</span>
                  <p className="text-gray-400 text-sm">{resource.description}</p>
                  {resource.hasModal && (
                    <p className="text-amber-400 text-xs mt-3 font-medium">Click to view details →</p>
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* View Poster Button */}
        <section className="mb-12">
          <GlassCard hover={false} className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-amber-900/30 rounded-xl flex items-center justify-center">
                  <ImageIcon className="w-7 h-7 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">Research Poster</h3>
                  <p className="text-gray-400 text-sm">View my complete visual summary of Japanese nightlife culture</p>
                </div>
              </div>
              <button
                onClick={() => setShowPoster(true)}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
              >
                <ImageIcon className="w-5 h-5" />
                View Poster
              </button>
            </div>
          </GlassCard>
        </section>

        {/* Meeting Recordings */}
        <section className="mb-12">
          <SectionHeader 
            eyebrow="Evidence"
            title="Meeting Recordings"
            subtitle="Video documentation of my learning journey and team discussions"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Meeting 1 */}
            <GlassCard hover={false} className="p-4">
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <iframe
                  src="https://www.youtube.com/embed/LC82fHXtiD0"
                  title="Meeting 1 - Project Kickoff"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h4 className="font-semibold text-white mb-1">Meeting 1 - Project Kickoff</h4>
              <p className="text-gray-400 text-sm">First team meeting discussing project scope, objectives, and initial planning</p>
            </GlassCard>

            {/* Meeting 2 */}
            <GlassCard hover={false} className="p-4">
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <iframe
                  src="https://www.youtube.com/embed/rKZ6kvqf3-M"
                  title="Meeting 2 - Progress Review"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h4 className="font-semibold text-white mb-1">Meeting 2 - Progress Review</h4>
              <p className="text-gray-400 text-sm">Second team meeting reviewing progress and discussing next steps</p>
            </GlassCard>

            {/* Meeting 3 */}
            <GlassCard hover={false} className="p-4">
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <iframe
                  src="https://www.youtube.com/embed/oDPmZRUyHGA"
                  title="Meeting 3 - Final Wrap-up"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h4 className="font-semibold text-white mb-1">Meeting 3 - Final Wrap-up</h4>
              <p className="text-gray-400 text-sm">Final team meeting wrapping up the project and reflecting on learnings</p>
            </GlassCard>
          </div>
        </section>

        {/* Origins & History */}
        <section className="mb-12">
          <SectionHeader 
            eyebrow="Background"
            title="Origins & History"
            subtitle="From postwar rebuilding → modern entertainment hubs"
          />

          <GlassCard hover={false} className="p-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-4">
                Many major nightlife zones grew rapidly in the <strong className="text-amber-400">post–WWII redevelopment</strong> era, 
                especially in areas like Kabukichō, which became strongly associated with entertainment.
              </p>
              <p className="text-gray-300 mb-4">
                Tokyo continues to "re-package" night areas as <strong className="text-amber-400">safer, global entertainment</strong> 
                destinations with events, cultural programming, and a tourism focus.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="px-3 py-1 bg-amber-900/30 text-amber-400 rounded-full text-sm">Postwar rebuild</span>
                <span className="px-3 py-1 bg-amber-900/30 text-amber-400 rounded-full text-sm">→</span>
                <span className="px-3 py-1 bg-orange-900/30 text-orange-400 rounded-full text-sm">Bubble era nightlife</span>
                <span className="px-3 py-1 bg-orange-900/30 text-orange-400 rounded-full text-sm">→</span>
                <span className="px-3 py-1 bg-red-900/30 text-red-400 rounded-full text-sm">Today's tourism + safety reforms</span>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Demographics */}
        <section className="mb-12">
          <SectionHeader 
            eyebrow="Demographics"
            title="Who Goes Out?"
            subtitle="Nightlife is segmented by district + purpose"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {districts.map((district, index) => (
              <motion.div
                key={district.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="w-5 h-5 text-amber-400" />
                    <h3 className="font-bold text-white text-lg">{district.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{district.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Vibe:</span>
                      <span className="text-amber-400">{district.vibe}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Crowd:</span>
                      <span className="text-gray-300">{district.crowd}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Best for:</span>
                      <span className="text-gray-300">{district.bestFor}</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-amber-900/20 border border-amber-800/30 rounded-xl">
            <p className="text-amber-200 text-sm text-center">
              💡 Nightlife in Japan is less "one-size-fits-all" and more <strong>district identity + social context</strong>.
            </p>
          </div>
        </section>

        {/* Economic Impact */}
        <section className="mb-12">
          <SectionHeader 
            eyebrow="Economy"
            title="Economic Impact"
            subtitle="Big industry — but changing fast"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-6">
              <TrendingUp className="w-8 h-8 text-red-400 mb-3" />
              <h3 className="font-semibold text-white mb-2">Izakaya Under Pressure</h3>
              <p className="text-gray-400 text-sm mb-3">
                Traditional pubs face rising costs + shifting habits. Reports note around <strong className="text-red-400">40% of izakaya were losing money in FY2023</strong>.
              </p>
              <span className="text-xs text-gray-500">Source: Teikoku Databank / Japan Times</span>
            </GlassCard>

            <GlassCard className="p-6">
              <Globe2 className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="font-semibold text-white mb-2">Night-time Economy Push</h3>
              <p className="text-gray-400 text-sm mb-3">
                Tokyo actively boosts the "night-time economy" with initiatives to keep visitors out <strong className="text-amber-400">after dark</strong> (tourism + events).
              </p>
              <span className="text-xs text-gray-500">Source: South China Morning Post</span>
            </GlassCard>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full">
              <span>🍶</span><span className="text-gray-300 text-sm">Food & drink</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full">
              <span>🎶</span><span className="text-gray-300 text-sm">Entertainment</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full">
              <span>🚆</span><span className="text-gray-300 text-sm">Transport</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full">
              <span>🏨</span><span className="text-gray-300 text-sm">Tourism</span>
            </div>
          </div>
        </section>

        {/* Cultural Norms & Etiquette */}
        <section className="mb-12">
          <SectionHeader 
            eyebrow="Etiquette"
            title="Cultural Norms & Etiquette"
            subtitle='Core idea: harmony + "reading the room"'
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <GlassCard className="p-6">
              <h3 className="font-bold text-amber-400 mb-2">Otoshi (お通し)</h3>
              <p className="text-gray-300 text-sm">
                A small appetizer served automatically at many drinking places — it functions like a <strong>table/cover charge</strong>. Don't assume snacks are free!
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-amber-400">Nomihodai (飲み放題)</h3>
              </div>
              <p className="text-gray-300 text-sm">
                All-you-can-drink plans are common; often <strong>time-limited (90–120 mins)</strong> depending on venue.
              </p>
            </GlassCard>
          </div>

          {/* Do / Don't Box */}
          <GlassCard hover={false} className="p-6">
            <h3 className="font-bold text-white mb-4 text-center">Quick Guide: Do's & Don'ts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">Expect small rules (seating charges, time limits)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">Watch the vibe (quiet bars vs party streets)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">Be polite to staff, follow house rules</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">Don't assume "free" snacks = free</span>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">Don't follow aggressive street touts</span>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">Don't be loud in small intimate bars</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Types of Establishments */}
        <section className="mb-12">
          <SectionHeader 
            eyebrow="Venues"
            title="Types of Establishments"
            subtitle="What you'll actually see in Japanese nightlife"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {establishments.map((est, index) => {
              const Icon = est.icon;
              return (
                <motion.div
                  key={est.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="h-full">
                    <Icon className="w-8 h-8 text-amber-400 mb-3" />
                    <h3 className="font-semibold text-white mb-2">{est.name}</h3>
                    <p className="text-gray-400 text-sm">{est.description}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Safety */}
        <section className="mb-12">
          <SectionHeader 
            eyebrow="Safety"
            title="Safety & Social Issues"
            subtitle="Important things to be aware of"
          />

          <GlassCard hover={false} className="p-6 border-l-4 border-amber-500">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-gray-300 mb-4">
                  Some entertainment zones are known for <strong className="text-amber-400">tourist-targeted overcharging scams</strong> ("bottakuri") 
                  and aggressive touting — visitor guidance often warns to avoid these.
                </p>
                <p className="text-gray-300 mb-4">
                  In recent years Japan introduced stricter measures aimed at <strong className="text-amber-400">predatory host-club practices</strong>.
                </p>
                <div className="p-4 bg-amber-900/20 border border-amber-800/30 rounded-xl">
                  <p className="text-amber-200 text-sm">
                    💡 <strong>Tip:</strong> Enjoy the nightlife — but choose reputable venues and avoid street solicitations.
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* References */}
        <section>
          <SectionHeader 
            eyebrow="Sources"
            title="References"
            subtitle="Research sources used for this cultural study"
          />

          <GlassCard hover={false} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {references.map((ref) => (
                <a
                  key={ref.id}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group"
                >
                  <span className="text-amber-400 font-mono text-sm">[{ref.id}]</span>
                  <span className="text-gray-300 text-sm flex-1">{ref.name}</span>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-amber-400 transition-colors" />
                </a>
              ))}
            </div>
          </GlassCard>
        </section>
      </div>

      {/* Poster Modal */}
      {showPoster && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={() => setShowPoster(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-6xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPoster(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-900/80 hover:bg-gray-800 rounded-full text-white transition-colors"
            >
              <XCircle className="w-6 h-6" />
            </button>
            <img 
              src="/media/poster.png"
              alt="Japanese Nightlife Culture Research Poster"
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </motion.div>
        </div>
      )}
    </>
  );
}

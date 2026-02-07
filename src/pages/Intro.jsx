import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  ClipboardList, 
  BookOpen, 
  Smartphone, 
  Headphones,
  Video,
  ExternalLink,
  Download,
  Globe2,
  Target,
  Award,
  X,
  Eye
} from 'lucide-react';
import PageBackground from '../components/PageBackground';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';

// Initial documents - Updated with actual document names
const initialDocuments = [
  {
    id: 1,
    title: 'Learning Log',
    description: 'My GL learning log documenting progress and reflections',
    icon: ClipboardList,
    src: '/docs/learning-log.pdf',
    color: 'text-amber-400',
    bgColor: 'bg-amber-900/30'
  },
  {
    id: 2,
    title: 'Proposal Form',
    description: 'Initial proposal for Japanese language and nightlife culture research',
    icon: FileText,
    src: '/docs/proposal-form.pdf',
    color: 'text-orange-400',
    bgColor: 'bg-orange-900/30'
  },
];

// Learning resources - UPDATE THESE with your actual resources
const resources = [
  {
    id: 1,
    name: 'Minna no Nihongo',
    description: 'Primary textbook for structured Japanese grammar and vocabulary learning',
    icon: BookOpen,
    type: 'Textbook',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&auto=format&fit=crop&q=80',
    color: 'border-amber-500'
  },
  {
    id: 2,
    name: 'Renshu App',
    description: 'Mobile app for daily kanji and vocabulary practice with spaced repetition',
    icon: Smartphone,
    type: 'Mobile App',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&auto=format&fit=crop&q=80',
    color: 'border-orange-500'
  },
  {
    id: 3,
    name: 'JapanesePod101',
    description: 'Audio lessons for listening practice and pronunciation improvement',
    icon: Headphones,
    type: 'Podcast',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300&auto=format&fit=crop&q=80',
    color: 'border-red-500'
  },
  {
    id: 4,
    name: 'Duolingo',
    description: 'Daily language practice app for Japanese vocabulary and grammar',
    icon: Smartphone,
    type: 'Mobile App',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&auto=format&fit=crop&q=80',
    color: 'border-green-500'
  },
];

export default function Intro() {
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <>
      <PageBackground variant="intro" />
      
      {/* Document Viewer Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedDoc(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl h-[85vh] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${selectedDoc.bgColor} rounded-lg flex items-center justify-center`}>
                    <selectedDoc.icon className={`w-5 h-5 ${selectedDoc.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{selectedDoc.title}</h3>
                    <p className="text-xs text-gray-400">{selectedDoc.src}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={selectedDoc.src}
                    download
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                  <button
                    onClick={() => setSelectedDoc(null)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
              
              {/* Document Viewer */}
              <div className="h-[calc(85vh-73px)] bg-gray-950">
                <iframe
                  src={selectedDoc.src}
                  className="w-full h-full border-0"
                  title={selectedDoc.title}
                />
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
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              About This Journey
            </motion.h1>
            <motion.p 
              className="text-amber-200/80 text-lg max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Exploring Japanese language and nightlife culture through Guided Learning at Temasek Polytechnic.
            </motion.p>
          </div>
        </section>

        {/* GL Subject Introduction */}
        <section className="mb-12">
          <SectionHeader 
            eyebrow="Guided Learning"
            title="Introduction to the Subject"
            subtitle="What is Guided Learning at Temasek Polytechnic?"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GlassCard className="h-full text-center">
                <div className="w-14 h-14 bg-amber-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe2 className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Global Awareness</h3>
                <p className="text-sm text-gray-400">
                  Develop understanding of different cultures, languages, and global perspectives
                </p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="h-full text-center">
                <div className="w-14 h-14 bg-orange-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Self-Directed Learning</h3>
                <p className="text-sm text-gray-400">
                  Take ownership of your learning journey through structured contracts and goals
                </p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlassCard className="h-full text-center">
                <div className="w-14 h-14 bg-red-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-7 h-7 text-red-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Portfolio Evidence</h3>
                <p className="text-sm text-gray-400">
                  Document your learning through reflections, artifacts, and progress monitoring
                </p>
              </GlassCard>
            </motion.div>
          </div>

          <GlassCard hover={false} className="p-6">
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-amber-400">Guided Learning (GL)</strong> is a Temasek Polytechnic module that enables students to explore global issues, 
              languages, and cultures through self-directed learning projects. Students create a learning contract, track their progress through PPMR phases 
              (Plan, Progress, Monitor, Reflect), and compile evidence of their learning journey in an e-portfolio.
            </p>
          </GlassCard>
        </section>

        {/* Self Introduction - UPDATE THIS SECTION */}
        <section className="mb-12">
          <SectionHeader 
            eyebrow="About Me"
            title="Hello, I'm Jarrod Oh"
            subtitle="A Year 2 student at Temasek Polytechnic"
          />

          <GlassCard hover={false} className="p-8">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              {/* Introduction Text - on LEFT */}
              <div className="prose prose-invert max-w-none flex-1 order-2 md:order-1">
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  {/* UPDATE THIS: Write your self-introduction here */}
                  I am passionate about Japanese culture and language, which led me to pursue this Guided Learning project. 
                  My interest began with anime and manga, but has grown into a deeper appreciation for Japanese society, 
                  traditions, and modern culture.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  {/* UPDATE THIS: Explain why you chose this GL project */}
                  I chose to focus on Japanese nightlife culture because it represents a fascinating intersection of 
                  traditional social customs and modern entertainment. Understanding how Japanese people unwind and 
                  socialize offers valuable insights into their work-life balance and social dynamics.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {/* UPDATE THIS: Add your goals */}
                  Through this project, I aim to achieve basic Japanese conversational skills (JLPT N5 level) while 
                  gaining a nuanced understanding of Japanese social culture through research on nightlife establishments 
                  and customs.
                </p>
              </div>
              
              {/* Profile Image - on RIGHT and BIGGER */}
              <motion.div
                className="flex-shrink-0 mx-auto md:mx-0 order-1 md:order-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden ring-4 ring-amber-500/40 shadow-2xl shadow-amber-500/30">
                  <img 
                    src="/media/profile.jpeg"
                    alt="Jarrod Oh"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </GlassCard>
        </section>

        {/* Initial Documents */}
        <section className="mb-12">
          <SectionHeader 
            eyebrow="Documents"
            title="Project Foundation"
            subtitle="Key documents that define my learning objectives and commitments"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {initialDocuments.map((doc, index) => {
              const Icon = doc.icon;
              return (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="h-full">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 ${doc.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-7 h-7 ${doc.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">
                          {doc.title}
                        </h3>
                        <p className="text-sm text-gray-400 mb-3">
                          {doc.description}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedDoc(doc)}
                            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <a
                            href={doc.src}
                            download
                            className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </a>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Learning Resources */}
        <section>
          <SectionHeader 
            eyebrow="Resources"
            title="Learning Materials"
            subtitle="Tools and resources I'm using throughout my GL journey"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="h-full" padding="p-0">
                    <div className="relative h-32 overflow-hidden rounded-t-xl">
                      <img 
                        src={resource.image}
                        alt={resource.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2 py-1 text-xs font-medium bg-gray-900/90 text-amber-400 rounded-full">
                          {resource.type}
                        </span>
                      </div>
                    </div>
                    <div className={`p-4 border-l-4 ${resource.color}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-5 h-5 text-amber-400" />
                        <h3 className="font-semibold text-white">
                          {resource.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-400">
                        {resource.description}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardList, 
  FileText, 
  ExternalLink,
  Download,
  CheckCircle,
  X,
  Eye
} from 'lucide-react';
import PageBackground from '../components/PageBackground';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';

// Contract documents - Updated with actual document names
const contractDocuments = [
  {
    id: 1,
    title: 'Initial Student Proposal',
    description: 'My initial proposal for the Japanese language and nightlife culture research project',
    icon: FileText,
    src: '/docs/proposal-form.pdf',
    color: 'text-orange-400',
    bgColor: 'bg-orange-900/30',
    status: 'Submitted'
  },
  {
    id: 2,
    title: 'My Learning Contract',
    description: 'Signed GL learning contract outlining objectives, commitments, and assessment criteria (Assessment 1)',
    icon: ClipboardList,
    src: '/docs/learning-log.pdf',
    color: 'text-amber-400',
    bgColor: 'bg-amber-900/30',
    status: 'Approved'
  },
];

// Contract highlights
const contractHighlights = [
  {
    title: 'Learning Objectives',
    items: [
      'Achieve basic Japanese conversational skills (JLPT N5 level)',
      'Research and understand Japanese nightlife culture',
      'Develop cultural awareness and cross-cultural communication skills',
    ]
  },
  {
    title: 'Key Deliverables',
    items: [
      'Weekly learning logs documenting progress',
      'Cultural research poster on Japanese nightlife',
      'Reflection essays on learning journey',
      'Evidence of language learning progress',
    ]
  },
  {
    title: 'Assessment Components',
    items: [
      'Learning Contract (Assessment 1)',
      'Progress Monitoring Reports (PPMR)',
      'Final E-Portfolio submission',
      'Reflection on learning outcomes',
    ]
  },
];

export default function Contract() {
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <>
      <PageBackground variant="contract" />
      
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
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&auto=format&fit=crop&q=80"
              alt="Contract documents"
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
              <ClipboardList className="w-8 h-8 text-amber-300" />
              <span className="text-amber-400 font-medium">Assessment 1</span>
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              My Learning Contract
            </motion.h1>
            <motion.p 
              className="text-amber-200/80 text-lg max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              The foundation of my Guided Learning journey - my proposal and signed learning contract outlining objectives and commitments.
            </motion.p>
          </div>
        </section>

        {/* Contract Documents */}
        <section className="mb-12">
          <SectionHeader 
            eyebrow="Documents"
            title="Contract Documents"
            subtitle="Initial proposal and approved learning contract"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contractDocuments.map((doc, index) => {
              const Icon = doc.icon;
              return (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="block"
                >
                  <GlassCard className="h-full">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 ${doc.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-7 h-7 ${doc.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-white">
                            {doc.title}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            doc.status === 'Approved' 
                              ? 'bg-green-900/30 text-green-400' 
                              : 'bg-amber-900/30 text-amber-400'
                          }`}>
                            {doc.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">
                          {doc.description}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedDoc(doc)}
                            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View Document
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

        {/* Contract Highlights */}
        <section className="mb-12">
          <SectionHeader 
            eyebrow="Overview"
            title="Contract Highlights"
            subtitle="Key elements of my learning contract"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contractHighlights.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="h-full">
                  <h3 className="font-bold text-amber-400 mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Important Note */}
        <section>
          <GlassCard hover={false} className="p-6 border-l-4 border-amber-500">
            <div className="flex items-start gap-4">
              <ClipboardList className="w-8 h-8 text-amber-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-2">About the Learning Contract</h3>
                <p className="text-gray-300 text-sm mb-3">
                  The Learning Contract is the foundation of my Guided Learning project. It outlines my learning objectives, 
                  the resources I'll use, my timeline, and how I'll demonstrate my learning achievements.
                </p>
                <p className="text-gray-400 text-sm">
                  This contract was developed in consultation with my GL facilitator and serves as a guide throughout 
                  the 17-week learning journey.
                </p>
              </div>
            </div>
          </GlassCard>
        </section>
      </div>
    </>
  );
}

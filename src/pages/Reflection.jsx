import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Lightbulb, 
  Heart,
  Zap,
  Target,
  Brain,
  Users,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Calendar,
  CheckCircle,
  FileText,
  TrendingUp
} from 'lucide-react';
import PageBackground from '../components/PageBackground';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';

// PPMR Phase Reflections
const ppmrPhases = [
  {
    id: 1,
    phase: 'Plan',
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/30',
    borderColor: 'border-blue-500',
    reflection: `The planning phase was honestly more challenging than I expected. When I first sat down to write my learning contract, I had this grand vision of becoming conversationally fluent in Japanese within 17 weeks. I wanted to reach JLPT N3 level, understand anime without subtitles, and maybe even think about studying abroad in Tokyo. My facilitator gently brought me back to reality during our first consultation — she helped me understand that language learning is a marathon, not a sprint, and that setting achievable goals would be more motivating than constantly falling short of unrealistic ones.

After some soul-searching and honest reflection about how much time I could realistically dedicate alongside my other modules, I adjusted my goals to JLPT N5 level. This meant focusing on hiragana, katakana, about 100 kanji, and basic conversational phrases. It felt like a step back at first, but I now realize it was the smartest decision I made. The planning phase taught me that good planning isn't about ambition — it's about being honest with yourself about what's achievable.`,
    whatWentWell: 'Thorough research into available learning resources, realistic goal-setting after facilitator feedback',
    whatDidntWork: 'Initial timeline was too ambitious, underestimated the time commitment needed'
  },
  {
    id: 2,
    phase: 'Progress',
    color: 'text-green-400',
    bgColor: 'bg-green-900/30',
    borderColor: 'border-green-500',
    reflection: `The progress phase was where the rubber met the road. I established a daily routine: 15 minutes of Duolingo during breakfast, 20 minutes of Renshu for kanji practice in the evening, and longer study sessions on weekends with Minna no Nihongo. Some weeks were amazing — I felt like everything was clicking, vocabulary was sticking, and I could actually read simple Japanese text. Other weeks were rough. Around Week 6, I hit what I call the "intermediate plateau" where progress felt invisible and motivation dipped.

What kept me going was the cultural research component. Diving into Japanese nightlife culture gave context to my language learning. When I learned the word 乾杯 (kanpai), it wasn't just vocabulary — I understood its role in nomikai drinking rituals. Learning about izakaya culture made restaurant-related vocabulary meaningful. The connection between language and culture became my secret weapon against burnout. I also found that tracking my progress in a learning log, even on bad days, helped me see that I was still moving forward even when it didn't feel like it.`,
    whatWentWell: 'Consistent daily practice streak, strong integration of language learning with cultural research',
    whatDidntWork: 'Speaking practice started too late (Week 11), should have joined conversation groups earlier'
  },
  {
    id: 3,
    phase: 'Monitor',
    color: 'text-amber-400',
    bgColor: 'bg-amber-900/30',
    borderColor: 'border-amber-500',
    reflection: `The monitoring phase through PPMR meetings was genuinely valuable — and I say this as someone who initially dreaded the "check-in" meetings. I thought they would feel like being policed, but they were actually more like coaching sessions. My facilitator asked probing questions that made me think critically about my learning approach. "Why do you think you're struggling with kanji retention?" "What patterns do you notice in your productive vs. unproductive study sessions?" These questions forced me to reflect in ways I wouldn't have on my own.

The feedback I received during monitoring sessions directly improved my approach. When I mentioned struggling with speaking confidence, my facilitator suggested finding a language exchange partner — something I hadn't considered. When I shared my research on nomikai culture, she pointed me toward academic sources I'd missed. The monitoring phase taught me that external accountability isn't about judgment; it's about having a second pair of eyes to spot blind spots and opportunities for growth. I started looking forward to these meetings rather than dreading them.`,
    whatWentWell: 'Regular facilitator check-ins provided valuable external perspective and accountability',
    whatDidntWork: 'Could have documented progress more frequently between meetings, missed some reflection opportunities'
  },
  {
    id: 4,
    phase: 'Reflect',
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/30',
    borderColor: 'border-purple-500',
    reflection: `Looking back on this entire Guided Learning journey, I realize that I learned far more than just Japanese. Yes, I can now read hiragana and katakana fluently, recognize about 100 kanji, and hold basic conversations. But the deeper learning was about myself as a learner. I discovered that I'm someone who needs variety — using multiple apps and resources kept me engaged in ways that a single textbook couldn't. I learned that I process information better in the morning, that I need visual and audio input together, and that connecting new knowledge to things I care about (like nightlife culture) dramatically improves retention.

The cultural research component transformed what could have been dry language study into a genuine exploration of a society I now admire deeply. Understanding the social dynamics of Japanese nightlife — the role of nomikai in building workplace bonds, the intimacy of tiny Golden Gai bars, the complex economics of izakaya — gave me a window into Japanese society that I never expected. I now see Japan not as an exotic "other" but as a complex, fascinating society with its own solutions to universal human needs for connection, relaxation, and community. This GL project has genuinely changed how I see the world, and I'm already planning to continue my Japanese studies beyond this module.`,
    whatWentWell: 'Deep personal growth, genuine cultural appreciation, development of transferable self-directed learning skills',
    whatDidntWork: 'Wish I had more time for immersive experiences, would have loved to attend virtual izakaya events'
  },
];

// Learning Logs
const learningLogs = [
  {
    week: 'Week 3',
    date: 'Jan 20 - Jan 26',
    hours: 8,
    activities: 'Completed Hiragana chart, practiced writing strokes',
    keyLearning: 'Hiragana has patterns that make memorization easier',
    challenges: 'Similar-looking characters like さ and き'
  },
  {
    week: 'Week 5',
    date: 'Feb 3 - Feb 9',
    hours: 10,
    activities: 'Started Katakana, began izakaya research',
    keyLearning: 'Katakana is used for foreign words, very practical for nightlife research',
    challenges: 'Balancing language learning with research'
  },
  {
    week: 'Week 8',
    date: 'Feb 24 - Mar 2',
    hours: 12,
    activities: 'Completed nightlife culture deep-dive, JLPT N5 vocabulary',
    keyLearning: 'Nomikai culture is integral to Japanese work relationships',
    challenges: 'Finding academic sources in English'
  },
  {
    week: 'Week 11',
    date: 'Mar 17 - Mar 23',
    hours: 8,
    activities: 'First speaking practice session, poster draft',
    keyLearning: 'Speaking is harder than reading but accelerates overall learning',
    challenges: 'Nervousness during speaking practice'
  },
];

// Reflection prompts - Personal and detailed reflections
const reflectionPrompts = [
  {
    id: 1,
    category: 'Challenges',
    icon: Zap,
    color: 'text-red-400',
    bgColor: 'bg-red-900/30',
    question: 'What were the biggest challenges you faced during this project?',
    response: `The biggest challenge I faced was something I didn't anticipate at all — the mental fatigue of juggling two very different types of learning simultaneously. On one hand, I was trying to memorize Japanese characters, vocabulary, and grammar patterns, which requires a lot of repetitive practice and rote memorization. On the other hand, I was conducting cultural research on Japanese nightlife, which demanded critical analysis, source evaluation, and synthesizing information from multiple perspectives. These two activities use completely different parts of my brain, and switching between them was exhausting.

There were weeks, especially around Week 5-6, where I felt completely overwhelmed. I remember one evening sitting at my desk with Duolingo open on my phone, Minna no Nihongo in front of me, and three browser tabs of research articles — and I just felt paralyzed. Everything felt urgent, nothing felt like it was getting done properly, and I started questioning whether I had bitten off more than I could chew.

Another significant challenge was finding reliable, academic sources on Japanese nightlife culture written in English. Most of what I found initially was either tourist guides ("Top 10 Bars in Tokyo!") or sensationalized articles about host clubs and red-light districts. Neither gave me the nuanced, sociological understanding I was looking for. I eventually learned to use Google Scholar more effectively, found some excellent academic papers on nomikai culture and Japanese workplace socialization, and discovered that The Japan Times archives had thoughtful, in-depth reporting on topics like izakaya economics and the changing drinking habits of younger Japanese workers.

I overcame these challenges by restructuring my weekly schedule. Instead of trying to do a little of everything every day, I designated specific days for language learning and other days for research. Mondays, Wednesdays, and Fridays became "language days" focused purely on Duolingo, Renshu, and textbook study. Tuesdays and Thursdays became "research days" where I read articles, took notes, and worked on my cultural analysis. Weekends were for review and catching up. This separation helped my brain switch contexts less frequently and made each session more productive.`
  },
  {
    id: 2,
    category: 'Surprises',
    icon: Lightbulb,
    color: 'text-amber-400',
    bgColor: 'bg-amber-900/30',
    question: 'What surprised you most about your learning journey?',
    response: `The biggest surprise was discovering just how deeply interconnected language and culture really are — and I don't mean this in a superficial way. I expected to learn vocabulary and then separately learn about culture. What I didn't expect was how understanding culture would make language learning easier, and vice versa. This connection became my secret weapon.

For example, when I learned the word 先輩 (senpai) and 後輩 (kouhai), it wasn't just vocabulary. Understanding the hierarchical relationship these words describe helped me grasp why honorific language (keigo) exists and when to use it. When I researched nomikai drinking culture and learned about the ritual of pouring drinks for seniors and waiting for the 乾杯 (kanpai) before drinking, suddenly the formal/informal speech distinction made perfect sense. The language isn't arbitrary — it reflects deeply held cultural values about respect, hierarchy, and social harmony.

Another surprise was how much Japanese nightlife has evolved, especially post-pandemic. I went into this project with images from movies and anime — salarymen in suits drinking at smoky izakayas after work, the neon chaos of Kabukichō. What I found through my research was more nuanced. Yes, those scenes still exist, but there's also a significant shift happening. Younger Japanese workers are increasingly rejecting mandatory nomikai, viewing it as an outdated practice that blurs work-life boundaries. The rise of 飲み放題 (nomi-houdai, all-you-can-drink) establishments reflects both economic pressures and changing social dynamics. Understanding this evolution made me see Japan not as a static, "traditional" culture but as a living society actively negotiating between tradition and modernity.

Perhaps the most personal surprise was how much I came to enjoy speaking practice. I dreaded it for weeks, putting it off until Week 11 because I was terrified of making mistakes. When I finally joined a language exchange session online, expecting humiliation, I found a supportive community of fellow learners. Making mistakes became part of the fun, not something to fear. I wish I had started speaking practice much earlier — it was genuinely the highlight of my GL journey.`
  },
  {
    id: 3,
    category: 'Growth',
    icon: Heart,
    color: 'text-orange-400',
    bgColor: 'bg-orange-900/30',
    question: 'How have you grown personally through this experience?',
    response: `This Guided Learning project has changed me in ways I'm still discovering. On the surface, I learned Japanese basics and researched nightlife culture. But beneath that, I developed skills and perspectives that I know will stay with me long after this module ends.

The most significant growth has been in self-directed learning. Before this project, I was very much a "tell me what to study and I'll study it" kind of student. I relied on teachers to set the pace, define the scope, and provide all the resources. This GL project forced me to become my own teacher. I had to decide what resources to use, how to structure my time, when to push harder and when to rest, and how to assess my own progress. It was uncomfortable at first — I constantly second-guessed myself — but I eventually developed confidence in my own judgment. I now trust myself to learn anything if I approach it systematically.

I've also become more culturally aware in a way that goes beyond Japan specifically. Researching Japanese nightlife taught me to approach cultural practices with curiosity rather than judgment. When I first read about otoshi (the mandatory appetizer charge at izakayas), my initial reaction was "that seems like a scam." But as I understood it better — that it functions as a table charge, supports the establishment, and provides a small dish to accompany drinks — I realized I was applying my own cultural lens inappropriately. This experience has made me more thoughtful about how I interpret practices from any culture, including my own.

My research skills have improved dramatically. I learned to distinguish between primary and secondary sources, to evaluate the credibility of websites, to cross-reference information across multiple sources, and to synthesize complex information into coherent narratives. These skills were tested when I was researching controversial topics like host clubs and their predatory practices — I had to navigate sensationalist reporting, find nuanced academic perspectives, and form my own evidence-based views.

Finally, I've grown in resilience. There were moments when I wanted to give up, when the project felt too big and my progress too slow. But I kept going, one day at a time, one kanji at a time. And now, looking back, I can see how far I've come. That's a powerful feeling — knowing that I can persist through difficulty and come out the other side having achieved something meaningful.`
  },
  {
    id: 4,
    category: 'Changes',
    icon: Target,
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/30',
    question: 'What would you do differently if you could start over?',
    response: `If I could start this GL journey over, there are several things I would do differently — not because what I did was wrong, but because hindsight has given me clarity about what works best for my learning style.

First and foremost, I would start speaking practice from Week 1, not Week 11. I was so afraid of making mistakes that I avoided speaking entirely, focusing instead on the "safe" activities of reading and writing. But speaking is where language comes alive. Every language exchange session I eventually did was worth more than hours of solo study. The fear of mistakes was completely unfounded — everyone in language exchange communities is there to learn, and making errors is not just accepted but expected. Starting speaking early would have made my learning more engaging, my pronunciation better, and my confidence higher throughout the project.

Second, I would narrow my research scope earlier and more ruthlessly. My initial proposal tried to cover all of Japanese nightlife — izakayas, host clubs, karaoke, clubs, Golden Gai, nomikai culture, drinking laws, and more. It was way too broad. I spent the first few weeks doing surface-level research on everything instead of deep research on anything. Eventually, I focused on izakaya culture and nomikai social rituals, which yielded much richer insights. If I started over, I would pick 2-3 specific focus areas from the beginning and go deep rather than wide.

Third, I would establish a more consistent daily routine from Day 1. My study hours varied wildly in the early weeks — sometimes two hours, sometimes twenty minutes, sometimes nothing. This inconsistency made it hard to build momentum. When I eventually settled into a fixed routine (15 minutes Duolingo in the morning, 20 minutes Renshu in the evening, longer sessions on weekends), everything became easier. The consistency removed decision fatigue — I didn't have to decide IF I would study, only WHAT I would study.

Fourth, I would keep a more detailed learning journal. I documented my progress in my learning log, but it was mostly factual — "studied kanji for 30 minutes, reviewed Chapter 3." What I wish I had captured was the emotional journey — how I felt when something finally clicked, what frustrated me, what surprised me. Those reflections would have made this final reflection much easier to write, and I think the process of journaling would have deepened my learning in real-time.

Finally, I would connect with other GL students doing Japanese or other language projects. I did this GL project largely in isolation, which was a missed opportunity. Comparing notes with peers, sharing resources, even just commiserating about challenges would have made the journey less lonely and probably more effective.`
  },
];

// TP Student Profile Attributes - UPDATE THESE
const tpStudentProfileAttributes = [
  {
    id: 1,
    title: 'Resilience',
    icon: Zap,
    hint: 'Ability to bounce back from setbacks and persist through challenges',
    rating: 4,
    exampleEvidence: 'Despite struggling with kanji memorization in Week 4, I developed a new study method using mnemonics and increased my retention rate from 40% to 85% by Week 9.'
  },
  {
    id: 2,
    title: 'Critical Thinking',
    icon: Brain,
    hint: 'Analyzing information objectively and making reasoned judgments',
    rating: 4,
    exampleEvidence: 'I critically evaluated sources on Japanese nightlife, distinguishing between academic research, journalistic pieces, and tourist-oriented content to ensure my research was well-grounded.'
  },
  {
    id: 3,
    title: 'Cross-Cultural Awareness',
    icon: Users,
    hint: 'Understanding and respecting cultural differences',
    rating: 5,
    exampleEvidence: 'Through researching nomikai culture, I developed appreciation for how Japanese work drinking customs, while different from Singapore, serve important relationship-building purposes.'
  },
  {
    id: 4,
    title: 'Self-Directed Learning',
    icon: Sparkles,
    hint: 'Taking initiative in identifying learning needs and resources',
    rating: 4,
    exampleEvidence: 'I independently sourced and organized learning materials including textbooks, apps, podcasts, and YouTube channels to create a comprehensive self-study curriculum.'
  },
];

export default function Reflection() {
  const [expandedPrompt, setExpandedPrompt] = useState(null);

  const togglePrompt = (id) => {
    setExpandedPrompt(expandedPrompt === id ? null : id);
  };

  return (
    <>
      <PageBackground variant="reflection" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden mb-12">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=1200&auto=format&fit=crop&q=80"
              alt="Reflection"
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
              <MessageSquare className="w-8 h-8 text-amber-400" />
              <span className="text-amber-400 font-medium">Personal Reflection</span>
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Looking Back, Moving Forward
            </motion.h1>
            <motion.p 
              className="text-amber-200/80 text-lg max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Honest reflections on my journey, challenges faced, and lessons learned
            </motion.p>
          </div>
        </section>

        {/* Reflection Prompts */}
        <section className="mb-12">
          <SectionHeader 
            eyebrow="Reflections"
            title="My Learning Journey Reflections"
            subtitle="Thoughtful responses to guided reflection prompts"
          />

          <div className="space-y-4">
            {reflectionPrompts.map((prompt, index) => {
              const Icon = prompt.icon;
              const isExpanded = expandedPrompt === prompt.id;

              return (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard hover={false} padding="p-0">
                    <button
                      onClick={() => togglePrompt(prompt.id)}
                      className="w-full flex items-center gap-4 p-6 text-left"
                    >
                      <div className={`w-12 h-12 ${prompt.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-6 h-6 ${prompt.color}`} />
                      </div>
                      <div className="flex-1">
                        <span className={`text-sm font-medium ${prompt.color}`}>
                          {prompt.category}
                        </span>
                        <h3 className="font-semibold text-white">
                          {prompt.question}
                        </h3>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>

                    <motion.div
                      initial={false}
                      animate={{ 
                        height: isExpanded ? 'auto' : 0,
                        opacity: isExpanded ? 1 : 0
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-gray-800">
                        <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                          {prompt.response}
                        </p>
                      </div>
                    </motion.div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* PPMR Phase Reflections */}
        <section className="mb-12">
          <SectionHeader 
            eyebrow="PPMR"
            title="Phase-by-Phase Reflections"
            subtitle="Reflections on each stage of the learning process"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ppmrPhases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard hover={false} className={`h-full border-l-4 ${phase.borderColor}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 ${phase.bgColor} rounded-lg flex items-center justify-center`}>
                      <span className={`font-bold ${phase.color}`}>{phase.phase.charAt(0)}</span>
                    </div>
                    <h3 className={`font-semibold text-lg ${phase.color}`}>{phase.phase}</h3>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">{phase.reflection}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-green-900/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-medium text-xs">What Went Well</span>
                      </div>
                      <p className="text-gray-400 text-xs">{phase.whatWentWell}</p>
                    </div>
                    <div className="bg-red-900/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-red-400" />
                        <span className="text-red-400 font-medium text-xs">To Improve</span>
                      </div>
                      <p className="text-gray-400 text-xs">{phase.whatDidntWork}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Learning Logs */}
        <section className="mb-12">
          <SectionHeader 
            eyebrow="Learning Logs"
            title="Weekly Progress Records"
            subtitle="Documented evidence of my learning journey"
          />

          <GlassCard hover={false} className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-amber-400">Week</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-amber-400">Date</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-amber-400">Hours</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-amber-400">Activities</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-amber-400">Key Learning</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-amber-400">Challenges</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {learningLogs.map((log, index) => (
                    <motion.tr
                      key={log.week}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-gray-800/30"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-white">{log.week}</td>
                      <td className="px-4 py-3 text-sm text-gray-400">{log.date}</td>
                      <td className="px-4 py-3 text-sm text-center">
                        <span className="px-2 py-1 bg-amber-900/30 text-amber-400 rounded-full text-xs font-medium">{log.hours}h</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300 max-w-48">{log.activities}</td>
                      <td className="px-4 py-3 text-sm text-gray-300 max-w-48">{log.keyLearning}</td>
                      <td className="px-4 py-3 text-sm text-gray-400 max-w-48">{log.challenges}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </section>

        {/* TP Student Profile Self-Assessment */}
        <section>
          <SectionHeader 
            eyebrow="Self-Assessment"
            title="TP Student Profile Attributes"
            subtitle="Evaluating my growth against key competencies"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tpStudentProfileAttributes.map((attr, index) => {
              const Icon = attr.icon;
              return (
                <motion.div
                  key={attr.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard hover={false} className="h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-amber-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">
                          {attr.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {attr.hint}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm font-medium text-gray-400">
                        Self-Rating:
                      </span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div
                            key={star}
                            className={`w-6 h-6 rounded-full ${
                              star <= attr.rating
                                ? 'bg-amber-500'
                                : 'bg-gray-800'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-amber-400">
                        {attr.rating}/5
                      </span>
                    </div>

                    {/* Evidence */}
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Evidence
                      </span>
                      <p className="text-sm text-gray-300 mt-1">
                        {attr.exampleEvidence}
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

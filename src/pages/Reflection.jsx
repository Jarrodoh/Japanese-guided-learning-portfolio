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
    response: `The hardest challenge wasn't the difficulty of the content itself — it was the sheer repetitiveness of language learning and forcing myself to stick to the same system day after day after day. Learning a language isn't like studying for an exam where you can cram and be done. It's showing up every single day to drill flashcards, practice the same grammar patterns, write the same characters over and over until your hand aches. The progress is so incremental that some days it felt invisible, and the monotony was genuinely soul-crushing at times.

I struggled a lot in the early weeks because I kept switching between different learning methods, trying to find the "perfect" system. I'd use Renshu for a few days, then switch to Anki because someone online said it was better, then try WaniKani for kanji. But constantly changing systems meant I never built momentum or consistency. I was starting over every time instead of making real progress. It took me until Week 4 to realize that the system didn't matter as much as sticking with one system long enough for it to work.

That's when Duolingo became a game-changer for me — not because it's the best language app (it's not), but because of the streak feature. Seeing that little flame icon with my streak count became genuinely motivating. Day 7, then Day 15, then Day 30... I didn't want to break it. It sounds silly, but that gamification turned learning from a chore into a mini-achievement each day. The lessons were structured enough that I didn't have to think about what to study; I just opened the app and did the next lesson. That remove decision fatigue made it sustainable. Compared to Renshu, which I still used for more focused kanji practice, Duolingo felt more like a game than homework. Renshu is technically more comprehensive and arguably better for serious learners, but it didn't have that addictive quality that kept me coming back without thinking.

The culture research component presented a completely different kind of challenge. At first, I approached it like a school assignment — find sources, write notes, check boxes. But that felt hollow and disconnected from my genuine interest in Japanese nightlife. The breakthrough came when I stopped "doing research" and started actually exploring questions I was curious about: Why do Japanese coworkers drink together after work? What makes a good izakaya? How has nomikai culture changed with younger generations? Once I followed my genuine curiosity rather than what I thought I "should" research, the cultural analysis became energizing instead of draining. I started watching documentaries, reading personal essays, even watching YouTube videos of people visiting izakayas — not just academic papers. The research became a fun exploration rather than an obligation.

Looking back, the biggest lesson was that consistency beats intensity. I didn't need the perfect learning system or the most comprehensive research approach. I needed systems I could actually maintain every single day, even on exhausted days, even when motivation was low. Duolingo's streaks, daily 15-minute commitments, and following genuine curiosity in my research — those "good enough" solutions that I could stick with were infinitely better than perfect plans I'd abandon after two weeks.`
  },
  {
    id: 2,
    category: 'Surprises',
    icon: Lightbulb,
    color: 'text-amber-400',
    bgColor: 'bg-amber-900/30',
    question: 'What surprised you most about your learning journey?',
    response: `The biggest surprise was just how much time language learning actually takes. I don't mean the 17 weeks of this project — I mean the cumulative hours. Before starting, I naively thought "15 minutes a day on Duolingo" would be enough to make solid progress. Reality check: 15 minutes a day gets you through the app's lessons, but if you actually want to remember things, you need at least double that for review, practice, and reinforcement. I probably underestimated the time requirement by 50%. Learning a language isn't a sprint or even a marathon — it's more like committing to go to the gym every day for years.

Another surprise was how weirdly addictive language learning apps can become. I genuinely got anxious if I hadn't done my Duolingo lesson by evening. That little green owl haunted me. The stats, the streaks, the XP points — I knew intellectually that it was just gamification to keep me engaged, but it worked. Some days I wasn't even motivated to learn Japanese; I was motivated not to break my 47-day streak. Is that the "pure" reason to study? Probably not. Did it keep me consistent? Absolutely. I'll take it.

I was also surprised by how exciting it felt the first time I actually understood something "in the wild" — not in a lesson, but just randomly. I was watching a YouTube video (not even related to Japan), and someone dropped a Japanese phrase, and I understood it. My brain processed it automatically without conscious translation. It was maybe three words, nothing profound, but I actually yelled "I understood that!" at my screen. That moment made all the boring drilling and repetition feel worth it. It's one thing to know you're learning; it's another to experience your brain just... understanding a foreign language naturally.

Finally, I was surprised by how far I got in 17 weeks — and simultaneously how far I still have to go. I can read hiragana and katakana fluently, recognize a bunch of kanji, have basic conversations... but then I tried watching anime without subtitles and understood maybe 10%. Japanese is deep. Like, really, really deep. This project was essentially learning the alphabet and some basic vocabulary. It's humbling but also kind of exciting? There's so much more to explore, and I actually want to continue learning even though the project is over.`
  },
  {
    id: 3,
    category: 'Growth',
    icon: Heart,
    color: 'text-orange-400',
    bgColor: 'bg-orange-900/30',
    question: 'How have you grown personally through this experience?',
    response: `This Guided Learning project has changed me in ways I'm still discovering. The growth wasn't what I expected, mainly because this was a completely different type of self-directed project than what I've done before.

I've taken on self-initiated projects in the past — coding projects, side hustles, freelance work — but those were always driven by clear, practical goals. Usually money, sometimes building my portfolio, always with some tangible outcome in mind. Those projects had built-in motivation: I wanted to get paid, I needed to impress someone, I had to deliver results. The goals were serious and focused, which made it easier to push through difficult moments because there was a clear payoff waiting.

This GL project was fundamentally different. There was no money involved. No one was going to hire me because I learned basic Japanese. Learning about izakaya culture wasn't going to land me a job. This was purely an interest and passion project — I was learning Japanese and researching nightlife culture because I genuinely wanted to, not because it would practically benefit me in any obvious way. And that made it simultaneously harder and more meaningful.

The hardest part was maintaining motivation when there was no external reward. With my previous money-focused projects, when motivation dipped, I could remind myself "this will pay off financially" or "this will open doors professionally." But with Japanese learning, on those tough days when I didn't want to study, all I had was... my own interest. That's it. And some days, that felt insufficient. I questioned whether I should be spending this time on something more "useful" or "practical."

But pushing through those doubts and continuing anyway — purely for the sake of learning something I found fascinating — has been the real growth. I discovered I can commit to something long-term even when there's no tangible payoff, even when it's not going to make me money or advance my career in obvious ways. Learning for the sake of learning, not for external rewards. That's a different kind of discipline than I've developed before, and honestly, it feels more personally fulfilling than finishing projects that were just about results.

I also learned that passion projects require a different kind of structure than goal-driven projects. With my previous projects, the deliverables and deadlines created natural structure. With this GL project, I had to create arbitrary structure — daily study sessions, weekly reflection points, self-imposed deadlines — because no one was chasing me for deliverables. That self-imposed accountability is a skill I'll carry into future passion projects.

This experience has made me realize I want to make more room in my life for learning things just because they're interesting, not just because they're useful. There's real value in that, even if it doesn't fit neatly into a resume or portfolio. Growth doesn't always have to be strategic.`
  },
  {
    id: 4,
    category: 'Changes',
    icon: Target,
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/30',
    question: 'What would you do differently if you could start over?',
    response: `Looking back, there are some pretty straightforward things I would've done differently if I could start over:

First, I would've started using Duolingo from Week 1 instead of Week 3. I wasted the first couple weeks trying to figure out which app was "best" — reading reviews, watching YouTube comparisons, overthinking everything. In reality, just starting with any decent app early would've given me two extra weeks of practice and streak building. The best learning tool is the one you actually use consistently, not the theoretically perfect one you spend weeks researching.

Second, I wish I had worked more with my language learning partner beyond just reading practice. When I finally found a language exchange partner around Week 11, we mostly practiced reading sentences to each other and correcting pronunciation. That was helpful, but we could've done so much more — actual conversations, role-playing scenarios like ordering at an izakaya, watching Japanese content together and discussing it. I treated the partnership too formally, like a study session, when it could've been more natural and fun.

Third, I really wish I had touched on more aspects of Japanese beyond just reading. I got pretty comfortable reading hiragana and katakana, and I could recognize kanji when I saw them written down. But my listening skills? Terrible. My speaking? Even worse. My writing by hand? Let's not even go there. I was so focused on being able to read that I neglected the other three language skills. If I started over, I would balance things better — maybe dedicate different days to different skills, or make sure every study session touched on reading, listening, speaking, and writing even briefly.

Fourth, I would've incorporated more listening practice from the beginning. I should've been playing Japanese podcasts during my commute, watching Japanese YouTube videos with subtitles, or even just listening to Japanese music. My ears needed way more exposure than they got. When I finally tried listening to spoken Japanese, I could barely catch individual words even when I knew the vocabulary. That was a wake-up call that reading and listening are very different skills.

Fifth, I'd focus less on perfection and more on communication. I spent so much time trying to get everything grammatically correct, especially with particles, that I was afraid to just... try to communicate. Language learning isn't about perfection; it's about getting your point across. I wish I had embraced making mistakes earlier instead of treating them like failures.

Finally, I would've set smaller, more frequent milestones instead of just "reach N5 by end of semester." Having mini-goals like "learn all hiragana by Week 2" or "have a 5-minute conversation by Week 8" would've made progress feel more tangible and given me more moments to celebrate along the way.`
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

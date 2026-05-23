import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import AnimatedPage from '../components/AnimatedPage';
import BlurText from '../components/BlurText';
import AnimatedList from '../components/AnimatedList';
import BorderGlow from '../components/BorderGlow';
import TiltedCard from '../components/TiltedCard';
import SEO from '../components/SEO';

export default function Projects() {
  const [activeTag, setActiveTag] = useState('All');

  const allProjects = useMemo(() => [
    { title: '01 // MINIMAL PORTFOLIO v1', tags: ['Web', 'Design'], desc: 'A clean, minimalist portfolio template tailored for creative professionals. Focuses on typography and white space to highlight work.', year: '2025' },
    { title: '02 // DARK MODE DASHBOARD', tags: ['Web'], desc: 'An analytics dashboard designed specifically for low-light environments, featuring highly readable contrast ratios and data visualization.', year: '2024' },
    { title: '03 // E-COMMERCE CONCEPT', tags: ['Web', 'Mobile'], desc: 'A concept for a modern e-commerce mobile and web application with seamless checkout flows and micro-interactions.', year: '2025' },
    { title: '04 // WEATHER APP UI', tags: ['Mobile', 'Design'], desc: 'A weather application focused on beautiful atmospheric gradients and simple, glanceable data widgets.', year: '2023' },
    { title: '05 // TYPOGRAPHY EXPLORATION', tags: ['Design'], desc: 'A collection of experimental typographic posters exploring Swiss design principles and grid systems.', year: '2024' },
    { title: '06 // MOTION DESIGN EXPERIMENTS', tags: ['Design'], desc: 'Various motion design experiments exploring easing curves, physics simulations, and state transitions in UI.', year: '2025' }
  ], []);

  const tags = ['All', 'Web', 'Mobile', 'Design'];

  const filteredProjects = useMemo(() => {
    return activeTag === 'All' 
      ? allProjects 
      : allProjects.filter(p => p.tags.includes(activeTag));
  }, [activeTag, allProjects]);

  return (
    <>
      <SEO 
        title="KAIVON | Projects"
        description="A selection of recent works, experiments, and ongoing concepts by Kaivon."
      />
      <AnimatedPage className="max-w-4xl mx-auto px-6 w-full flex flex-col items-center">
      <div className="w-full text-center">
        <h1 className="text-[40px] sm:text-[60px] font-bold tracking-tighter text-[#111] mb-6 opacity-90 blur-[0.2px]">
          <BlurText text="Projects." delay={100} animateBy="letters" />
        </h1>
        <div className="text-lg text-[#111]/70 mb-10 font-light tracking-wide leading-relaxed max-w-lg mx-auto">
          <BlurText text="A selection of recent works, experiments, and ongoing concepts." delay={50} stepDuration={0.1} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl mx-auto mb-16"
      >
        <TiltedCard rotateAmplitude={8} scaleOnHover={1.02}>
          <div className="w-full relative group">
            <BorderGlow
              glowColor="250 80 60"
              backgroundColor="rgba(255, 255, 255, 0.6)"
              colors={['#38bdf8', '#c084fc', '#f472b6']}
              borderRadius={32}
              glowRadius={30}
              edgeSensitivity={30}
              animated={true}
              className="backdrop-blur-xl border border-black/5 shadow-2xl overflow-hidden"
            >
              <div className="relative p-8 sm:p-12 h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#38bdf8] bg-[#38bdf8]/10 px-3 py-1.5 rounded-full border border-[#38bdf8]/20">
                    Featured Project
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#111]/40">
                    2026
                  </span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111] mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#111] group-hover:to-[#666] transition-all duration-300">
                  AI-Powered Digital Canvas
                </h2>
                
                <p className="text-[#111]/60 font-light leading-relaxed mb-10 max-w-md">
                  An experimental infinite canvas utilizing cutting-edge web technologies, real-time collaboration, and generative AI integrations to redefine creative workflows.
                </p>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-black/5">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md border border-black/10 text-[#111]/60 bg-white/50">
                      WebGL
                    </span>
                    <span className="text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md border border-black/10 text-[#111]/60 bg-white/50">
                      React Bits
                    </span>
                  </div>
                  <button className="text-[11px] font-bold uppercase tracking-widest text-[#111] hover:text-[#38bdf8] transition-colors flex items-center gap-2">
                    Explore <span className="text-lg leading-none transform group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </BorderGlow>
          </div>
        </TiltedCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-3 mb-10"
      >
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTag === tag
                ? 'bg-[#111] text-white shadow-md'
                : 'bg-white/50 text-[#111] hover:bg-white/80 border border-black/5 hover:border-black/10'
            }`}
          >
            {tag}
          </button>
        ))}
      </motion.div>

      <motion.div 
        key={activeTag}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="w-full max-w-xl mx-auto"
      >
        <AnimatedList
          key={activeTag}
          items={filteredProjects}
          onItemSelect={(item, index) => console.log(item, index)}
          showGradients={false}
          enableArrowNavigation={true}
          displayScrollbar={false}
          renderItem={(item, index, isSelected) => (
            <div className={`item ${isSelected ? 'selected' : ''} text-left`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="item-text font-bold tracking-wide flex-1">{item.title}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((t: string) => (
                    <span key={t} className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-md border border-black/10 text-black/60 bg-black/5">
                      {t}
                    </span>
                  ))}
                  <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-md border border-black/10 text-black/70 bg-white">
                    {item.year}
                  </span>
                </div>
              </div>
              
              <motion.div 
                initial={false}
                animate={{ height: isSelected ? 'auto' : 0, opacity: isSelected ? 1 : 0 }}
                className="overflow-hidden transform-gpu will-change-[height,opacity]"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="pt-4 mt-4 border-t border-black/10">
                  <p className="text-[13px] text-black/70 leading-relaxed font-light">
                    {item.desc}
                  </p>
                  <button className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[#111] hover:text-[#38bdf8] transition-colors flex items-center gap-1 group">
                    View Case Study 
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        />
      </motion.div>
    </AnimatedPage>
    </>
  );
}

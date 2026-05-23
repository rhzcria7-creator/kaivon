import AnimatedPage from '../components/AnimatedPage';
import BlurText from '../components/BlurText';
import BorderGlow from '../components/BorderGlow';
import SEO from '../components/SEO';
import { motion } from 'motion/react';

const experiences = [
  {
    year: '2023 - Present',
    role: 'Design Engineer',
    company: 'Linear',
    description: 'Bridging the gap between engineering and design.'
  },
  {
    year: '2021 - 2023',
    role: 'Senior Developer',
    company: 'Vercel',
    description: 'Built high-performance frontend architectures.'
  },
  {
    year: '2019 - 2021',
    role: 'UI/UX Designer',
    company: 'Apple',
    description: 'Crafted minimal and intuitive user experiences.'
  }
];

export default function About() {
  return (
    <>
      <SEO 
        title="KAIVON | About"
        description="Learn more about Kaivon, a digital craftsman focusing on building simple, elegant software."
      />
      <AnimatedPage className="max-w-4xl mx-auto px-6">
      <div className="w-full">
        <h1 className="text-[40px] sm:text-[60px] font-bold tracking-tighter text-[#111] mb-8 opacity-90 blur-[0.2px]">
          <BlurText text="About me." delay={100} animateBy="letters" />
        </h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="prose prose-lg text-[#111]/80 mb-16 max-w-none"
        >
          <div className="font-light text-xl leading-relaxed tracking-wide">
            <BlurText 
              text="I am a digital craftsman focusing on building software that looks and feels amazing. My approach is rooted in simplicity, fluid motion, and relentless attention to detail." 
              delay={30} 
              stepDuration={0.1}
              animateBy="words"
            />
          </div>
        </motion.div>

        <div className="space-y-8">
          <h2 className="text-[12px] uppercase tracking-widest font-bold text-[#111]/40 mb-6">
            <BlurText text="Experience" delay={100} direction="bottom" animateBy="letters" />
          </h2>
          
          <div className="flex flex-col gap-6">
            {experiences.map((exp, i) => (
              <BorderGlow
                key={i}
                glowColor="250 80 60"
                backgroundColor="rgba(255, 255, 255, 0.8)"
                colors={['#38bdf8', '#c084fc', '#f472b6']}
                borderRadius={24}
                glowRadius={20}
                animated={true}
                className="w-full backdrop-blur-lg border border-black/5 shadow-sm"
              >
                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#111] mb-1">
                      <BlurText text={exp.role} delay={100} stepDuration={0.2} animateBy="letters" />
                    </h3>
                    <div className="text-[11px] text-[#111]/70 font-bold tracking-widest uppercase">
                      <BlurText text={exp.company} delay={80} stepDuration={0.2} animateBy="letters" />
                    </div>
                    <div className="text-sm text-[#111]/60 mt-3 max-w-sm leading-relaxed">
                      <BlurText text={exp.description} delay={40} stepDuration={0.1} animateBy="words" />
                    </div>
                  </div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-[#111]/60 px-4 py-2 bg-white/40 backdrop-blur-md rounded-full self-start md:self-center border border-white/60 shadow-sm">
                    <BlurText text={exp.year} delay={100} stepDuration={0.2} animateBy="letters" />
                  </div>
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>
      </div>
    </AnimatedPage>
    </>
  );
}

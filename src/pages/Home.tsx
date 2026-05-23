import AnimatedPage from '../components/AnimatedPage';
import BlurText from '../components/BlurText';
import BorderGlow from '../components/BorderGlow';
import TiltedCard from '../components/TiltedCard';
import SEO from '../components/SEO';
import { Youtube, Twitter } from 'lucide-react';
import { motion } from 'motion/react';
import { TiktokIcon, RedditIcon } from '../components/icons';

const socials = [
  { icon: <Youtube size={20} />, label: 'YouTube' },
  { icon: <Twitter size={20} />, label: 'Twitter' },
  { icon: <RedditIcon size={20} />, label: 'Reddit' },
  { icon: <TiktokIcon size={20} />, label: 'TikTok' }
];

export default function Home() {
  return (
    <>
      <SEO 
        title="KAIVON | Minimal Digital Presence"
        description="Kaivon's personal portfolio. Minimal digital presence, extreme engineering."
      />
      <AnimatedPage className="justify-center px-6">
      <div className="flex flex-col items-center justify-center -mt-20">
        <TiltedCard rotateAmplitude={12} scaleOnHover={1.03}>
          <div className="relative group perspective flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute -inset-10 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"
            />
            <h1 className="text-[100px] sm:text-[140px] font-bold leading-none tracking-tighter text-[#111] opacity-90 blur-[0.4px] relative z-10">
              <BlurText text="KAIVON" delay={150} animateBy="letters" />
            </h1>
            
            <div className="text-sm sm:text-xl font-light text-[#111]/50 tracking-[0.2em] uppercase mt-4 mb-2 text-center pointer-events-none">
              <BlurText text="“Minimal digital presence.”" delay={150} direction="bottom" animateBy="letters" />
            </div>
          </div>
        </TiltedCard>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-12 scale-90 sm:scale-100 bg-white/40 backdrop-blur-2xl border border-white/30 rounded-[32px] p-3 shadow-2xl relative z-20">
          {socials.map((s, i) => (
            <div key={s.label} className="group cursor-pointer">
              <BorderGlow
                glowColor="250 80 60"
                backgroundColor="rgba(255, 255, 255, 0.9)"
                colors={['#38bdf8', '#c084fc', '#f472b6']}
                borderRadius={22}
                glowRadius={20}
                edgeSensitivity={20}
                className="transition-transform duration-300 ease-out group-hover:scale-110 shadow-sm border border-black/5"
                animated={true}
              >
                <div className="flex flex-col items-center justify-center w-[72px] h-[72px] gap-1.5">
                  <div className="text-[#111] transition-transform duration-300 group-hover:scale-110">
                    {s.icon}
                  </div>
                </div>
              </BorderGlow>
            </div>
          ))}
        </div>
      </div>
    </AnimatedPage>
    </>
  );
}

import AnimatedPage from '../components/AnimatedPage';
import BlurText from '../components/BlurText';
import BorderGlow from '../components/BorderGlow';
import { Youtube, Twitter, Linkedin, Instagram } from 'lucide-react';
import { TiktokIcon, RedditIcon } from '../components/icons';

const networks = [
  { icon: <Youtube size={24} />, name: 'YouTube', handle: '@kaivon', link: '#' },
  { icon: <Twitter size={24} />, name: 'X / Twitter', handle: '@kaivon_dev', link: '#' },
  { icon: <Linkedin size={24} />, name: 'LinkedIn', handle: 'kaivon', link: '#' },
  { icon: <RedditIcon size={24} />, name: 'Reddit', handle: 'u/kaivon', link: '#' },
  { icon: <TiktokIcon size={24} />, name: 'TikTok', handle: '@kaivon_dev', link: '#' },
  { icon: <Instagram size={24} />, name: 'Instagram', handle: '@kaivon_shots', link: '#' },
];

export default function Socials() {
  return (
    <AnimatedPage className="max-w-5xl mx-auto px-6">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-[40px] sm:text-[60px] font-bold tracking-tighter text-[#111] mb-4 text-center opacity-90 blur-[0.2px]">
          <BlurText text="Connect." delay={100} animateBy="letters" />
        </h1>
        <div className="text-lg text-[#111]/70 mb-16 font-light tracking-wide text-center max-w-lg leading-relaxed">
          <BlurText text="Find me across the web. I share my open-source work, thoughts on design, and occasional life updates." delay={50} stepDuration={0.05} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {networks.map((net, i) => (
            <a key={i} href={net.link} target="_blank" rel="noopener noreferrer" aria-label={`Follow on ${net.name}`} className="block group">
              <BorderGlow
                glowColor="250 80 60"
                backgroundColor="rgba(255, 255, 255, 0.8)"
                colors={['#38bdf8', '#c084fc', '#f472b6']}
                borderRadius={24}
                glowRadius={25}
                animated={true}
                className="w-full backdrop-blur-lg border border-black/5 transition-transform duration-300 group-hover:-translate-y-1 shadow-sm"
              >
                <div className="p-6 flex flex-col items-start gap-5">
                  <div className="p-3 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl text-[#111] transition-transform duration-300 group-hover:scale-110 shadow-sm">
                    {net.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#111] tracking-tight">
                      <BlurText text={net.name} delay={100} stepDuration={0.2} animateBy="letters" />
                    </h3>
                    <div className="text-[11px] uppercase tracking-widest font-bold text-[#111]/50 transition-colors group-hover:text-amber-600 mt-1">
                      <BlurText text={net.handle} delay={120} stepDuration={0.2} animateBy="letters" />
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </a>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
}

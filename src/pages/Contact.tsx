import AnimatedPage from '../components/AnimatedPage';
import BlurText from '../components/BlurText';
import BorderGlow from '../components/BorderGlow';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Send } from 'lucide-react';
import SEO from '../components/SEO';

export default function Contact() {
  const [focused, setFocused] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => setSending(false), 1500);
  };

  return (
    <>
      <SEO 
        title="KAIVON | Contact"
        description="Let's build something amazing together. Reach out to Kaivon for new opportunities."
      />
      <AnimatedPage className="max-w-xl mx-auto px-6">
      <div className="w-full">
        <h1 className="text-[40px] sm:text-[60px] font-bold tracking-tighter text-[#111] mb-6 opacity-90 blur-[0.2px]">
          <BlurText text="Let's build." delay={100} animateBy="letters" />
        </h1>
        <div className="text-lg text-[#111]/70 mb-12 font-light tracking-wide leading-relaxed">
          <BlurText text="Whether you have a project in mind or just want to chat, I'm always open to new opportunities." delay={50} stepDuration={0.1} />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white/40 backdrop-blur-lg border border-white/60 shadow-lg p-8 rounded-[32px]">
          <div className="flex flex-col gap-2 relative">
            <label className="text-[10px] uppercase tracking-widest font-bold text-[#111]/50 ml-1">
               <BlurText text="Name" delay={150} animateBy="letters" />
            </label>
            <div className={`transition-all duration-300 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/60 p-1 ${focused === 'name' ? 'shadow-[0_0_0_2px_rgba(111,111,111,0.5)]' : 'shadow-inner'}`}>
              <input 
                type="text"
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent border-none outline-none px-4 py-3 text-[#111] placeholder:text-[#111]/40 font-medium"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 relative">
            <label className="text-[10px] uppercase tracking-widest font-bold text-[#111]/50 ml-1">
               <BlurText text="Email" delay={150} animateBy="letters" />
            </label>
            <div className={`transition-all duration-300 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/60 p-1 ${focused === 'email' ? 'shadow-[0_0_0_2px_rgba(111,111,111,0.5)]' : 'shadow-inner'}`}>
              <input 
                type="email"
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent border-none outline-none px-4 py-3 text-[#111] placeholder:text-[#111]/40 font-medium"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 relative">
            <label className="text-[10px] uppercase tracking-widest font-bold text-[#111]/50 ml-1">
              <BlurText text="Message" delay={150} animateBy="letters" />
            </label>
            <div className={`transition-all duration-300 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/60 p-1 ${focused === 'message' ? 'shadow-[0_0_0_2px_rgba(111,111,111,0.5)]' : 'shadow-inner'}`}>
              <textarea 
                rows={4}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent border-none outline-none px-4 py-3 text-[#111] placeholder:text-[#111]/40 font-medium resize-none"
                placeholder="Tell me about your amazing idea..."
                required
              />
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-4">
            <BorderGlow
              glowColor="250 80 60"
              backgroundColor="#111"
              colors={['#38bdf8', '#c084fc', '#f472b6']}
              borderRadius={16}
              glowRadius={20}
              className="shadow-xl border border-black/5"
              animated={true}
            >
              <button disabled={sending} className="w-full py-4 px-6 bg-[#111] text-white hover:bg-[#222] font-bold tracking-widest uppercase text-[11px] rounded-[14px] flex items-center justify-center gap-2 transition-all">
                {sending ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-4 h-4 border-2 border-[#111]/30 border-t-[#111] rounded-full"
                  />
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </BorderGlow>
          </motion.div>
        </form>
      </div>
    </AnimatedPage>
    </>
  );
}

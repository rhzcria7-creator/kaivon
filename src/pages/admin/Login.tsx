import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../../hooks/useAuth';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(password);
    if (success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#fafafa] overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-100/40 via-purple-100/40 to-transparent rounded-full blur-3xl" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="bg-white/70 backdrop-blur-2xl border border-white/60 p-8 sm:p-10 rounded-[32px] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-14 h-14 bg-gradient-to-br from-[#111] to-[#333] rounded-2xl flex items-center justify-center mb-8 shadow-xl"
          >
            <ShieldCheck className="text-white w-7 h-7" strokeWidth={1.5} />
          </motion.div>

          <h2 className="text-2xl font-bold text-[#111] tracking-tight mb-2">
            Bem-vindo de volta
          </h2>
          <p className="text-[#666] text-sm mb-8 font-medium">
            Insira sua credencial de administrador para acessar o Kaivon OS.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#999]">
                <Lock className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha administrativa"
                className={`w-full pl-11 pr-4 py-3.5 bg-white/50 border rounded-2xl outline-none focus:ring-4 focus:ring-purple-500/10 transition-all font-medium text-[#111] placeholder:text-[#999] ${
                  error ? 'border-red-400/50 text-red-500' : 'border-black/5 focus:border-black/20'
                }`}
              />
              {error && (
                <motion.span 
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="absolute -bottom-6 left-2 text-xs text-red-500 font-medium"
                >
                  Credencial inválida.
                </motion.span>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3.5 bg-[#111] text-white rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-black/10 transition-colors hover:bg-black/80"
            >
              Acessar Painel
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>
        </div>
        
        <p className="text-center text-xs font-medium text-[#999] mt-8">
          KAIVON OS &copy; {new Date().getFullYear()}
        </p>
      </motion.div>
    </div>
  );
}

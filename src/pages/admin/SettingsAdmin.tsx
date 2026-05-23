import { motion } from 'motion/react';
import { Settings, User, Bell, Shield, Globe } from 'lucide-react';

export default function SettingsAdmin() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 sm:p-10 max-w-7xl mx-auto flex flex-col md:flex-row gap-8"
    >
      <div className="w-full md:w-64 flex-shrink-0">
        <h1 className="text-2xl font-bold text-[#111] tracking-tight mb-6">Configurações</h1>
        <div className="flex flex-col gap-1">
          <button className="flex items-center gap-3 px-3 py-2 bg-[#f5f5f5] text-[#111] rounded-xl text-sm font-semibold transition-colors">
            <User className="w-4 h-4" /> Perfil Admin
          </button>
          <button className="flex items-center gap-3 px-3 py-2 text-[#666] hover:bg-[#f5f5f5] hover:text-[#111] rounded-xl text-sm font-medium transition-colors">
            <Globe className="w-4 h-4" /> Configurações do Site
          </button>
          <button className="flex items-center gap-3 px-3 py-2 text-[#666] hover:bg-[#f5f5f5] hover:text-[#111] rounded-xl text-sm font-medium transition-colors">
            <Bell className="w-4 h-4" /> Notificações
          </button>
          <button className="flex items-center gap-3 px-3 py-2 text-[#666] hover:bg-[#f5f5f5] hover:text-[#111] rounded-xl text-sm font-medium transition-colors">
            <Shield className="w-4 h-4" /> Segurança
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white border border-[#eaeaea] rounded-3xl p-8 shadow-sm">
        <h2 className="text-xl font-bold text-[#111] mb-6">Perfil Admin</h2>
        
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[#eaeaea]">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[3px]">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center border-2 border-white">
              <span className="text-2xl font-bold text-[#111]">K</span>
            </div>
          </div>
          <div>
            <button className="px-4 py-2 bg-[#111] text-white text-sm font-bold rounded-lg shadow-md mb-2">Alterar Foto</button>
            <p className="text-xs text-[#888]">JPG, GIF ou PNG. Max de 2MB.</p>
          </div>
        </div>

        <form className="space-y-6 max-w-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#888] uppercase tracking-wider mb-1.5 block">Nome</label>
              <input type="text" defaultValue="Kaivon" className="w-full px-4 py-3 bg-[#f5f5f5] border border-transparent focus:border-[#eaeaea] rounded-xl text-sm outline-none focus:bg-white transition-all text-[#111] font-medium" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#888] uppercase tracking-wider mb-1.5 block">Sobrenome</label>
              <input type="text" defaultValue="Admin" className="w-full px-4 py-3 bg-[#f5f5f5] border border-transparent focus:border-[#eaeaea] rounded-xl text-sm outline-none focus:bg-white transition-all text-[#111] font-medium" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-[#888] uppercase tracking-wider mb-1.5 block">Email de Login</label>
            <input type="email" defaultValue="admin@kaivon.os" className="w-full px-4 py-3 bg-[#f5f5f5] border border-transparent focus:border-[#eaeaea] rounded-xl text-sm outline-none focus:bg-white transition-all text-[#111] font-medium" />
          </div>
          <div className="pt-4">
            <button type="button" className="px-6 py-3 text-sm font-semibold text-white bg-[#111] hover:bg-black/80 rounded-xl transition-colors shadow-lg shadow-black/10">Salvar Alterações</button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

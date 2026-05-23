import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  MessageSquare, 
  CircleDollarSign, 
  LineChart, 
  Users, 
  Settings,
  LogOut,
  Bell,
  Search,
  Command,
  FileText,
  Image as ImageIcon,
  Globe
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function DashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { path: '/dashboard/articles', label: 'Artigos & Rascunhos', icon: FileText },
    { path: '/dashboard/media', label: 'Biblioteca de Mídia', icon: ImageIcon },
    { path: '/dashboard/seo', label: 'SEO & Destaques', icon: Globe },
    { path: '/dashboard/projects', label: 'Projetos', icon: FolderKanban },
    { path: '/dashboard/forms', label: 'Questionários', icon: MessageSquare },
    { path: '/dashboard/revenue', label: 'Faturamento', icon: CircleDollarSign },
    { path: '/dashboard/analytics', label: 'Analytics', icon: LineChart },
    { path: '/dashboard/contacts', label: 'Contatos', icon: Users },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#060608] flex overflow-hidden font-sans text-neutral-100 selection:bg-neutral-800 selection:text-white">
      {/* Sidebar - Desktop */}
      <aside className="w-[260px] flex-shrink-0 bg-[#0b0b0f] border-r border-[#16161c] hidden md:flex flex-col z-20">
        <div className="h-16 flex items-center px-6 border-b border-[#16161c]">
          <div className="flex items-center gap-2 text-white font-extrabold tracking-tight text-lg">
            <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
              <Command className="w-4 h-4 text-black" />
            </div>
            Kaivon OS
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
          <div className="text-[10px] font-extrabold text-neutral-500 tracking-widest uppercase mb-2 px-3">CMS & Editor</div>
          {navItems.slice(0, 4).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-black shadow-[0_4px_12px_rgba(255,255,255,0.08)]'
                    : 'text-neutral-400 hover:bg-neutral-900/50 hover:text-white'
                }`
              }
            >
              <item.icon className="w-4 h-4" strokeWidth={2.2} />
              {item.label}
            </NavLink>
          ))}

          <div className="mt-6 text-[10px] font-extrabold text-neutral-500 tracking-widest uppercase mb-2 px-3">Relatórios & Leads</div>
          {navItems.slice(4).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-black shadow-[0_4px_12px_rgba(255,255,255,0.08)]'
                    : 'text-neutral-400 hover:bg-neutral-900/50 hover:text-white'
                }`
              }
            >
              <item.icon className="w-4 h-4" strokeWidth={2.2} />
              {item.label}
            </NavLink>
          ))}

          <div className="mt-6 text-[10px] font-extrabold text-neutral-500 tracking-widest uppercase mb-2 px-3">Ajustes</div>
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                isActive ? 'bg-white text-black shadow-[0_4px_12px_rgba(255,255,255,0.08)]' : 'text-neutral-400 hover:bg-neutral-900/50 hover:text-white'
              }`
            }
          >
            <Settings className="w-4 h-4" strokeWidth={2.2} />
            Configurações
          </NavLink>
        </div>

        <div className="p-4 border-t border-[#16161c]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[13px] font-bold text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" strokeWidth={2.2} />
            Sair da Sessão
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen bg-[#060608]">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-6 bg-[#060608]/80 backdrop-blur-md border-b border-[#16161c] sticky top-0 z-10 text-white">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative group w-full max-w-sm hidden sm:block">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-white transition-colors" />
              <input
                type="text"
                placeholder="Buscar em todo o sistema..."
                className="w-full pl-9 pr-4 py-2 bg-[#0e0e12] hover:bg-[#121217] focus:bg-black border border-[#16161c] focus:border-neutral-700 rounded-lg text-sm outline-none transition-all placeholder:text-neutral-500 text-white"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[9px] font-bold text-neutral-500">
                <kbd className="px-1.5 py-0.5 bg-[#121217] border border-[#222] rounded">⌘</kbd>
                <kbd className="px-1.5 py-0.5 bg-[#121217] border border-[#222] rounded">K</kbd>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5 animate-pulse" strokeWidth={1.8} />
              <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-indigo-500 rounded-full border border-[#060608]"></span>
            </button>
            <div className="w-px h-6 bg-[#16161c] hidden sm:block"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-[13px] font-bold text-white leading-none">Kaivon Admin</span>
                <span className="text-[10px] font-extrabold text-[#a855f7] uppercase tracking-wider mt-1">Superuser</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px] relative">
                <div className="w-full h-full bg-[#0b0b0f] rounded-full flex items-center justify-center">
                  <span className="text-xs font-black text-white">K</span>
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#060608] rounded-full animate-ping"></div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#060608] rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

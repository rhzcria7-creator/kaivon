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
  Command
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function DashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
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
    <div className="min-h-screen bg-[#fafafa] flex overflow-hidden font-sans">
      {/* Sidebar - Desktop */}
      <aside className="w-[260px] flex-shrink-0 bg-white border-r border-[#eaeaea] hidden md:flex flex-col z-20">
        <div className="h-16 flex items-center px-6 border-b border-[#eaeaea]">
          <div className="flex items-center gap-2 text-[#111] font-bold tracking-tight text-lg">
            <div className="w-7 h-7 bg-[#111] rounded-lg flex items-center justify-center">
              <Command className="w-4 h-4 text-white" />
            </div>
            Kaivon OS
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
          <div className="text-[11px] font-bold text-[#888] tracking-wider uppercase mb-2 px-2">Menu</div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl text-[14px] font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#111] text-white shadow-sm'
                    : 'text-[#666] hover:bg-[#f5f5f5] hover:text-[#111]'
                }`
              }
            >
              <item.icon className="w-4 h-4" strokeWidth={2} />
              {item.label}
            </NavLink>
          ))}

          <div className="mt-8 text-[11px] font-bold text-[#888] tracking-wider uppercase mb-2 px-2">Sistema</div>
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl text-[14px] font-medium transition-all ${
                isActive ? 'bg-[#111] text-white' : 'text-[#666] hover:bg-[#f5f5f5] hover:text-[#111]'
              }`
            }
          >
            <Settings className="w-4 h-4" strokeWidth={2} />
            Configurações
          </NavLink>
        </div>

        <div className="p-4 border-t border-[#eaeaea]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-[14px] font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" strokeWidth={2} />
            Sair da Sessão
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md border-b border-[#eaeaea] sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative group w-full max-w-sm hidden sm:block">
              <Search className="w-4 h-4 text-[#999] absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-[#111] transition-colors" />
              <input
                type="text"
                placeholder="Buscar em todo o sistema..."
                className="w-full pl-9 pr-4 py-2 bg-[#f5f5f5] hover:bg-[#ebebeb] focus:bg-white border border-transparent focus:border-[#eaeaea] rounded-lg text-sm outline-none transition-all placeholder:text-[#999] text-[#111]"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-bold text-[#999]">
                <kbd className="px-1.5 py-0.5 bg-white border border-[#eaeaea] rounded">⌘</kbd>
                <kbd className="px-1.5 py-0.5 bg-white border border-[#eaeaea] rounded">K</kbd>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f5f5f5] text-[#666] transition-colors relative">
              <Bell className="w-5 h-5" strokeWidth={1.5} />
              <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-blue-500 rounded-full border border-white"></span>
            </button>
            <div className="w-px h-6 bg-[#eaeaea] hidden sm:block"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-[13px] font-bold text-[#111] leading-none">Kaivon Admin</span>
                <span className="text-[11px] font-medium text-[#888]">Superuser</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[2px] relative">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center border border-white">
                  <span className="text-sm font-bold text-[#111]">K</span>
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
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

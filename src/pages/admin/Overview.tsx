import { motion } from 'motion/react';
import { 
  Users, 
  FolderKanban, 
  Eye, 
  CircleDollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, visitors: 2400 },
  { name: 'Fev', revenue: 3000, visitors: 1398 },
  { name: 'Mar', revenue: 2000, visitors: 9800 },
  { name: 'Abr', revenue: 2780, visitors: 3908 },
  { name: 'Mai', revenue: 1890, visitors: 4800 },
  { name: 'Jun', revenue: 2390, visitors: 3800 },
  { name: 'Jul', revenue: 3490, visitors: 4300 },
];

const stats = [
  { label: 'Projetos Ativos', value: '14', change: '+12%', isPositive: true, icon: FolderKanban },
  { label: 'Receita Mensal', value: 'R$ 15.4K', change: '+8.4%', isPositive: true, icon: CircleDollarSign },
  { label: 'Acessos Totais', value: '45.2K', change: '-2.1%', isPositive: false, icon: Eye },
  { label: 'Contatos / Leads', value: '128', change: '+24%', isPositive: true, icon: Users },
];

export default function Overview() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="p-6 sm:p-10 max-w-7xl mx-auto"
    >
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-[#111] tracking-tight">Overview</h1>
        <p className="text-[#666] text-sm mt-1">Bem-vindo de volta! Aqui está o resumo do seu Kaivon OS hoje.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-[#eaeaea] p-5 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-[#666]">{stat.label}</span>
              <div className="p-2bg-[#f8f8f8] rounded-lg">
                <stat.icon className="w-4 h-4 text-[#111]" strokeWidth={2} />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-[#111]">{stat.value}</span>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.isPositive ? 'text-green-600' : 'text-red-500'}`}>
                {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white border border-[#eaeaea] p-6 rounded-3xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-[#111]">Desempenho Geral</h3>
              <p className="text-xs text-[#666] mt-1">Visitantes únicos e receita</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium">
              <span className="flex items-center gap-1 text-[#666]"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Faturamento</span>
              <span className="flex items-center gap-1 text-[#666]"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Acessos</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontSize: '13px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="visitors" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorVisitors)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-[#eaeaea] p-6 rounded-3xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-[#111]">Atividade Recente</h3>
            <Activity className="w-4 h-4 text-[#888]" />
          </div>
          
          <div className="flex-1 space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 relative">
                {i !== 4 && <div className="absolute top-8 left-4 w-px h-10 bg-[#eaeaea]" />}
                <div className="w-8 h-8 rounded-full bg-[#f8f8f8] flex items-center justify-center flex-shrink-0 z-10">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#111]">Novo contato recebido</p>
                  <p className="text-xs text-[#666] mt-0.5">"Gostaria de um orçamento para..."</p>
                  <span className="text-[10px] font-bold text-[#999] uppercase tracking-wider block mt-2">Há 2 horas</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-xs font-bold text-[#111] hover:bg-[#f5f5f5] rounded-xl transition-colors">
            Ver todas
          </button>
        </motion.div>
      </div>

    </motion.div>
  );
}

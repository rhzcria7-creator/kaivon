import { motion } from 'motion/react';
import { LineChart as LineChartIcon, Eye, MousePointerClick, Smartphone, Globe } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const data = [
  { name: 'Seg', uv: 4000 },
  { name: 'Ter', uv: 3000 },
  { name: 'Qua', uv: 2000 },
  { name: 'Qui', uv: 2780 },
  { name: 'Sex', uv: 1890 },
  { name: 'Sáb', uv: 2390 },
  { name: 'Dom', uv: 3490 },
];

const devices = [
  { name: 'Desktop', value: 65, color: '#111' },
  { name: 'Mobile', value: 30, color: '#666' },
  { name: 'Tablet', value: 5, color: '#999' },
];

export default function AnalyticsAdmin() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 sm:p-10 max-w-7xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#111] tracking-tight">Analytics</h1>
        <p className="text-[#666] text-sm mt-1">Tráfego, comportamento e métricas detalhadas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-[#eaeaea] p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <Eye className="w-5 h-5 text-[#888] mb-3" />
          <p className="text-[#666] text-sm font-medium">Visualizações Totais</p>
          <div className="flex items-end gap-2 mt-1">
            <h3 className="text-2xl font-bold text-[#111]">124.5K</h3>
            <span className="text-xs font-bold text-green-600 mb-1">+12%</span>
          </div>
        </div>
        <div className="bg-white border border-[#eaeaea] p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <MousePointerClick className="w-5 h-5 text-[#888] mb-3" />
          <p className="text-[#666] text-sm font-medium">Interações (Clicks)</p>
          <div className="flex items-end gap-2 mt-1">
            <h3 className="text-2xl font-bold text-[#111]">45.2K</h3>
            <span className="text-xs font-bold text-green-600 mb-1">+5%</span>
          </div>
        </div>
        <div className="bg-white border border-[#eaeaea] p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <LineChartIcon className="w-5 h-5 text-[#888] mb-3" />
          <p className="text-[#666] text-sm font-medium">Bounce Rate</p>
          <div className="flex items-end gap-2 mt-1">
            <h3 className="text-2xl font-bold text-[#111]">32.4%</h3>
            <span className="text-xs font-bold text-red-500 mb-1">+2%</span>
          </div>
        </div>
        <div className="bg-white border border-[#eaeaea] p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <Globe className="w-5 h-5 text-[#888] mb-3" />
          <p className="text-[#666] text-sm font-medium">Países Alcançados</p>
          <div className="flex items-end gap-2 mt-1">
            <h3 className="text-2xl font-bold text-[#111]">42</h3>
            <span className="text-xs font-bold text-green-600 mb-1">+8</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white border border-[#eaeaea] p-6 rounded-3xl shadow-sm">
          <h3 className="text-base font-bold text-[#111] mb-6">Tráfego na Semana</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                <Tooltip 
                  cursor={{ fill: '#f5f5f5' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontSize: '13px', fontWeight: 'bold' }}
                />
                <Bar dataKey="uv" radius={[6, 6, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#111' : '#e5e5e5'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-[#eaeaea] p-6 rounded-3xl shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Smartphone className="w-5 h-5 text-[#111]" />
            <h3 className="text-base font-bold text-[#111]">Dispositivos</h3>
          </div>
          
          <div className="flex-1 space-y-6">
            {devices.map((device, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm font-bold text-[#111] mb-2">
                  <span>{device.name}</span>
                  <span>{device.value}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#f5f5f5] overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${device.value}%` }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: device.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#eaeaea]">
            <h3 className="text-[11px] font-bold text-[#888] uppercase tracking-wider mb-4">Top Origens</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center"><span className="text-sm font-medium text-[#111]">Google Search</span><span className="text-xs font-bold bg-[#f5f5f5] px-2 py-1 rounded">45%</span></div>
              <div className="flex justify-between items-center"><span className="text-sm font-medium text-[#111]">LinkedIn</span><span className="text-xs font-bold bg-[#f5f5f5] px-2 py-1 rounded">22%</span></div>
              <div className="flex justify-between items-center"><span className="text-sm font-medium text-[#111]">Direto</span><span className="text-xs font-bold bg-[#f5f5f5] px-2 py-1 rounded">18%</span></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import { motion } from 'motion/react';
import { CircleDollarSign, ArrowUpRight, ArrowDownRight, CreditCard } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: '1', value: 400 },
  { name: '5', value: 800 },
  { name: '10', value: 1200 },
  { name: '15', value: 900 },
  { name: '20', value: 2100 },
  { name: '25', value: 2400 },
  { name: '30', value: 3100 },
];

export default function RevenueAdmin() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 sm:p-10 max-w-7xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#111] tracking-tight">Faturamento</h1>
        <p className="text-[#666] text-sm mt-1">Ganhos mensais e status de pagamento.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 bg-[#111] rounded-3xl p-8 relative overflow-hidden text-white shadow-2xl shadow-black/10">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium mb-1">Receita Mensal</p>
              <h2 className="text-4xl font-bold tracking-tight">R$ 15.420,00</h2>
              <div className="flex items-center gap-2 mt-3 text-sm">
                <span className="flex items-center gap-1 text-green-400 font-bold bg-green-400/10 px-2 py-1 rounded-lg">
                  <ArrowUpRight className="w-4 h-4" />
                  +12.5%
                </span>
                <span className="text-white/50">vs mês anterior</span>
              </div>
            </div>
            
            <div className="mt-10 h-[140px] w-[calc(100%+40px)] -ml-5 -mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', backgroundColor: '#222', color: '#fff' }}
                    itemStyle={{ fontSize: '13px', fontWeight: 'bold', color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white border border-[#eaeaea] rounded-3xl p-6 shadow-sm flex-1">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <CircleDollarSign className="w-5 h-5" />
            </div>
            <p className="text-[#666] text-sm font-medium mb-1">Pendente</p>
            <h3 className="text-2xl font-bold text-[#111]">R$ 4.350,00</h3>
          </div>
          <div className="bg-white border border-[#eaeaea] rounded-3xl p-6 shadow-sm flex-1">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <CreditCard className="w-5 h-5" />
            </div>
            <p className="text-[#666] text-sm font-medium mb-1">Gastos/Taxas</p>
            <h3 className="text-2xl font-bold text-[#111]">R$ 840,00</h3>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-[#111] mb-4">Últimas Transações</h3>
      <div className="bg-white border border-[#eaeaea] rounded-3xl overflow-hidden shadow-sm">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-between p-4 px-6 border-b border-[#eaeaea] last:border-0 hover:bg-[#fafafa] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#f5f5f5] flex items-center justify-center">
                <CircleDollarSign className="w-5 h-5 text-[#888]" />
              </div>
              <div>
                <p className="font-bold text-[#111] text-sm">Pagamento - Projeto X</p>
                <p className="text-xs text-[#888]">21 Mai, 2026 • Stripe</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-[#111] text-sm">+ R$ 3.500,00</p>
              <p className="text-[10px] font-bold text-green-600 bg-green-50 inline-block px-2 py-0.5 rounded mt-1 uppercase tracking-wider">Aprovado</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

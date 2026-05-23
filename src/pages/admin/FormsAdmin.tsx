import { motion } from 'motion/react';
import { MessageSquare, Search, Download, Filter } from 'lucide-react';

export default function FormsAdmin() {
  const forms = [
    { id: 1, name: 'João Silva', email: 'joao.silva@email.com', date: 'Há 2 min', status: 'Novo', subject: 'Orçamento UI/UX' },
    { id: 2, name: 'Marina Costa', email: 'marina@empresa.com', date: 'Há 3 horas', status: 'Lido', subject: 'Dúvida sobre App' },
    { id: 3, name: 'Pedro Santos', email: 'pedro.s@agency.com', date: 'Ontem', status: 'Respondido', subject: 'Proposta de Parceria' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 sm:p-10 max-w-7xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111] tracking-tight">Questionários</h1>
          <p className="text-[#666] text-sm mt-1">Respostas dos seus formulários de contato.</p>
        </div>
        <button className="bg-white border border-[#eaeaea] text-[#111] px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-[#f5f5f5] transition-colors shadow-sm">
          <Download className="w-4 h-4" />
          Exportar CSV
        </button>
      </div>

      <div className="bg-white border border-[#eaeaea] rounded-3xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#eaeaea] flex items-center justify-between gap-4">
          <div className="relative w-full max-w-xs">
            <Search className="w-4 h-4 text-[#999] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar respostas..." 
              className="w-full pl-9 pr-4 py-2 bg-[#f5f5f5] hover:bg-[#ebebeb] focus:bg-white border border-transparent focus:border-[#eaeaea] rounded-xl text-sm outline-none transition-all placeholder:text-[#999] text-[#111]"
            />
          </div>
          <button className="p-2 border border-[#eaeaea] rounded-lg text-[#666] hover:text-[#111] hover:bg-[#f5f5f5] transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fafafa]">
              <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">Contato</th>
              <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">Assunto</th>
              <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">Data</th>
              <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.id} className="border-t border-[#eaeaea] hover:bg-[#fdfdfd] transition-colors cursor-pointer group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                      {form.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-[#111] text-sm">{form.name}</div>
                      <div className="text-xs text-[#888]">{form.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[13px] text-[#444] font-medium">{form.subject}</span>
                </td>
                <td className="px-6 py-4 text-[13px] text-[#888] font-medium">
                  {form.date}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase ${
                    form.status === 'Novo' ? 'bg-blue-100 text-blue-700' : 
                    form.status === 'Lido' ? 'bg-gray-100 text-gray-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {form.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

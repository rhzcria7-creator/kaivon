import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, MoreHorizontal, Edit, Trash2, ExternalLink, FolderKanban } from 'lucide-react';

const initialProjects = [
  { id: 1, title: 'Minimal Portfolio v1', category: 'Web', status: 'Publicado', date: '21 Mai, 2026' },
  { id: 2, title: 'Dark Mode Dashboard', category: 'Design', status: 'Rascunho', date: '18 Mai, 2026' },
  { id: 3, title: 'E-commerce Concept', category: 'Mobile', status: 'Publicado', date: '12 Mai, 2026' },
];

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 sm:p-10 max-w-7xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111] tracking-tight">Projetos</h1>
          <p className="text-[#666] text-sm mt-1">Gerencie seu portfólio e experimentos.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#111] text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-black/80 transition-colors shadow-lg shadow-black/5"
        >
          <Plus className="w-4 h-4" />
          Novo Projeto
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between bg-white border border-[#eaeaea] p-2 rounded-2xl mb-6 shadow-sm">
        <div className="relative w-full max-w-xs">
          <Search className="w-4 h-4 text-[#999] absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Buscar projeto..." 
            className="w-full pl-9 pr-4 py-2 bg-transparent text-sm outline-none placeholder:text-[#999]"
          />
        </div>
        <div className="flex items-center gap-2 px-2">
          <button className="text-[13px] font-medium text-[#666] hover:text-[#111] px-3 py-1.5 rounded-lg hover:bg-[#f5f5f5] transition-colors">Todos</button>
          <button className="text-[13px] font-medium text-[#666] hover:text-[#111] px-3 py-1.5 rounded-lg hover:bg-[#f5f5f5] transition-colors">Web</button>
          <button className="text-[13px] font-medium text-[#666] hover:text-[#111] px-3 py-1.5 rounded-lg hover:bg-[#f5f5f5] transition-colors">Mobile</button>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white border border-[#eaeaea] rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#eaeaea] bg-[#fafafa]">
              <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">Projeto</th>
              <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">Categoria</th>
              <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider hidden sm:table-cell">Data</th>
              <th className="px-6 py-4 text-right text-[11px] font-bold text-[#888] uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-[#eaeaea] last:border-0 hover:bg-[#fdfdfd] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f5f5f5] border border-[#eaeaea] flex items-center justify-center flex-shrink-0">
                      <FolderKanban className="w-5 h-5 text-[#888]" strokeWidth={1.5} />
                    </div>
                    <span className="font-semibold text-[#111] text-sm">{project.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[13px] text-[#666] font-medium">{project.category}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase ${
                    project.status === 'Publicado' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell text-[13px] text-[#888] font-medium">
                  {project.date}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-[#888] hover:text-[#111] hover:bg-[#f5f5f5] rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                    <button className="p-2 text-[#888] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    <button className="p-2 text-[#888] hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><ExternalLink className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Minimal Create Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[32px] p-8 shadow-2xl overflow-hidden"
            >
              <h2 className="text-xl font-bold text-[#111] mb-6">Criar Novo Projeto</h2>
              <form className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#888] uppercase tracking-wider mb-1.5 block">Nome do Projeto</label>
                  <input type="text" className="w-full px-4 py-3 bg-[#f5f5f5] border border-transparent focus:border-[#eaeaea] rounded-xl text-sm outline-none focus:bg-white transition-all text-[#111]" placeholder="Ex: Portfolio Redesign" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#888] uppercase tracking-wider mb-1.5 block">Categoria</label>
                  <select className="w-full px-4 py-3 bg-[#f5f5f5] border border-transparent focus:border-[#eaeaea] rounded-xl text-sm outline-none focus:bg-white transition-all text-[#111] appearance-none">
                    <option>Web</option>
                    <option>Mobile</option>
                    <option>Design</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#888] uppercase tracking-wider mb-1.5 block">Descrição Curta</label>
                  <textarea rows={3} className="w-full px-4 py-3 bg-[#f5f5f5] border border-transparent focus:border-[#eaeaea] rounded-xl text-sm outline-none focus:bg-white transition-all text-[#111] resize-none" placeholder="Escreva sobre o projeto..."></textarea>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-[#666] hover:text-[#111] hover:bg-[#f5f5f5] rounded-xl transition-colors">Cancelar</button>
                  <button type="button" className="px-5 py-2.5 text-sm font-semibold text-white bg-[#111] hover:bg-black/80 rounded-xl transition-colors shadow-lg shadow-black/10">Criar Projeto</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

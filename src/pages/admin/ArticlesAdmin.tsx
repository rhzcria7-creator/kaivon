import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, Edit2, Trash2, Globe, FileText, Check, Tag } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  status: 'Published' | 'Draft';
  createdAt: string;
}

const DEFAULT_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'A Nova Era do Design Minimalista',
    content: 'Como a simplicidade e a estética premium da Apple ditam as regras do mercado digital moderno...',
    category: 'Design',
    status: 'Published',
    createdAt: '2026-05-20',
  },
  {
    id: '2',
    title: 'O Futuro das Aplicações Web de Alta Performance',
    content: 'Interfaces reativas, animações aceleradas por GPU, e como otimizar layouts para zero latência.',
    category: 'Desenvolvimento',
    status: 'Draft',
    createdAt: '2026-05-18',
  },
  {
    id: '3',
    title: 'Integrando Motion Design em Plataformas Enterprise',
    content: 'Guia definitivo de como usar micro-interações para guiar a atenção do usuário com naturalidade.',
    category: 'Motion',
    status: 'Published',
    createdAt: '2026-05-15',
  },
];

const DEFAULT_CATEGORIES = ['Design', 'Desenvolvimento', 'Motion', 'Tecnologia'];

export default function ArticlesAdmin() {
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('kaivon_articles');
    return saved ? JSON.parse(saved) : DEFAULT_ARTICLES;
  });

  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('kaivon_categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'drafts' | 'categories'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[0] || 'Design');
  const [status, setStatus] = useState<'Published' | 'Draft'>('Draft');
  const [newCatName, setNewCatName] = useState('');

  useEffect(() => {
    localStorage.setItem('kaivon_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('kaivon_categories', JSON.stringify(categories));
  }, [categories]);

  const handleOpenAddModal = () => {
    setEditingArticle(null);
    setTitle('');
    setContent('');
    setCategory(categories[0] || 'Design');
    setStatus('Draft');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (article: Article) => {
    setEditingArticle(article);
    setTitle(article.title);
    setContent(article.content);
    setCategory(article.category);
    setStatus(article.status);
    setIsModalOpen(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingArticle) {
      setArticles(prev =>
        prev.map(a =>
          a.id === editingArticle.id
            ? { ...a, title, content, category, status }
            : a
        )
      );
    } else {
      const newArticle: Article = {
        id: Date.now().toString(),
        title,
        content,
        category,
        status,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setArticles(prev => [newArticle, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('Tem certeza de que deseja excluir este artigo?')) {
      setArticles(prev => prev.filter(a => a.id !== id));
    }
  };

  const handlePublishDraft = (id: string) => {
    setArticles(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'Published' } : a))
    );
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    if (categories.includes(newCatName.trim())) return;
    setCategories(prev => [...prev, newCatName.trim()]);
    setNewCatName('');
  };

  const handleDeleteCategory = (cat: string) => {
    if (confirm(`Deseja remover a categoria "${cat}"?`)) {
      setCategories(prev => prev.filter(c => c !== cat));
    }
  };

  const filteredArticles = articles.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.content.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === 'published') return a.status === 'Published';
    if (activeTab === 'drafts') return a.status === 'Draft';
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="p-6 sm:p-10 max-w-7xl mx-auto text-white space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            Artigos e Conteúdo
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Plataforma editorial. Gerencie publicações, controle rascunhos e tags de categorização.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-white text-black px-5 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-neutral-200 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.05)] transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          Escrever Artigo
        </button>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-neutral-800 gap-6">
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-4 text-sm font-semibold relative transition-colors ${
            activeTab === 'all' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          Todos os Artigos
          {activeTab === 'all' && (
            <motion.div layoutId="articleTabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('published')}
          className={`pb-4 text-sm font-semibold relative transition-colors ${
            activeTab === 'published' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          Publicados
          {activeTab === 'published' && (
            <motion.div layoutId="articleTabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('drafts')}
          className={`pb-4 text-sm font-semibold relative transition-colors ${
            activeTab === 'drafts' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          Rascunhos
          {activeTab === 'drafts' && (
            <motion.div layoutId="articleTabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`pb-4 text-sm font-semibold relative transition-colors ${
            activeTab === 'categories' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          Categorias
          {activeTab === 'categories' && (
            <motion.div layoutId="articleTabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
          )}
        </button>
      </div>

      {activeTab !== 'categories' ? (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por títulos ou conteúdo..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[rgba(255,255,255,0.03)] focus:bg-[rgba(255,255,255,0.06)] border border-neutral-800/80 focus:border-neutral-700 rounded-2xl text-sm outline-none transition-all text-white placeholder:text-neutral-500"
            />
          </div>

          {/* List */}
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredArticles.length > 0 ? (
                filteredArticles.map(article => (
                  <motion.div
                    key={article.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="bg-[#0e0e12]/60 backdrop-blur-xl border border-white/[0.05] p-6 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/[0.1] transition-all group"
                  >
                    <div className="space-y-2 max-w-3xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 bg-white/[0.05] border border-white/[0.05] px-2.5 py-1 rounded-lg">
                          {article.category}
                        </span>
                        <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-lg border ${
                          article.status === 'Published'
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                        }`}>
                          {article.status === 'Published' ? 'Publicado' : 'Rascunho'}
                        </span>
                        <span className="text-neutral-500 text-xs">
                          {article.createdAt}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-neutral-100 group-hover:text-white transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-neutral-400 text-sm line-clamp-1">
                        {article.content}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-auto">
                      {article.status === 'Draft' && (
                        <button
                          onClick={() => handlePublishDraft(article.id)}
                          title="Publicar Artigo"
                          className="p-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 rounded-xl transition-all"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenEditModal(article)}
                        title="Editar Artigo"
                        className="p-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-neutral-300 hover:text-white rounded-xl transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        title="Excluir Artigo"
                        className="p-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20 bg-[#0e0e12]/30 border border-neutral-900 border-dashed rounded-3xl">
                  <FileText className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
                  <h3 className="text-neutral-400 font-semibold mb-1">Nenhum artigo localizado</h3>
                  <p className="text-neutral-600 text-sm">Use o botão de criar artigo para começar.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: categories form */}
          <div className="bg-[#0e0e12]/50 border border-white/5 p-6 rounded-3xl h-fit space-y-4">
            <h4 className="font-bold flex items-center gap-2 text-neutral-200">
              <Tag className="w-4 h-4 text-neutral-400" />
              Nova Categoria
            </h4>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <input
                type="text"
                placeholder="Nome da categoria (ex: Frontend)"
                value={newCatName}
                onChange={e => setNewCatName(e.target.value)}
                className="w-full px-4 py-3 bg-white/[0.02] border border-neutral-800 focus:border-neutral-700 rounded-xl outline-none text-sm text-white"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-white text-black hover:bg-neutral-200 rounded-xl font-bold text-sm transition-all"
              >
                Criar Categoria
              </button>
            </form>
          </div>

          {/* Right: categories layout list */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-bold text-neutral-300">Coleções Ativas</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat, index) => (
                <div
                  key={index}
                  className="bg-[#0e0e12]/30 hover:bg-[#0e0e12]/60 border border-[#222] hover:border-neutral-800 p-4 rounded-2xl flex justify-between items-center transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500" />
                    <span className="font-bold text-neutral-200 text-sm">{cat}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(cat)}
                    className="p-1.5 hover:bg-white/[0.05] rounded-lg transition-colors text-neutral-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
              className="relative w-full max-w-2xl bg-[#0f0f13] border border-white/10 rounded-[32px] p-6 sm:p-8 shadow-2xl overflow-hidden text-neutral-100 max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-xl font-bold tracking-tight text-white mb-6">
                {editingArticle ? 'Editar Artigo' : 'Escrever Novo Artigo'}
              </h2>

              <form onSubmit={handleSaveArticle} className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Título do Artigo</label>
                  <input
                    type="text"
                    required
                    placeholder="Dê um título expressivo ao conteúdo..."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-[#121216] border border-neutral-800 focus:border-neutral-700 rounded-2xl outline-none text-sm transition-all focus:ring-4 focus:ring-white/[0.02]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Categoria</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-white/[0.02] border border-neutral-800 rounded-2xl outline-none text-sm text-neutral-200 focus:bg-[#121216]"
                    >
                      {categories.map((cat, i) => (
                        <option key={i} value={cat} className="bg-[#121216] text-white">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Visibilidade / Estado</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setStatus('Published')}
                        className={`flex-1 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider border transition-all ${
                          status === 'Published'
                            ? 'bg-white text-black border-white'
                            : 'bg-white/[0.02] border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        Publicar agora
                      </button>
                      <button
                        type="button"
                        onClick={() => setStatus('Draft')}
                        className={`flex-1 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider border transition-all ${
                          status === 'Draft'
                            ? 'bg-white text-black border-white'
                            : 'bg-white/[0.02] border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        Salvar Rascunho
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Páginas de Conteúdo (Markdown / RichText)</label>
                  <textarea
                    rows={8}
                    required
                    placeholder="Desenvolva seu texto com clareza..."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="w-full px-4 py-3 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-[#121216] border border-neutral-800 focus:border-neutral-700 rounded-2xl outline-none text-sm transition-all focus:ring-4 focus:ring-white/[0.02] resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-neutral-900 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-3 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
                  >
                    Descartar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-white hover:bg-neutral-200 text-black rounded-2xl font-bold text-xs uppercase tracking-widest shadow-[0_4px_20px_rgba(255,255,255,0.05)] transition-all"
                  >
                    Salvar Item
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

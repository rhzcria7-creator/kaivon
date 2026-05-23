import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Globe, Award, Sparkles, Check, Save, ArrowUpRight, Search } from 'lucide-react';

interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  analyticsId: string;
  ogImage: string;
  robotsTxt: string;
}

const DEFAULT_SEO: SeoConfig = {
  metaTitle: 'KAIVON — Premium Digital Craftsmanship & Code',
  metaDescription: 'Estúdio de design de interfaces minimalistas de alta performance e engenharia criativa focada na experiência do usuário.',
  keywords: 'kaivon, design studio, apple aesthetics, high-performance react, premium portfolios, motion web, clean software development',
  analyticsId: 'G-KV99AEST15',
  ogImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80',
  robotsTxt: 'User-agent: *\nAllow: /',
};

interface FeaturedItem {
  id: string;
  title: string;
  category: string;
  isFeatured: boolean;
  scoreRank: number;
}

const DEFAULT_FEATURED: FeaturedItem[] = [
  { id: 'proj-1', title: 'Minimal Portfolio v1', category: 'Web', isFeatured: true, scoreRank: 1 },
  { id: 'proj-2', title: 'Dark Mode Dashboard', category: 'Design', isFeatured: false, scoreRank: 2 },
  { id: 'proj-3', title: 'E-commerce Concept', category: 'Mobile', isFeatured: true, scoreRank: 3 },
  { id: 'art-1', title: 'A Nova Era do Design Minimalista', category: 'Artigo', isFeatured: true, scoreRank: 4 },
  { id: 'art-2', title: 'O Futuro das Aplicações Web de Alta Performance', category: 'Artigo', isFeatured: false, scoreRank: 5 },
];

export default function SEOAdmin() {
  const [seo, setSeo] = useState<SeoConfig>(() => {
    const saved = localStorage.getItem('kaivon_seo_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SEO;
  });

  const [features, setFeatures] = useState<FeaturedItem[]>(() => {
    const saved = localStorage.getItem('kaivon_featured_items');
    return saved ? JSON.parse(saved) : DEFAULT_FEATURED;
  });

  const [activeTab, setActiveTab] = useState<'seo' | 'featured'>('seo');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('kaivon_seo_settings', JSON.stringify(seo));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleToggleFeature = (id: string) => {
    setFeatures(prev =>
      prev.map(f => (f.id === id ? { ...f, isFeatured: !f.isFeatured } : f))
    );
  };

  // Persist featured list changes automatically
  useEffect(() => {
    localStorage.setItem('kaivon_featured_items', JSON.stringify(features));
  }, [features]);

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
            SEO e Destaques
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Configure sitemaps, metadados globais, códigos de rastreamento e indexação de produtos.
          </p>
        </div>

        {isSaved && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> Alterações Gravadas
          </motion.div>
        )}
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-neutral-800 gap-6">
        <button
          onClick={() => setActiveTab('seo')}
          className={`pb-4 text-sm font-semibold relative transition-colors ${
            activeTab === 'seo' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          Editor SEO & Métricas
          {activeTab === 'seo' && (
            <motion.div layoutId="seoTabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('featured')}
          className={`pb-4 text-sm font-semibold relative transition-colors ${
            activeTab === 'featured' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          Conteúdos em Destaque
          {activeTab === 'featured' && (
            <motion.div layoutId="seoTabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
          )}
        </button>
      </div>

      {activeTab === 'seo' ? (
        <form onSubmit={handleSaveSeo} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form controls */}
          <div className="lg:col-span-2 space-y-6 bg-[#0e0e12]/30 border border-white/5 p-6 sm:p-8 rounded-[32px]">
            <h3 className="text-lg font-bold text-neutral-200 flex items-center gap-2">
              <Globe className="w-5 h-5 text-neutral-400" /> Metadados Básicos (Google SERP)
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Título Global da Página</label>
              <input
                type="text"
                required
                value={seo.metaTitle}
                onChange={e => setSeo(prev => ({ ...prev, metaTitle: e.target.value }))}
                className="w-full px-4 py-3 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-[#121216] border border-neutral-800 focus:border-neutral-700 rounded-2xl outline-none text-sm transition-all text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono">Meta Description</label>
              <textarea
                rows={3}
                required
                value={seo.metaDescription}
                onChange={e => setSeo(prev => ({ ...prev, metaDescription: e.target.value }))}
                className="w-full px-4 py-3 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-[#121216] border border-neutral-800 focus:border-neutral-700 rounded-2xl outline-none text-sm transition-all text-white resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Palavras-chave (Keywords)</label>
              <input
                type="text"
                value={seo.keywords}
                onChange={e => setSeo(prev => ({ ...prev, keywords: e.target.value }))}
                className="w-full px-4 py-3 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-[#121216] border border-neutral-800 focus:border-neutral-700 rounded-2xl outline-none text-sm transition-all text-white"
              />
            </div>

            <hr className="border-neutral-800/60" />

            <h3 className="text-lg font-bold text-neutral-200 flex items-center gap-2 pt-2">
              <Settings className="w-5 h-5 text-neutral-400" /> Indexadores e Rastreamento
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Google Analytics (Measurement ID)</label>
                <input
                  type="text"
                  placeholder="Ex: G-XXXXXXXXXX"
                  value={seo.analyticsId}
                  onChange={e => setSeo(prev => ({ ...prev, analyticsId: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-[#121216] border border-neutral-800 focus:border-neutral-700 rounded-2xl outline-none text-sm transition-all text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono">Robots.txt</label>
                <textarea
                  rows={2}
                  value={seo.robotsTxt}
                  onChange={e => setSeo(prev => ({ ...prev, robotsTxt: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-[#121216] border border-neutral-800 focus:border-neutral-700 rounded-2xl outline-none text-xs font-mono transition-all text-white resize-none"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="bg-white hover:bg-neutral-200 text-black px-6 py-3.5 rounded-2xl text-xs font-extrabold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-black/10 transition-all transform hover:scale-[1.01]"
              >
                <Save className="w-4 h-4" /> Salvar Configurações
              </button>
            </div>
          </div>

          {/* Sidebar Info/Preview card */}
          <div className="space-y-6">
            <div className="bg-[#0e0e12]/60 border border-white/5 p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                <Sparkles className="w-4 h-4 text-[#a855f7]" /> Google SERP Simulator
              </div>

              <div className="bg-[#121215] p-5 rounded-2xl border border-neutral-800/50 space-y-2">
                <div className="text-[#3b82f6] hover:underline text-lg font-semibold truncate leading-tight">
                  {seo.metaTitle || 'Título da página'}
                </div>
                <div className="text-neutral-400 text-xs truncate max-w-sm">
                  https://kaivon.os
                </div>
                <p className="text-neutral-400 text-xs line-clamp-2 leading-relaxed">
                  {seo.metaDescription || 'Descrição da página no Google...'}
                </p>
              </div>

              <p className="text-[11px] text-neutral-500 leading-relaxed font-medium">
                Sua marca é atualizada dinamicamente. Para testar a pontuação de SEO e Core Web Vitals, use as ferramentas PageSpeed Insights ou Lighthouse.
              </p>
            </div>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-neutral-200">Featured Content Carousel</h3>
              <p className="text-neutral-400 text-sm mt-1">
                Marque e destaque os melhores trabalhos de forma simples para o painel principal.
              </p>
            </div>
          </div>

          <div className="bg-[#0e0e12]/60 border border-white/5 rounded-3xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.01] border-b border-white/[0.05]">
                  <th className="px-6 py-4 text-[11px] font-bold text-neutral-500 uppercase tracking-widest">Módulo</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-neutral-500 uppercase tracking-widest">Título do Item</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-neutral-500 uppercase tracking-widest">Coleção</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-neutral-500 uppercase tracking-widest text-right">Destaque Principal</th>
                </tr>
              </thead>
              <tbody>
                {features.map(item => (
                  <tr key={item.id} className="border-b border-white/[0.03] last:border-0 hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 bg-white/[0.03] border border-white/5 rounded-lg text-neutral-400">
                        {item.category === 'Artigo' ? 'Artigo' : 'Projeto'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-neutral-200 text-sm">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-neutral-500">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleToggleFeature(item.id)}
                        className={`text-xs font-bold uppercase tracking-widest px-4 py-2 border rounded-xl transition-all ${
                          item.isFeatured
                            ? 'bg-amber-400/10 border-amber-400/20 text-amber-400 hover:bg-amber-400/20'
                            : 'bg-white/[0.02] border-neutral-800 text-neutral-400 hover:text-neutral-300'
                        }`}
                      >
                        {item.isFeatured ? '★ Destaque' : '☆ Ativar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}

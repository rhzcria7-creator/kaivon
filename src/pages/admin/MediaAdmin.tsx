import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UploadCloud, Image as ImageIcon, Copy, Trash2, File, Check, ExternalLink } from 'lucide-react';

interface MediaFile {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
  createdAt: string;
}

const DEFAULT_MEDIA: MediaFile[] = [
  {
    id: '1',
    name: 'apple_mockup_ambient.png',
    type: 'image/png',
    size: '1.2 MB',
    url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=640&auto=format&fit=crop',
    createdAt: '2026-05-23',
  },
  {
    id: '2',
    name: 'minimalist_portfolio_logo.svg',
    type: 'image/svg+xml',
    size: '42 KB',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=640&auto=format&fit=crop',
    createdAt: '2026-05-22',
  },
];

export default function MediaAdmin() {
  const [files, setFiles] = useState<MediaFile[]>(() => {
    const saved = localStorage.getItem('kaivon_media');
    return saved ? JSON.parse(saved) : DEFAULT_MEDIA;
  });

  const [isDragging, setIsDragging] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('kaivon_media', JSON.stringify(files));
  }, [files]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newMedia: MediaFile = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        url: typeof reader.result === 'string' ? reader.result : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=640&auto=format&fit=crop',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setFiles(prev => [newMedia, ...prev]);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach(processFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach(processFile);
    }
  };

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleDeleteFile = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta mídia de forma definitiva?')) {
      setFiles(prev => prev.filter(f => f.id !== id));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="p-6 sm:p-10 max-w-7xl mx-auto text-white space-y-8"
    >
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-200 to-neutral-400 bg-clip-text text-transparent">
          Biblioteca de Mídias
        </h1>
        <p className="text-neutral-400 text-sm mt-1">
          Gerencie arquivos estáticos, banners, ícones de marca e vetores para suas publicações.
        </p>
      </div>

      {/* Upload Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-[32px] p-10 sm:p-16 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-white bg-white/[0.05] scale-[0.99]'
            : 'border-neutral-800 bg-[#0d0d11]/40 hover:bg-[#0d0d11]/80 hover:border-neutral-700'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          className="hidden"
          accept="image/*,video/*,application/pdf"
        />

        <div className="w-16 h-16 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
          <UploadCloud className="w-8 h-8 text-neutral-400" />
        </div>

        <h3 className="text-lg font-bold text-neutral-100 mb-1">
          Arraste e solte seus arquivos de mídia
        </h3>
        <p className="text-neutral-500 text-xs sm:text-sm max-w-sm">
          Suporta imagens (PNG, JPG, SVG, WebP) ou PDFs de até 10MB. Clique para explorar pastas locais.
        </p>
      </div>

      {/* Media Gallery */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-neutral-200">Arquivos Recentes</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {files.map(file => (
              <motion.div
                key={file.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#0e0e12]/60 border border-white/5 rounded-3xl overflow-hidden group hover:border-white/[0.1] transition-all flex flex-col justify-between"
              >
                {/* File Preview aspect */}
                <div className="relative aspect-video w-full bg-[#16161c] flex items-center justify-center overflow-hidden border-b border-white/[0.02]">
                  {file.type.startsWith('image/') ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <File className="w-12 h-12 text-neutral-600" />
                  )}

                  {/* Absolute subtle hovering actions on visual card */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyLink(file.url, file.id);
                      }}
                      className="p-3 bg-white text-black hover:bg-neutral-200 rounded-xl font-bold text-xs flex items-center gap-2 transition-all"
                    >
                      {copiedId === file.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      {copiedId === file.id ? 'Copiado' : 'Copiar URL'}
                    </button>
                    {file.url.startsWith('http') && (
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 bg-neutral-800 text-white hover:bg-neutral-700 border border-white/5 rounded-xl transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Metadata actions details */}
                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-neutral-200 truncate" title={file.name}>
                      {file.name}
                    </p>
                    <div className="flex justify-between text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">
                      <span>{file.size}</span>
                      <span>{file.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-white/[0.03]">
                    <span className="text-[9px] font-extrabold text-neutral-500 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded uppercase">
                      {file.type.split('/')[1] || 'FILE'}
                    </span>

                    <button
                      onClick={() => handleDeleteFile(file.id)}
                      className="p-1.5 hover:bg-red-500/10 text-neutral-500 hover:text-red-400 rounded-lg transition-colors"
                      title="Excluir do storage"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {files.length === 0 && (
          <div className="text-center py-24 bg-[#0e0e12]/20 border border-neutral-900 border-dashed rounded-[32px]">
            <UploadCloud className="w-12 h-12 text-neutral-600 mx-auto mb-4 animate-pulse" />
            <h3 className="text-neutral-400 font-semibold mb-1">Nenhum arquivo na biblioteca</h3>
            <p className="text-neutral-600 text-sm">Arraste algum banner ou arquivo estático para iniciar.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

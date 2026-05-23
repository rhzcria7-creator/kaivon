import { motion } from 'motion/react';
import { Users, Mail, Phone, ExternalLink } from 'lucide-react';

export default function ContactsAdmin() {
  const contacts = [
    { id: 1, name: 'Alice Viana', company: 'Studio 404', role: 'CEO', email: 'alice@404.com', phone: '+55 11 9999-0000', status: 'Cliente' },
    { id: 2, name: 'Carlos Mendes', company: 'FintechX', role: 'Product Manager', email: 'carlos@fintechx.com', phone: '+55 21 8888-1111', status: 'Lead' },
    { id: 3, name: 'Beatriz Sol', company: 'Design Co.', role: 'Creative Director', email: 'bia@designco.com', phone: '+55 31 7777-2222', status: 'Parceiro' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 sm:p-10 max-w-7xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#111] tracking-tight">Contatos</h1>
        <p className="text-[#666] text-sm mt-1">Gerencie seus leads, clientes e parceiros.</p>
      </div>

      <div className="bg-white border border-[#eaeaea] rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fafafa]">
              <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">Contato</th>
              <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider">Empresa</th>
              <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider hidden sm:table-cell">Contato</th>
              <th className="px-6 py-4 text-[11px] font-bold text-[#888] uppercase tracking-wider text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-t border-[#eaeaea] hover:bg-[#fdfdfd] transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#111] text-white flex items-center justify-center font-bold text-sm">
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-[#111] text-sm">{contact.name}</div>
                      <div className="text-xs text-[#888]">{contact.role}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[13px] text-[#444] font-medium">{contact.company}</span>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-[12px] text-[#666]"><Mail className="w-3 h-3" /> {contact.email}</div>
                    <div className="flex items-center gap-2 text-[12px] text-[#666]"><Phone className="w-3 h-3" /> {contact.phone}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase ${
                    contact.status === 'Cliente' ? 'bg-[#111] text-white' : 
                    contact.status === 'Lead' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {contact.status}
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

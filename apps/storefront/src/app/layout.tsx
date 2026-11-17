import type { Metadata } from 'next';
import {CartProvider} from '@/components/CartProvider';
import {Header} from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: { default:'Sua Marca | Fragrâncias e descobertas', template:'%s | Sua Marca' },
  description:'Protótipo demonstrativo de e-commerce de perfumaria, decants e fragrâncias. Loja ainda não disponível para compras.',
  robots:{index:false,follow:false}
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="pt-BR"><body><CartProvider><div className="demo-notice">PROTÓTIPO • catálogo e valores ilustrativos • compras ainda indisponíveis</div><Header/>{children}<footer className="footer"><div><span className="brand-mark">S<span>•</span>M</span><p>Um novo jeito de sentir. Nossa marca vem aí.</p></div><div><strong>Explore</strong><span>Perfumes e decants</span><span>Kits e presentes</span><span>Automotivos</span></div><div><strong>Atendimento</strong><span>Instagram e WhatsApp em breve</span><span>Políticas e contato antes da abertura</span></div><small>© 2026 • Projeto demonstrativo • Conteúdo fictício até aprovação dos sócios.</small></footer></CartProvider></body></html>
}
